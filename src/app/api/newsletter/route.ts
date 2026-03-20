import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

/**
 * POST /api/newsletter
 *
 * Recibe { email, contexto } y:
 *  1. Guarda el suscriptor en Supabase (tabla newsletter_subscribers)
 *  2. Reenvía al webhook de Make si MAKE_NEWSLETTER_WEBHOOK_URL está configurado
 *     (Make puede conectarlo a Mailchimp, Brevo, ConvertKit, etc.)
 *
 * SQL para crear la tabla en Supabase:
 *   create table newsletter_subscribers (
 *     id         uuid primary key default gen_random_uuid(),
 *     email      text not null unique,
 *     contexto   text default 'blog',
 *     created_at timestamptz default now()
 *   );
 *   alter table newsletter_subscribers enable row level security;
 */
export async function POST(req: NextRequest) {
  try {
    const { email, contexto } = await req.json();

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const sanitizedEmail = email.trim().toLowerCase();

    // ── 1. Guardar en Supabase ────────────────────────────────────────────────
    const { error: dbError } = await supabaseAdmin
      .from("newsletter_subscribers")
      .upsert(
        { email: sanitizedEmail, contexto: contexto ?? "blog" },
        { onConflict: "email", ignoreDuplicates: true }
      );

    if (dbError) {
      // Log but don't block — subscriber may already exist (ignoreDuplicates)
      console.error("[newsletter] Supabase error:", dbError.message);
    }

    // ── 2. Make webhook (opcional) ────────────────────────────────────────────
    // Configura MAKE_NEWSLETTER_WEBHOOK_URL en Vercel env vars para activar.
    // Make recibe { email, contexto, fecha } y puede añadirlo a tu herramienta
    // de email marketing (Mailchimp, Brevo, ConvertKit, Google Sheets…).
    if (process.env.MAKE_NEWSLETTER_WEBHOOK_URL) {
      fetch(process.env.MAKE_NEWSLETTER_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: sanitizedEmail,
          contexto: contexto ?? "blog",
          fecha: new Date().toISOString(),
        }),
      }).catch((err) => console.error("[newsletter] Make webhook error:", err));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
