import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://entiendeTuSueno.com";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "newsletter@entiendeTuSueno.com";

/**
 * POST /api/newsletter
 *
 * Flujo double opt-in:
 *  1. Valida el email
 *  2. Si ya está verificado → responde ok directamente
 *  3. Genera token → upsert en Supabase (verified: false)
 *  4. Envía email de confirmación via Resend
 *  5. Reenvía al webhook de Make si está configurado
 *
 * Variables de entorno necesarias:
 *   RESEND_API_KEY            — clave de Resend
 *   RESEND_FROM_EMAIL         — ej. newsletter@tudominio.com
 *   NEXT_PUBLIC_SITE_URL      — ej. https://entiendeTuSueno.com
 *   NEXT_PUBLIC_SUPABASE_URL  — URL del proyecto Supabase
 *   SUPABASE_SERVICE_ROLE_KEY — service role key de Supabase
 *   MAKE_NEWSLETTER_WEBHOOK_URL — (opcional) webhook de Make
 */
export async function POST(req: NextRequest) {
  try {
    const { email, contexto } = await req.json();

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const sanitizedEmail = email.trim().toLowerCase();

    // ── 1. Comprobar si ya está verificado ──────────────────────────────────
    const { data: existing } = await supabaseAdmin
      .from("newsletter_subscribers")
      .select("verified")
      .eq("email", sanitizedEmail)
      .maybeSingle();

    if (existing?.verified) {
      return NextResponse.json({ ok: true, alreadyVerified: true });
    }

    // ── 2. Generar token y guardar suscriptor (sin verificar) ───────────────
    const token = crypto.randomUUID();
    const tokenExpiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();

    const { error: dbError } = await supabaseAdmin
      .from("newsletter_subscribers")
      .upsert(
        {
          email: sanitizedEmail,
          contexto: contexto ?? "blog",
          verification_token: token,
          token_expires_at: tokenExpiresAt,
          verified: false,
        },
        { onConflict: "email" }
      );

    if (dbError) {
      console.error("[newsletter] Supabase error:", dbError.message);
      return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }

    // ── 3. Enviar email de verificación via Resend ──────────────────────────
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const verifyUrl = `${SITE_URL}/api/newsletter/verify?token=${token}`;

      const { error: emailError } = await resend.emails.send({
        from: FROM_EMAIL,
        to: sanitizedEmail,
        subject: "Confirma tu suscripción — Entiende Tu Sueño",
        html: verificationEmailHtml(verifyUrl),
      });

      if (emailError) {
        console.error("[newsletter] Resend error:", emailError);
      }
    } else {
      console.warn("[newsletter] RESEND_API_KEY no configurado — email de verificación no enviado");
    }

    // ── 4. Make webhook (opcional) ─────────────────────────────────────────
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

function verificationEmailHtml(verifyUrl: string) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0eff5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:480px;margin:40px auto;background:#1a1a2e;border-radius:16px;overflow:hidden;">
    <div style="padding:40px 36px;">
      <div style="font-size:40px;margin-bottom:20px;">🌙</div>
      <h1 style="color:#e8e6f0;font-size:22px;font-weight:700;margin:0 0 12px;">
        Un paso más para confirmar
      </h1>
      <p style="color:#8b87a0;font-size:15px;line-height:1.7;margin:0 0 32px;">
        Haz clic en el botón para confirmar tu suscripción y empezar a recibir interpretaciones de sueños cada semana. Sin spam, solo contenido.
      </p>
      <a href="${verifyUrl}"
         style="display:inline-block;background:#7c6af7;color:#ffffff;padding:14px 32px;border-radius:999px;text-decoration:none;font-weight:600;font-size:15px;">
        Confirmar suscripción →
      </a>
      <p style="color:#4a4760;font-size:12px;margin-top:36px;line-height:1.6;">
        Si no te has suscrito, ignora este correo.<br>
        Este enlace es válido durante 72 horas.
      </p>
    </div>
    <div style="background:#12121e;padding:16px 36px;text-align:center;">
      <p style="color:#4a4760;font-size:11px;margin:0;">
        © Entiende Tu Sueño — <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://entiendeTuSueno.com"}" style="color:#7c6af7;text-decoration:none;">entiendeTuSueno.com</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}
