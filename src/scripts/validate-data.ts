/**
 * src/scripts/validate-data.ts
 *
 * Script de validación de integridad de datos — se ejecuta en prebuild.
 * Detecta inconsistencias que TypeScript no puede ver en tiempo de compilación:
 *
 *   1. Estructura de cada artículo y pillar page (via Zod)
 *   2. Slugs duplicados dentro de articles y pillarPages
 *   3. Cada article.cluster referencia un cluster existente
 *   4. Cada article.categorySlug referencia una categoría de clusters existente
 *   5. Cada pillar.clusterSlug referencia un cluster existente
 *   6. El pillarSlug de cada cluster existe en pillarPages
 *
 * Uso:  npx tsx src/scripts/validate-data.ts
 * Auto: se ejecuta como "prebuild" en package.json
 */

import { articles } from "../lib/articles";
import { clusters, pillarPages } from "../lib/clusters";
import { ArticleSchema, PillarPageSchema, ClusterSchema } from "../lib/schemas";

// ── Colores ANSI para terminal ───────────────────────────────────────────────
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

type Issue = { level: "error" | "warn"; entity: string; id: string; message: string };
const issues: Issue[] = [];

function error(entity: string, id: string, message: string) {
  issues.push({ level: "error", entity, id, message });
}
function warn(entity: string, id: string, message: string) {
  issues.push({ level: "warn", entity, id, message });
}

// ── 1. Validación estructural con Zod ────────────────────────────────────────

console.log(`\n${BOLD}Validando estructura de datos...${RESET}`);

for (const article of articles) {
  const result = ArticleSchema.safeParse(article);
  if (!result.success) {
    for (const issue of result.error.issues) {
      const path = issue.path.join(".");
      error("Article", article.slug, `[${path}] ${issue.message}`);
    }
  }
}

for (const pillar of pillarPages) {
  const result = PillarPageSchema.safeParse(pillar);
  if (!result.success) {
    for (const issue of result.error.issues) {
      const path = issue.path.join(".");
      error("PillarPage", pillar.slug, `[${path}] ${issue.message}`);
    }
  }
}

for (const cluster of clusters) {
  const result = ClusterSchema.safeParse(cluster);
  if (!result.success) {
    for (const issue of result.error.issues) {
      const path = issue.path.join(".");
      error("Cluster", cluster.slug, `[${path}] ${issue.message}`);
    }
  }
}

// ── 2. Slugs duplicados ───────────────────────────────────────────────────────

const articleSlugs = articles.map((a) => a.slug);
const duplicateArticleSlugs = articleSlugs.filter(
  (slug, i) => articleSlugs.indexOf(slug) !== i
);
for (const slug of new Set(duplicateArticleSlugs)) {
  error("Article", slug, "Slug duplicado en articles[]");
}

const pillarSlugs = pillarPages.map((p) => p.slug);
const duplicatePillarSlugs = pillarSlugs.filter(
  (slug, i) => pillarSlugs.indexOf(slug) !== i
);
for (const slug of new Set(duplicatePillarSlugs)) {
  error("PillarPage", slug, "Slug duplicado en pillarPages[]");
}

// Slug que aparece tanto en articles como en pillarPages
const allSlugs = [...articleSlugs, ...pillarSlugs];
const crossDuplicates = allSlugs.filter((s, i) => allSlugs.indexOf(s) !== i);
for (const slug of new Set(crossDuplicates)) {
  error("Slug", slug, "Slug aparece en AMBOS arrays (articles y pillarPages)");
}

// ── 3. Referencias de cluster en artículos ───────────────────────────────────

const clusterSlugs = new Set(clusters.map((c) => c.slug));
const clusterCategorySlugs = new Set(clusters.map((c) => c.categorySlug));

for (const article of articles) {
  if (article.cluster && !clusterSlugs.has(article.cluster)) {
    error("Article", article.slug, `cluster "${article.cluster}" no existe en clusters[]`);
  }
  if (!clusterCategorySlugs.has(article.categorySlug)) {
    warn("Article", article.slug, `categorySlug "${article.categorySlug}" no está en ningún cluster.categorySlug`);
  }
}

// ── 4. Referencias de cluster en pillar pages ────────────────────────────────

for (const pillar of pillarPages) {
  if (!clusterSlugs.has(pillar.clusterSlug)) {
    error("PillarPage", pillar.slug, `clusterSlug "${pillar.clusterSlug}" no existe en clusters[]`);
  }
}

