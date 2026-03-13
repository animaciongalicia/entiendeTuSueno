import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre nosotros — EntiendetuSueño",
  description:
    "Conoce el equipo y la metodología detrás de EntiendetuSueño: psicología del sueño, simbolismo jungiano y utilidad práctica. Cómo interpretamos los sueños y en qué nos basamos.",
  alternates: { canonical: "https://entiendetusueno.com/sobre-nosotros" },
  openGraph: {
    title: "Sobre nosotros — EntiendetuSueño",
    description:
      "Cómo interpretamos los sueños, en qué nos basamos y por qué este proyecto existe.",
  },
};

// Señales E-E-A-T explícitas:
// Experience: describimos la experiencia acumulada con relatos reales
// Expertise: metodología de 3 capas, referencias a fuentes académicas y clínicas
// Authoritativeness: formación, referencias nombradas, disclaimer médico
// Trustworthiness: honestidad sobre límites, sin promesas falsas, contacto visible

const fuentes = [
  {
    autor: "Carl G. Jung",
    obra: "El hombre y sus símbolos (1964)",
    relevancia: "Base de la psicología de los arquetipos y el inconsciente colectivo que aplicamos en la interpretación simbólica.",
  },
  {
    autor: "Matthew Walker",
    obra: "Por qué dormimos (2017)",
    relevancia: "Investigación contemporánea sobre las funciones del sueño REM en el procesamiento emocional y la consolidación de memoria.",
  },
  {
    autor: "Sigmund Freud",
    obra: "La interpretación de los sueños (1899)",
    relevancia: "Marco fundacional del análisis onírico. Aplicamos sus aportaciones con perspectiva crítica y complementadas con psicología posterior.",
  },
  {
    autor: "Gayle Delaney",
    obra: "Living Your Dreams (1979)",
    relevancia: "Método de entrevista onírica y trabajo práctico con los sueños desde una perspectiva no interpretativa.",
  },
  {
    autor: "Antonio Zadra & Robert Stickgold",
    obra: "When Brains Dream (2021)",
    relevancia: "Neurociencia del sueño y evidencia empírica sobre la función del sueño en la regulación emocional y el aprendizaje.",
  },
];

