import Link from "next/link";
import type { Article } from "@/lib/articles";
import { articles as allArticles } from "@/lib/articles";
import ArticleIndex from "@/components/ArticleIndex";

interface ArticleSidebarProps {
  relatedArticles: Article[];
  categorySlug: string;
  categoryName: string;
  currentSlug: string;
}

export default function ArticleSidebar({
  relatedArticles,
  categorySlug,
  categoryName,
  currentSlug,
}: ArticleSidebarProps) {
  const related = relatedArticles.filter((a) => a.slug !== currentSlug).slice(0, 6);

  return (
    <div className="sticky top-[72px] space-y-4">

      {/* ── CTA interpretador ─────────────────────────────────────── */}
      <div className="rounded-xl border border-[#7c6af7]/30 bg-gradient-to-b from-[#7c6af7]/8 to-[#1a1a2e] p-4">
        <div className="text-2xl mb-2">🪞</div>
        <h3 className="text-sm font-semibold text-[#e8e6f0] mb-1">
          ¿Quieres entender tu sueño?
        </h3>
        <p className="text-xs text-[#8b87a0] mb-3 leading-relaxed">
          Análisis personalizado en segundos. Gratis.
        </p>
        <Link
          href="/interpretador"
          className="block text-center rounded-full bg-[#7c6af7] px-4 py-2 text-xs font-semibold text-white hover:bg-[#9580ff] transition-colors"
        >
          Interpretar mi sueño →
        </Link>
      </div>

      {/* ── Artículos relacionados ─────────────────────────────────── */}
      {related.length > 0 && (
        <div className="rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#4a4760] mb-3">
            En la misma categoría
          </h3>
          <ul className="space-y-1">
            {related.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="group flex items-start gap-2 rounded-lg px-2 py-2 hover:bg-[#12121e] transition-colors"
                >
                  <span className="text-[#3a3860] mt-[3px] text-xs shrink-0">›</span>
                  <div className="min-w-0">
                    <span className="text-xs text-[#c0b8f0] group-hover:text-[#9580ff] transition-colors leading-snug line-clamp-2 block">
                      {article.title}
                    </span>
                    <span className="text-[10px] text-[#4a4760] mt-0.5 block">
                      {article.readingTime} min lectura
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          {categorySlug && (
            <Link
              href={`/categoria/${categorySlug}`}
              className="mt-2 pt-3 border-t border-[#2a2a4a] flex items-center justify-between text-xs text-[#7c6af7] hover:text-[#9580ff] transition-colors"
            >
              <span>Ver todo en {categoryName}</span>
              <span>→</span>
            </Link>
          )}
        </div>
      )}

      {/* ── Índice completo de artículos ────────────────────────────── */}
      <ArticleIndex articles={allArticles} currentSlug={currentSlug} />

    </div>
  );
}
