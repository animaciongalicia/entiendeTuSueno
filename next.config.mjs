/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF primero (30-50% más ligero que WebP), luego WebP como fallback
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Caché de imágenes optimizadas durante 30 días
    minimumCacheTTL: 2592000,
  },
};

export default nextConfig;
