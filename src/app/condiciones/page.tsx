import type { Metadata } from "next";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Condiciones de Servicio — EntiendetuSueño",
  description: "Condiciones de uso y servicio de entiendetusueno.com.",
  alternates: { canonical: `${SITE_URL}/condiciones` },
  robots: { index: false },
};

const SECTIONS = [
  {
    title: "1. Objeto y aceptación",
    content: `Las presentes Condiciones de Servicio regulan el uso del sitio web entiendetusueno.com y la contratación del servicio de informes personalizados de interpretación de sueños.

Al utilizar este sitio web o contratar cualquiera de nuestros servicios, el usuario acepta íntegramente las presentes condiciones. Si no estás de acuerdo con alguno de los puntos, debes abstenerte de usar el servicio.`,
  },
  {
    title: "2. Descripción del servicio",
    content: `EntiendetuSueño ofrece un servicio de interpretación de sueños basado en inteligencia artificial y psicología junguiana. El servicio incluye:

— Análisis gratuito: Vista previa orientativa del sueño, accesible sin pago.
— Informe completo (4,99 €): Análisis detallado de 1.500-2.000 palabras con significado central, símbolos, mensaje del subconsciente, bloqueos emocionales, patrones y consejo práctico.

El informe es generado mediante inteligencia artificial y tiene carácter exclusivamente orientativo. No constituye diagnóstico psicológico ni tratamiento médico, y no sustituye la consulta con un profesional de salud mental.`,
  },
  {
    title: "3. Proceso de compra y pago",
    content: `El pago del informe completo se realiza a través de Stripe, plataforma de pagos segura. El precio es de 4,99 € (IVA incluido), pago único sin suscripción.

El usuario recibirá acceso inmediato al informe completo tras confirmar el pago. Al proceder con el pago, el usuario acepta expresamente recibir el contenido digital de forma inmediata.`,
  },
  {
    title: "4. Derecho de desistimiento y devoluciones",
    content: `De conformidad con el artículo 103.m) del Real Decreto Legislativo 1/2007 (TRLGDCU), el derecho de desistimiento no es aplicable a los contratos de suministro de contenido digital que no se preste en soporte material cuando la ejecución haya comenzado con previo consentimiento expreso del consumidor.

Al solicitar el informe y proceder al pago, el usuario presta su consentimiento expreso para la entrega inmediata del contenido digital, renunciando expresamente al derecho de desistimiento de 14 días.

Para más información sobre nuestra política de devoluciones, consulta la página específica en entiendetusueno.com/devoluciones.`,
  },
  {
    title: "5. Propiedad intelectual",
    content: `Los informes generados son de uso personal y exclusivo del usuario que los adquiere. Queda prohibida su reproducción, distribución o comercialización total o parcial sin autorización expresa.

Los contenidos del sitio web (textos, imágenes, diseño, código) son propiedad de EntiendetuSueño y están protegidos por la legislación de propiedad intelectual vigente.`,
  },
  {
    title: "6. Limitación de responsabilidad",
    content: `EntiendetuSueño no garantiza la exactitud, completitud ni adecuación de los análisis generados por inteligencia artificial a las circunstancias particulares de cada usuario.

El servicio se presta «tal cual», sin garantías de ningún tipo. EntiendetuSueño no será responsable de ningún daño directo, indirecto o consecuente derivado del uso de los informes.`,
  },
  {
    title: "7. Protección de datos",
    content: `El tratamiento de los datos personales del usuario se realiza conforme a lo establecido en nuestra Política de Privacidad, disponible en entiendetusueno.com/privacidad, y de acuerdo con el RGPD y la LOPDGDD.`,
  },
  {
    title: "8. Legislación aplicable",
    content: `Estas condiciones se rigen por la legislación española. Para cualquier controversia derivada del uso del servicio, las partes se someten a los Juzgados y Tribunales del domicilio del consumidor, conforme a la normativa de protección de consumidores vigente.`,
  },
  {
    title: "9. Modificaciones",
    content: `EntiendetuSueño se reserva el derecho a modificar las presentes condiciones en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en el sitio web. El uso continuado del servicio tras la publicación implica la aceptación de las nuevas condiciones.`,
  },
];

export default function CondicionesPage() {
  const lastUpdate = "20 de marzo de 2025";
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-[#f0eeff] mb-2">Condiciones de Servicio</h1>
      <p className="text-xs text-[#4a4760] mb-10">Última actualización: {lastUpdate}</p>
      <div className="space-y-4">
        {SECTIONS.map((s) => (
          <section key={s.title} className="rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-6">
            <h2 className="text-base font-semibold text-[#e8e6f0] mb-3">{s.title}</h2>
            <div className="space-y-3">
              {s.content.split("\n\n").map((p, i) => (
                <p key={i} className="text-sm text-[#8b87a0] leading-relaxed whitespace-pre-line">{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
