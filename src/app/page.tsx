import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
import { articles } from "@/lib/articles";
import { clusters } from "@/lib/clusters";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EntiendetuSueño — Entiende qué está pasando en ti",
  description:
    "entiendeTuSueño no te dice lo que significa tu sueño. Te ayuda a entender qué está pasando en ti cuando lo tienes. Psicología real, sin superstición.",
  alternates: { canonical: "https://entiendetusueno.com" },
  openGraph: {
    title: "EntiendetuSueño — Entiende qué está pasando en ti",
    description:
      "No buscas magia. Buscas entender. Conectamos lo que soñaste con lo que estás viviendo.",
    type: "website",
    locale: "es_ES",
    url: "https://entiendetusueno.com",
  },
};

const clusterAccents: Record<string, string> = {
  "suenos-con-animales": "from-emerald-500/10 border-emerald-500/20 hover:border-emerald-400/40",
  "suenos-con-personas": "from-indigo-500/10 border-indigo-500/20 hover:border-indigo-400/40",
  "suenos-con-muerte-y-miedo": "from-violet-500/10 border-violet-500/20 hover:border-violet-400/40",
  "suenos-de-amor-y-ex-pareja": "from-pink-500/10 border-pink-500/20 hover:border-pink-400/40",
  "suenos-de-dinero-y-trabajo": "from-amber-500/10 border-amber-500/20 hover:border-amber-400/40",
  "suenos-espirituales": "from-cyan-500/10 border-cyan-500/20 hover:border-cyan-400/40",
  "suenos-con-el-cuerpo": "from-orange-500/10 border-orange-500/20 hover:border-orange-400/40",
  // Situaciones y patrones
  "suenos-recurrentes": "from-lime-500/10 border-lime-500/20 hover:border-lime-400/40",
  "suenos-en-momentos-vitales": "from-teal-500/10 border-teal-500/20 hover:border-teal-400/40",
  // Nuevos temáticos
  "ciencia-del-sueno": "from-blue-500/10 border-blue-500/20 hover:border-blue-400/40",
  "simbolos-en-suenos": "from-fuchsia-500/10 border-fuchsia-500/20 hover:border-fuchsia-400/40",
  // Nueva situacional
  "relaciones": "from-rose-500/10 border-rose-500/20 hover:border-rose-400/40",
};

const clusterBadgeColors: Record<string, string> = {
  "suenos-con-animales": "text-emerald-400",
  "suenos-con-personas": "text-indigo-400",
  "suenos-con-muerte-y-miedo": "text-violet-400",
  "suenos-de-amor-y-ex-pareja": "text-pink-400",
  "suenos-de-dinero-y-trabajo": "text-amber-400",
  "suenos-espirituales": "text-cyan-400",
  "suenos-con-el-cuerpo": "text-orange-400",
  "suenos-recurrentes": "text-lime-400",
  "suenos-en-momentos-vitales": "text-teal-400",
  "ciencia-del-sueno": "text-blue-400",
  "simbolos-en-suenos": "text-fuchsia-400",
  "relaciones": "text-rose-400",
};

