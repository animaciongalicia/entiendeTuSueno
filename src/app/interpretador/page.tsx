import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Interpretador de Sueños",
  description:
    "Describe tu sueño y descubre su significado con nuestro interpretador de sueños en español. Análisis personalizado basado en psicología y simbolismo onírico.",
};

export default function InterpretadorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">✨</div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#f0eeff] mb-4">
          Interpretador de Sueños
        </h1>
        <p className="text-[#8b87a0] max-w-md mx-auto leading-relaxed">
          Describe tu sueño con el mayor detalle posible y te ayudaremos a descubrir
          qué mensaje lleva tu inconsciente.
        </p>
      </div>

      {/* AdSense */}
      <AdSlot slot="header-below" className="mb-10" />

      {/* Placeholder form */}
      <div className="rounded-2xl border border-[#2a2a4a] bg-[#1a1a2e] p-8">
        <div className="mb-6">
          <label
            htmlFor="dream-input"
            className="block text-sm font-medium text-[#e8e6f0] mb-2"
          >
            Describe tu sueño
          </label>
          <textarea
            id="dream-input"
            rows={8}
            placeholder="Anoche soñé que estaba en un lugar desconocido y de repente aparecieron..."
            className="w-full rounded-xl border border-[#2a2a4a] bg-[#12121e] px-4 py-3 text-[#e8e6f0] placeholder-[#4a4760] text-sm leading-relaxed resize-none focus:outline-none focus:border-[#7c6af7] transition-colors"
            disabled
          />
        </div>

        <div className="rounded-xl border border-dashed border-[#2a2a4a] bg-[#12121e] p-6 text-center">
          <div className="text-3xl mb-3">🚀</div>
          <h2 className="text-base font-semibold text-[#e8e6f0] mb-2">
            Próximamente
          </h2>
          <p className="text-sm text-[#8b87a0] leading-relaxed">
            El interpretador de sueños con IA está en desarrollo. Muy pronto podrás
            describir tu sueño y recibir un análisis personalizado y detallado.
          </p>
        </div>

        <button
          disabled
          className="mt-6 w-full rounded-full bg-[#7c6af7]/50 px-6 py-3 text-sm font-medium text-white/50 cursor-not-allowed"
        >
          Interpretar mi sueño
        </button>
      </div>

      {/* Tips */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-[#e8e6f0] mb-4">
          Consejos para recordar tus sueños
        </h2>
        <ul className="space-y-3">
          {[
            "Mantén un diario de sueños junto a tu cama y anota lo que recuerdes nada más despertar.",
            "No te muevas bruscamente al despertar. Quédate quieto unos segundos e intenta recordar.",
            "Pon una alarma 30 minutos antes de tu hora habitual: a veces nos despertamos en medio de un sueño.",
            "Evita el teléfono durante los primeros minutos del día. La pantalla dispersa los recuerdos oníricos.",
            "Escribe en presente: «Estoy en una casa» en lugar de «Estaba en una casa». Ayuda a la memoria.",
          ].map((tip, i) => (
            <li key={i} className="flex gap-3 text-sm text-[#8b87a0]">
              <span className="text-[#7c6af7] font-bold shrink-0">{i + 1}.</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
