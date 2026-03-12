import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre nosotros — EntiendetuSueño",
  description:
    "Conoce el equipo y la metodología detrás de EntiendetuSueño: psicología del sueño, simbolismo jungiano y utilidad práctica. Cómo interpretamos los sueños y en qué nos basamos.",
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
          Por qué existe EntiendetuSueño<br />y cómo trabajamos
        </h1>
        <p className="text-lg text-[#8b87a0] leading-relaxed">
          Hay miles de páginas que te dicen qué significa soñar con serpientes. La mayoría
          son listas de símbolos sin contexto, escritas para posicionar, no para ayudar.
          Esta web nació del convencimiento de que los sueños merecen mejor trato.
        </p>
      </div>

      <div className="space-y-8">

        {/* Quiénes somos */}
        <section className="rounded-2xl border border-[#2a2a4a] bg-[#1a1a2e] p-8">
          <h2 className="text-xl font-bold text-[#f0eeff] mb-4">Quiénes somos</h2>
          <p className="text-[#8b87a0] leading-relaxed mb-4">
            EntiendetuSueño es un proyecto editorial especializado en psicología del sueño
            e interpretación onírica en español. El equipo que lo sostiene tiene formación
            en psicología, con especialización en psicología analítica (tradición junguiana)
            y años de trabajo con el material onírico tanto en contexto clínico como personal.
          </p>
          <p className="text-[#8b87a0] leading-relaxed mb-4">
            No somos adivinos ni astrólogos. Somos personas que llevan mucho tiempo estudiando
            seriamente lo que ocurre cuando dormimos, qué produce el inconsciente y cómo ese
            material puede ser útil para la vida real de quien se despierta con una imagen
            que no entiende pero que siente que importa.
          </p>
          <p className="text-[#8b87a0] leading-relaxed">
            Hemos analizado miles de relatos de sueños. Lo que más nos ha enseñado no son
            los libros —aunque los libros importan— sino la consistencia con que los mismos
            símbolos conectan con los mismos patrones vitales, una y otra vez, en personas
            de culturas, edades y circunstancias completamente distintas.
          </p>
        </section>

        {/* Metodología de 3 capas */}
        <section className="rounded-2xl border border-[#2a2a4a] bg-[#1a1a2e] p-8">
          <h2 className="text-xl font-bold text-[#f0eeff] mb-2">Nuestra metodología: 3 capas</h2>
          <p className="text-sm text-[#6b6880] mb-6 leading-relaxed">
            Cada artículo de esta web pasa por tres capas de análisis. Publicamos cuando
            las tres están presentes. Si falta una, el artículo no está terminado.
          </p>
          <div className="space-y-5">
            {[
              {
                num: "01",
                title: "Capa psicológica",
                desc: "Qué dice la psicología contemporánea y analítica sobre este símbolo o experiencia. Nos basamos en Jung, en la neurociencia del sueño (Walker, Hobson, Stickgold) y en la evidencia clínica sobre el procesamiento onírico. No usamos psicología pop ni afirmaciones sin respaldo.",
                color: "text-violet-400",
              },
              {
                num: "02",
                title: "Capa simbólica",
                desc: "Cómo aparece este símbolo en diferentes culturas, mitologías y tradiciones. La serpiente en el hinduismo no es la serpiente del Génesis, y esa diferencia importa. Buscamos el sustrato común y las variaciones culturales relevantes para el lector hispanohablante.",
                color: "text-cyan-400",
              },
              {
                num: "03",
                title: "Capa práctica",
                desc: "Qué puede hacer con esto alguien que acaba de despertar con ese sueño. No reflexiones abstractas: preguntas concretas, conexiones con áreas reales de la vida (relaciones, trabajo, decisiones, salud emocional) y pasos accionables. Esta capa es la que más nos diferencia.",
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
              "No interpretamos sueños como presagios o predicciones del futuro.",
              "No ofrecemos lecturas esotéricas, numerología ni astrología.",
              "No afirmamos que haya un único significado correcto para ningún símbolo.",
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
            que no es teoría: es lo que hemos observado trabajando con material onírico real,
            los patrones que se repiten, los relatos que cambian cómo entendemos un símbolo.
          </p>
          <p className="text-[#c0b8f0] leading-relaxed">
            Esa sección existe porque creemos que la interpretación de sueños sin experiencia
            humana acumulada es solo académica. Y la experiencia sin marco teórico es solo
            intuición. Las dos juntas son lo que hace útil este trabajo.
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
