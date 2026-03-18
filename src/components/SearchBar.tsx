"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Article } from "@/lib/articles";

interface SearchBarProps {
  articles: Article[];
  placeholder?: string;
  className?: string;
  /** variant "hero" = grande y centrado; "nav" = compacto para header */
  variant?: "hero" | "nav";
}

export default function SearchBar({
  articles,
  placeholder = '¿Soñaste con algo? Escríbelo aquí...',
  className = "",
  variant = "hero",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = query.trim().length < 2
    ? []
    : articles
        .filter((a) => {
          const q = query.toLowerCase();
          return (
            a.title.toLowerCase().includes(q) ||
            a.excerpt.toLowerCase().includes(q) ||
            a.tags.some((t) => t.toLowerCase().includes(q))
          );
        })
        .slice(0, 6);

  // Cerrar al hacer click fuera
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocused((f) => Math.min(f + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocused((f) => Math.max(f - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[focused]) {
        navigate(results[focused].slug);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  function navigate(slug: string) {
    setQuery("");
    setOpen(false);
    router.push(`/blog/${slug}`);
  }

  const isHero = variant === "hero";

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className={`relative flex items-center ${isHero ? "rounded-2xl" : "rounded-xl"} border ${open && results.length > 0 ? "border-[#7c6af7]" : "border-[#2a2a4a] hover:border-[#7c6af7]/50"} bg-[#1a1a2e] transition-colors`}>
        {/* Icono lupa */}
        <svg
          className={`shrink-0 text-[#4a4760] ${isHero ? "w-5 h-5 ml-4" : "w-4 h-4 ml-3"}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls="search-results"
          aria-autocomplete="list"
          aria-label="Buscar interpretaciones de sueños"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setFocused(0); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          className={`w-full bg-transparent text-[#e8e6f0] placeholder-[#4a4760] outline-none ${isHero ? "px-4 py-4 text-base" : "px-3 py-2.5 text-sm"}`}
          autoComplete="off"
          spellCheck={false}
        />

        {/* Botón limpiar */}
        {query && (
          <button
            onClick={() => { setQuery(""); setOpen(false); inputRef.current?.focus(); }}
            className="mr-3 text-[#4a4760] hover:text-[#8b87a0] transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown de resultados */}
      {open && results.length > 0 && (
        <ul
          id="search-results"
          role="listbox"
          aria-label="Resultados de búsqueda"
          className="absolute z-50 top-full mt-2 w-full rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] shadow-2xl shadow-black/40 overflow-hidden"
        >
          {results.map((article, i) => (
            <li key={article.slug} role="option" aria-selected={i === focused}>
              <button
                onMouseEnter={() => setFocused(i)}
                onClick={() => navigate(article.slug)}
                className={`w-full text-left flex items-start gap-3 px-4 py-3 transition-colors ${i === focused ? "bg-[#7c6af7]/10" : "hover:bg-[#7c6af7]/5"} ${i > 0 ? "border-t border-[#2a2a4a]" : ""}`}
              >
                <span className="text-xl shrink-0 mt-0.5">🌙</span>
                <span className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-[#e8e6f0] leading-snug line-clamp-1">
                    {article.title}
                  </span>
                  <span className="text-xs text-[#4a4760] mt-0.5">{article.category}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Sin resultados */}
      {open && query.trim().length >= 2 && results.length === 0 && (
        <div className="absolute z-50 top-full mt-2 w-full rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] px-4 py-4 text-sm text-[#4a4760] shadow-2xl shadow-black/40">
          Sin resultados para <span className="text-[#8b87a0]">&ldquo;{query}&rdquo;</span>.{" "}
          Prueba con otra palabra.
        </div>
      )}
    </div>
  );
}
