import Link from "next/link";
import type { Article } from "@/lib/articles";
import CoverImage from "@/components/CoverImage";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  priority?: boolean;
}

export default function ArticleCard({ article, featured = false, priority = false }: ArticleCardProps) {
  if (featured) {
    return (
      <article className="group rounded-2xl border border-[#2a2a4a] bg-[#1a1a2e] overflow-hidden hover:border-[#7c6af7]/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#7c6af7]/5">
        <div className="flex flex-col md:flex-row">
          {/* Cover image */}
          <div className="relative md:w-2/5 h-56 md:h-auto overflow-hidden shrink-0">
            <CoverImage
              src={article.coverImage}
              alt={article.coverAlt}
              categorySlug={article.categorySlug}
              className="w-full h-full"
              priority={priority}
            />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Link
                href={`/categoria/${article.categorySlug}`}
                className="text-xs font-semibold text-[#7c6af7] bg-[#7c6af7]/10 px-2.5 py-1 rounded-full hover:bg-[#7c6af7]/20 transition-colors"
              >
                {article.category}
              </Link>
              <span className="text-xs text-[#4a4760]">{article.readingTime} min lectura</span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-[#f0eeff] mb-3 leading-tight group-hover:text-[#9580ff] transition-colors">
              <Link href={`/blog/${article.slug}`}>{article.title}</Link>
            </h2>

            <p className="text-sm text-[#8b87a0] leading-relaxed mb-5 line-clamp-3">{article.excerpt}</p>

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
                className="text-sm font-medium text-[#7c6af7] hover:text-[#9580ff] transition-colors"
              >
                Leer artículo →
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] overflow-hidden hover:border-[#7c6af7]/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#7c6af7]/5">
      {/* Cover image */}
      <div className="h-48 overflow-hidden">
        <CoverImage
          src={article.coverImage}
          alt={article.coverAlt}
          categorySlug={article.categorySlug}
          className="w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        {/* Category + reading time */}
        <div className="flex items-center gap-3 mb-3">
          <Link
            href={`/categoria/${article.categorySlug}`}
            className="text-xs font-semibold text-[#7c6af7] bg-[#7c6af7]/10 px-2.5 py-1 rounded-full hover:bg-[#7c6af7]/20 transition-colors"
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
        <p className="text-sm text-[#8b87a0] line-clamp-2 mb-4 leading-relaxed">{article.excerpt}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[#2a2a4a]">
          <time className="text-xs text-[#4a4760]" dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "short",
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
