import type { Article } from "@/lib/articles";

interface SchemaArticleProps {
  article: Article;
  url: string;
}

export default function SchemaArticle({ article, url }: SchemaArticleProps) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: article.title,
        description: article.excerpt,
        author: {
          "@type": "Organization",
          name: "EntiendetuSueño",
          url: "https://entiendetusueno.com",
        },
        publisher: {
          "@type": "Organization",
          name: "EntiendetuSueño",
          url: "https://entiendetusueno.com",
          logo: {
            "@type": "ImageObject",
            url: "https://entiendetusueno.com/logo.png",
          },
        },
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        inLanguage: "es",
        keywords: article.tags.join(", "),
      },
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
