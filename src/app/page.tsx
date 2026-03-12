import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
import { articles } from "@/lib/articles";
import { clusters } from "@/lib/clusters";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EntiendetuSueño — Interpretación de Sueños en Español",
  description:
    "Descubre el significado de tus sueños con interpretaciones profundas, cercanas y en español. Psicología, espiritualidad y autoconocimiento a través de tus sueños.",
  openGraph: {
    title: "EntiendetuSueño — Interpretación de Sueños en Español",
    description:
      "Descubre el significado de tus sueños con interpretaciones profundas, cercanas y en español.",
    type: "website",
    locale: "es_ES",
    url: "https://entiendetusueno.com",
  },
};

const clusterEmojis: Record<string, string> = {
  "suenos-con-animales": "🐍",
  "suenos-con-personas": "👥",
  "suenos-con-muerte-y-miedo": "🌑",
  "suenos-de-amor-y-ex-pareja": "💜",
  "suenos-de-dinero-y-trabajo": "✨",
  "suenos-espirituales": "🌙",
};

const clusterAccents: Record<string, string> = {
  "suenos-con-animales": "from-emerald-500/10 border-emerald-500/20 hover:border-emerald-400/40",
  "suenos-con-personas": "from-indigo-500/10 border-indigo-500/20 hover:border-indigo-400/40",
  "suenos-con-muerte-y-miedo": "from-violet-500/10 border-violet-500/20 hover:border-violet-400/40",
  "suenos-de-amor-y-ex-pareja": "from-pink-500/10 border-pink-500/20 hover:border-pink-400/40",
  "suenos-de-dinero-y-trabajo": "from-amber-500/10 border-amber-500/20 hover:border-amber-400/40",
  "suenos-espirituales": "from-cyan-500/10 border-cyan-500/20 hover:border-cyan-400/40",
};

const clusterBadgeColors: Record<string, string> = {
  "suenos-con-animales": "text-emerald-400",
  "suenos-con-personas": "text-indigo-400",
  "suenos-con-muerte-y-miedo": "text-violet-400",
  "suenos-de-amor-y-ex-pareja": "text-pink-400",
  "suenos-de-dinero-y-trabajo": "text-amber-400",
  "suenos-espirituales": "text-cyan-400",
};

