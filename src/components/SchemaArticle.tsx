import type { Article } from "@/lib/articles";
import { SITE_URL as BASE_URL } from "@/lib/config";

interface SchemaArticleProps {
  article: Article;
  url: string;
}

export default function SchemaArticle({ article, url }: SchemaArticleProps) {
  const imageUrl = article.imagen_destacada
    ? `${BASE_URL}${article.imagen_destacada}`
    : `${BASE_URL}/og-image.jpg`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: article.title,
        description: article.excerpt,
        // image requerida para Google Discover y rich results de imagen
        image: {
          "@type": "ImageObject",
          url: imageUrl,
          width: 1200,
          height: 630,
        },
        author: {
          "@type": "Organization",
          name: "EntiendetuSueño",
          url: BASE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "EntiendetuSueño",
          url: BASE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${BASE_URL}/logo.png`,
          },
        },
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        inLanguage: "es",
        keywords: article.tags.join(", "),
        articleSection: article.category,
        wordCount: article.content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length,
      },
      // BreadcrumbList — sustituye la URL en los resultados por la ruta legible
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: BASE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${BASE_URL}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.category,
            item: `${BASE_URL}/categoria/${article.categorySlug}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: article.title,
            item: url,
          },
        ],
      },
      // FAQPage — rich results (acordeón de preguntas en los SERPs)
      ...(article.faqItems && article.faqItems.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: article.faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
