"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_CATEGORIES } from "@/lib/navCategories";
import type { Article } from "@/lib/articles";

interface ArticleIndexProps {
  articles: Article[];
  currentSlug?: string;
}

export default function ArticleIndex({ articles, currentSlug }: ArticleIndexProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  // Group articles by category
  const byCategory = NAV_CATEGORIES.map((cat) => ({
    ...cat,
    items: articles.filter((a) => a.categorySlug === cat.slug),
  })).filter((cat) => cat.items.length > 0);

  // Auto-open the category of the current article
  const currentCat = articles.find((a) => a.slug === currentSlug)?.categorySlug ?? null;

  const effectiveOpen = openCategory !== null ? openCategory : currentCat;

  return (
    <div className="rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-4">
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#4a4760] mb-3">
        Índice de artículos
      </h3>
      <div className="flex flex-col gap-0.5">
        {byCategory.map((cat) => {
          const isOpen = effectiveOpen === cat.slug;
          return (
            <div key={cat.slug}>
              <button
                onClick={() => setOpenCategory(isOpen ? null : cat.slug)}
                className="w-full flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-colors text-[#8b87a0] hover:bg-[#12121e] hover:text-[#c0b8f0]"
              >
                <span className="flex items-center gap-1.5 text-left">
                  <span>{cat.emoji}</span>
                  <span className="leading-snug">{cat.name}</span>
                </span>
                <span className="text-[#4a4760] shrink-0">
                  {isOpen ? "▴" : "▾"} {cat.items.length}
                </span>
              </button>

              {isOpen && (
                <ul className="ml-2 mt-0.5 mb-1 border-l border-[#2a2a4a] pl-2 flex flex-col gap-0.5">
                  {cat.items.map((article) => {
                    const isCurrent = article.slug === currentSlug;
                    return (
                      <li key={article.slug}>
                        <Link
                          href={`/blog/${article.slug}`}
                          className={`block rounded px-2 py-1 text-[11px] leading-snug transition-colors ${
                            isCurrent
                              ? "text-[#9580ff] font-semibold bg-[#7c6af7]/10"
                              : "text-[#6b6880] hover:text-[#c0b8f0] hover:bg-[#12121e]"
                          }`}
                        >
                          {isCurrent && <span className="mr-1 text-[#7c6af7]">›</span>}
                          {article.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
