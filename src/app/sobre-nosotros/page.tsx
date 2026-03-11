import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description:
    "Conoce el equipo detrás de EntiendetuSueño, el blog de interpretación de sueños en español. Nuestra misión es hacer accesible el fascinante mundo de los sueños.",
};

export default function SobreNosotrosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">🌙</div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#f0eeff] mb-4">
          Sobre nosotros
        </h1>
        <p className="text-[#8b87a0] max-w-md mx-auto leading-relaxed">
          Somos un equipo apasionado por el mundo onírico y por hacer accesible
          la interpretación de sueños a todos los hispanohablantes.
        </p>
      </div>

      <div className="space-y-8 prose-cosmos">
        <section className="rounded-2xl border border-[#2a2a4a] bg-[#1a1a2e] p-8">
          <h2 className="text-xl font-bold text-[#f0eeff] mb-4">Nuestra misión</h2>
          <p className="text-[#8b87a0] leading-relaxed">
            En EntiendetuSueño creemos que los sueños son ventanas al inconsciente, herramientas
            de autoconocimiento que han acompañado al ser humano desde el principio de los tiempos.
            Sin embargo, la mayoría de los recursos disponibles en internet sobre interpretación de
            sueños están en inglés, son superficiales o carecen del rigor y la calidez que merece
            este tema.
          </p>
          <p className="text-[#8b87a0] leading-relaxed mt-4">
            Por eso creamos EntiendetuSueño: para ofrecer interpretaciones profundas, fundamentadas
            en psicología y simbolismo, escritas en español y con un tono cercano que acompañe al
            lector en su exploración interior.
          </p>
        </section>

        <section className="rounded-2xl border border-[#2a2a4a] bg-[#1a1a2e] p-8">
          <h2 className="text-xl font-bold text-[#f0eeff] mb-4">Nuestro enfoque</h2>
          <ul className="space-y-3">
            {[
              {
                title: "Psicología profunda",
                desc: "Nos apoyamos en la psicología jungiana, el análisis de los arquetipos y las últimas investigaciones sobre el sueño.",
              },
              {
                title: "Simbolismo universal",
                desc: "Estudiamos cómo los mismos símbolos aparecen en distintas culturas y tradiciones, buscando el núcleo universal de cada imagen onírica.",
              },
              {
                title: "Tono humano",
                desc: "Escribimos como si estuviéramos hablando contigo, no como si redactáramos una enciclopedia. Los sueños son personales y nuestro trato también.",
              },
              {
                title: "Sin superstición",
                desc: "No creemos en presagios ni en magia. Los sueños son fenómenos psicológicos fascinantes que revelan tu mundo interior, nada más y nada menos.",
              },
            ].map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="text-[#7c6af7] mt-1">✦</span>
                <div>
                  <span className="font-medium text-[#e8e6f0]">{item.title}: </span>
                  <span className="text-[#8b87a0]">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-[#2a2a4a] bg-[#1a1a2e] p-8">
          <h2 className="text-xl font-bold text-[#f0eeff] mb-4">Aviso importante</h2>
          <p className="text-[#8b87a0] leading-relaxed text-sm">
            La interpretación de sueños es un ejercicio de autoconocimiento y reflexión personal.
            Los contenidos de EntiendetuSueño son de carácter orientativo e informativo, y{" "}
            <strong className="text-[#e8e6f0]">no sustituyen en ningún caso el consejo o el tratamiento
            de un profesional de la salud mental</strong>. Si estás atravesando un momento difícil
            o tienes sueños perturbadores recurrentes, te animamos a contactar con un psicólogo
            o psicoterapeuta.
          </p>
        </section>
      </div>

      <div className="mt-10 text-center">
        <p className="text-[#8b87a0] mb-4">¿Listo para explorar tus sueños?</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/blog"
            className="rounded-full bg-[#7c6af7] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#9580ff] transition-colors"
          >
            Explorar artículos
          </Link>
          <Link
            href="/interpretador"
            className="rounded-full border border-[#2a2a4a] px-6 py-2.5 text-sm font-medium text-[#e8e6f0] hover:border-[#7c6af7] transition-colors"
          >
            Interpretador de sueños
          </Link>
        </div>
      </div>
    </div>
  );
}
