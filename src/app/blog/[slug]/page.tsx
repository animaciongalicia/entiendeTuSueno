import { notFound } from "next/navigation";
import { articles, getArticleBySlug, getAllSlugs, getRelatedArticlesByCluster } from "@/lib/articles";
import { getPillarByCluster, getAllPillarSlugs, getPillarBySlug, getClusterBySlug } from "@/lib/clusters";
import type { PillarPage } from "@/lib/clusters";
import AdSlot from "@/components/AdSlot";
import SchemaArticle from "@/components/SchemaArticle";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const blogSlugs = getAllSlugs().map((slug) => ({ slug }));
  const pillarSlugs = getAllPillarSlugs().map((slug) => ({ slug }));
  return [...blogSlugs, ...pillarSlugs];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (article) {
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
        ...(article.imagen_destacada && {
          images: [{ url: article.imagen_destacada, width: 1200, height: 630 }],
        }),
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.excerpt,
      },
    };
  }

  const pillar = getPillarBySlug(params.slug);
  if (pillar) {
    return {
      title: pillar.metaTitle,
      description: pillar.metaDescription,
      keywords: pillar.tags,
      openGraph: {
        type: "article",
        locale: "es_ES",
        url: `https://entiendetusueno.com/blog/${pillar.slug}`,
        title: pillar.metaTitle,
        description: pillar.metaDescription,
        publishedTime: pillar.publishedAt,
        modifiedTime: pillar.updatedAt,
        authors: ["EntiendetuSueño"],
        tags: pillar.tags,
        images: [{ url: pillar.coverImage, width: 1200, height: 630 }],
      },
      twitter: {
        card: "summary_large_image",
        title: pillar.metaTitle,
        description: pillar.metaDescription,
      },
    };
  }

  return {};
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

// Mid-article CTA block (soft, inline)
const MidCTA = () => (
  <div className="my-8 rounded-xl border border-[#7c6af7]/20 bg-[#7c6af7]/5 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
    <p className="text-sm text-[#c0b8f0] flex-1">
      ¿Quieres saber qué significa exactamente <em>tu</em> sueño?
    </p>
    <Link
      href="/interpretador"
      className="shrink-0 rounded-full bg-[#7c6af7] px-4 py-2 text-sm font-medium text-white hover:bg-[#9580ff] transition-colors text-center"
    >
      Interpretar mi sueño →
    </Link>
  </div>
);

// End CTA block
const EndCTA = () => (
  <div className="mt-10 rounded-xl border border-[#7c6af7]/30 bg-gradient-to-r from-[#7c6af7]/10 to-[#9580ff]/5 px-6 py-5 text-center">
    <p className="text-base font-semibold text-[#e8e6f0] mb-1">
      ¿Tuviste otro sueño que quieres entender?
    </p>
    <p className="text-sm text-[#8b87a0] mb-4">
      Nuestro interpretador analiza el simbolismo de cualquier sueño en segundos.
    </p>
    <Link
      href="/interpretador"
      className="inline-block rounded-full bg-[#7c6af7] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#9580ff] transition-colors"
    >
      Interpreta otro sueño
    </Link>
  </div>
);

