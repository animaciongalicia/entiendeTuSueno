import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/newsletter
 *
 * Recibe { email, contexto } y:
 *  1. Reenvía al webhook de Make (MAKE_NEWSLETTER_WEBHOOK_URL en .env)
 *     Make se encarga de añadir el contacto a tu lista de email.
 *
 *  2. Opcionalmente también a ConvertKit / Mailchimp / Resend (descomentar bloque).
 *
 * Variables de entorno:
 *   MAKE_NEWSLETTER_WEBHOOK_URL  — webhook de Make para captura de suscriptores
 */
export async function POST(req: NextRequest) {
  try {
    const { email, contexto } = await req.json();

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const sanitizedEmail = email.trim().toLowerCase();

    // ── Make webhook ─────────────────────────────────────────────────────────
    // Configura MAKE_NEWSLETTER_WEBHOOK_URL en Vercel / .env para activar esto.
    // Make recibe { email, contexto, fecha } y puede añadirlo a Mailchimp,
    // ConvertKit, Google Sheets, Brevo, etc.
    if (process.env.MAKE_NEWSLETTER_WEBHOOK_URL) {
      try {
        await fetch(process.env.MAKE_NEWSLETTER_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: sanitizedEmail,
            contexto: contexto ?? "blog",
            fecha: new Date().toISOString(),
          }),
        });
      } catch (webhookErr) {
        // No bloquear la respuesta al usuario si Make falla
        console.error("[newsletter] Make webhook error:", webhookErr);
      }
    }

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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}


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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
