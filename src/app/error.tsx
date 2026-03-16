"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to monitoring service when available (Sentry, etc.)
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <span className="text-6xl mb-6 opacity-40">🌙</span>
      <h1 className="text-2xl font-bold text-[#f0eeff] mb-3">
        Algo ha salido mal
      </h1>
      <p className="text-[#8b87a0] mb-8 max-w-md">
        Ha ocurrido un error inesperado. Puedes intentar recargar la página o volver al inicio.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="rounded-full bg-[#7c6af7] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#9580ff] transition-colors"
        >
          Intentar de nuevo
        </button>
        <Link
          href="/"
          className="rounded-full border border-[#2a2a4a] px-5 py-2.5 text-sm font-medium text-[#8b87a0] hover:text-[#e8e6f0] hover:border-[#7c6af7] transition-colors"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
