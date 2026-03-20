import type { Metadata } from "next";
import Link from "next/link";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Informe Completo — EntiendetuSueño",
  robots: { index: false, follow: false },
};

function renderMarkdown(text: string) {
  return text
    .split(/\n\n+/)
    .filter(Boolean)
    .map((block, i) => {
      if (block.startsWith("## ")) {
        return (
          <h3 key={i} className="text-base font-bold text-[#c0b8f0] mt-6 mb-2 first:mt-0">
            {block.slice(3)}
          </h3>
        );
      }
      const parts = block.split(/\*\*(.+?)\*\*/g);
      return (
        <p key={i} className="text-sm text-[#8b87a0] leading-relaxed mb-3">
          {parts.map((part, j) =>
            j % 2 === 1 ? (
              <strong key={j} className="text-[#e8e6f0] font-semibold">
                {part}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    });
}

export default async function ExitoPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    return <ErrorView message="No se encontró la sesión de pago." />;
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  let premiumResult = "";
  let reportId = "";

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return <ErrorView message="El pago no se ha completado aún. Inténtalo en unos segundos." />;
    }

    reportId = session.metadata?.reportId ?? "";
    if (!reportId) {
      return <ErrorView message="No se encontró el informe asociado." />;
    }

    const { data: report } = await supabaseAdmin
      .from("dream_reports")
      .select("premium_result, paid")
      .eq("id", reportId)
      .single();

    if (!report) {
      return <ErrorView message="Informe no encontrado." />;
    }

    // Mark as paid if webhook hasn't done it yet
    if (!report.paid) {
      await supabaseAdmin
        .from("dream_reports")
        .update({ paid: true, stripe_session_id: sessionId })
        .eq("id", reportId);
    }

    premiumResult = report.premium_result ?? "";
  } catch (err) {
    console.error("Exito page error:", err);
    return <ErrorView message="Error al cargar tu informe. Contacta con nosotros." />;
  }

  return (
    <div className="mx-auto max-w-[750px] px-4 sm:px-6 py-16">
      <div className="rounded-2xl border border-[#2a2a4a] bg-[#12121e] overflow-hidden shadow-2xl shadow-black/40">
        {/* Header */}
        <div className="border-b border-[#2a2a4a] bg-gradient-to-r from-[#7c6af7]/10 to-[#9580ff]/5 px-8 py-8 text-center">
          <div className="text-4xl mb-3">✦</div>
          <h1 className="text-2xl font-bold text-[#f0eeff] mb-2">
            Tu Informe Completo
          </h1>
          <p className="text-sm text-[#8b87a0]">
            Análisis basado en psicología real. Sin predicciones, sin esoterismo.
          </p>
        </div>

        {/* Premium content */}
        <div className="px-8 py-8">
          {premiumResult ? (
            <div className="space-y-1">{renderMarkdown(premiumResult)}</div>
          ) : (
            <p className="text-sm text-[#4a4760] italic text-center">
              El contenido no está disponible. Contacta con nosotros.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-[#2a2a4a] text-center">
          <p className="text-xs text-[#4a4760] mb-4 leading-relaxed">
            Este análisis es orientativo y no sustituye el trabajo con un profesional de salud mental.
          </p>
          <Link
            href="/interpretador"
            className="text-xs text-[#7c6af7] hover:text-[#9580ff] transition-colors"
          >
            Interpretar otro sueño →
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorView({ message }: { message: string }) {
  return (
    <div className="mx-auto max-w-[750px] px-4 sm:px-6 py-16 text-center">
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-10">
        <p className="text-sm text-red-400 mb-6">{message}</p>
        <Link
          href="/interpretador"
          className="text-xs text-[#7c6af7] hover:text-[#9580ff] transition-colors"
        >
          ← Volver al interpretador
        </Link>
      </div>
    </div>
  );
}