// ── 5. pillarSlug de cada cluster referencia una pillar page real ─────────────

const pillarSlugSet = new Set(pillarSlugs);
for (const cluster of clusters) {
  if (!pillarSlugSet.has(cluster.pillarSlug)) {
    warn("Cluster", cluster.slug, `pillarSlug "${cluster.pillarSlug}" no existe en pillarPages[] todavía`);
  }
}

// ── 6. coverAlt vacío (extra, ya cubierto por Zod pero con mensaje claro) ────

for (const article of articles) {
  if (!article.coverAlt || article.coverAlt.trim().length < 10) {
    warn("Article", article.slug, `coverAlt "${article.coverAlt}" es demasiado corto o está vacío`);
  }
}

// ── 7. Links internos rotos en el contenido HTML ─────────────────────────────
//
// Extrae todos los href="/blog/..." y href="/categoria/..." del HTML de cada
// artículo, pillar page y cluster, y comprueba que el slug destino existe.

const allBlogSlugs = new Set([
  ...articles.map((a) => a.slug),
  ...pillarPages.map((p) => p.slug),
]);
const allCategoriaSlugs = new Set([
  ...clusters.map((c) => c.slug),
  ...clusters.map((c) => c.categorySlug),
]);

const HREF_BLOG_RE = /href="\/blog\/([^"]+)"/g;
const HREF_CAT_RE = /href="\/categoria\/([^"]+)"/g;

function checkContentLinks(entity: string, id: string, html: string) {
  let m: RegExpExecArray | null;
  HREF_BLOG_RE.lastIndex = 0;
  while ((m = HREF_BLOG_RE.exec(html)) !== null) {
    const slug = m[1];
    if (!allBlogSlugs.has(slug)) {
      error(entity, id, `Link roto en content: /blog/${slug} no existe`);
    }
  }
  HREF_CAT_RE.lastIndex = 0;
  while ((m = HREF_CAT_RE.exec(html)) !== null) {
    const slug = m[1];
    if (!allCategoriaSlugs.has(slug)) {
      error(entity, id, `Link roto en content: /categoria/${slug} no existe`);
    }
  }
}

for (const article of articles) {
  checkContentLinks("Article", article.slug, article.content);
  if (article.interpretacion_humana) {
    checkContentLinks("Article", article.slug, article.interpretacion_humana);
  }
}
for (const pillar of pillarPages) {
  checkContentLinks("PillarPage", pillar.slug, pillar.content);
}
for (const cluster of clusters) {
  checkContentLinks("Cluster", cluster.slug, cluster.content ?? "");
}

// ── Resultado ─────────────────────────────────────────────────────────────────

const errors = issues.filter((i) => i.level === "error");
const warnings = issues.filter((i) => i.level === "warn");

if (errors.length > 0) {
  console.log(`\n${RED}${BOLD}ERRORES (${errors.length}):${RESET}`);
  for (const issue of errors) {
    console.log(`  ${RED}✗${RESET} [${issue.entity}] ${BOLD}${issue.id}${RESET} — ${issue.message}`);
  }
}

if (warnings.length > 0) {
  console.log(`\n${YELLOW}${BOLD}AVISOS (${warnings.length}):${RESET}`);
  for (const issue of warnings) {
    console.log(`  ${YELLOW}⚠${RESET} [${issue.entity}] ${BOLD}${issue.id}${RESET} — ${issue.message}`);
  }
}

const total = articles.length + pillarPages.length + clusters.length;
console.log(
  `\n${GREEN}${BOLD}Revisados:${RESET} ${articles.length} artículos · ${pillarPages.length} pillars · ${clusters.length} clusters (total: ${total})`
);

if (errors.length > 0) {
  console.log(`\n${RED}${BOLD}❌ Build bloqueado: ${errors.length} error(es) crítico(s).${RESET}`);
  console.log(`${RED}Corrige los errores anteriores antes de hacer deploy.${RESET}\n`);
  process.exit(1);
} else if (warnings.length > 0) {
  console.log(`\n${YELLOW}${BOLD}⚠  ${warnings.length} aviso(s). El build continúa pero revísalos.${RESET}\n`);
} else {
  console.log(`\n${GREEN}${BOLD}✓ Todos los datos son válidos.${RESET}\n`);
}
