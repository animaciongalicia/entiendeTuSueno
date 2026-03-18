/** @type {import('next').NextConfig} */

// Content-Security-Policy
// - default-src 'self': solo recursos del propio dominio
// - script-src: self + inline (Next.js lo requiere) + Google Analytics/AdSense
// - style-src: self + unsafe-inline (Tailwind purged CSS en prod)
// - img-src: self + data: (inline SVG/favicon) + Google + w3.org
// - connect-src: self + Anthropic API + Google Analytics
// - frame-src: Google (AdSense)
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.google-analytics.com https://www.w3.org",
  "font-src 'self'",
  "connect-src 'self' https://api.anthropic.com https://www.google-analytics.com https://analytics.google.com",
  "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF primero (30-50% más ligero que WebP), luego WebP como fallback
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Caché de imágenes optimizadas durante 30 días
    minimumCacheTTL: 2592000,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
