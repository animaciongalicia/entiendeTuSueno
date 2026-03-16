// .github/scripts/generate-post.js
// Script para generar artículos automáticamente con Claude API
// Se ejecuta desde GitHub Actions

const Anthropic = require("@anthropic-ai/sdk");
const fs = require("fs");
const path = require("path");

const client = new Anthropic();
// ANTHROPIC_API_KEY se lee automáticamente del entorno

// ============================================================
// LISTA DE POSTS PENDIENTES
// Edita esta lista para añadir nuevos posts
// Borra una entrada cuando ya esté publicada
// ============================================================
const PENDING_POSTS = [
  {
    title: "Soñar con agua turbia",
    category: "Símbolos en Sueños",
    categorySlug: "simbolos-en-suenos",
    tags: ["agua", "símbolos", "emociones"],
    relatedSlugs: ["suenos-recurrentes-que-significan", "paralisis-del-sueno"],
  },
  {
    title: "Soñar que no puedes correr",
    category: "Ansiedad y Miedos",
    categorySlug: "ansiedad-y-miedos",
    tags: ["ansiedad", "cuerpo", "parálisis"],
    relatedSlugs: ["paralisis-del-sueno", "suenos-recurrentes-que-significan"],
  },
  {
    title: "Soñar con tu casa de la infancia",
    category: "Símbolos en Sueños",
    categorySlug: "simbolos-en-suenos",
    tags: ["casa", "infancia", "nostalgia", "memoria"],
    relatedSlugs: ["suenos-recurrentes-que-significan", "sonar-con-tu-madre"],
  },
  {
    title: "Soñar con dientes que se caen",
    category: "Símbolos en Sueños",
    categorySlug: "simbolos-en-suenos",
    tags: ["dientes", "ansiedad", "pérdida", "miedo"],
    relatedSlugs: ["paralisis-del-sueno", "suenos-recurrentes-que-significan"],
  },
  {
    title: "Soñar con ex pareja",
    category: "Relaciones",
    categorySlug: "relaciones",
    tags: ["ex", "pareja", "amor", "pasado"],
    relatedSlugs: ["sonar-con-tu-madre", "sonar-con-perros"],
  },
  {
    title: "Soñar que te persiguen",
    category: "Ansiedad y Miedos",
    categorySlug: "ansiedad-y-miedos",
    tags: ["persecución", "miedo", "ansiedad", "huir"],
    relatedSlugs: ["paralisis-del-sueno", "sonar-que-te-despiden-del-trabajo"],
  },
  {
    title: "Soñar con víboras",
    category: "Animales",
    categorySlug: "animales",
    tags: ["serpiente", "víbora", "peligro", "transformación"],
    relatedSlugs: ["sonar-con-perros", "sonar-con-gatos"],
  },
  {
    title: "Soñar que vuelas",
    category: "Sueños Recurrentes",
    categorySlug: "suenos-recurrentes",
    tags: ["volar", "libertad", "control", "lúcido"],
    relatedSlugs: ["suenos-recurrentes-que-significan", "paralisis-del-sueno"],
  },
];

// ============================================================
// FUNCIONES AUXILIARES
// ============================================================

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function pickPost() {
  if (PENDING_POSTS.length === 0) {
    console.log("✅ No hay posts pendientes en la lista.");
    process.exit(0);
  }
  // Toma el primero de la lista (más prioritario)
  return PENDING_POSTS[0];
}

function slugAlreadyExists(slug) {
  const articlesPath = path.join(__dirname, "../../src/lib/articles.ts");
  const content = fs.readFileSync(articlesPath, "utf8");
  return content.includes(`slug: "${slug}"`);
}

// ============================================================
// GENERACIÓN DEL ARTÍCULO CON CLAUDE
// ============================================================

async function generatePost(postConfig) {
  const today = new Date().toISOString().split("T")[0];
  const slug = slugify(postConfig.title);

  // Comprueba que el slug no existe ya
  if (slugAlreadyExists(slug)) {
    console.log(`⚠️  El artículo "${slug}" ya existe. Saltando.`);
    process.exit(0);
  }

  const relatedLinks = postConfig.relatedSlugs
    .map((s) => `- /blog/${s}`)
    .join("\n");

  const prompt = `Eres experto en SEO y psicología de los sueños.
Escribe un artículo completo en español para el blog "Entiende Tu Sueño".

DATOS DEL ARTÍCULO:
- Título: "${postConfig.title}"
- Categoría: ${postConfig.category}
- Slug: ${slug}
- Tags: ${postConfig.tags.join(", ")}
- Fecha: ${today}

REQUISITOS DE CONTENIDO:
- Entre 1200-1800 palabras
- Tono cercano, empático, sin jerga académica excesiva
- Estructura: párrafo gancho (qué es, por qué te despertaste pensando en ello) → qué significa en general → variaciones del sueño → qué hacer con esta información
- Menciona de forma natural 2-3 artículos relacionados usando estos slugs:
${relatedLinks}
- Incluye una sección "Preguntas frecuentes" con 3-4 preguntas y respuestas cortas al final
- El content debe estar en formato Markdown
- Primero párrafo muy atractivo para retener al lector

FORMATO DE RESPUESTA:
Devuelve ÚNICA Y EXCLUSIVAMENTE el objeto TypeScript siguiente, sin bloques de código, sin explicaciones adicionales, comenzando directamente con la llave de apertura {

{
  slug: "${slug}",
  title: "${postConfig.title}",
  excerpt: "Una frase de 150-160 caracteres que resuma el artículo de forma atractiva para SEO",
  category: "${postConfig.category}",
  categorySlug: "${postConfig.categorySlug}",
  publishedAt: "${today}",
  updatedAt: "${today}",
  readingTime: 7,
  coverImage: "/images/blog/${postConfig.categorySlug}/${slug}.webp",
  coverAlt: "Descripción breve de la imagen de portada para SEO",
  tags: ${JSON.stringify(postConfig.tags)},
  content: \`
[contenido markdown aquí]
\`,
}`;

  console.log(`🤖 Llamando a Claude para generar: "${postConfig.title}"...`);

  const response = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 8000,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content[0].text.trim();
  console.log(`✅ Claude ha generado el artículo (${text.length} caracteres)`);
  return text;
}

// ============================================================
// AÑADIR EL ARTÍCULO A articles.ts
// ============================================================

function appendToArticles(articleCode) {
  const filePath = path.join(__dirname, "../../src/lib/articles.ts");
  const content = fs.readFileSync(filePath, "utf8");

  // Busca el último ]; del array de artículos
  const insertPoint = content.lastIndexOf("];");
  if (insertPoint === -1) {
    throw new Error("No se encontró el cierre del array en articles.ts");
  }

  // Limpia el código: quita llaves externas si Claude las puso sueltas
  let cleanCode = articleCode.trim();

  // Añade el artículo antes del ]
  const newContent =
    content.slice(0, insertPoint) +
    "  " +
    cleanCode +
    ",\n" +
    content.slice(insertPoint);

  fs.writeFileSync(filePath, newContent, "utf8");
  console.log("✅ Artículo insertado en src/lib/articles.ts");
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log("🚀 Iniciando generación automática de post...\n");

  const post = pickPost();
  console.log(`📝 Post seleccionado: "${post.title}"\n`);

  try {
    const articleCode = await generatePost(post);
    appendToArticles(articleCode);
    console.log("\n🎉 ¡Post generado y añadido correctamente!");
    console.log("   GitHub Actions hará el commit automáticamente.");
  } catch (error) {
    console.error("❌ Error al generar el post:", error.message);
    process.exit(1);
  }
}

main();
