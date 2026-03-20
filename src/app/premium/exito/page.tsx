import type { Metadata } from "next";
import Link from "next/link";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";
import PrintButton from "./PrintButton";

export const metadata: Metadata = {
  title: "Informe Completo — EntiendetuSueño",
  robots: { index: false, follow: false },
};

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-[#e8e6f0] font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i} className="text-[#c0b8f0] italic">{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

function renderBlock(block: string, i: number) {
  if (block.startsWith("### ")) {
    return (
      <h4 key={i} className="text-sm font-semibold text-[#c8c4f0] mt-2 mb-1">
        {block.slice(4)}
      </h4>
    );
  }

  if (block.startsWith("> ")) {
    const content = block.slice(2).replace(/\n> /g, "\n").replace(/\n/g, " ");
    return (
      <blockquote key={i} className="pl-4 border-l-2 border-[#7c6af7] bg-[#1a1730] rounded-r-lg py-3 pr-4">
        <p className="text-sm text-[#c0b8f0] leading-relaxed italic">
          {renderInline(content)}
        </p>
      </blockquote>
    );
  }

  const lines = block.split("\n");
  return (
    <p key={i} className="text-sm text-[#8b87a0] leading-relaxed">
      {lines.map((line, j) => (
        <span key={j}>
          {renderInline(line)}
          {j < lines.length - 1 && <br />}
        </span>
      ))}
    </p>
  );
}

function renderMarkdown(text: string) {
  const rawBlocks = text
    .split(/\n/)
    .reduce<string[]>((acc, line) => {
      if (line.trim() === "") {
        acc.push("");
      } else {
        const last = acc[acc.length - 1];
        if (last === "" || last === undefined) {
          acc.push(line);
        } else {
          acc[acc.length - 1] = last + "\n" + line;
        }
      }
      return acc;
    }, [])
    .filter((b) => b.trim() !== "");

  type Section = { heading: string | null; blocks: string[]; isDivider?: boolean };
  const sections: Section[] = [];
  let current: Section = { heading: null, blocks: [] };

  for (const block of rawBlocks) {
    if (block.trim() === "---") {
      if (current.heading !== null || current.blocks.length > 0) sections.push(current);
      sections.push({ heading: null, blocks: [], isDivider: true });
      current = { heading: null, blocks: [] };
    } else if (block.startsWith("## ")) {
      if (current.heading !== null || current.blocks.length > 0) sections.push(current);
      current = { heading: block.slice(3), blocks: [] };
    } else {
      current.blocks.push(block);
    }
  }
  if (current.heading !== null || current.blocks.length > 0) sections.push(current);

  let contentIdx = 0;
  return sections.map((section, i) => {
    if (section.isDivider) {
      return (
        <div key={i} className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-[#2a2a4a]" />
          <div className="text-[#3a3a6a] text-xs">✦</div>
          <div className="flex-1 h-px bg-[#2a2a4a]" />
        </div>
      );
    }

    const isAlt = contentIdx % 2 === 1;
    contentIdx++;

    return (
      <div
        key={i}
        className={`rounded-xl px-5 py-5 ${isAlt ? "bg-[#1a1a2e]" : "bg-[#14142200]"}`}
      >
        {section.heading && (
          <h3 className="text-[13px] font-bold text-[#e8e6f0] mb-4 tracking-widest uppercase">
            {section.heading}
          </h3>
        )}
        <div className="space-y-3">
          {section.blocks.map((block, j) => renderBlock(block, j))}
        </div>
      </div>
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
        <div className="px-6 py-8">
          {premiumResult ? (
            <div className="space-y-2">{renderMarkdown(premiumResult)}</div>
          ) : (
            <p className="text-sm text-[#4a4760] italic text-center">
              El contenido no está disponible. Contacta con nosotros.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-[#2a2a4a] text-center print:hidden">
          <p className="text-xs text-[#4a4760] mb-4 leading-relaxed">
            Este análisis es orientativo y no sustituye el trabajo con un profesional de salud mental.
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link
              href="/interpretador"
              className="text-xs text-[#7c6af7] hover:text-[#9580ff] transition-colors"
            >
              Interpretar otro sueño →
            </Link>
            <PrintButton />
          </div>
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
