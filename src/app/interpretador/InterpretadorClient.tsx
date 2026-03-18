"use client";

import { useState, useRef } from "react";

type Status = "idle" | "loading" | "streaming" | "done" | "error";

const EXAMPLES = [
  "Soñé que estaba en mi casa de la infancia pero las habitaciones eran distintas. Me sentía perdido dentro.",
  "Iba en coche y de repente no podía frenar. El coche aceleraba solo y yo no tenía control.",
  "Mi ex aparecía y nos comportábamos como si nada hubiera pasado. Cuando desperté me quedé confuso.",
  "Estaba intentando correr pero no podía moverme. Algo me perseguía y yo no avanzaba.",
];

export default function InterpretadorClient() {
  const [dream, setDream] = useState("");
  const [contexto, setContexto] = useState("");
  const [showContexto, setShowContexto] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const responseRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!dream.trim() || dream.trim().length < 10) return;

    setStatus("loading");
    setResponse("");
    setError("");

    try {
      const res = await fetch("/api/interpretar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dream: dream.trim(), contexto: contexto.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Error en el servidor");
      }

      setStatus("streaming");
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No se pudo leer la respuesta");

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setResponse(accumulated);
        // Auto-scroll to response
        setTimeout(() => {
          responseRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 50);
      }

      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo salió mal. Inténtalo de nuevo.");
      setStatus("error");
    }
  }

  function handleReset() {
    setStatus("idle");
    setResponse("");
    setError("");
    setDream("");
    setContexto("");
    setShowContexto(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const isSubmitting = status === "loading" || status === "streaming";
  const canSubmit = dream.trim().length >= 10 && !isSubmitting;

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">🪞</div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#f0eeff] mb-3">
          Entender mi sueño
        </h1>
        <p className="text-[#8b87a0] max-w-md mx-auto leading-relaxed text-base">
          No te decimos &ldquo;qué significa&rdquo;. Te ayudamos a entender qué está
          procesando tu mente y cómo conecta con lo que estás viviendo.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="rounded-2xl border border-[#2a2a4a] bg-[#1a1a2e] p-6">
          <label htmlFor="dream-input" className="block text-sm font-medium text-[#e8e6f0] mb-2">
            Describe tu sueño
          </label>
          <p className="text-xs text-[#4a4760] mb-3 leading-relaxed">
            Cuanto más detalle des —emociones, sensaciones, personas, lugares— mejor podremos conectarlo con tu vida real.
          </p>
          <textarea
            id="dream-input"
            rows={7}
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            placeholder="Anoche soñé que estaba en un lugar desconocido y de repente..."
            disabled={isSubmitting}
            className="w-full rounded-xl border border-[#2a2a4a] bg-[#12121e] px-4 py-3 text-[#e8e6f0] placeholder-[#3a3850] text-sm leading-relaxed resize-none focus:outline-none focus:border-[#7c6af7] transition-colors disabled:opacity-60"
          />
          <div className="flex items-center justify-between mt-2">
            <span className={`text-xs ${dream.length < 10 && dream.length > 0 ? "text-amber-500" : "text-[#4a4760]"}`}>
              {dream.length < 10 && dream.length > 0
                ? "Describe un poco más..."
                : dream.length > 0 ? `${dream.length} caracteres` : ""}
            </span>
          </div>
        </div>

        {/* Contexto opcional */}
        <div>
          {!showContexto ? (
            <button
              type="button"
              onClick={() => setShowContexto(true)}
              className="text-xs text-[#6b6880] hover:text-[#7c6af7] transition-colors"
            >
              + ¿Quieres añadir contexto de tu vida? (opcional pero útil)
            </button>
          ) : (
            <div className="rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-4">
              <label htmlFor="context-input" className="block text-xs font-medium text-[#8b87a0] mb-2">
                Contexto de tu vida ahora (opcional)
              </label>
              <textarea
                id="context-input"
                rows={3}
                value={contexto}
                onChange={(e) => setContexto(e.target.value)}
                placeholder="Ej: estoy en un momento de cambio de trabajo, o tengo una decisión importante pendiente..."
                disabled={isSubmitting}
                className="w-full rounded-lg border border-[#2a2a4a] bg-[#12121e] px-3 py-2 text-sm text-[#e8e6f0] placeholder-[#3a3850] resize-none focus:outline-none focus:border-[#7c6af7] transition-colors disabled:opacity-60"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full rounded-full bg-[#7c6af7] px-6 py-3.5 text-base font-semibold text-white hover:bg-[#9580ff] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#7c6af7]/20"
        >
          {status === "loading" ? "Analizando..." : status === "streaming" ? "Escribiendo..." : "Entender mi sueño"}
        </button>
      </form>

      {/* Ejemplos */}
      {status === "idle" && !dream && (
        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#4a4760] mb-3">
            Ejemplos de sueños comunes
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setDream(ex)}
                className="text-left text-xs text-[#6b6880] border border-[#2a2a4a] rounded-lg px-3 py-2.5 hover:border-[#7c6af7]/40 hover:text-[#8b87a0] transition-colors leading-relaxed"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Respuesta */}
      {(status === "streaming" || status === "done" || status === "error") && (
        <div ref={responseRef} className="mt-8">
          {error ? (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-400">
              {error}
              <button onClick={handleReset} className="block mt-3 text-xs text-[#7c6af7] hover:underline">
                Intentar de nuevo
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#7c6af7]/20 bg-[#1a1a2e] p-7">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-sm font-semibold text-[#7c6af7]">Análisis de tu sueño</span>
                {status === "streaming" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7c6af7] animate-pulse" />
                )}
              </div>

              <div className="text-[#c0b8f0] leading-[1.85] text-base whitespace-pre-wrap">
                {response}
                {status === "streaming" && (
                  <span className="inline-block w-0.5 h-4 bg-[#7c6af7] animate-pulse ml-0.5 -mb-0.5" />
                )}
              </div>

              {status === "done" && (
                <div className="mt-7 pt-5 border-t border-[#2a2a4a] flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <p className="text-xs text-[#4a4760] leading-relaxed flex-1">
                    Este análisis es orientativo y no sustituye el trabajo con un profesional de salud mental.
                  </p>
                  <button
                    onClick={handleReset}
                    className="shrink-0 rounded-full border border-[#2a2a4a] px-4 py-1.5 text-xs text-[#8b87a0] hover:border-[#7c6af7] hover:text-[#e8e6f0] transition-colors"
                  >
                    Analizar otro sueño
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tips — solo cuando no hay respuesta */}
      {status === "idle" && (
        <div className="mt-12 pt-8 border-t border-[#2a2a4a]">
          <h2 className="text-sm font-semibold text-[#e8e6f0] mb-4">
            Cómo sacar más partido a este análisis
          </h2>
          <ul className="space-y-3">
            {[
              "Describe cómo te sentiste en el sueño, no solo lo que ocurrió. Las emociones son la clave.",
              "Menciona si hay personas conocidas en el sueño y qué rol jugaron.",
              "Añade contexto de tu vida real si quieres un análisis más preciso.",
              "Anota tus sueños nada más despertar, antes de que el día los borre.",
            ].map((tip, i) => (
              <li key={i} className="flex gap-3 text-sm text-[#6b6880]">
                <span className="text-[#7c6af7] font-bold shrink-0">{i + 1}.</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
