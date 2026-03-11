import Link from "next/link";
import type { Article } from "@/lib/articles";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] overflow-hidden hover:border-[#7c6af7] transition-colors duration-200">
      {/* Cover image placeholder */}
      <div className="h-48 bg-gradient-to-br from-[#2a2a4a] to-[#12121e] flex items-center justify-center">
        <span className="text-5xl opacity-40" aria-hidden="true">🌙</span>
      </div>

      <div className="p-5">
        {/* Category + reading time */}
        <div className="flex items-center gap-3 mb-3">
          <Link
            href={`/categoria/${article.categorySlug}`}
            className="text-xs font-medium text-[#7c6af7] bg-[#7c6af7]/10 px-2.5 py-1 rounded-full hover:bg-[#7c6af7]/20 transition-colors"
          >
            {article.category}
          </Link>
          <span className="text-xs text-[#4a4760]">{article.readingTime} min lectura</span>
        </div>

        {/* Title */}
        <h2 className="text-base font-semibold text-[#e8e6f0] mb-2 line-clamp-2 group-hover:text-[#9580ff] transition-colors">
          <Link href={`/blog/${article.slug}`}>{article.title}</Link>
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-[#8b87a0] line-clamp-3 mb-4">{article.excerpt}</p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <time className="text-xs text-[#4a4760]" dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <Link
            href={`/blog/${article.slug}`}
            className="text-xs font-medium text-[#7c6af7] hover:text-[#9580ff] transition-colors"
          >
            Leer más →
          </Link>
        </div>
      </div>
    </article>
  );
}
