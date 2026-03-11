"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#2a2a4a] bg-[#09090f]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl select-none" aria-hidden="true">🌙</span>
            <div>
              <span className="text-lg font-semibold text-[#e8e6f0] group-hover:text-[#9580ff] transition-colors">
                entiende
              </span>
              <span className="text-lg font-semibold text-[#7c6af7]">tu</span>
              <span className="text-lg font-semibold text-[#e8e6f0] group-hover:text-[#9580ff] transition-colors">
                sueño
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/blog"
              className="text-sm text-[#8b87a0] hover:text-[#e8e6f0] transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/interpretador"
              className="text-sm text-[#8b87a0] hover:text-[#e8e6f0] transition-colors"
            >
              Interpretador
            </Link>
            <Link
              href="/sobre-nosotros"
              className="text-sm text-[#8b87a0] hover:text-[#e8e6f0] transition-colors"
            >
              Sobre nosotros
            </Link>
            <Link
              href="/interpretador"
              className="rounded-full bg-[#7c6af7] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#9580ff] transition-colors"
            >
              Interpretar sueño
            </Link>
          </nav>

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
          <nav className="md:hidden border-t border-[#2a2a4a] py-4 flex flex-col gap-4">
            <Link
              href="/blog"
              className="text-sm text-[#8b87a0] hover:text-[#e8e6f0] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/interpretador"
              className="text-sm text-[#8b87a0] hover:text-[#e8e6f0] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Interpretador
            </Link>
            <Link
              href="/sobre-nosotros"
              className="text-sm text-[#8b87a0] hover:text-[#e8e6f0] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Sobre nosotros
            </Link>
            <Link
              href="/interpretador"
              className="inline-block w-fit rounded-full bg-[#7c6af7] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#9580ff] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Interpretar sueño
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
