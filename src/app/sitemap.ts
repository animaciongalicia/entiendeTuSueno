import { MetadataRoute } from "next";
import { articles, getAllCategories } from "@/lib/articles";
import { pillarPages, clusters } from "@/lib/clusters";
import { SITE_URL } from "@/lib/config";

// Fecha de última modificación real del contenido estático (actualizar al publicar cambios)
const SITE_LAST_MODIFIED = new Date("2025-01-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/interpretador`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/sobre-nosotros`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacidad`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // Pillar pages: highest content priority after homepage
  const pillarRoutes: MetadataRoute.Sitemap = pillarPages.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.95,
  }));

  // Regular articles — usa updatedAt real del artículo
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Category pages from article categories
  const categoryRoutes: MetadataRoute.Sitemap = getAllCategories().map((cat) => ({
    url: `${SITE_URL}/categoria/${cat.slug}`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  // Cluster hub pages (deduplicated against category routes)
  const categorySlugs = new Set(getAllCategories().map((c) => c.slug));
  const clusterRoutes: MetadataRoute.Sitemap = clusters
    .filter((c) => !categorySlugs.has(c.slug))
    .map((c) => ({
      url: `${SITE_URL}/categoria/${c.slug}`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...pillarRoutes, ...articleRoutes, ...clusterRoutes, ...categoryRoutes];
}
