"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_CATEGORIES } from "@/lib/navCategories";

// 4 categorías que aparecen en desktop (las más buscadas)
const DESKTOP_CATS = NAV_CATEGORIES.filter((c) =>
  ["animales", "ansiedad-y-miedos", "trabajo-y-dinero", "simbolos-en-suenos"].includes(c.slug)
);

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

            <span className="text-[#2a2a4a] mx-1">|</span>

            {DESKTOP_CATS.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                className="text-xs text-[#6b6880] hover:text-[#c0b8f0] transition-colors px-2.5 py-1 rounded-full hover:bg-[#1a1a2e]"
              >
                {cat.emoji} {cat.name}
              </Link>
            ))}
          </nav>

          {/* CTA botón */}
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
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
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

        {/* Mobile menu — todas las categorías */}
        {menuOpen && (
          <nav id="mobile-menu" className="md:hidden border-t border-[#2a2a4a] py-4 flex flex-col gap-1">
            <Link
              href="/blog"
              className="text-sm text-[#8b87a0] hover:text-[#e8e6f0] transition-colors py-2 px-1"
              onClick={() => setMenuOpen(false)}
            >
              Todos los artículos
            </Link>

            <p className="text-xs text-[#4a4760] uppercase tracking-widest mt-3 mb-1 px-1">Categorías</p>
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                className="flex items-center gap-2 text-sm text-[#6b6880] hover:text-[#e8e6f0] transition-colors py-1.5 px-1"
                onClick={() => setMenuOpen(false)}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
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
