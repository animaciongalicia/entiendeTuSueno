import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/newsletter
 *
 * Recibe { email, contexto } y añade el suscriptor al proveedor configurado.
 *
 * Para activar, elige un proveedor y descomenta el bloque correspondiente:
 *
 *   A) ConvertKit / Kit  → CONVERTKIT_API_KEY + CONVERTKIT_FORM_ID en .env
 *   B) Mailchimp         → MAILCHIMP_API_KEY + MAILCHIMP_LIST_ID + MAILCHIMP_DC en .env
 *   C) Resend Audiences  → RESEND_API_KEY + RESEND_AUDIENCE_ID en .env
 *
 * Mientras no esté configurado, el endpoint devuelve 200 y registra en consola.
 */
export async function POST(req: NextRequest) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { email, contexto } = await req.json();

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sanitizedEmail = email.trim().toLowerCase();

    // ── A) ConvertKit / Kit ──────────────────────────────────────────────────
    // if (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID) {
    //   await fetch(
    //     `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         api_key: process.env.CONVERTKIT_API_KEY,
    //         email: sanitizedEmail,
    //         tags: contexto ? [contexto] : [],
    //       }),
    //     }
    //   );
    //   return NextResponse.json({ ok: true });
    // }

    // ── B) Mailchimp ─────────────────────────────────────────────────────────
    // if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
    //   const dc = process.env.MAILCHIMP_DC ?? "us1";
    //   await fetch(
    //     `https://${dc}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
    //     {
    //       method: "POST",
    //       headers: {
    //         Authorization: `Basic ${Buffer.from(`anystring:${process.env.MAILCHIMP_API_KEY}`).toString("base64")}`,
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ email_address: sanitizedEmail, status: "subscribed" }),
    //     }
    //   );
    //   return NextResponse.json({ ok: true });
    // }

    // ── C) Resend Audiences ──────────────────────────────────────────────────
    // if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) {
    //   await fetch(
    //     `https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`,
    //     {
    //       method: "POST",
    //       headers: {
    //         Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ email: sanitizedEmail }),
    //     }
    //   );
    //   return NextResponse.json({ ok: true });
    // }

    // Proveedor no configurado — respuesta OK (configurar proveedor en .env)
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
