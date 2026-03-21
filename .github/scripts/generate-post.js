// .github/scripts/generate-post.js
// Script para generar artículos automáticamente con Claude API
// Se ejecuta desde GitHub Actions

const Anthropic = require("@anthropic-ai/sdk");
const fs = require("fs");
const path = require("path");

const client = new Anthropic();
// ANTHROPIC_API_KEY se lee automáticamente del entorno

// ============================================================
// LISTA DE POSTS PENDIENTES — 30 posts pre-programados
// Cubre ~2,5 meses al ritmo de lunes/miércoles/viernes.
//
// ¿Cómo funciona?
//   - El script publica siempre el primero de la lista.
//   - Cuando articles.ts ya contiene el slug, lo salta automáticamente.
//   - Borra una entrada de aquí cuando el artículo esté publicado.
//
// Artículos ya publicados (no añadir de nuevo):
// - sonar-que-no-puedes-correr, suenos-de-dientes-que-se-caen
// - sonar-con-tu-ex, suenos-de-persecucion, suenos-de-volar
// - sonar-con-caballos, sonar-que-estas-perdido
// - sonar-con-enfermedad-o-dolor, sonar-con-exito-o-ascenso-laboral
// - sonar-con-lobos
// ============================================================

const PENDING_POSTS = [
  // ── SEMANA 1 ─────────────────────────────────────────────
  {
    title: "Soñar con agua turbia",
    category: "Símbolos en Sueños",
    categorySlug: "simbolos-en-suenos",
    tags: ["agua turbia", "emociones", "incertidumbre", "inconsciente"],
    relatedSlugs: ["suenos-con-agua", "sonar-con-la-muerte-de-un-familiar", "paralisis-del-sueno"],
  },
  {
    title: "Soñar con toros",
    category: "Animales",
    categorySlug: "animales",
    tags: ["toros", "fuerza", "agresividad", "instinto", "control"],
    relatedSlugs: ["sonar-con-caballos", "sonar-con-serpientes", "sonar-con-lobos"],
  },
  {
    title: "Soñar con el teléfono o con no poder llamar",
    category: "Ansiedad y Miedos",
    categorySlug: "ansiedad-y-miedos",
    tags: ["teléfono", "comunicación", "aislamiento", "urgencia", "ansiedad"],
    relatedSlugs: ["sonar-que-no-puedes-hablar-o-gritar", "suenos-de-persecucion", "sonar-con-catastrofes"],
  },
  // ── SEMANA 2 ─────────────────────────────────────────────
  {
    title: "Soñar con tu casa de la infancia",
    category: "Símbolos en Sueños",
    categorySlug: "simbolos-en-suenos",
    tags: ["casa", "infancia", "nostalgia", "memoria", "pasado"],
    relatedSlugs: ["sonar-con-tu-casa", "sonar-con-tu-madre-o-tu-padre", "suenos-con-personas-del-pasado"],
  },
  {
    title: "Soñar con tu padre o figura paterna",
    category: "Relaciones",
    categorySlug: "relaciones",
    tags: ["padre", "figura paterna", "autoridad", "familia", "infancia"],
    relatedSlugs: ["sonar-con-tu-madre-o-tu-padre", "sonar-con-hermanos", "suenos-con-personas-del-pasado"],
  },
  {
    title: "Soñar que no tienes dinero o que pierdes todo",
    category: "Trabajo y Dinero",
    categorySlug: "trabajo-y-dinero",
    tags: ["dinero", "pérdida económica", "ansiedad financiera", "seguridad", "miedo"],
    relatedSlugs: ["suenos-con-dinero", "sonar-que-te-despiden", "suenos-con-ansiedad-laboral"],
  },
  // ── SEMANA 3 ─────────────────────────────────────────────
  {
    title: "Soñar con leones",
    category: "Animales",
    categorySlug: "animales",
    tags: ["leones", "poder", "liderazgo", "miedo", "instinto"],
    relatedSlugs: ["sonar-con-lobos", "sonar-con-caballos", "sonar-con-serpientes"],
  },
  {
    title: "Soñar con un espejo",
    category: "Símbolos en Sueños",
    categorySlug: "simbolos-en-suenos",
    tags: ["espejo", "identidad", "autoimagen", "verdad", "reflejo"],
    relatedSlugs: ["sonar-con-tu-casa", "suenos-de-estar-desnudo-en-publico", "suenos-de-dientes-que-se-caen"],
  },
  {
    title: "Soñar con el colegio o la universidad",
    category: "Sueños Recurrentes",
    categorySlug: "suenos-recurrentes",
    tags: ["colegio", "universidad", "examen", "pasado", "presión social"],
    relatedSlugs: ["sonar-con-examenes", "suenos-recurrentes-por-que-el-cerebro-repite", "sonar-que-llegas-tarde"],
  },
  // ── SEMANA 4 ─────────────────────────────────────────────
  {
    title: "Soñar con peces",
    category: "Animales",
    categorySlug: "animales",
    tags: ["peces", "agua", "inconsciente", "emociones", "abundancia"],
    relatedSlugs: ["suenos-con-agua", "sonar-con-serpientes", "sonar-con-pajaros"],
  },
  {
    title: "Soñar que te quedas atrapado",
    category: "Ansiedad y Miedos",
    categorySlug: "ansiedad-y-miedos",
    tags: ["atrapado", "claustrofobia", "libertad", "control", "ansiedad"],
    relatedSlugs: ["suenos-de-persecucion", "sonar-que-no-puedes-correr", "paralisis-del-sueno"],
  },
  {
    title: "Soñar con una entrevista de trabajo",
    category: "Trabajo y Dinero",
    categorySlug: "trabajo-y-dinero",
    tags: ["entrevista", "trabajo", "ansiedad laboral", "juicio", "rendimiento"],
    relatedSlugs: ["sonar-con-examenes", "suenos-con-ansiedad-laboral", "sonar-que-te-despiden"],
  },
  // ── SEMANA 5 ─────────────────────────────────────────────
  {
    title: "Soñar con osos",
    category: "Animales",
    categorySlug: "animales",
    tags: ["osos", "fuerza", "protección", "amenaza", "madre"],
    relatedSlugs: ["sonar-con-lobos", "sonar-con-caballos", "sonar-con-serpientes"],
  },
  {
    title: "Soñar con escaleras",
    category: "Símbolos en Sueños",
    categorySlug: "simbolos-en-suenos",
    tags: ["escaleras", "progreso", "ambición", "miedo a caer", "ascenso"],
    relatedSlugs: ["sonar-con-caidas", "sonar-con-exito-o-ascenso-laboral", "suenos-de-volar"],
  },
  {
    title: "Soñar con alguien que ya murió una y otra vez",
    category: "Sueños Recurrentes",
    categorySlug: "suenos-recurrentes",
    tags: ["muerto", "duelo", "recurrente", "ausencia", "despedida"],
    relatedSlugs: ["suenos-durante-el-duelo", "sonar-con-la-muerte-de-un-familiar", "suenos-recurrentes-por-que-el-cerebro-repite"],
  },
  // ── SEMANA 6 ─────────────────────────────────────────────
  {
    title: "Soñar con tu abuela o abuelo",
    category: "Relaciones",
    categorySlug: "relaciones",
    tags: ["abuela", "abuelo", "familia", "sabiduría", "raíces"],
    relatedSlugs: ["sonar-con-tu-madre-o-tu-padre", "suenos-durante-el-duelo", "suenos-con-personas-del-pasado"],
  },
  {
    title: "Soñar con terremotos o catástrofes naturales",
    category: "Ansiedad y Miedos",
    categorySlug: "ansiedad-y-miedos",
    tags: ["terremoto", "catástrofe", "pérdida de control", "miedo", "destrucción"],
    relatedSlugs: ["sonar-con-catastrofes", "sonar-con-fuego", "suenos-con-ansiedad-laboral"],
  },
  {
    title: "Soñar con renunciar o cambiar de trabajo",
    category: "Trabajo y Dinero",
    categorySlug: "trabajo-y-dinero",
    tags: ["renuncia", "cambio laboral", "libertad", "miedo", "decisión"],
    relatedSlugs: ["sonar-que-te-despiden", "sonar-con-el-trabajo-antiguo", "suenos-con-ansiedad-laboral"],
  },
  // ── SEMANA 7 ─────────────────────────────────────────────
  {
    title: "Soñar con delfines",
    category: "Animales",
    categorySlug: "animales",
    tags: ["delfines", "alegría", "libertad", "inteligencia", "emociones"],
    relatedSlugs: ["sonar-con-pajaros", "suenos-de-volar", "suenos-con-agua"],
  },
  {
    title: "Soñar con una puerta o una llave",
    category: "Símbolos en Sueños",
    categorySlug: "simbolos-en-suenos",
    tags: ["puerta", "llave", "oportunidad", "secreto", "decisión"],
    relatedSlugs: ["sonar-con-tu-casa", "sonar-que-estas-perdido", "sonar-con-oscuridad"],
  },
  {
    title: "Por qué soñamos con personas que nunca hemos visto",
    category: "Ciencia del Sueño",
    categorySlug: "ciencia-del-sueno",
    tags: ["desconocidos", "cara nueva", "cerebro", "neurociencia", "sueños"],
    relatedSlugs: ["que-pasa-en-el-cerebro-cuando-suenas", "suenos-con-personas-del-pasado", "suenos-lucidos-que-son-y-como-empezar"],
  },
  // ── SEMANA 8 ─────────────────────────────────────────────
  {
    title: "Soñar con traición de alguien cercano",
    category: "Relaciones",
    categorySlug: "relaciones",
    tags: ["traición", "confianza", "amigo", "pareja", "herida emocional"],
    relatedSlugs: ["sonar-que-te-enganan", "sonar-con-tu-pareja-actual", "sonar-con-amigos"],
  },
  {
    title: "Soñar con que llegas tarde a algo muy importante",
    category: "Ansiedad y Miedos",
    categorySlug: "ansiedad-y-miedos",
    tags: ["llegar tarde", "urgencia", "ansiedad", "responsabilidad", "pánico"],
    relatedSlugs: ["suenos-de-llegar-tarde-o-perderse", "sonar-con-examenes", "sonar-que-no-puedes-correr"],
  },
  {
    title: "Qué son los sueños hipnagógicos y por qué asustan",
    category: "Ciencia del Sueño",
    categorySlug: "ciencia-del-sueno",
    tags: ["hipnagógico", "al dormirse", "alucinaciones", "REM", "neurociencia"],
    relatedSlugs: ["paralisis-del-sueno", "que-pasa-en-el-cerebro-cuando-suenas", "suenos-lucidos-que-son-y-como-empezar"],
  },
  // ── SEMANA 9 ─────────────────────────────────────────────
  {
    title: "Soñar con tus hijos (o con el hijo que no tienes)",
    category: "Relaciones",
    categorySlug: "relaciones",
    tags: ["hijos", "paternidad", "maternidad", "protección", "miedo a perder"],
    relatedSlugs: ["sonar-con-bebes", "sonar-con-embarazo", "sonar-con-tu-madre-o-tu-padre"],
  },
  {
    title: "Soñar con un lugar desconocido que sientes tuyo",
    category: "Sueños Recurrentes",
    categorySlug: "suenos-recurrentes",
    tags: ["lugar desconocido", "déjà vu", "recurrente", "inconsciente", "exploración"],
    relatedSlugs: ["suenos-recurrentes-por-que-el-cerebro-repite", "sonar-con-tu-casa", "sonar-que-estas-perdido"],
  },
  {
    title: "Soñar con fracasar en un proyecto importante",
    category: "Trabajo y Dinero",
    categorySlug: "trabajo-y-dinero",
    tags: ["fracaso", "proyecto", "ansiedad laboral", "autoexigencia", "miedo"],
    relatedSlugs: ["sonar-con-examenes", "suenos-con-ansiedad-laboral", "sonar-con-exito-o-ascenso-laboral"],
  },
  // ── SEMANA 10 ────────────────────────────────────────────
  {
    title: "Soñar con volver a la infancia",
    category: "Sueños Recurrentes",
    categorySlug: "suenos-recurrentes",
    tags: ["infancia", "regresión", "nostalgia", "recurrente", "niño interior"],
    relatedSlugs: ["sonar-con-tu-casa", "suenos-con-personas-del-pasado", "sonar-con-tu-madre-o-tu-padre"],
  },
  {
    title: "Cómo el cerebro procesa el miedo mientras duermes",
    category: "Ciencia del Sueño",
    categorySlug: "ciencia-del-sueno",
    tags: ["miedo", "amígdala", "REM", "pesadillas", "neurociencia"],
    relatedSlugs: ["por-que-suenas-mas-cuando-estas-estresado", "que-pasa-en-el-cerebro-cuando-suenas", "paralisis-del-sueno"],
  },
  {
    title: "Soñar con una amistad que perdiste",
    category: "Relaciones",
    categorySlug: "relaciones",
    tags: ["amistad", "pérdida", "nostalgia", "distancia", "cierre emocional"],
    relatedSlugs: ["sonar-con-amigos", "suenos-con-personas-del-pasado", "suenos-en-medio-de-una-ruptura"],
  },
];

