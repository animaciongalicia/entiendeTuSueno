import type { Metadata } from "next";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Aviso Legal — EntiendetuSueño",
  description: "Aviso legal e información del responsable del sitio web entiendetusueno.com.",
  alternates: { canonical: `${SITE_URL}/aviso-legal` },
  robots: { index: false },
};

const SECTIONS = [
  {
    title: "1. Datos identificativos",
    content: `En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa:

Titular: [Tu nombre completo o razón social]
NIF/CIF: [Tu NIF o CIF]
Domicilio: [Tu dirección postal]
Email de contacto: hola@entiendetusueno.com
Sitio web: entiendetusueno.com`,
  },
  {
    title: "2. Objeto",
    content: `El presente Aviso Legal regula el acceso y uso del sitio web entiendetusueno.com, titularidad del responsable indicado en el apartado anterior.

El acceso al sitio web y el uso de sus contenidos implica la aceptación plena y sin reservas de las condiciones establecidas en este Aviso Legal.`,
  },
  {
    title: "3. Propiedad intelectual e industrial",
    content: `Todos los contenidos del sitio web entiendetusueno.com (textos, imágenes, diseño gráfico, código fuente, logotipos y cualquier otro elemento) son propiedad del titular o de terceros que han autorizado su uso, y están protegidos por la legislación española e internacional de propiedad intelectual e industrial.

Queda expresamente prohibida la reproducción, distribución, comunicación pública o transformación de dichos contenidos sin autorización expresa del titular.`,
  },
  {
    title: "4. Responsabilidad",
    content: `El titular no se hace responsable de los daños y perjuicios que pudieran derivarse de:

— El uso incorrecto del sitio web o de sus servicios.
— La interrupción, error o fallo en el acceso al sitio.
— La presencia de virus o elementos dañinos en los contenidos.
— Los contenidos de sitios web de terceros enlazados desde este sitio.

Los análisis de interpretación de sueños tienen carácter orientativo y no constituyen diagnóstico psicológico ni consejo médico.`,
  },
  {
    title: "5. Política de privacidad y cookies",
    content: `El tratamiento de datos personales y el uso de cookies se rige por la Política de Privacidad disponible en entiendetusueno.com/privacidad, en cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).`,
  },
  {
    title: "6. Legislación aplicable y jurisdicción",
    content: `Este Aviso Legal se rige por la legislación española. Para la resolución de cualquier controversia derivada del acceso o uso de este sitio web, las partes se someten a los Juzgados y Tribunales competentes según la normativa vigente.`,
  },
];

export default function AvisoLegalPage() {
  const lastUpdate = "20 de marzo de 2025";
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-[#f0eeff] mb-2">Aviso Legal</h1>
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