export default function HomePage() {
  const [featuredArticle, ...otherArticles] = articles;
  const latest = otherArticles.slice(0, 3);

  return (
    <>
      {/* ── Hero — compacto ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-14 md:py-20 px-4">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#7c6af7] opacity-[0.06] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#9580ff] opacity-[0.06] blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-3xl text-center relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2a2a4a] bg-[#1a1a2e] px-4 py-1.5 text-xs text-[#8b87a0] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7c6af7] animate-pulse" />
            Psicología del sueño · Sin superstición
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#f0eeff] leading-tight mb-4">
            Tuviste un sueño que te removió.<br />
            <span className="text-[#7c6af7]">No buscas magia. Buscas entender.</span>
          </h1>

          <p className="text-base text-[#8b87a0] max-w-xl mx-auto mb-8 leading-relaxed">
            Conectamos lo que soñaste con lo que estás viviendo: tus miedos, tus relaciones,
            tu estrés, tus cambios. Psicología real, sin superstición.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/interpretador"
              className="rounded-full bg-[#7c6af7] px-7 py-3.5 text-base font-medium text-white hover:bg-[#9580ff] transition-colors shadow-lg shadow-[#7c6af7]/20"
            >
              Entender mi sueño →
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-[#2a2a4a] px-7 py-3.5 text-base font-medium text-[#e8e6f0] hover:border-[#7c6af7] transition-colors"
            >
              Explorar artículos
            </Link>
          </div>
        </div>
      </section>

      {/* ── Clusters — lo primero que ve el usuario ───────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-16">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f0eeff] mb-2">
            ¿Sobre qué soñaste?
          </h2>
          <p className="text-[#8b87a0] text-sm max-w-lg">
            Elige la categoría y encuentra guías con contexto psicológico real, no listas de símbolos.
          </p>
        </div>

        {/* Clusters temáticos 3×3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {clusters.filter((c) => c.tipo === "tematico").map((cluster) => {
            const accent = clusterAccents[cluster.slug] ?? "from-violet-500/10 border-violet-500/20 hover:border-violet-400/40";
            const badgeColor = clusterBadgeColors[cluster.slug] ?? "text-violet-400";
            return (
              <Link
                key={cluster.slug}
                href={`/categoria/${cluster.slug}`}
                className={`group relative rounded-2xl border bg-gradient-to-br to-[#1a1a2e] ${accent} p-5 transition-all hover:-translate-y-0.5`}
              >
                <div className="text-2xl mb-3">{cluster.emoji}</div>
                <h3 className="font-bold text-[#f0eeff] mb-1.5 text-sm">
                  {cluster.name}
                </h3>
                <p className="text-xs text-[#6b6880] leading-relaxed mb-3 line-clamp-2">
                  {cluster.description}
                </p>
                <span className={`text-xs font-semibold ${badgeColor}`}>
                  Ver guía →
                </span>
              </Link>
            );
          })}
        </div>

        {/* Situaciones y patrones */}
        <p className="text-xs font-semibold uppercase tracking-widest text-[#4a4760] mb-4">
          Situaciones y patrones
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {clusters.filter((c) => c.tipo !== "tematico").map((cluster) => {
            const accent = clusterAccents[cluster.slug] ?? "from-violet-500/10 border-violet-500/20 hover:border-violet-400/40";
            const badgeColor = clusterBadgeColors[cluster.slug] ?? "text-violet-400";
            return (
              <Link
                key={cluster.slug}
                href={`/categoria/${cluster.slug}`}
                className={`group relative rounded-2xl border bg-gradient-to-br to-[#12121e] ${accent} p-5 transition-all hover:-translate-y-0.5`}
              >
                <div className="text-2xl mb-3">{cluster.emoji}</div>
                <h3 className="font-semibold text-[#e8e6f0] mb-1 text-sm">
                  {cluster.name}
                </h3>
                <p className="text-xs text-[#6b6880] leading-relaxed mb-3 line-clamp-2">
                  {cluster.description}
                </p>
                <span className={`text-xs font-semibold ${badgeColor}`}>
                  Ver guía →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Artículo destacado ───────────────────────────────────────────────── */}
      {featuredArticle && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c6af7]">
              Artículo destacado
            </p>
          </div>
          <ArticleCard article={featuredArticle} featured />
        </section>
      )}

      {/* ── AdSense — posición natural entre contenidos ───────────────────────── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-14">
        <AdSlot slot="header-below" />
      </div>

      {/* ── Cómo trabajamos — sección editorial única ────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-2xl border border-[#2a2a4a] bg-[#1a1a2e] p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#7c6af7] mb-3">
                Cómo trabajamos
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-[#f0eeff] mb-4 leading-tight">
                No &ldquo;qué significa&rdquo;.<br />Sino qué te está pasando.
              </h2>
              <p className="text-sm text-[#8b87a0] leading-relaxed">
                Millones de webs te dicen &ldquo;soñar con serpientes significa traición&rdquo;.
                Eso no te sirve. Tus sueños nacen de tu historia, tu momento y lo que
                tu mente necesita procesar ahora. Conectamos lo que soñaste con lo que estás viviendo.
                Psicología real. Sin magia.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "🧠", title: "Psicología real", desc: "REM, Jung, Walker. Ciencia del sueño aplicada" },
                { icon: "🪞", title: "Tu momento vital", desc: "Conecta tu sueño con lo que vives ahora" },
                { icon: "💬", title: "Sin jerga", desc: "Cercano, honesto y directo. Sin esoterismo" },
                { icon: "⚡", title: "Acción concreta", desc: "Siempre con un paso práctico para tu vida" },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-[#2a2a4a] bg-[#12121e] p-4">
                  <div className="text-xl mb-2">{item.icon}</div>
                  <p className="text-xs font-semibold text-[#e8e6f0] mb-1">{item.title}</p>
                  <p className="text-xs text-[#6b6880] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Últimos artículos ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#f0eeff] mb-1">
              Artículos recientes
            </h2>
            <p className="text-[#8b87a0] text-sm">
              Publicados cada semana.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm text-[#7c6af7] hover:text-[#9580ff] transition-colors whitespace-nowrap"
          >
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {latest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* ── CTA Interpretador ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative overflow-hidden rounded-2xl border border-[#7c6af7]/30 bg-gradient-to-br from-[#1a1a2e] via-[#7c6af7]/5 to-[#12121e] p-10 md:p-14 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#7c6af7] opacity-10 blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="text-5xl mb-4">🪞</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#f0eeff] mb-3 leading-tight">
              Tienes un sueño que te removió.
            </h2>
            <p className="text-[#8b87a0] mb-2 max-w-md mx-auto leading-relaxed text-sm">
              Descríbelo. Te ayudamos a entender qué está procesando tu mente
              y con qué de tu vida conecta.
            </p>
            <p className="text-xs text-[#4a4760] mb-7">
              Sin registro. Sin coste. Solo escribe lo que soñaste.
            </p>
            <Link
              href="/interpretador"
              className="inline-block rounded-full bg-[#7c6af7] px-10 py-4 text-base font-semibold text-white hover:bg-[#9580ff] transition-colors shadow-xl shadow-[#7c6af7]/30"
            >
              Entender mi sueño ahora
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
