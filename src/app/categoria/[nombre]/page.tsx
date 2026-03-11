import { notFound } from "next/navigation";
import { getArticlesByCategory, getAllCategories } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: { nombre: string };
}

export async function generateStaticParams() {
  return getAllCategories().map((cat) => ({ nombre: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cats = getAllCategories();
  const cat = cats.find((c) => c.slug === params.nombre);
  if (!cat) return {};

  return {
    title: `Sueños de ${cat.name}`,
    description: `Interpretaciones de sueños relacionados con ${cat.name.toLowerCase()}. Descubre el significado de estos sueños comunes en español.`,
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
};

export default function CategoriaPage({ params }: Props) {
  const articlesInCategory = getArticlesByCategory(params.nombre);
  const cats = getAllCategories();
  const cat = cats.find((c) => c.slug === params.nombre);

  if (!cat && articlesInCategory.length === 0) notFound();

  const displayName = cat?.name ?? params.nombre;
  const description = categoryDescriptions[params.nombre] ?? `Artículos sobre sueños de ${displayName}.`;

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

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#f0eeff] mb-3">
          Sueños de {displayName}
        </h1>
        <p className="text-[#8b87a0] max-w-xl leading-relaxed">{description}</p>
      </div>

      <AdSlot slot="header-below" className="mb-8" />

      {articlesInCategory.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Other categories */}
      <div className="mt-12 pt-8 border-t border-[#2a2a4a]">
        <h2 className="text-lg font-semibold text-[#e8e6f0] mb-4">Otras categorías</h2>
        <div className="flex flex-wrap gap-3">
          {cats
            .filter((c) => c.slug !== params.nombre)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/categoria/${c.slug}`}
                className="rounded-full border border-[#2a2a4a] px-4 py-1.5 text-sm text-[#8b87a0] hover:border-[#7c6af7] hover:text-[#7c6af7] transition-colors"
              >
                {c.name}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
