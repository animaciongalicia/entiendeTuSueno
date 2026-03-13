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
  const [featured, ...rest] = articles;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#f0eeff] mb-2">
              Interpretaciones de sueños
            </h1>
            <p className="text-[#8b87a0] max-w-xl">
              {articles.length} artículos sobre los sueños más comunes. Psicología, simbolismo y utilidad real.
            </p>
          </div>
        </div>
      </div>

      {/* AdSense */}
      <AdSlot slot="header-below" className="mb-8" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Featured article */}
          {featured && (
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#4a4760] mb-4">
                Artículo destacado
              </p>
              <ArticleCard article={featured} featured />
            </div>
          )}

          {/* Articles grid */}
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#4a4760] mb-4">
              Todos los artículos
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-20 space-y-5">
            {/* Categories */}
            <div className="rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-5">
              <h2 className="text-xs font-semibold text-[#e8e6f0] mb-4 uppercase tracking-wider">
                Categorías
              </h2>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/categoria/${cat.slug}`}
                      className="flex items-center justify-between text-sm text-[#8b87a0] hover:text-[#7c6af7] transition-colors group"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">{cat.name}</span>
                      <span className="text-xs bg-[#2a2a4a] px-2 py-0.5 rounded-full">{cat.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA interpretador */}
            <div className="rounded-xl border border-[#7c6af7]/20 bg-[#7c6af7]/5 p-5 text-center">
              <div className="text-2xl mb-2">✨</div>
              <p className="text-sm font-semibold text-[#e8e6f0] mb-2">¿No encuentras tu sueño?</p>
              <p className="text-xs text-[#6b6880] mb-4 leading-relaxed">
                Describe lo que soñaste y recibe una interpretación personalizada.
              </p>
              <Link
                href="/interpretador"
                className="block text-center rounded-full bg-[#7c6af7] px-4 py-2 text-sm font-medium text-white hover:bg-[#9580ff] transition-colors"
              >
                Interpretar mi sueño
              </Link>
            </div>

            {/* AdSense sidebar */}
            <AdSlot slot="sidebar" />
          </div>
        </aside>
      </div>
    </div>
  );
}