// ============================================================
// FUNCIONES AUXILIARES
// ============================================================

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function pickPost() {
  if (PENDING_POSTS.length === 0) {
    console.log("✅ No hay posts pendientes en la lista. Añade más a PENDING_POSTS.");
    process.exit(0);
  }

  const articlesPath = path.join(__dirname, "../../src/lib/articles.ts");
  const articlesContent = fs.readFileSync(articlesPath, "utf8");

  // Itera hasta encontrar el primer post que aún no esté publicado
  for (const post of PENDING_POSTS) {
    const slug = slugify(post.title);
    if (!articlesContent.includes(`slug: "${slug}"`)) {
      // Avisa si quedan pocos posts en la cola
      const remaining = PENDING_POSTS.slice(PENDING_POSTS.indexOf(post)).filter(
        (p) => !articlesContent.includes(`slug: "${slugify(p.title)}"`)
      ).length;
      if (remaining <= 5) {
        console.log(`⚠️  ATENCIÓN: solo quedan ${remaining} posts en la cola. Añade más a PENDING_POSTS pronto.`);
      }
      return post;
    }
    console.log(`⏩ Saltando "${post.title}" (ya publicado)`);
  }

  console.log("✅ Todos los posts de PENDING_POSTS ya están publicados. Añade más.");
  process.exit(0);
}

