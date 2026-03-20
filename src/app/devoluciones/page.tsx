import type { Metadata } from "next";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Política de Devoluciones — EntiendetuSueño",
  description: "Política de devoluciones y reembolsos de entiendetusueno.com.",
  alternates: { canonical: `${SITE_URL}/devoluciones` },
  robots: { index: false },
};

const SECTIONS = [
  {
    title: "Producto digital de entrega inmediata",
    content: `EntiendetuSueño vende informes personalizados de interpretación de sueños generados mediante inteligencia artificial. Se trata de contenido digital entregado de forma inmediata tras el pago.

De acuerdo con el artículo 103.m) del Real Decreto Legislativo 1/2007 (Texto Refundido de la Ley General para la Defensa de los Consumidores y Usuarios), el derecho de desistimiento de 14 días no aplica a los contratos de suministro de contenido digital no prestado en soporte material, cuando la ejecución haya comenzado con el previo consentimiento expreso del consumidor y el reconocimiento de que pierde su derecho de desistimiento.

Al completar el pago, el usuario presta dicho consentimiento expreso.`,
  },
  {
    title: "Cuándo sí realizamos reembolsos",
    content: `Aunque el derecho de desistimiento no aplica, procesamos reembolsos en los siguientes casos:

— El informe no fue entregado correctamente por un error técnico de nuestra parte.
— El contenido generado está incompleto o es manifiestamente ilegible.
— Se ha producido un cargo duplicado o no autorizado.

En estos casos, contáctanos en hola@entiendetusueno.com con el asunto "Solicitud de reembolso" e indica el email con el que realizaste el pago. Resolveremos tu solicitud en un plazo máximo de 3 días hábiles.`,
  },
  {
    title: "Cómo solicitarlo",
    content: `1. Envía un email a hola@entiendetusueno.com con el asunto "Solicitud de reembolso".
2. Indica el email con el que realizaste el pago y la fecha aproximada.
3. Describe brevemente el motivo.

Si el reembolso procede, lo tramitaremos a través de Stripe en un plazo de 3–5 días hábiles. El importe aparecerá en tu cuenta según los plazos de tu entidad bancaria.`,
  },
  {
    title: "Contacto",
    content: `Para cualquier duda sobre pagos o devoluciones, escríbenos a hola@entiendetusueno.com. Respondemos en menos de 48 horas en días laborables.`,
  },
];

export default function DevolucionesPage() {
  const lastUpdate = "20 de marzo de 2025";
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-[#f0eeff] mb-2">Política de Devoluciones</h1>
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