export default function SobreNosotrosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">

      {/* Cabecera */}
      <div className="mb-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#7c6af7] mb-4">
          El proyecto
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#f0eeff] leading-tight mb-5">
          No te decimos lo que significa tu sueño.<br />
          <span className="text-[#9580ff]">Te ayudamos a entender qué te está pasando.</span>
        </h1>
        <p className="text-lg text-[#8b87a0] leading-relaxed">
          Hay miles de páginas que te dicen &ldquo;soñar con serpientes significa traición&rdquo;.
          Eso no te sirve. Porque tus sueños no son genéricos: nacen de tu historia,
          tu momento vital y lo que tu inconsciente necesita procesar ahora mismo.
          Esta web nació del convencimiento de que los sueños merecen mejor trato.
        </p>
      </div>

      <div className="space-y-8">

        {/* Quiénes somos */}
        <section className="rounded-2xl border border-[#2a2a4a] bg-[#1a1a2e] p-8">
          <h2 className="text-xl font-bold text-[#f0eeff] mb-4">Quiénes somos</h2>
          <p className="text-[#8b87a0] leading-relaxed mb-4">
            EntiendetuSueño es un proyecto especializado en psicología del sueño en español.
            El equipo tiene formación en psicología —con énfasis en la tradición junguiana y
            en la neurociencia del sueño— y años de trabajo con material onírico real,
            tanto en contexto clínico como personal.
          </p>
          <p className="text-[#8b87a0] leading-relaxed mb-4">
            No somos adivinos ni astrólogos. Somos personas convencidas de que los sueños
            son un material psicológico valioso —no magia— y de que la persona que se despierta
            con un sueño que le pesa merece algo más que una lista de símbolos.
            Merece una herramienta para conectar ese sueño con su propia vida.
          </p>
          <p className="text-[#8b87a0] leading-relaxed">
            Lo que más nos ha enseñado no son los libros —aunque los libros importan—
            sino la consistencia con que los mismos patrones emocionales se repiten
            en personas de edades, culturas y circunstancias completamente distintas.
            El sueño cambia. La emoción que procesa, casi nunca.
          </p>
        </section>

        {/* Metodología de 3 capas */}
        <section className="rounded-2xl border border-[#2a2a4a] bg-[#1a1a2e] p-8">
          <h2 className="text-xl font-bold text-[#f0eeff] mb-2">Cómo lo hacemos: 3 capas</h2>
          <p className="text-sm text-[#6b6880] mb-6 leading-relaxed">
            Cada artículo y cada interpretación pasa por tres capas. Las tres tienen que estar
            presentes para que el resultado sea útil.
          </p>
          <div className="space-y-5">
            {[
              {
                num: "01",
                title: "¿Qué está procesando tu mente?",
                desc: "Qué dice la psicología del sueño sobre lo que ocurre cuando dormimos. Jung, Walker, Hobson, Stickgold. No usamos psicología pop: usamos evidencia sobre el procesamiento emocional durante el sueño REM y cómo el inconsciente trabaja conflictos, miedos y decisiones.",
                color: "text-violet-400",
              },
              {
                num: "02",
                title: "¿Qué simboliza en el contexto humano?",
                desc: "Cómo aparece este símbolo en las culturas, mitologías y tradiciones humanas. No para darte una definición, sino para entender por qué ese símbolo activa lo que activa en tu mente. El sustrato común y las variaciones que importan para un lector hispanohablante de hoy.",
                color: "text-cyan-400",
              },
              {
                num: "03",
                title: "¿Con qué de tu vida conecta?",
                desc: "Qué puede hacer alguien que acaba de tener ese sueño. Preguntas concretas, conexiones con áreas reales —relaciones, trabajo, decisiones, salud emocional, cambios vitales— y un paso accionable. Sin esta capa, el análisis es solo académico. Esta es la que más nos diferencia.",
                color: "text-teal-400",
              },
            ].map((item) => (
              <div key={item.num} className="flex gap-4">
                <span className={`text-2xl font-bold ${item.color} opacity-40 shrink-0 w-8`}>
                  {item.num}
                </span>
                <div>
                  <p className={`font-semibold ${item.color} mb-1`}>{item.title}</p>
                  <p className="text-sm text-[#8b87a0] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lo que no somos */}
        <section className="rounded-2xl border border-[#2a2a4a] bg-[#1a1a2e] p-8">
          <h2 className="text-xl font-bold text-[#f0eeff] mb-4">Lo que no somos</h2>
          <ul className="space-y-3">
            {[
              "No decimos \"este sueño significa X\". Los sueños no tienen un único significado.",
              "No interpretamos sueños como presagios, señales o predicciones del futuro.",
              "No ofrecemos lecturas esotéricas, numerología ni astrología.",
              "No sustituimos el trabajo con un psicólogo o psicoterapeuta.",
              "No generamos contenido diseñado únicamente para posicionar en Google.",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm text-[#8b87a0]">
                <span className="text-[#4a4760] shrink-0">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Fuentes y referencias */}
        <section className="rounded-2xl border border-[#2a2a4a] bg-[#1a1a2e] p-8">
          <h2 className="text-xl font-bold text-[#f0eeff] mb-2">Fuentes y referencias principales</h2>
          <p className="text-sm text-[#6b6880] mb-6 leading-relaxed">
            Estas son las obras y autores que más informan nuestro marco de interpretación.
            Los artículos individuales citan fuentes específicas cuando aplica.
          </p>
          <div className="space-y-4">
            {fuentes.map((f) => (
              <div key={f.obra} className="border-l-2 border-[#2a2a4a] pl-4">
                <p className="text-sm font-semibold text-[#e8e6f0]">{f.autor}</p>
                <p className="text-xs text-[#7c6af7] mb-1">{f.obra}</p>
                <p className="text-xs text-[#6b6880] leading-relaxed">{f.relevancia}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interpretación humana */}
        <section className="rounded-2xl border border-[#7c6af7]/20 bg-[#7c6af7]/5 p-8">
          <h2 className="text-xl font-bold text-[#f0eeff] mb-4">La voz humana en cada artículo</h2>
          <p className="text-[#c0b8f0] leading-relaxed mb-4">
            La mayoría de los artículos incluyen una sección llamada{" "}
            <strong className="text-[#e8e6f0]">&ldquo;Interpretación humana&rdquo;</strong>{" "}
            que no es teoría: es lo que hemos observado con material onírico real.
            Los patrones que se repiten. Los relatos de personas que soñaron algo
            en un momento de cambio, de pérdida, de decisión —y cómo ese sueño tenía sentido
            cuando lo conectaban con lo que estaban viviendo.
          </p>
          <p className="text-[#c0b8f0] leading-relaxed">
            Esa sección existe porque la interpretación sin experiencia humana es solo académica.
            Y la experiencia sin marco teórico es solo intuición.
            Las dos juntas son lo que hace útil este trabajo.
          </p>
        </section>

        {/* Aviso médico/legal */}
        <section className="rounded-2xl border border-[#2a2a4a] bg-[#12121e] p-6">
          <h2 className="text-base font-bold text-[#e8e6f0] mb-3">Aviso importante</h2>
          <p className="text-sm text-[#6b6880] leading-relaxed">
            Los contenidos de EntiendetuSueño son de carácter informativo y orientativo.{" "}
            <strong className="text-[#8b87a0]">
              No sustituyen en ningún caso la evaluación o el tratamiento de un profesional
              de la salud mental.
            </strong>{" "}
            Si tienes sueños perturbadores recurrentes, pesadillas vinculadas a un trauma,
            o tus sueños interfieren con tu descanso y bienestar, te recomendamos consultar
            con un psicólogo o psicoterapeuta. La interpretación de sueños es una herramienta
            de autoconocimiento, no un diagnóstico.
          </p>
        </section>

      </div>

      {/* CTA final */}
      <div className="mt-12 text-center">
        <p className="text-[#8b87a0] mb-5 leading-relaxed max-w-sm mx-auto">
          Si quieres explorar tus sueños o entender un sueño concreto que has tenido:
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/interpretador"
            className="rounded-full bg-[#7c6af7] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#9580ff] transition-colors"
          >
            Interpretar un sueño
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-[#2a2a4a] px-6 py-2.5 text-sm font-medium text-[#e8e6f0] hover:border-[#7c6af7] transition-colors"
          >
            Explorar artículos
          </Link>
        </div>
      </div>

    </div>
  );
}