function slugAlreadyExists(slug) {
  const articlesPath = path.join(__dirname, "../../src/lib/articles.ts");
  const content = fs.readFileSync(articlesPath, "utf8");
  return content.includes(`slug: "${slug}"`);
}

// Calcula readingTime real desde el contenido generado (~200 palabras/min)
function calculateReadingTime(articleCode) {
  const match = articleCode.match(/content:\s*`([\s\S]*?)`\s*,?\s*\}?\s*$/);
  if (!match) return 7;
  const words = match[1].trim().split(/\s+/).length;
  return Math.max(3, Math.round(words / 200));
}

// ============================================================
// GENERACIÓN DEL ARTÍCULO CON CLAUDE
// ============================================================

async function generatePost(postConfig) {
  const today = new Date().toISOString().split("T")[0];
  const slug = slugify(postConfig.title);

  const relatedLinks = postConfig.relatedSlugs
    .map((s) => `- /blog/${s}`)
    .join("\n");

  const prompt = `Eres experto en SEO y psicología de los sueños.
Escribe un artículo completo en español para el blog "Entiende Tu Sueño".

DATOS DEL ARTÍCULO:
- Título: "${postConfig.title}"
- Categoría: ${postConfig.category}
- Slug: ${slug}
- Tags: ${postConfig.tags.join(", ")}
- Fecha: ${today}

REQUISITOS DE CONTENIDO:
- Entre 1200-1800 palabras
- Tono cercano, empático, sin jerga académica excesiva
- Estructura: párrafo gancho (qué es, por qué te despertaste pensando en ello) → qué significa en general → variaciones del sueño → qué hacer con esta información
- Menciona de forma natural 2-3 artículos relacionados usando estos slugs:
${relatedLinks}
- Incluye una sección "Preguntas frecuentes" con 3-4 preguntas y respuestas cortas al final
- El content debe estar en formato Markdown
- Primero párrafo muy atractivo para retener al lector

FORMATO DE RESPUESTA:
Devuelve ÚNICA Y EXCLUSIVAMENTE el objeto TypeScript siguiente, sin bloques de código, sin explicaciones adicionales, comenzando directamente con la llave de apertura {

{
  slug: "${slug}",
  title: "${postConfig.title}",
  excerpt: "Una frase de 150-160 caracteres que resuma el artículo de forma atractiva para SEO",
  category: "${postConfig.category}",
  categorySlug: "${postConfig.categorySlug}",
  publishedAt: "${today}",
  updatedAt: "${today}",
  readingTime: 7,
  coverImage: "/images/blog/${postConfig.categorySlug}/${slug}.webp",
  coverAlt: "Descripción breve de la imagen de portada para SEO",
  tags: ${JSON.stringify(postConfig.tags)},
  content: \`
[contenido markdown aquí]
\`,
}`;

  console.log(`🤖 Llamando a Claude para generar: "${postConfig.title}"...`);

  const response = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 8000,
    messages: [{ role: "user", content: prompt }],
  });

  let text = response.content[0].text.trim();
  console.log(`✅ Claude ha generado el artículo (${text.length} caracteres)`);

  // Reemplaza readingTime con el valor real calculado del contenido
  const rt = calculateReadingTime(text);
  text = text.replace(/readingTime:\s*\d+/, `readingTime: ${rt}`);
  console.log(`📖 readingTime calculado: ${rt} min`);

  return text;
}

