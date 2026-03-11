import { notFound } from "next/navigation";
import { articles, getArticleBySlug, getAllSlugs } from "@/lib/articles";
import AdSlot from "@/components/AdSlot";
import SchemaArticle from "@/components/SchemaArticle";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    openGraph: {
      type: "article",
      locale: "es_ES",
      url: `https://entiendetusueno.com/blog/${article.slug}`,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: ["EntiendetuSueño"],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

// Inject AdSense mid-article after second </p>
function injectMidAd(html: string): string {
  const adHtml = `
    <div data-mid-ad class="my-8">
      <div class="flex items-center justify-center border border-dashed border-[#2a2a4a] bg-[#12121e] rounded-lg text-xs text-[#4a4760] h-[250px]" aria-hidden="true">
        Anuncio — Artículo
      </div>
    </div>
  `;
  // Find position after second closing </p>
  let count = 0;
  const idx = html.replace(/<\/p>/g, (match) => {
    count++;
    if (count === 2) return `</p><!--INSERT_AD-->`;
    return match;
  });
  return idx.replace("<!--INSERT_AD-->", `</p>${adHtml}`);
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const url = `https://entiendetusueno.com/blog/${article.slug}`;
  const relatedArticles = articles
    .filter((a) => a.slug !== article.slug && a.categorySlug === article.categorySlug)
    .slice(0, 2);

  const contentWithAd = injectMidAd(article.content);

  return (
    <>
      <SchemaArticle article={article} url={url} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Article */}
          <article className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-[#4a4760] mb-6">
              <Link href="/" className="hover:text-[#7c6af7] transition-colors">Inicio</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[#7c6af7] transition-colors">Blog</Link>
              <span>/</span>
              <Link href={`/categoria/${article.categorySlug}`} className="hover:text-[#7c6af7] transition-colors">
                {article.category}
              </Link>
            </nav>

            {/* Category + meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Link
                href={`/categoria/${article.categorySlug}`}
                className="text-xs font-medium text-[#7c6af7] bg-[#7c6af7]/10 px-2.5 py-1 rounded-full hover:bg-[#7c6af7]/20 transition-colors"
              >
                {article.category}
              </Link>
              <span className="text-xs text-[#4a4760]">{article.readingTime} min lectura</span>
              <time className="text-xs text-[#4a4760]" dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#f0eeff] leading-tight mb-4">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-[#8b87a0] mb-8 leading-relaxed border-l-2 border-[#7c6af7] pl-4">
              {article.excerpt}
            </p>

            {/* Cover image placeholder */}
            <div className="w-full h-64 md:h-80 rounded-xl bg-gradient-to-br from-[#2a2a4a] to-[#12121e] flex items-center justify-center mb-8">
              <span className="text-7xl opacity-30" aria-hidden="true">🌙</span>
            </div>

            {/* Content with mid-ad injected */}
            <div
              className="prose-cosmos"
              dangerouslySetInnerHTML={{ __html: contentWithAd }}
            />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-[#2a2a4a]">
                <p className="text-xs font-semibold text-[#4a4760] uppercase tracking-wider mb-3">Etiquetas</p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-[#8b87a0] border border-[#2a2a4a] rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            {article.faqItems && article.faqItems.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xl font-bold text-[#f0eeff] mb-5">Preguntas frecuentes</h2>
                <div className="space-y-4">
                  {article.faqItems.map((faq, i) => (
                    <div key={i} className="rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-5">
                      <h3 className="font-semibold text-[#e8e6f0] mb-2">{faq.question}</h3>
                      <p className="text-sm text-[#8b87a0] leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Related articles */}
            {relatedArticles.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-bold text-[#f0eeff] mb-5">También puede interesarte</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/blog/${rel.slug}`}
                      className="group rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-4 hover:border-[#7c6af7] transition-colors"
                    >
                      <p className="text-xs text-[#7c6af7] mb-1">{rel.category}</p>
                      <h3 className="text-sm font-medium text-[#e8e6f0] group-hover:text-[#9580ff] transition-colors line-clamp-2">
                        {rel.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-20 space-y-6">
              <AdSlot slot="sidebar" />
              <div className="rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-5">
                <h3 className="text-sm font-semibold text-[#e8e6f0] mb-3">¿Tuviste este sueño?</h3>
                <p className="text-xs text-[#8b87a0] mb-4">
                  Usa nuestro interpretador para obtener un análisis personalizado.
                </p>
                <Link
                  href="/interpretador"
                  className="block text-center rounded-full bg-[#7c6af7] px-4 py-2 text-sm font-medium text-white hover:bg-[#9580ff] transition-colors"
                >
                  Interpretar mi sueño
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
