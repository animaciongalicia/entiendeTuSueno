"use client";

import { useState } from "react";

interface Props {
  /** Contexto del artículo — aparece en el subtítulo del formulario */
  contexto?: string;
}

export default function EmailCapture({ contexto }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contexto }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="my-10 rounded-xl border border-[#7c6af7]/30 bg-[#7c6af7]/5 px-6 py-5 text-center">
        <div className="text-2xl mb-2">🌙</div>
        <p className="text-sm font-semibold text-[#e8e6f0] mb-1">
          Ya estás dentro
        </p>
        <p className="text-xs text-[#8b87a0]">
          Recibirás nuevas interpretaciones cada semana. Sin spam, solo sueños.
        </p>
      </div>
    );
  }

  return (
    <div className="my-10 rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] px-6 py-5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#e8e6f0] mb-1">
            Nuevas interpretaciones cada semana
          </p>
          <p className="text-xs text-[#6b6880] leading-relaxed">
            {contexto
              ? `Si este artículo te ha resultado útil, recibirás más interpretaciones como esta.`
              : "Sueños recurrentes, símbolos que no entiendes, situaciones que se repiten. Cada semana, un análisis nuevo."}
            {" "}Sin publicidad. Solo contenido.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2 shrink-0">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            className="w-48 rounded-full border border-[#2a2a4a] bg-[#12121e] px-4 py-2 text-sm text-[#e8e6f0] placeholder-[#4a4760] focus:outline-none focus:border-[#7c6af7] transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 rounded-full bg-[#7c6af7] px-4 py-2 text-sm font-medium text-white hover:bg-[#9580ff] transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "..." : "Suscribirme"}
          </button>
        </form>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs text-red-400">
          Algo salió mal. Inténtalo de nuevo.
        </p>
      )}
      <p className="mt-3 text-xs text-[#4a4760]">
        Sin spam. Puedes darte de baja en cualquier momento.
      </p>
    </div>
  );
}
