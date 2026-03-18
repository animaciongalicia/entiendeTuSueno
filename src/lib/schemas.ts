/**
 * src/lib/schemas.ts
 *
 * Schemas Zod que replican las interfaces TypeScript de articles.ts y clusters.ts
 * añadiendo reglas de negocio que TypeScript no puede expresar en tiempo de compilación:
 *   - slug en kebab-case sin espacios
 *   - fechas en formato ISO válido
 *   - coverAlt no vacío
 *   - readingTime positivo
 *   - content no vacío
 */
import { z } from "zod";

// ── Primitivos reutilizables ─────────────────────────────────────────────────

const slugSchema = z
  .string()
  .min(1, "El slug no puede estar vacío")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "El slug debe estar en kebab-case (ej: mi-articulo)");

const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe tener formato YYYY-MM-DD");

const nonEmptyString = z.string().min(1, "No puede estar vacío");

const intencionEnum = z.enum([
  "relaciones",
  "dinero",
  "trabajo",
  "ansiedad",
  "decisiones-de-vida",
  "emprendimiento",
  "salud-emocional",
]);

// ── Schema de Article ────────────────────────────────────────────────────────

export const ArticleSchema = z.object({
  slug: slugSchema,
  title: nonEmptyString.max(120, "El título no debe superar los 120 caracteres"),
  excerpt: nonEmptyString.max(300, "El excerpt no debe superar los 300 caracteres"),
  category: nonEmptyString,
  categorySlug: slugSchema,
  publishedAt: isoDateSchema,
  updatedAt: isoDateSchema,
  readingTime: z.number().int().positive("readingTime debe ser un entero positivo"),
  coverImage: nonEmptyString,
  coverAlt: nonEmptyString.min(10, "coverAlt debe tener al menos 10 caracteres para ser descriptivo"),
  content: nonEmptyString.min(100, "El content del artículo parece demasiado corto"),
  faqItems: z
    .array(
      z.object({
        question: nonEmptyString,
        answer: nonEmptyString,
      })
    )
    .optional(),
  tags: z.array(z.string()).min(1, "El artículo debe tener al menos un tag"),
  // Cluster & automation fields
  cluster: slugSchema.optional(),
  visual_theme: z.enum(["misterio", "calma", "ansiedad", "espiritual"]).optional(),
  pin_titles: z.array(z.string()).optional(),
  reel_hook: z.string().optional(),
  extracto_seo: z.string().optional(),
  imagen_vertical: z.string().optional(),
  imagen_destacada: z.string().optional(),
  tipo: z.enum(["long-tail", "normal", "pilar"]).optional(),
  interpretacion_humana: z.string().optional(),
  intencion_practica: z.array(intencionEnum).optional(),
  consejo_practico: z.string().optional(),
  fuentes: z
    .array(z.object({ autor: nonEmptyString, obra: nonEmptyString }))
    .optional(),
  enlaces_afiliados: z
    .array(
      z.object({
        texto: nonEmptyString,
        url: z.string().url("El enlace de afiliado debe ser una URL válida"),
        descripcion: z.string().optional(),
      })
    )
    .optional(),
});

// ── Schema de PillarPage ─────────────────────────────────────────────────────

export const PillarPageSchema = z.object({
  slug: slugSchema,
  clusterSlug: slugSchema,
  title: nonEmptyString.max(120, "El título no debe superar los 120 caracteres"),
  metaTitle: nonEmptyString.max(70, "El metaTitle no debe superar los 70 caracteres (SEO)"),
  metaDescription: nonEmptyString.max(160, "La metaDescription no debe superar los 160 caracteres (SEO)"),
  category: nonEmptyString,
  categorySlug: slugSchema,
  publishedAt: isoDateSchema,
  updatedAt: isoDateSchema,
  readingTime: z.number().int().positive(),
  coverImage: nonEmptyString,
  coverAlt: nonEmptyString.min(10, "coverAlt debe tener al menos 10 caracteres"),
  content: nonEmptyString.min(100),
  faqItems: z
    .array(z.object({ question: nonEmptyString, answer: nonEmptyString }))
    .min(1, "Una pillar page debe tener al menos 1 FAQ item"),
  tags: z.array(z.string()).min(1),
  tipo: z.literal("pilar"),
  intencion_practica: z.array(intencionEnum).optional(),
  consejo_practico: z.string().optional(),
  fuentes: z
    .array(z.object({ autor: nonEmptyString, obra: nonEmptyString }))
    .optional(),
  enlaces_afiliados: z
    .array(
      z.object({
        texto: nonEmptyString,
        url: z.string().url(),
        descripcion: z.string().optional(),
      })
    )
    .optional(),
});

// ── Schema de Cluster ────────────────────────────────────────────────────────

export const ClusterSchema = z.object({
  slug: slugSchema,
  name: nonEmptyString,
  description: nonEmptyString,
  // pillarSlug puede ser "" cuando la pillar page aún no está creada
  pillarSlug: z.string(),
  categorySlug: slugSchema,
  emoji: z.string().min(1),
  color: nonEmptyString,
  tipo: z.enum(["tematico", "situacional", "mecanismo"]),
});

// ── Tipos inferidos (para reemplazar los interfaces manuales si se desea) ────

export type ArticleInput = z.infer<typeof ArticleSchema>;
export type PillarPageInput = z.infer<typeof PillarPageSchema>;
export type ClusterInput = z.infer<typeof ClusterSchema>;
