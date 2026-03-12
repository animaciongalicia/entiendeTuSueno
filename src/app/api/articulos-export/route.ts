import { NextRequest, NextResponse } from "next/server";
import { articles } from "@/lib/articles";
import { pillarPages } from "@/lib/clusters";

/**
 * GET /api/articulos-export
 *
 * Exporta todos los artículos y páginas pilar con sus campos de automatización.
 * Parámetros de query opcionales:
 *   - cluster: filtra por slug de cluster  (ej: suenos-con-animales)
 *   - visual_theme: filtra por tema visual (misterio | calma | ansiedad | espiritual)
 *   - tipo: filtra por tipo (long-tail | normal | pilar)
 *   - solo_pilar: "true" devuelve solo las páginas pilar
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const clusterFilter = searchParams.get("cluster");
  const themeFilter = searchParams.get("visual_theme");
  const tipoFilter = searchParams.get("tipo");
  const soloPilar = searchParams.get("solo_pilar") === "true";

  // Normalise articles to export shape
  const exportArticles = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    categorySlug: a.categorySlug,
    publishedAt: a.publishedAt,
    updatedAt: a.updatedAt,
    readingTime: a.readingTime,
    coverImage: a.coverImage,
    coverAlt: a.coverAlt,
    tags: a.tags,
    // Automation fields
    cluster: a.cluster ?? null,
    visual_theme: a.visual_theme ?? null,
    pin_titles: a.pin_titles ?? [],
    reel_hook: a.reel_hook ?? null,
    extracto_seo: a.extracto_seo ?? null,
    imagen_vertical: a.imagen_vertical ?? null,
    imagen_destacada: a.imagen_destacada ?? null,
    tipo: a.tipo ?? "normal",
    interpretacion_humana: a.interpretacion_humana ?? null,
    intencion_practica: a.intencion_practica ?? [],
    url: `https://entiendetusueno.com/blog/${a.slug}`,
    source: "blog" as const,
  }));

  // Pillar pages export shape
  const exportPillars = pillarPages.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.metaDescription,
    category: p.category,
    categorySlug: p.categorySlug,
    publishedAt: p.publishedAt,
    updatedAt: p.updatedAt,
    readingTime: p.readingTime,
    coverImage: p.coverImage,
    coverAlt: p.coverAlt,
    tags: p.tags,
    cluster: p.clusterSlug,
    visual_theme: null,
    pin_titles: [],
    reel_hook: null,
    extracto_seo: p.metaDescription,
    imagen_vertical: null,
    imagen_destacada: p.coverImage,
    tipo: "pilar" as const,
    interpretacion_humana: null,
    intencion_practica: p.intencion_practica ?? [],
    url: `https://entiendetusueno.com/blog/${p.slug}`,
    source: "pilar" as const,
  }));

  let result: typeof exportArticles | typeof exportPillars | (typeof exportArticles[0] | typeof exportPillars[0])[];

  if (soloPilar) {
    result = exportPillars;
  } else {
    result = [...exportArticles, ...exportPillars];
  }

  // Apply filters
  if (clusterFilter) {
    result = (result as typeof result).filter((item) => item.cluster === clusterFilter);
  }
  if (themeFilter) {
    result = (result as typeof result).filter((item) => item.visual_theme === themeFilter);
  }
  if (tipoFilter) {
    result = (result as typeof result).filter((item) => item.tipo === tipoFilter);
  }

  return NextResponse.json(
    {
      total: result.length,
      generated_at: new Date().toISOString(),
      filters: {
        cluster: clusterFilter ?? null,
        visual_theme: themeFilter ?? null,
        tipo: tipoFilter ?? null,
        solo_pilar: soloPilar,
      },
      data: result,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
