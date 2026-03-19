import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICE_EUR = 499; // 4,99 €
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://entiendetusueno.com";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { reportId } = body as { reportId?: string };

  if (!reportId || typeof reportId !== "string") {
    return NextResponse.json({ error: "reportId requerido." }, { status: 400 });
  }

  // Verify report exists and is not already paid
  const { data: report, error } = await supabaseAdmin
    .from("dream_reports")
    .select("id, paid, email")
    .eq("id", reportId)
    .single();

  if (error || !report) {
    return NextResponse.json({ error: "Informe no encontrado." }, { status: 404 });
  }

  if (report.paid) {
    return NextResponse.json(
      { error: "Este informe ya ha sido pagado." },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: PRICE_EUR,
            product_data: {
              name: "Informe Completo de tu Sueño",
              description:
                "Análisis de 1.500-2.000 palabras: significado central, símbolos, mensaje del subconsciente, bloqueos emocionales y consejo práctico.",
            },
          },
          quantity: 1,
        },
      ],
      metadata: { reportId },
      customer_email: report.email ?? undefined,
      success_url: `${SITE_URL}/premium/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/premium?id=${reportId}&cancelado=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Error creando sesión de pago.";
    console.error("Stripe error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
