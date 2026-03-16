import ArticleCard from "@/components/ArticleCard";
import ArticleSidebar from "@/components/ArticleSidebar";
import AdSlot from "@/components/AdSlot";
import { articles } from "@/lib/articles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Todos los artículos",
  description:
    "Explora nuestra colección completa de interpretaciones de sueños. Artículos detallados en español sobre el significado de los sueños más comunes.",
  alternates: { canonical: "https://entiendetusueno.com/blog" },
};

export default function BlogPage() {
  const [featured, ...rest] = articles;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#f0eeff] mb-2">
          Interpretaciones de sueños
        </h1>
        <p className="text-[#8b87a0] max-w-xl">
          {articles.length} artículos sobre los sueños más comunes. Psicología, simbolismo y utilidad real.
        </p>
      </div>

      <AdSlot slot="header-below" className="mb-8" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {featured && (
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#4a4760] mb-4">
                Artículo destacado
              </p>
              <ArticleCard article={featured} featured />
            </div>
          )}

          <p className="text-xs font-semibold uppercase tracking-widest text-[#4a4760] mb-4">
            Todos los artículos
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>

        {/* Sidebar — misma que artículos y categorías */}
        <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
          <ArticleSidebar
            relatedArticles={[]}
            categorySlug=""
            categoryName=""
            currentSlug=""
          />
        </aside>
      </div>
    </div>
  );
}
