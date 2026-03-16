"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#2a2a4a] bg-[#09090f]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <span className="text-xl select-none" aria-hidden="true">🌙</span>
            <div>
              <span className="text-base font-semibold text-[#e8e6f0] group-hover:text-[#9580ff] transition-colors">entiende</span>
              <span className="text-base font-semibold text-[#7c6af7]">tu</span>
              <span className="text-base font-semibold text-[#e8e6f0] group-hover:text-[#9580ff] transition-colors">sueño</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            <Link href="/blog" className="text-sm text-[#8b87a0] hover:text-[#e8e6f0] transition-colors px-3 py-1.5">
              Artículos
            </Link>

            {/* Separador */}
            <span className="text-[#2a2a4a] mx-1">|</span>

            {/* Tags de categorías rápidas */}
            {[
              { label: "🐾 Animales", href: "/categoria/suenos-con-animales" },
              { label: "😰 Ansiedad", href: "/categoria/suenos-con-muerte-y-miedo" },
              { label: "💼 Trabajo", href: "/categoria/suenos-de-dinero-y-trabajo" },
              { label: "🔮 Símbolos", href: "/categoria/simbolos-en-suenos" },
            ].map((tag) => (
              <Link
                key={tag.href}
                href={tag.href}
                className="text-xs text-[#6b6880] hover:text-[#c0b8f0] transition-colors px-2.5 py-1 rounded-full hover:bg-[#1a1a2e]"
              >
                {tag.label}
              </Link>
            ))}
          </nav>

          {/* CTA botón (único) */}
          <Link
            href="/interpretador"
            className="hidden md:inline-block rounded-full bg-[#7c6af7] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#9580ff] transition-colors shrink-0"
          >
            Entender mi sueño →
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#8b87a0] hover:text-[#e8e6f0] transition-colors p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden border-t border-[#2a2a4a] py-4 flex flex-col gap-1">
            <Link
              href="/blog"
              className="text-sm text-[#8b87a0] hover:text-[#e8e6f0] transition-colors py-2 px-1"
              onClick={() => setMenuOpen(false)}
            >
              Artículos
            </Link>

            {/* Categorías en mobile */}
            <p className="text-xs text-[#4a4760] uppercase tracking-widest mt-3 mb-1 px-1">Categorías</p>
            {[
              { label: "🐾 Animales", href: "/categoria/suenos-con-animales" },
              { label: "😰 Ansiedad y miedos", href: "/categoria/suenos-con-muerte-y-miedo" },
              { label: "💼 Trabajo y dinero", href: "/categoria/suenos-de-dinero-y-trabajo" },
              { label: "🔮 Símbolos en sueños", href: "/categoria/simbolos-en-suenos" },
              { label: "🫂 Relaciones", href: "/categoria/relaciones" },
              { label: "🧠 Ciencia del sueño", href: "/categoria/ciencia-del-sueno" },
            ].map((tag) => (
              <Link
                key={tag.href}
                href={tag.href}
                className="text-sm text-[#6b6880] hover:text-[#e8e6f0] transition-colors py-1.5 px-1"
                onClick={() => setMenuOpen(false)}
              >
                {tag.label}
              </Link>
            ))}

            <div className="mt-4 pt-3 border-t border-[#2a2a4a]">
              <Link
                href="/interpretador"
                className="inline-block rounded-full bg-[#7c6af7] px-5 py-2 text-sm font-medium text-white hover:bg-[#9580ff] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Entender mi sueño →
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
