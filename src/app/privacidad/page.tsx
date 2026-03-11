import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad de EntiendetuSueño. Información sobre cómo tratamos tus datos, el uso de cookies y los servicios de terceros.",
  robots: { index: false },
};

export default function PrivacidadPage() {
  const lastUpdate = "1 de enero de 2025";

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-[#f0eeff] mb-2">Política de Privacidad</h1>
      <p className="text-xs text-[#4a4760] mb-10">Última actualización: {lastUpdate}</p>

      <div className="space-y-8 prose-cosmos">
        {[
          {
            title: "1. Responsable del tratamiento",
            content:
              "EntiendetuSueño, accesible en entiendetusueno.com, es el responsable del tratamiento de los datos recogidos a través de este sitio web.",
          },
          {
            title: "2. Datos que recogemos",
            content:
              "Este sitio no recoge datos personales directamente. Sin embargo, utilizamos servicios de terceros (Google Analytics y Google AdSense) que pueden recoger información técnica como la dirección IP, el tipo de navegador, las páginas visitadas y la duración de la visita con fines estadísticos y publicitarios.",
          },
          {
            title: "3. Google Analytics",
            content:
              "Utilizamos Google Analytics 4 para analizar el tráfico de nuestro sitio web. Google Analytics recoge información sobre el uso del sitio de forma anónima y agregada. Puedes optar por no ser rastreado instalando el complemento de inhabilitación del navegador de Google Analytics disponible en tools.google.com/dlpage/gaoptout.",
          },
          {
            title: "4. Google AdSense",
            content:
              "Mostramos anuncios a través de Google AdSense. Google puede usar cookies para servir anuncios basados en las visitas previas de los usuarios a nuestro sitio u otros sitios de internet. Puedes inhabilitar la publicidad personalizada visitando la Configuración de anuncios de Google en adssettings.google.com.",
          },
          {
            title: "5. Cookies",
            content:
              "Este sitio utiliza cookies técnicas propias necesarias para el funcionamiento del sitio, así como cookies de terceros de Google Analytics y Google AdSense con fines estadísticos y publicitarios. Al continuar usando el sitio, aceptas el uso de estas cookies.",
          },
          {
            title: "6. Tus derechos",
            content:
              "De acuerdo con el RGPD y la normativa española de protección de datos, tienes derecho de acceso, rectificación, cancelación y oposición al tratamiento de tus datos personales. Para ejercer estos derechos, puedes contactarnos a través de la dirección de correo indicada en nuestra página de contacto.",
          },
          {
            title: "7. Menores de edad",
            content:
              "Este sitio web no está dirigido a menores de 16 años y no recoge conscientemente datos de menores. Si crees que un menor nos ha proporcionado datos personales, por favor contáctanos para proceder a su eliminación.",
          },
          {
            title: "8. Cambios en la política",
            content:
              "Nos reservamos el derecho a modificar esta política de privacidad. Cualquier cambio será publicado en esta página con la fecha de actualización correspondiente. Te recomendamos revisar esta página periódicamente.",
          },
        ].map((section) => (
          <section key={section.title} className="rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-6">
            <h2 className="text-base font-semibold text-[#e8e6f0] mb-3">{section.title}</h2>
            <p className="text-sm text-[#8b87a0] leading-relaxed">{section.content}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