// ============================================================
// AÑADIR EL ARTÍCULO A articles.ts
// ============================================================

function appendToArticles(articleCode) {
  const filePath = path.join(__dirname, "../../src/lib/articles.ts");
  const content = fs.readFileSync(filePath, "utf8");

  // Busca el último ]; del array de artículos
  const insertPoint = content.lastIndexOf("];");
  if (insertPoint === -1) {
    throw new Error("No se encontró el cierre del array en articles.ts");
  }

  // Limpia el código: quita llaves externas si Claude las puso sueltas
  let cleanCode = articleCode.trim();

  // Añade el artículo antes del ]
  const newContent =
    content.slice(0, insertPoint) +
    "  " +
    cleanCode +
    ",\n" +
    content.slice(insertPoint);

  fs.writeFileSync(filePath, newContent, "utf8");
  console.log("✅ Artículo insertado en src/lib/articles.ts");
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log("🚀 Iniciando generación automática de post...\n");

  const post = pickPost();
  console.log(`📝 Post seleccionado: "${post.title}"\n`);

  try {
    const articleCode = await generatePost(post);
    appendToArticles(articleCode);
    console.log("\n🎉 ¡Post generado y añadido correctamente!");
    console.log("   GitHub Actions hará el commit automáticamente.");
  } catch (error) {
    console.error("❌ Error al generar el post:", error.message);
    process.exit(1);
  }
}

main();
