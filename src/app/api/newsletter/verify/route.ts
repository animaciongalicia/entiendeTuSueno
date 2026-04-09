import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://entiendeTuSueno.com";

/**
 * GET /api/newsletter/verify?token=XXX
 *
 * Confirma la suscripción al newsletter.
 * Devuelve una página HTML de confirmación (no redirect, para evitar problemas con email clients).
 */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return htmlResponse(errorPage("El enlace no es válido."), 400);
  }

  // Buscar el suscriptor por token y comprobar que no haya expirado
  const { data: subscriber } = await supabaseAdmin
    .from("newsletter_subscribers")
    .select("email, token_expires_at")
    .eq("verification_token", token)
    .maybeSingle();

  if (!subscriber) {
    return htmlResponse(
      errorPage("Este enlace ya fue usado o ha expirado."),
      400
    );
  }

  if (
    !subscriber.token_expires_at ||
    new Date(subscriber.token_expires_at) < new Date()
  ) {
    return htmlResponse(
      errorPage("Este enlace ha expirado. Vuelve a suscribirte para recibir uno nuevo."),
      400
    );
  }

  const { data, error } = await supabaseAdmin
    .from("newsletter_subscribers")
    .update({
      verified: true,
      verified_at: new Date().toISOString(),
      verification_token: null,
      token_expires_at: null,
    })
    .eq("verification_token", token)
    .select("email")
    .single();

  if (error || !data) {
    return htmlResponse(
      errorPage("Este enlace ya fue usado o ha expirado."),
      400
    );
  }

  return htmlResponse(successPage(SITE_URL), 200);
}

function htmlResponse(body: string, status: number) {
  return new NextResponse(body, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function successPage(siteUrl: string) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>¡Suscripción confirmada! — Entiende Tu Sueño</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#0d0d1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
         min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
    .card{background:#1a1a2e;border-radius:16px;padding:48px 40px;max-width:440px;width:100%;text-align:center}
    .emoji{font-size:56px;margin-bottom:20px}
    h1{color:#e8e6f0;font-size:24px;font-weight:700;margin-bottom:12px}
    p{color:#8b87a0;font-size:15px;line-height:1.7;margin-bottom:32px}
    a{display:inline-block;background:#7c6af7;color:#fff;padding:13px 30px;border-radius:999px;
      text-decoration:none;font-weight:600;font-size:15px;transition:background .2s}
    a:hover{background:#9580ff}
  </style>
</head>
<body>
  <div class="card">
    <div class="emoji">🌙</div>
    <h1>¡Ya estás dentro!</h1>
    <p>Cada semana recibirás interpretaciones de sueños directamente en tu bandeja de entrada. Sin spam, solo contenido.</p>
    <a href="${siteUrl}">Ir al blog →</a>
  </div>
</body>
</html>`;
}

function errorPage(msg: string) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Enlace inválido — Entiende Tu Sueño</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#0d0d1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
         min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
    .card{background:#1a1a2e;border-radius:16px;padding:48px 40px;max-width:440px;width:100%;text-align:center}
    .emoji{font-size:56px;margin-bottom:20px}
    h1{color:#e8e6f0;font-size:24px;font-weight:700;margin-bottom:12px}
    p{color:#8b87a0;font-size:15px;line-height:1.7;margin-bottom:32px}
    a{display:inline-block;background:#7c6af7;color:#fff;padding:13px 30px;border-radius:999px;
      text-decoration:none;font-weight:600;font-size:15px}
  </style>
</head>
<body>
  <div class="card">
    <div class="emoji">❌</div>
    <h1>Enlace inválido</h1>
    <p>${msg}</p>
    <a href="/">Volver al blog →</a>
  </div>
</body>
</html>`;
}
