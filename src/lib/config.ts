/** URL base del sitio. Configurable via env var para staging/preview deployments. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://entiendetusueno.com";
