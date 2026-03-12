import { MetadataRoute } from "next";
import { articles, getAllCategories } from "@/lib/articles";
import { pillarPages, clusters } from "@/lib/clusters";

const BASE_URL = "https://entiendetusueno.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/interpretador`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/sobre-nosotros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/privacidad`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // Pillar pages: highest content priority after homepage
  const pillarRoutes: MetadataRoute.Sitemap = pillarPages.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.95,
  }));

  // Regular articles
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Category pages from article categories
  const categoryRoutes: MetadataRoute.Sitemap = getAllCategories().map((cat) => ({
    url: `${BASE_URL}/categoria/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  // Cluster hub pages (deduplicated against category routes)
  const categorySlugs = new Set(getAllCategories().map((c) => c.slug));
  const clusterRoutes: MetadataRoute.Sitemap = clusters
    .filter((c) => !categorySlugs.has(c.slug))
    .map((c) => ({
      url: `${BASE_URL}/categoria/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...pillarRoutes, ...articleRoutes, ...clusterRoutes, ...categoryRoutes];
}
