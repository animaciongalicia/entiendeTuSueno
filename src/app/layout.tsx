import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://entiendetusueno.com"),
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
    url: "https://entiendetusueno.com",
    siteName: "EntiendetuSueño",
    title: "EntiendetuSueño — Interpretación de Sueños en Español",
    description:
      "Descubre el significado de tus sueños con interpretaciones detalladas, cercanas y basadas en psicología.",
    images: [
      {
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <GoogleAnalytics />
      </head>
      <body className="min-h-screen flex flex-col stars-bg">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
