// .github/scripts/send-newsletter.js
// Envía el newsletter semanal con los últimos artículos publicados
// Se ejecuta desde GitHub Actions (weekly-newsletter.yml)
//
// Variables de entorno necesarias:
//   RESEND_API_KEY, RESEND_FROM_EMAIL
//   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
//   NEXT_PUBLIC_SITE_URL
//   DRY_RUN (opcional, "true" para simular sin enviar)

const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
const { Resend } = require("resend");

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://entiendetusueno.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "newsletter@entiendeTuSueno.com";
const DRY_RUN = process.env.DRY_RUN === "true";
const ARTICLES_TO_SEND = 5; // últimos artículos publicados

// ============================================================
// LEER ARTÍCULOS DESDE articles.ts
// ============================================================

function extractArticles() {
  const filePath = path.join(__dirname, "../../src/lib/articles.ts");
  const content = fs.readFileSync(filePath, "utf8");

  // Extraer campos clave de cada artículo usando las posiciones de "slug:"
  const slugRegex = /\bslug:\s*"([^"]+)"/g;
  const positions = [];
  let match;

  while ((match = slugRegex.exec(content)) !== null) {
    positions.push({ slug: match[1], index: match.index });
  }

  const articles = [];

  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].index;
    const end = i + 1 < positions.length ? positions[i + 1].index : content.length;
    const block = content.slice(start, end);

    const titleMatch = block.match(/\btitle:\s*"([^"]+)"/);
    const excerptMatch = block.match(/\bexcerpt:\s*\n?\s*"([^"]+)"/);
    const dateMatch = block.match(/\bpublishedAt:\s*"([^"]+)"/);
    const coverMatch = block.match(/\bcoverImage:\s*"([^"]+)"/);

    if (titleMatch && dateMatch) {
      articles.push({
        slug: positions[i].slug,
        title: titleMatch[1],
        excerpt: excerptMatch ? excerptMatch[1] : "",
        publishedAt: dateMatch[1],
        coverImage: coverMatch ? coverMatch[1] : null,
        url: `${SITE_URL}/blog/${positions[i].slug}`,
      });
    }
  }

  // Ordenar de más reciente a más antiguo y tomar los primeros N
  articles.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return articles.slice(0, ARTICLES_TO_SEND);
}

// ============================================================
// OBTENER SUSCRIPTORES VERIFICADOS DE SUPABASE
// ============================================================

async function getVerifiedSubscribers() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("email")
    .eq("verified", true);

  if (error) {
    throw new Error(`Supabase error: ${error.message}`);
  }

  return data.map((row) => row.email);
}

// ============================================================
// PLANTILLA DE EMAIL DEL NEWSLETTER
// ============================================================

function buildEmailHtml(articles) {
  const articleCards = articles
    .map(
      (a) => `
    <div style="border-bottom:1px solid #2a2a4a;padding:24px 0;">
      <h2 style="color:#e8e6f0;font-size:17px;font-weight:700;margin:0 0 8px;line-height:1.4;">
        <a href="${a.url}" style="color:#e8e6f0;text-decoration:none;">${a.title}</a>
      </h2>
      <p style="color:#8b87a0;font-size:14px;line-height:1.6;margin:0 0 12px;">${a.excerpt}</p>
      <a href="${a.url}"
         style="display:inline-block;color:#7c6af7;font-size:13px;font-weight:600;text-decoration:none;">
        Leer artículo →
      </a>
    </div>`
    )
    .join("");

  const today = new Date().toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Tus últimos artículos de sueños — Entiende Tu Sueño</title>
</head>
<body style="margin:0;padding:0;background:#f0eff5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:32px auto;">

    <!-- Header -->
    <div style="background:#1a1a2e;border-radius:16px 16px 0 0;padding:32px 36px 24px;">
      <div style="font-size:32px;margin-bottom:12px;">🌙</div>
      <h1 style="color:#e8e6f0;font-size:20px;font-weight:700;margin:0 0 6px;">
        Entiende Tu Sueño
      </h1>
      <p style="color:#4a4760;font-size:13px;margin:0;">
        Últimos artículos · ${today}
      </p>
    </div>

    <!-- Artículos -->
    <div style="background:#1a1a2e;padding:0 36px;">
      ${articleCards}
    </div>

    <!-- CTA -->
    <div style="background:#1a1a2e;padding:24px 36px 32px;text-align:center;">
      <a href="${SITE_URL}/blog"
         style="display:inline-block;background:#7c6af7;color:#ffffff;padding:13px 28px;border-radius:999px;text-decoration:none;font-weight:600;font-size:14px;">
        Ver todos los artículos →
      </a>
    </div>

    <!-- Footer -->
    <div style="background:#12121e;border-radius:0 0 16px 16px;padding:18px 36px;text-align:center;">
      <p style="color:#4a4760;font-size:11px;margin:0;line-height:1.6;">
        Recibes este email porque te suscribiste en
        <a href="${SITE_URL}" style="color:#7c6af7;text-decoration:none;">entiendeTuSueno.com</a><br>
        ¿Quieres darte de baja? Responde a este email con el asunto "Baja".
      </p>
    </div>

  </div>
</body>
</html>`;
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log(`🚀 Iniciando envío de newsletter semanal${DRY_RUN ? " (DRY RUN)" : ""}...\n`);

  // 1. Obtener artículos
  const articles = extractArticles();
  console.log(`📰 Artículos seleccionados (${articles.length}):`);
  articles.forEach((a) => console.log(`   - ${a.title} (${a.publishedAt})`));
  console.log();

  if (articles.length === 0) {
    console.log("⚠️  No hay artículos para enviar. Saliendo.");
    process.exit(0);
  }

  // 2. Obtener suscriptores
  const subscribers = await getVerifiedSubscribers();
  console.log(`👥 Suscriptores verificados: ${subscribers.length}\n`);

  if (subscribers.length === 0) {
    console.log("⚠️  No hay suscriptores verificados. Saliendo.");
    process.exit(0);
  }

  if (DRY_RUN) {
    console.log("🔍 DRY RUN — se enviaría a:");
    subscribers.forEach((email) => console.log(`   - ${email}`));
    console.log("\n✅ Simulación completada. No se han enviado emails reales.");
    process.exit(0);
  }

  // 3. Enviar newsletter
  const resend = new Resend(process.env.RESEND_API_KEY);
  const html = buildEmailHtml(articles);

  let sent = 0;
  let failed = 0;

  // Enviar en lotes de 10 para respetar los rate limits de Resend
  const BATCH_SIZE = 10;
  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const batch = subscribers.slice(i, i + BATCH_SIZE);

    await Promise.all(
      batch.map(async (email) => {
        try {
          const { error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: `🌙 Nuevos artículos de sueños — Entiende Tu Sueño`,
            html,
          });

          if (error) {
            console.error(`❌ Error enviando a ${email}:`, error);
            failed++;
          } else {
            sent++;
          }
        } catch (err) {
          console.error(`❌ Error enviando a ${email}:`, err.message);
          failed++;
        }
      })
    );

    // Pequeña pausa entre lotes
    if (i + BATCH_SIZE < subscribers.length) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  console.log(`\n✅ Newsletter enviado: ${sent} ok, ${failed} errores`);

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("❌ Error fatal:", err.message);
  process.exit(1);
});
