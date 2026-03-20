import { NextRequest, NextResponse } from "next/server";
import { articles } from "@/lib/articles";
import { SITE_URL } from "@/lib/config";

/**
 * GET /api/rss
 *
 * Feed RSS 2.0 con los artículos del blog, ordenados de más reciente a más antiguo.
 *
 * Parámetros opcionales:
 *   ?limit=10          — número máximo de artículos (por defecto 20)
 *   ?since=YYYY-MM-DD  — solo artículos publicados a partir de esa fecha
 *
 * Uso en Make:
 *   Módulo "RSS feed" → URL: https://entiendetusueno.com/api/rss
 *   Make detecta automáticamente los nuevos <item> en cada ejecución.
 *
 *   Para el newsletter semanal, programa el escenario cada lunes:
 *   URL con filtro: /api/rss?since=HACE_7_DIAS  (calcula la fecha en Make con {{addDays(now; -7)}})
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 50);
  const since = searchParams.get("since"); // YYYY-MM-DD

  const sorted = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const filtered = since
    ? sorted.filter((a) => a.publishedAt >= since)
    : sorted;

  const items = filtered.slice(0, limit);

  const escapeXml = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Entiende Tu Sueño — Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Artículos sobre psicología de los sueños. Interpreta lo que tu mente procesa mientras duermes.</description>
    <language>es</language>
    <atom:link href="${SITE_URL}/api/rss" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items
  .map(
    (a) => `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${SITE_URL}/blog/${a.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${a.slug}</guid>
      <description>${escapeXml(a.excerpt)}</description>
      <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
      <category>${escapeXml(a.category)}</category>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
