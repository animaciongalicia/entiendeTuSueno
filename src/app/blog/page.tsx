import ArticleCard from "@/components/ArticleCard";
import ArticleSidebar from "@/components/ArticleSidebar";
import AdSlot from "@/components/AdSlot";
import { articles } from "@/lib/articles";
import { NAV_CATEGORIES } from "@/lib/navCategories";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Todos los artículos",
  description:
    "Explora nuestra colección completa de interpretaciones de sueños. Artículos detallados en español sobre el significado de los sueños más comunes.",
  alternates: { canonical: "https://entiendetusueno.com/blog" },
};

interface Props {
  searchParams: { categoria?: string };
}

export default function BlogPage({ searchParams }: Props) {
  const activeCategory = searchParams.categoria ?? "";

  const filtered = activeCategory
    ? articles.filter((a) => a.categorySlug === activeCategory)
    : articles;

  const [featured, ...rest] = activeCategory ? filtered : filtered;
  const showFeatured = !activeCategory;
  const displayArticles = showFeatured ? rest : filtered;
  const featuredArticle = showFeatured ? featured : null;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#f0eeff] mb-2">
          Interpretaciones de sueños
        </h1>
        <p className="text-[#8b87a0] max-w-xl">
          {filtered.length} artículos sobre los sueños más comunes. Psicología, simbolismo y utilidad real.
        </p>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/blog"
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            !activeCategory
              ? "bg-[#7c6af7] text-white"
              : "bg-[#1a1a2e] text-[#8b87a0] hover:text-[#c0b8f0] border border-[#2a2a4a]"
          }`}
        >
          Todos ({articles.length})
        </Link>
        {NAV_CATEGORIES.map((cat) => {
          const count = articles.filter((a) => a.categorySlug === cat.slug).length;
          if (count === 0) return null;
          return (
            <Link
              key={cat.slug}
              href={`/blog?categoria=${cat.slug}`}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat.slug
                  ? "bg-[#7c6af7] text-white"
                  : "bg-[#1a1a2e] text-[#8b87a0] hover:text-[#c0b8f0] border border-[#2a2a4a]"
              }`}
            >
              {cat.emoji} {cat.name} ({count})
            </Link>
          );
        })}
      </div>

      <AdSlot slot="header-below" className="mb-8" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {featuredArticle && (
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#4a4760] mb-4">
                Artículo destacado
              </p>
              <ArticleCard article={featuredArticle} featured />
            </div>
          )}

          {displayArticles.length > 0 ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#4a4760] mb-4">
                {activeCategory
                  ? NAV_CATEGORIES.find((c) => c.slug === activeCategory)?.name ?? "Artículos"
                  : "Todos los artículos"}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {displayArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </>
          ) : (
            <p className="text-[#8b87a0]">No hay artículos en esta categoría aún.</p>
          )}
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
          <ArticleSidebar
            relatedArticles={[]}
            categorySlug={activeCategory}
            categoryName={NAV_CATEGORIES.find((c) => c.slug === activeCategory)?.name ?? ""}
            currentSlug=""
          />
        </aside>
      </div>
    </div>
  );
}
