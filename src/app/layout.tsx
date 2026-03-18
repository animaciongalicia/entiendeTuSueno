import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "EntiendetuSueño — Interpretación de Sueños en Español",
    template: "%s | EntiendetuSueño",
  },
  description:
    "Descubre el significado de tus sueños con interpretaciones detalladas, cercanas y basadas en psicología. El blog de sueños en español más completo.",
  keywords: ["interpretación de sueños", "significado de sueños", "sueños en español", "psicología del sueño"],
  authors: [{ name: "EntiendetuSueño" }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "EntiendetuSueño",
    title: "EntiendetuSueño — Interpretación de Sueños en Español",
    description:
      "Descubre el significado de tus sueños con interpretaciones detalladas, cercanas y basadas en psicología.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "EntiendetuSueño",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EntiendetuSueño — Interpretación de Sueños",
    description: "Descubre el significado de tus sueños en español.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Schema global de la entidad — WebSite + Organization
// WebSite: habilita el Sitelinks Searchbox de Google
// Organization: base para el Knowledge Panel y atribución de autoridad
const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "EntiendetuSueño",
      description: "Guía práctica de interpretación de sueños en español. Psicología, simbolismo y utilidad real para tu vida.",
      inLanguage: "es",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/interpretador?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "EntiendetuSueño",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
        width: 512,
        height: 512,
      },
      sameAs: [
        "https://www.pinterest.es/entiendetusueno",
        "https://www.instagram.com/entiendetusueno",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col stars-bg">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
