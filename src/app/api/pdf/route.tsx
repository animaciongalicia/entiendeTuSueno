import React from "react";
import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { InformePDF } from "@/lib/pdf/InformePDF";

// PDF generation requires Node.js runtime (not edge)
export const runtime = "nodejs";

/**
 * GET /api/pdf?session_id=xxx
 *
 * Genera y descarga el informe completo en PDF.
 * Verifica que el pago esté completado antes de servir el archivo.
 */
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "session_id requerido" }, { status: 400 });
  }

  try {
    // 1. Verify payment via Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Pago no completado" }, { status: 403 });
    }

    const reportId = session.metadata?.reportId;
    if (!reportId) {
      return NextResponse.json({ error: "Informe no encontrado" }, { status: 404 });
    }

    // 2. Fetch report from Supabase and verify ownership
    const { data: report } = await supabaseAdmin
      .from("dream_reports")
      .select("premium_result, created_at, paid, stripe_session_id")
      .eq("id", reportId)
      .single();

    if (!report?.premium_result) {
      return NextResponse.json({ error: "Contenido no disponible" }, { status: 404 });
    }

    // Verify the session_id matches the one stored for this report
    if (!report.paid || report.stripe_session_id !== sessionId) {
      return NextResponse.json({ error: "Acceso no autorizado" }, { status: 403 });
    }

    // 3. Generate PDF
    const pdfBuffer = await renderToBuffer(
      <InformePDF
        content={report.premium_result}
        date={report.created_at}
      />
    );

    // 4. Return as file download (no print dialog)
    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="informe-de-sueno.pdf"',
        "Cache-Control": "private, no-cache",
      },
    });
  } catch (err) {
    console.error("[pdf] error:", err);
    return NextResponse.json({ error: "Error al generar el PDF" }, { status: 500 });
  }
}