export default function ArticlePage({ params }: Props) {
  // Try regular article first, then pillar page
  const article = getArticleBySlug(params.slug);
  const pillar = !article ? getPillarBySlug(params.slug) : undefined;

  if (!article && !pillar) notFound();

  // ── Pillar page render ──────────────────────────────────────────────────────
  if (pillar) {
    return <PillarArticlePage pillar={pillar} />;
  }

  // ── Regular article render ──────────────────────────────────────────────────
  const art = article!;
  const url = `https://entiendetusueno.com/blog/${art.slug}`;

  // Dynamic related: 3 from same cluster, fill with category if needed
  const relatedArticles = getRelatedArticlesByCluster(art.slug, art.cluster, 3);

  // Pillar of the cluster this article belongs to
  const clusterPillar = art.cluster ? getPillarByCluster(art.cluster) : undefined;

  const contentWithAd = injectMidAd(art.content);

  return (
    <>
      <SchemaArticle article={art} url={url} />

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
              <Link href={`/categoria/${art.categorySlug}`} className="hover:text-[#7c6af7] transition-colors">
                {art.category}
              </Link>
              {art.cluster && (
                <>
                  <span>/</span>
                  <Link href={`/categoria/${art.cluster}`} className="hover:text-[#7c6af7] transition-colors">
                    Cluster
                  </Link>
                </>
              )}
            </nav>

            {/* Category + meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Link
                href={`/categoria/${art.categorySlug}`}
                className="text-xs font-medium text-[#7c6af7] bg-[#7c6af7]/10 px-2.5 py-1 rounded-full hover:bg-[#7c6af7]/20 transition-colors"
              >
                {art.category}
              </Link>
              {art.tipo && (
                <span className="text-xs text-[#4a4760] border border-[#2a2a4a] px-2 py-0.5 rounded-full capitalize">
                  {art.tipo}
                </span>
              )}
              <span className="text-xs text-[#4a4760]">{art.readingTime} min lectura</span>
              <time className="text-xs text-[#4a4760]" dateTime={art.publishedAt}>
                {new Date(art.publishedAt).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#f0eeff] leading-tight mb-4">
              {art.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-[#8b87a0] mb-8 leading-relaxed border-l-2 border-[#7c6af7] pl-4">
              {art.excerpt}
            </p>

            {/* Cover image (destacada 1200×630 for Discover) */}
            <div className="w-full h-64 md:h-80 rounded-xl bg-gradient-to-br from-[#2a2a4a] to-[#12121e] flex items-center justify-center mb-8 overflow-hidden">
              {art.imagen_destacada ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={art.imagen_destacada}
                  alt={art.coverAlt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-7xl opacity-30" aria-hidden="true">🌙</span>
              )}
            </div>

            {/* Content with mid-ad injected */}
            <div
              className="prose-cosmos"
              dangerouslySetInnerHTML={{ __html: contentWithAd }}
            />

            {/* Mid-article CTA */}
            <MidCTA />

            {/* Interpretación humana */}
            {art.interpretacion_humana && (
              <section className="mt-10 rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-6">
                <h2 className="text-lg font-bold text-[#f0eeff] mb-3">Interpretación humana</h2>
                <p className="text-sm text-[#8b87a0] leading-relaxed">{art.interpretacion_humana}</p>
              </section>
            )}

            {/* Tags */}
            {art.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-[#2a2a4a]">
                <p className="text-xs font-semibold text-[#4a4760] uppercase tracking-wider mb-3">Etiquetas</p>
                <div className="flex flex-wrap gap-2">
                  {art.tags.map((tag) => (
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

            {/* Qué te dice este sueño sobre tu vida */}
            {art.consejo_practico && (
              <section className="mt-10 rounded-xl border border-[#7c6af7]/25 bg-gradient-to-br from-[#7c6af7]/8 to-[#1a1a2e] p-6">
                <h2 className="text-xl font-bold text-[#f0eeff] mb-4">Qué te dice este sueño sobre tu vida</h2>
                <p className="text-[#c0b8f0] leading-relaxed">{art.consejo_practico}</p>
              </section>
            )}

            {/* FAQ */}
            {art.faqItems && art.faqItems.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xl font-bold text-[#f0eeff] mb-5">Preguntas frecuentes</h2>
                <div className="space-y-4">
                  {art.faqItems.map((faq, i) => (
                    <div key={i} className="rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-5">
                      <h3 className="font-semibold text-[#e8e6f0] mb-2">{faq.question}</h3>
                      <p className="text-sm text-[#8b87a0] leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Dynamic related articles from same cluster */}
            {relatedArticles.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-bold text-[#f0eeff] mb-5">También te puede interesar</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

            {/* Cluster pillar link */}
            {clusterPillar && (
              <div className="mt-8 rounded-xl border border-[#7c6af7]/30 bg-[#7c6af7]/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#7c6af7] mb-1">
                  Guía completa del tema
                </p>
                <Link
                  href={`/blog/${clusterPillar.slug}`}
                  className="font-semibold text-[#e8e6f0] hover:text-[#9580ff] transition-colors"
                >
                  {clusterPillar.title} →
                </Link>
              </div>
            )}

            {/* End CTA */}
            <EndCTA />
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

// ── Pillar page layout ────────────────────────────────────────────────────────
function PillarArticlePage({ pillar }: { pillar: PillarPage }) {
  const url = `https://entiendetusueno.com/blog/${pillar.slug}`;
  const contentWithAd = injectMidAd(pillar.content);
  const cluster = getClusterBySlug(pillar.clusterSlug);

  // Related: articles from the same cluster
  const relatedArticles = articles
    .filter((a) => a.cluster === pillar.clusterSlug)
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pillar.metaTitle,
    description: pillar.metaDescription,
    datePublished: pillar.publishedAt,
    dateModified: pillar.updatedAt,
    author: { "@type": "Organization", name: "EntiendetuSueño" },
    publisher: {
      "@type": "Organization",
      name: "EntiendetuSueño",
      url: "https://entiendetusueno.com",
    },
    url,
  };

  const faqSchema =
    pillar.faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: pillar.faqItems.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* FAQ Schema */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="flex flex-col lg:flex-row gap-10">
        <article className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#4a4760] mb-6">
            <Link href="/" className="hover:text-[#7c6af7] transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#7c6af7] transition-colors">Blog</Link>
            <span>/</span>
            <Link href={`/categoria/${pillar.categorySlug}`} className="hover:text-[#7c6af7] transition-colors">
              {pillar.category}
            </Link>
            <span>/</span>
            <Link href={`/categoria/${pillar.clusterSlug}`} className="hover:text-[#7c6af7] transition-colors">
              {cluster?.name ?? "Cluster"}
            </Link>
          </nav>

          {/* Badge + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-[#7c6af7] bg-[#7c6af7]/10 px-2.5 py-1 rounded-full">
              Guía completa
            </span>
            <span className="text-xs text-[#4a4760]">{pillar.readingTime} min lectura</span>
            <time className="text-xs text-[#4a4760]" dateTime={pillar.publishedAt}>
              {new Date(pillar.publishedAt).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#f0eeff] leading-tight mb-4">
            {pillar.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-[#8b87a0] mb-8 leading-relaxed border-l-2 border-[#7c6af7] pl-4">
            {pillar.metaDescription}
          </p>

          {/* Cover image */}
          <div className="w-full h-64 md:h-80 rounded-xl bg-gradient-to-br from-[#2a2a4a] to-[#12121e] flex items-center justify-center mb-8 overflow-hidden">
            <span className="text-7xl opacity-30" aria-hidden="true">🌙</span>
          </div>

          {/* Content with mid-ad */}
          <div
            className="prose-cosmos"
            dangerouslySetInnerHTML={{ __html: contentWithAd }}
          />

          {/* Mid-article CTA */}
          <MidCTA />

          {/* Tags */}
          {pillar.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-[#2a2a4a]">
              <p className="text-xs font-semibold text-[#4a4760] uppercase tracking-wider mb-3">Etiquetas</p>
              <div className="flex flex-wrap gap-2">
                {pillar.tags.map((tag) => (
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

          {/* Qué te dice este sueño sobre tu vida */}
          {pillar.consejo_practico && (
            <section className="mt-10 rounded-xl border border-[#7c6af7]/25 bg-gradient-to-br from-[#7c6af7]/8 to-[#1a1a2e] p-6">
              <h2 className="text-xl font-bold text-[#f0eeff] mb-4">Qué te dice este sueño sobre tu vida</h2>
              <p className="text-[#c0b8f0] leading-relaxed">{pillar.consejo_practico}</p>
            </section>
          )}

          {/* FAQ */}
          {pillar.faqItems.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-bold text-[#f0eeff] mb-5">Preguntas frecuentes</h2>
              <div className="space-y-4">
                {pillar.faqItems.map((faq, i) => (
                  <div key={i} className="rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-5">
                    <h3 className="font-semibold text-[#e8e6f0] mb-2">{faq.question}</h3>
                    <p className="text-sm text-[#8b87a0] leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related articles from cluster */}
          {relatedArticles.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-bold text-[#f0eeff] mb-5">También te puede interesar</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

          {/* End CTA */}
          <EndCTA />
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
  );
}
