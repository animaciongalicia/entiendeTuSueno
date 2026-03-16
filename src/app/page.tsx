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
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 md:py-32 px-4">
        {/* Background glows */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#7c6af7] opacity-[0.06] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#9580ff] opacity-[0.06] blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-3xl text-center relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2a2a4a] bg-[#1a1a2e] px-4 py-1.5 text-xs text-[#8b87a0] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7c6af7] animate-pulse" />
            Psicología del sueño · Sin superstición
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#f0eeff] leading-tight mb-6">
            Tuviste un sueño que te removió.<br />
            <span className="text-[#7c6af7]">No buscas magia. Buscas entender.</span>
          </h1>

          <p className="text-lg text-[#8b87a0] max-w-2xl mx-auto mb-3 leading-relaxed">
            <strong className="text-[#c0b8f0] font-normal">entiendeTuSueño</strong> no te dice lo que &ldquo;significa&rdquo; tu sueño.
            Te ayuda a entender <em>qué está pasando en ti</em> cuando lo tienes.
          </p>
          <p className="text-base text-[#6b6880] max-w-xl mx-auto mb-10 leading-relaxed">
            Conectamos lo que soñaste con lo que estás viviendo: tus miedos, tus relaciones,
            tu estrés, tus cambios, tus deseos no dichos. Con psicología, con honestidad y con respeto.
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

      {/* ── AdSense ──────────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-12">
        <AdSlot slot="header-below" />
      </div>

      {/* ── Clusters ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-20">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f0eeff] mb-3">
            ¿Sobre qué soñaste?
          </h2>
          <p className="text-[#8b87a0] max-w-lg">
            Cada guía reúne artículos relacionados con el contexto psicológico, simbólico
            y práctico que necesitas para entender el mensaje.
          </p>
        </div>

        {/* Clusters temáticos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {clusters.filter((c) => c.tipo === "tematico").map((cluster) => {
            const accent = clusterAccents[cluster.slug] ?? "from-violet-500/10 border-violet-500/20 hover:border-violet-400/40";
            const badgeColor = clusterBadgeColors[cluster.slug] ?? "text-violet-400";
            return (
              <Link
                key={cluster.slug}
                href={`/categoria/${cluster.slug}`}
                className={`group relative rounded-2xl border bg-gradient-to-br to-[#1a1a2e] ${accent} p-6 transition-all hover:-translate-y-0.5`}
              >
                <div className="text-3xl mb-4">{cluster.emoji}</div>
                <h3 className="font-bold text-[#f0eeff] mb-2">
                  {cluster.name}
                </h3>
                <p className="text-sm text-[#6b6880] leading-relaxed mb-4">
                  {cluster.description}
                </p>
                <span className={`text-xs font-semibold ${badgeColor}`}>
                  Ver guía completa →
                </span>
              </Link>
            );
          })}
        </div>

        {/* Clusters situacionales y de mecanismo */}
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#4a4760] mb-4">
            Situaciones y patrones
          </p>
        </div>
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
                <p className="text-xs text-[#6b6880] leading-relaxed mb-3">
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

      {/* ── Últimos artículos ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#f0eeff] mb-2">
              Artículos recientes
            </h2>
            <p className="text-[#8b87a0] text-sm">
              Interpretaciones nuevas publicadas cada semana.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm text-[#7c6af7] hover:text-[#9580ff] transition-colors whitespace-nowrap"
          >
            Ver todos →
          </Link>
        </div>

        {/* Featured article (full width) */}
        {featuredArticle && (
          <div className="mb-6">
            <ArticleCard article={featuredArticle} featured />
          </div>
        )}

        {/* Supporting articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {latest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* ── Por qué EntiendetuSueño ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-2xl border border-[#2a2a4a] bg-[#1a1a2e] p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#7c6af7] mb-3">
                Cómo trabajamos
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#f0eeff] mb-4 leading-tight">
                No &ldquo;qué significa&rdquo;.<br />Sino qué te está pasando.
              </h2>
              <p className="text-[#8b87a0] leading-relaxed mb-4">
                Hay millones de páginas que te dicen &ldquo;soñar con serpientes significa traición&rdquo;. Eso no te sirve.
                Porque tus sueños no son genéricos: nacen de tu historia, tu momento vital y lo que
                tu inconsciente necesita procesar ahora.
              </p>
              <p className="text-[#8b87a0] leading-relaxed">
                Nuestro trabajo es conectar lo que soñaste con lo que estás viviendo. Miedos actuales,
                relaciones, decisiones pendientes, estrés acumulado, deseos que no te has dicho.
                Psicología real. Sin magia. Sin vaguedades.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🧠", title: "Psicología del sueño", desc: "Jung, Walker, Hobson. Ciencia del sueño REM y procesamiento emocional" },
                { icon: "🪞", title: "Tu momento vital", desc: "Cada sueño conecta con lo que estás viviendo ahora, no con una lista de símbolos" },
                { icon: "💬", title: "Lenguaje humano", desc: "Sin jerga, sin esoterismo. Cercano, honesto, directo" },
                { icon: "⚡", title: "Acción concreta", desc: "Siempre con una pregunta o paso práctico para tu vida real" },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-[#2a2a4a] bg-[#12121e] p-4">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="text-sm font-semibold text-[#e8e6f0] mb-1">{item.title}</p>
                  <p className="text-xs text-[#6b6880] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Enfoque editorial ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-2xl border border-[#2a2a4a] bg-[#12121e] px-8 py-10 md:px-16 md:py-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7c6af7] mb-4">
            Lo que hacemos diferente
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#f0eeff] mb-5 leading-tight max-w-2xl mx-auto">
            Esto no es un diccionario de sueños.<br />Es un espejo de lo que te está pasando.
          </h2>
          <p className="text-[#8b87a0] max-w-2xl mx-auto leading-relaxed text-base">
            No trabajamos con listas de símbolos ni predicciones vacías.
            Trabajamos con la pregunta que importa: <strong className="text-[#c0b8f0] font-normal">¿qué está procesando tu mente ahora mismo?</strong>
            {" "}Los sueños son el lenguaje del inconsciente cuando trabaja tus miedos, tus relaciones,
            tu estrés, tus cambios y tus deseos no dichos. Nosotros te ayudamos a leerlos.
          </p>
        </div>
      </section>

      {/* ── CTA Interpretador ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative overflow-hidden rounded-2xl border border-[#7c6af7]/30 bg-gradient-to-br from-[#1a1a2e] via-[#7c6af7]/5 to-[#12121e] p-10 md:p-16 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#7c6af7] opacity-10 blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="text-5xl mb-5">🪞</div>
            <h2 className="text-2xl md:text-4xl font-bold text-[#f0eeff] mb-4 leading-tight">
              Tienes un sueño que te removió.
            </h2>
            <p className="text-[#8b87a0] mb-2 max-w-lg mx-auto leading-relaxed">
              Descríbelo. Te ayudamos a entender qué está procesando tu mente,
              qué emociones está trabajando y con qué de tu vida conecta.
            </p>
            <p className="text-sm text-[#4a4760] mb-8 max-w-sm mx-auto">
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