export default function HomePage() {
  const latest = articles.slice(0, 3);

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
            Interpretación de sueños en español
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-[#f0eeff] leading-tight mb-6">
            Tus sueños no son<br />
            <span className="text-[#7c6af7]">casualidad</span>
          </h1>

          <p className="text-lg md:text-xl text-[#8b87a0] max-w-2xl mx-auto mb-4 leading-relaxed">
            Cada noche tu inconsciente trabaja. Procesa lo que el día no pudo, te muestra lo que evitas ver,
            te prepara para lo que viene. <strong className="text-[#c0b8f0] font-normal">EntiendetuSueño</strong> te ayuda
            a descifrar esos mensajes con profundidad, honestidad y en español.
          </p>
          <p className="text-base text-[#6b6880] max-w-xl mx-auto mb-10 leading-relaxed">
            Sin supersticiones. Sin interpretaciones genéricas. Psicología real, espiritualidad con fundamento
            y el reconocimiento de que tu sueño dice algo específico sobre <em>tu</em> vida.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/interpretador"
              className="rounded-full bg-[#7c6af7] px-7 py-3.5 text-base font-medium text-white hover:bg-[#9580ff] transition-colors shadow-lg shadow-[#7c6af7]/20"
            >
              Interpretar mi sueño →
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
            Cada cluster reúne artículos relacionados, una guía completa y el contexto psicológico
            y espiritual que necesitas para entender el mensaje.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {clusters.map((cluster) => {
            const emoji = clusterEmojis[cluster.slug] ?? "🌙";
            const accent = clusterAccents[cluster.slug] ?? "from-violet-500/10 border-violet-500/20 hover:border-violet-400/40";
            const badgeColor = clusterBadgeColors[cluster.slug] ?? "text-violet-400";

            return (
              <Link
                key={cluster.slug}
                href={`/categoria/${cluster.slug}`}
                className={`group relative rounded-2xl border bg-gradient-to-br to-[#1a1a2e] ${accent} p-6 transition-all hover:-translate-y-0.5`}
              >
                <div className="text-3xl mb-4">{emoji}</div>
                <h3 className={`font-bold text-[#f0eeff] mb-2 group-hover:${badgeColor} transition-colors`}>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                Sobre este proyecto
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#f0eeff] mb-4 leading-tight">
                Interpretaciones que van<br />más allá del símbolo
              </h2>
              <p className="text-[#8b87a0] leading-relaxed mb-4">
                Hay millones de páginas que te dicen &ldquo;soñar con serpientes significa traición&rdquo;. Aquí no hacemos eso.
                Porque tus sueños no son genéricos: son tuyos, nacen de tu historia, tu momento vital y lo que
                tu inconsciente específicamente necesita comunicarte.
              </p>
              <p className="text-[#8b87a0] leading-relaxed">
                Combinamos psicología profunda —Jung, Freud, la investigación contemporánea del sueño— con
                las tradiciones espirituales más ricas del mundo y la voz humana cercana que convierte
                el conocimiento en algo que puedes usar en tu vida real.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🧠", title: "Psicología real", desc: "Jung, Freud y la ciencia del sueño contemporánea" },
                { icon: "🌙", title: "Espiritualidad", desc: "Chamanismo, budismo, tradiciones del mundo entero" },
                { icon: "✍️", title: "Voz humana", desc: "Cercana, honesta, sin jerga ni superstición" },
                { icon: "🔍", title: "Tu contexto", desc: "Cada interpretación conecta con la vida real" },
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
            Cómo funciona esta web
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#f0eeff] mb-5 leading-tight max-w-2xl mx-auto">
            Esto no es un horóscopo.<br />Es una guía práctica para tu vida real.
          </h2>
          <p className="text-[#8b87a0] max-w-2xl mx-auto leading-relaxed text-base">
            Esta web no interpreta sueños con listas de símbolos ni predicciones vacías.
            Es una guía para entender qué te está diciendo tu mente mientras duermes
            y qué puedes hacer con esa información cuando despiertas.
            Cada artículo combina psicología, simbolismo y utilidad concreta para tu vida:
            tus relaciones, tu trabajo, tu dinero, tu ansiedad, tus decisiones importantes.
            Porque un sueño que no conecta con tu vida real no sirve para nada.
          </p>
        </div>
      </section>

      {/* ── CTA Interpretador ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative overflow-hidden rounded-2xl border border-[#7c6af7]/30 bg-gradient-to-br from-[#1a1a2e] via-[#7c6af7]/5 to-[#12121e] p-10 md:p-16 text-center">
          {/* Decorative glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#7c6af7] opacity-10 blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="text-5xl mb-5">✨</div>
            <h2 className="text-2xl md:text-4xl font-bold text-[#f0eeff] mb-4 leading-tight">
              ¿Tuviste un sueño que no entiendes?
            </h2>
            <p className="text-[#8b87a0] mb-2 max-w-lg mx-auto leading-relaxed">
              Descríbelo y nuestro interpretador analiza sus símbolos, su contexto emocional y
              lo que probablemente te está señalando tu inconsciente.
            </p>
            <p className="text-sm text-[#4a4760] mb-8 max-w-sm mx-auto">
              Sin registro. Sin coste. Solo escribe lo que soñaste.
            </p>
            <Link
              href="/interpretador"
              className="inline-block rounded-full bg-[#7c6af7] px-10 py-4 text-base font-semibold text-white hover:bg-[#9580ff] transition-colors shadow-xl shadow-[#7c6af7]/30"
            >
              Interpretar mi sueño ahora
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
