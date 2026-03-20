import type { Metadata } from "next";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Política de Privacidad — EntiendetuSueño",
  description:
    "Política de privacidad de EntiendetuSueño. Información sobre cómo tratamos tus datos, el uso de cookies y los servicios de terceros.",
  alternates: { canonical: `${SITE_URL}/privacidad` },
  robots: { index: false },
};

const SECTIONS = [
  {
    title: "1. Responsable del tratamiento",
    content: `EntiendetuSueño, accesible en entiendetusueno.com, es el responsable del tratamiento de los datos recogidos a través de este sitio web.\n\nEmail de contacto: hola@entiendetusueno.com`,
  },
  {
    title: "2. Datos que recogemos y para qué",
    content: `Recogemos los siguientes datos personales:\n\n— Email (opcional): cuando el usuario lo facilita voluntariamente al utilizar el interpretador de sueños. Se usa para asociar el informe al usuario.\n\n— Descripción del sueño, sentimientos y símbolos: datos necesarios para generar el análisis. Se almacenan de forma segura vinculados al informe generado.\n\n— Datos de pago: gestionados íntegramente por Stripe. EntiendetuSueño no almacena datos de tarjetas bancarias en ningún momento.\n\n— Datos de navegación: recogidos de forma anónima y agregada mediante Google Analytics 4 con fines estadísticos.`,
  },
  {
    title: "3. Servicios de terceros",
    content: `Este sitio utiliza los siguientes servicios de terceros:\n\n— Stripe (pagos): procesa los pagos de forma segura. Consulta su política en stripe.com/privacy.\n— Supabase (base de datos): almacena los informes generados en servidores dentro de la UE.\n— Anthropic / Claude (IA): procesa la descripción del sueño para generar el análisis. Consulta su política en anthropic.com/privacy.\n— Google Analytics 4: analiza el tráfico del sitio de forma anónima.\n— Google AdSense: muestra anuncios personalizados.`,
  },
  {
    title: "4. Base legal del tratamiento",
    content: `— Ejecución de contrato: para la prestación del servicio de informe de interpretación de sueños.\n— Consentimiento: para el envío de comunicaciones por email.\n— Interés legítimo: para el análisis estadístico del tráfico web.`,
  },
  {
    title: "5. Conservación de los datos",
    content: `Los datos asociados a un informe (email, sueño, análisis) se conservan durante 12 meses desde su creación, transcurridos los cuales son eliminados automáticamente, salvo obligación legal de conservarlos por más tiempo.`,
  },
  {
    title: "6. Cookies",
    content: `Este sitio utiliza cookies técnicas propias necesarias para el funcionamiento del sitio, así como cookies de terceros de Google Analytics y Google AdSense con fines estadísticos y publicitarios. Al continuar usando el sitio, aceptas el uso de estas cookies.`,
  },
  {
    title: "7. Tus derechos (RGPD)",
    content: `De acuerdo con el RGPD y la LOPDGDD, tienes derecho a acceder, rectificar, suprimir y oponerte al tratamiento de tus datos personales, así como a presentar una reclamación ante la Agencia Española de Protección de Datos (aepd.es).\n\nPara ejercer cualquiera de estos derechos, escríbenos a hola@entiendetusueno.com.`,
  },
  {
    title: "8. Menores de edad",
    content: `Este sitio web no está dirigido a menores de 16 años. No recogemos conscientemente datos de menores. Si crees que un menor nos ha proporcionado datos personales, contáctanos para proceder a su eliminación.`,
  },
  {
    title: "9. Cambios en la política",
    content: `Nos reservamos el derecho a modificar esta política de privacidad. Cualquier cambio será publicado en esta página con la fecha de actualización correspondiente.`,
  },
];

export default function PrivacidadPage() {
  const lastUpdate = "20 de marzo de 2025";
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-[#f0eeff] mb-2">Política de Privacidad</h1>
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
