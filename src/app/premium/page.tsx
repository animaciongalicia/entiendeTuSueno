import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/config";
import PremiumCheckout from "./PremiumCheckout";

export const metadata: Metadata = {
  title: "Informe Premium — EntiendetuSueño",
  description:
    "Desbloquea tu análisis completo: significado central, símbolos, mensaje del subconsciente, bloqueos emocionales y consejos prácticos. 1.500-2.000 palabras.",
  alternates: { canonical: `${SITE_URL}/premium` },
  robots: { index: false, follow: false },
};

const INCLUDED = [
  "Significado central del sueño",
  "Análisis símbolo por símbolo",
  "Mensaje de tu subconsciente",
  "Bloqueos emocionales detectados",
  "Patrones que merece la pena observar",
  "Consejo de interpretación práctico",
  "Pregunta de reflexión personalizada",
];

export default function PremiumPage({
  searchParams,
}: {
  searchParams: { id?: string; cancelado?: string };
}) {
  const reportId = searchParams.id ?? null;
  const cancelado = searchParams.cancelado === "1";

  return (
    <div className="mx-auto max-w-[750px] px-4 sm:px-6 py-16">
      {cancelado && (
        <div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/8 p-4 text-sm text-amber-300 text-center">
          El pago fue cancelado. Puedes intentarlo de nuevo cuando quieras.
        </div>
      )}
      <div className="rounded-2xl border border-[#2a2a4a] bg-[#12121e] overflow-hidden shadow-2xl shadow-black/40">
        {/* Header */}
        <div className="border-b border-[#2a2a4a] bg-gradient-to-r from-[#7c6af7]/10 to-[#9580ff]/5 px-8 py-8 text-center">
          <div className="text-4xl mb-3">🔓</div>
          <h1 className="text-2xl font-bold text-[#f0eeff] mb-2">
            Informe Completo de tu Sueño
          </h1>
          <p className="text-sm text-[#8b87a0] max-w-sm mx-auto leading-relaxed">
            Análisis de 1.500-2.000 palabras basado en psicología real.
            Sin predicciones, sin esoterismo.
          </p>
        </div>

        {/* Included */}
        <div className="px-8 py-6 border-b border-[#2a2a4a]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#4a4760] mb-4">
            Incluido en tu informe
          </p>
          <ul className="space-y-2.5">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-[#8b87a0]">
                <span className="w-4 h-4 rounded-full bg-[#7c6af7]/20 flex items-center justify-center shrink-0">
                  <span className="text-[#7c6af7] text-[10px]">✓</span>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="px-8 py-8 text-center">
          <PremiumCheckout reportId={reportId} />
          <div className="mt-6">
            <Link
              href="/interpretador"
              className="text-xs text-[#4a4760] hover:text-[#8b87a0] transition-colors"
            >
              ← Volver al interpretador
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
