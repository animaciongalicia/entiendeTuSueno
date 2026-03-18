import { notFound } from "next/navigation";
import { getArticlesByCategory, getAllCategories } from "@/lib/articles";
import { clusters, getPillarByCluster } from "@/lib/clusters";
import { NAV_CATEGORIES } from "@/lib/navCategories";
import ArticleCard from "@/components/ArticleCard";
import ArticleSidebar from "@/components/ArticleSidebar";
import AdSlot from "@/components/AdSlot";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/config";

interface Props {
  params: { nombre: string };
}

export async function generateStaticParams() {
  const fromArticles = getAllCategories().map((cat) => ({ nombre: cat.slug }));
  // Also include cluster slugs so /categoria/suenos-con-animales works
  const fromClusters = clusters.map((c) => ({ nombre: c.slug }));
  const all = [...fromArticles, ...fromClusters];
  // Deduplicate
  const seen = new Set<string>();
  return all.filter((p) => {
    if (seen.has(p.nombre)) return false;
    seen.add(p.nombre);
    return true;
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // If the slug is a NAV_CATEGORY, treat it as a category page (not a cluster page),
  // even if a cluster happens to share the same slug.
  const isNavCategory = NAV_CATEGORIES.some((c) => c.slug === params.nombre);
  const cluster = isNavCategory ? undefined : clusters.find((c) => c.slug === params.nombre);
  const articlesInSlug = cluster
    ? getArticlesByCategory(cluster.categorySlug).filter((a) => a.cluster === cluster.slug)
    : getArticlesByCategory(params.nombre);

  // Noindex si no hay artículos aún — evita thin content en el site quality score
  const hasContent = articlesInSlug.length > 0;

  const BASE_URL = SITE_URL;

  if (cluster) {
    const clusterUrl = `${BASE_URL}/categoria/${cluster.slug}`;
    return {
      title: `${cluster.name} — Interpretación y Significado`,
      description: `${cluster.description} Guía completa con interpretaciones psicológicas, simbolismo y consejos prácticos en español.`,
      alternates: { canonical: clusterUrl },
      openGraph: {
        type: "website",
        locale: "es_ES",
        url: clusterUrl,
        title: `${cluster.name} — Interpretación y Significado`,
        description: cluster.description,
      },
      ...(!hasContent && { robots: { index: false, follow: true } }),
    };
  }
  const cats = getAllCategories();
  const cat = cats.find((c) => c.slug === params.nombre);
  if (!cat) return {};
  const catUrl = `${BASE_URL}/categoria/${params.nombre}`;
  return {
    title: `Sueños de ${cat.name} — Significado e Interpretación`,
    description: `Interpretaciones de sueños relacionados con ${cat.name.toLowerCase()}. Psicología del sueño, simbolismo y significado práctico en español.`,
    alternates: { canonical: catUrl },
    openGraph: {
      type: "website",
      locale: "es_ES",
      url: catUrl,
      title: `Sueños de ${cat.name} — Significado e Interpretación`,
      description: `Interpretaciones de sueños relacionados con ${cat.name.toLowerCase()}.`,
    },
    ...(!hasContent && { robots: { index: false, follow: true } }),
  };
}

const categoryDescriptions: Record<string, string> = {
  animales:
    "Los animales en los sueños son mensajeros poderosos del inconsciente. Cada especie porta un simbolismo único que puede iluminar aspectos de tu vida emocional e instintiva.",
  naturaleza:
    "La naturaleza en los sueños nos conecta con los elementos fundamentales de la existencia: el fluir de las emociones, la energía transformadora y los ciclos de la vida.",
  emociones:
    "Los sueños emocionales son los más directos: tu inconsciente procesa y expresa lo que sientes, a veces con una claridad que despierta desconcertante.",
  personas:
    "Las personas que aparecen en nuestros sueños casi siempre representan aspectos de nosotros mismos o de nuestras relaciones más significativas.",
  espiritual:
    "Los sueños espirituales tocan dimensiones profundas de la existencia: visitas, presencias y experiencias que trascienden la psicología ordinaria.",
  cuerpo:
    "El cuerpo en los sueños es el mapa más directo de tu identidad y tu autoestima. Dientes, pelo, manos, embarazo: cada símbolo habla de una dimensión concreta de cómo te percibes.",
  recurrentes:
    "Los sueños recurrentes son los más importantes que puedes tener. La repetición es un mensaje en sí misma: tu inconsciente insiste porque hay algo que merece tu atención.",
  "momentos-vitales":
    "Duelo, rupturas, cambios de trabajo, decisiones importantes. Los sueños en los momentos de cambio son el laboratorio donde la mente procesa lo que el día no puede digerir.",
};

export default function CategoriaPage({ params }: Props) {
  // NAV_CATEGORY slugs always render as category pages, even if a cluster shares the slug.
  // This prevents count mismatches between the sidebar ArticleIndex and the category page.
  const isNavCategory = NAV_CATEGORIES.some((c) => c.slug === params.nombre);
  const cluster = isNavCategory ? undefined : clusters.find((c) => c.slug === params.nombre);
  const pillar = cluster ? getPillarByCluster(cluster.slug) : undefined;

  // Articles: pure category filter for NAV_CATEGORY slugs; cluster filter for cluster slugs
  const articlesInCategory = (() => {
    if (!cluster) return getArticlesByCategory(params.nombre);
    const byCluster = getArticlesByCategory(cluster.categorySlug).filter(
      (a) => a.cluster === cluster.slug
    );
    return byCluster.length > 0
      ? byCluster
      : getArticlesByCategory(cluster.categorySlug);
  })();

  const cats = getAllCategories();
  const cat = cats.find((c) => c.slug === params.nombre);

  if (!cat && articlesInCategory.length === 0 && !cluster) notFound();

  const displayName = cluster?.name ?? cat?.name ?? params.nombre;
  const description =
    cluster?.description ??
    categoryDescriptions[params.nombre] ??
    `Artículos sobre sueños de ${displayName}.`;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#4a4760] mb-6">
        <Link href="/" className="hover:text-[#7c6af7] transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-[#7c6af7] transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-[#8b87a0]">{displayName}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#f0eeff] mb-3">
              {cluster ? cluster.name : `Sueños de ${displayName}`}
            </h1>
            <p className="text-[#8b87a0] max-w-xl leading-relaxed">{description}</p>
          </div>

          <AdSlot slot="header-below" className="mb-8" />

          {/* Pillar page card if this is a cluster */}
          {pillar && (
            <div className="mb-8 rounded-2xl border border-[#7c6af7]/30 bg-[#7c6af7]/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#7c6af7] mb-2">
                Guía completa
              </p>
              <h2 className="text-xl font-bold text-[#f0eeff] mb-2">{pillar.title}</h2>
              <p className="text-[#8b87a0] text-sm mb-4 leading-relaxed">{pillar.metaDescription}</p>
              <Link
                href={`/blog/${pillar.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#7c6af7] px-4 py-2 text-sm font-medium text-white hover:bg-[#9580ff] transition-colors"
              >
                Leer la guía completa →
              </Link>
            </div>
          )}

          {articlesInCategory.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {articlesInCategory.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🌙</div>
              <p className="text-[#8b87a0]">No hay artículos en esta categoría todavía.</p>
              <Link href="/blog" className="inline-block mt-4 text-sm text-[#7c6af7] hover:text-[#9580ff] transition-colors">
                Ver todos los artículos →
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
          <ArticleSidebar
            relatedArticles={[]}
            categorySlug={cluster?.categorySlug ?? params.nombre}
            categoryName={displayName}
            currentSlug=""
          />
        </aside>
      </div>
    </div>
  );
}
