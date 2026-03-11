import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <div className="text-6xl mb-6">🌙</div>
      <h1 className="text-3xl font-bold text-[#f0eeff] mb-3">Página no encontrada</h1>
      <p className="text-[#8b87a0] mb-8">
        Parece que esta página se ha perdido entre los sueños. Pero no te preocupes,
        podemos ayudarte a encontrar lo que buscas.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="rounded-full bg-[#7c6af7] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#9580ff] transition-colors"
        >
          Ir al inicio
        </Link>
        <Link
          href="/blog"
          className="rounded-full border border-[#2a2a4a] px-6 py-2.5 text-sm font-medium text-[#e8e6f0] hover:border-[#7c6af7] transition-colors"
        >
          Ver artículos
        </Link>
      </div>
    </div>
  );
}
