import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
import { articles } from "@/lib/articles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EntiendetuSueño — Interpretación de Sueños en Español",
  description:
    "Descubre el significado de tus sueños con interpretaciones detalladas, cercanas y basadas en psicología. El blog de interpretación de sueños en español.",
};

const categories = [
  { emoji: "🐍", name: "Animales", slug: "animales", description: "Serpientes, perros, pájaros y más" },
  { emoji: "💧", name: "Naturaleza", slug: "naturaleza", description: "Agua, fuego, tierra y cielo" },
  { emoji: "💫", name: "Emociones", slug: "emociones", description: "Miedos, amor, caídas, vuelos" },
  { emoji: "👥", name: "Personas", slug: "personas", description: "Familia, ex parejas, desconocidos" },
];

export default function HomePage() {
  const featured = articles.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2a2a4a] bg-[#1a1a2e] px-4 py-1.5 text-xs text-[#8b87a0] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7c6af7] animate-pulse" />
            El blog de sueños en español
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-[#f0eeff] leading-tight mb-6">
            ¿Qué te están<br />
            <span className="text-[#7c6af7]">diciendo tus sueños?</span>
          </h1>
          <p className="text-lg md:text-xl text-[#8b87a0] max-w-xl mx-auto mb-8 leading-relaxed">
            Interpretaciones profundas, cercanas y en español. Descubre los mensajes
            que tu inconsciente te envía cada noche.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/interpretador"
              className="rounded-full bg-[#7c6af7] px-6 py-3 text-base font-medium text-white hover:bg-[#9580ff] transition-colors"
            >
              Interpretar mi sueño →
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-[#2a2a4a] px-6 py-3 text-base font-medium text-[#e8e6f0] hover:border-[#7c6af7] transition-colors"
            >
              Ver todos los artículos
            </Link>
          </div>
        </div>
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#7c6af7] opacity-5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#7c6af7] opacity-5 blur-3xl pointer-events-none" />
      </section>

      {/* AdSense — Below Header */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-8">
        <AdSlot slot="header-below" />
      </div>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-2xl font-semibold text-[#f0eeff] mb-6">Explora por categoría</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="group rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-5 hover:border-[#7c6af7] transition-colors"
            >
              <div className="text-3xl mb-3">{cat.emoji}</div>
              <h3 className="font-semibold text-[#e8e6f0] mb-1 group-hover:text-[#9580ff] transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-[#8b87a0]">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[#f0eeff]">Artículos recientes</h2>
          <Link href="/blog" className="text-sm text-[#7c6af7] hover:text-[#9580ff] transition-colors">
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* CTA Interpretador */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-2xl border border-[#2a2a4a] bg-gradient-to-br from-[#1a1a2e] to-[#12121e] p-8 md:p-12 text-center">
          <div className="text-4xl mb-4">✨</div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#f0eeff] mb-3">
            ¿Tuviste un sueño que no entiendes?
          </h2>
          <p className="text-[#8b87a0] mb-6 max-w-md mx-auto">
            Describe tu sueño y nuestro interpretador te ayudará a descubrir su significado más profundo.
          </p>
          <Link
            href="/interpretador"
            className="inline-block rounded-full bg-[#7c6af7] px-8 py-3 font-medium text-white hover:bg-[#9580ff] transition-colors"
          >
            Probar el interpretador
          </Link>
        </div>
      </section>
    </>
  );
}
