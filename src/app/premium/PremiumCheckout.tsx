"use client";

import { useState } from "react";

export default function PremiumCheckout({ reportId }: { reportId: string | null }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    if (!reportId) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data.error ?? "Error al crear la sesión de pago.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
      setLoading(false);
    }
  }

  if (!reportId) {
    return (
      <div>
        <p className="text-sm text-[#8b87a0] mb-6 max-w-xs mx-auto leading-relaxed">
          Para obtener tu informe completo, primero interpreta tu sueño y luego
          desbloquea el análisis desde el resultado.
        </p>
        <a
          href="/interpretador"
          className="inline-block rounded-full bg-[#7c6af7] px-8 py-3 text-sm font-semibold text-white hover:bg-[#9580ff] transition-colors shadow-lg shadow-[#7c6af7]/20"
        >
          Ir al interpretador →
        </a>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <p className="text-sm text-red-400 mb-4">{error}</p>
      )}
      <div className="mb-4">
        <span className="text-4xl font-bold text-[#f0eeff]">4,99 €</span>
        <span className="text-sm text-[#4a4760] ml-2">pago único</span>
      </div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full max-w-xs rounded-full bg-[#7c6af7] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#9580ff] transition-colors shadow-lg shadow-[#7c6af7]/20 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Redirigiendo..." : "Obtener mi informe completo →"}
      </button>
      <p className="text-[10px] text-[#4a4760] mt-3">
        Pago seguro con Stripe · Acceso inmediato
      </p>
    </div>
  );
}
