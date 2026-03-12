import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
import { articles, getAllCategories } from "@/lib/articles";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Todos los artículos",
  description:
    "Explora nuestra colección completa de interpretaciones de sueños. Artículos detallados en español sobre el significado de los sueños más comunes.",
  alternates: { canonical: "https://entiendetusueno.com/blog" },
};

export default function BlogPage() {
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#f0eeff] mb-3">
          Todos los artículos
        </h1>
        <p className="text-[#8b87a0] max-w-xl">
          Interpretaciones detalladas de los sueños más comunes. Encuentra el tuyo y descubre
          lo que tu inconsciente intenta decirte.
        </p>
      </div>

      {/* AdSense */}
      <AdSlot slot="header-below" className="mb-8" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Articles grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          {/* Categories */}
          <div className="rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-5 mb-6">
            <h2 className="text-sm font-semibold text-[#e8e6f0] mb-4 uppercase tracking-wider">
              Categorías
            </h2>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categoria/${cat.slug}`}
                    className="flex items-center justify-between text-sm text-[#8b87a0] hover:text-[#7c6af7] transition-colors"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs bg-[#2a2a4a] px-2 py-0.5 rounded-full">{cat.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AdSense sidebar */}
          <AdSlot slot="sidebar" />
        </aside>
      </div>
    </div>
  );
}
