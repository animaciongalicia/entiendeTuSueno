import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// ── Types ──────────────────────────────────────────────────────────────────────

type Span = { t: string; bold?: true; italic?: true };
type Block =
  | { kind: "h3"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "p"; spans: Span[] };

interface Section {
  heading: string | null;
  blocks: Block[];
}

// ── Markdown parser ────────────────────────────────────────────────────────────

function parseSpans(text: string): Span[] {
  return text
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
    .filter(Boolean)
    .map((p) => {
      if (p.startsWith("**") && p.endsWith("**")) return { t: p.slice(2, -2), bold: true as const };
      if (p.startsWith("*") && p.endsWith("*")) return { t: p.slice(1, -1), italic: true as const };
      return { t: p };
    });
}

function parseMarkdown(text: string): Section[] {
  const rawBlocks = text
    .split("\n")
    .reduce<string[]>((acc, line) => {
      if (line.trim() === "") {
        acc.push("");
      } else {
        const last = acc[acc.length - 1];
        if (!last || last === "") acc.push(line);
        else acc[acc.length - 1] = last + "\n" + line;
      }
      return acc;
    }, [])
    .filter((b) => b.trim() !== "" && b.trim() !== "---");

  const sections: Section[] = [];
  let current: Section = { heading: null, blocks: [] };

  for (const block of rawBlocks) {
    if (block.startsWith("## ")) {
      if (current.heading !== null || current.blocks.length > 0) sections.push(current);
      current = { heading: block.slice(3).toUpperCase(), blocks: [] };
    } else if (block.startsWith("### ")) {
      current.blocks.push({ kind: "h3", text: block.slice(4) });
    } else if (block.startsWith("> ")) {
      current.blocks.push({
        kind: "quote",
        text: block.slice(2).replace(/\n> /g, " ").replace(/\n/g, " "),
      });
    } else {
      current.blocks.push({
        kind: "p",
        spans: parseSpans(block.split("\n").join(" ")),
      });
    }
  }
  if (current.heading !== null || current.blocks.length > 0) sections.push(current);
  return sections;
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const C = {
  coverBg: "#12121e",
  coverBgDeep: "#09090f",
  accent: "#7c6af7",
  textLight: "#f0eeff",
  textMid: "#c0b8f0",
  textDim: "#8b87a0",
  textFaint: "#4a4760",
  white: "#ffffff",
  bodyText: "#1e1e2e",
  mutedText: "#5a5870",
  border: "#ece9f8",
  quoteBg: "#f5f3ff",
};

const s = StyleSheet.create({
  /* ── Cover page ─────────────────────────────── */
  coverPage: { backgroundColor: C.coverBg, flexDirection: "column" },
  coverMain: { flex: 1, justifyContent: "center", alignItems: "center", padding: 60 },

  // Decorative element (dots + bars)
  decoRow: { flexDirection: "row", alignItems: "center", marginBottom: 32 },
  decoBar: { width: 40, height: 1, backgroundColor: C.accent },
  decoDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.accent, marginHorizontal: 10 },
  decoSmallDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: C.accent, marginHorizontal: 6 },

  coverTitle: {
    fontSize: 32,
    color: C.textLight,
    fontFamily: "Times-Roman",
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 1.3,
  },
  coverSub: {
    fontSize: 9,
    color: C.textDim,
    letterSpacing: 2.5,
    textAlign: "center",
    marginBottom: 32,
    fontFamily: "Helvetica",
  },
  divider: { width: 56, height: 1, backgroundColor: C.accent, marginBottom: 32 },
  coverDate: {
    fontSize: 11,
    color: C.textMid,
    fontFamily: "Helvetica",
    marginBottom: 36,
  },
  coverQuote: {
    fontSize: 12.5,
    color: C.textMid,
    fontFamily: "Times-Roman",
    textAlign: "center",
    lineHeight: 1.85,
    marginBottom: 8,
    maxWidth: 320,
  },
  coverQuoteAuthor: {
    fontSize: 9,
    color: C.textFaint,
    fontFamily: "Helvetica",
    letterSpacing: 1,
    textAlign: "center",
  },

  coverFooter: {
    paddingVertical: 18,
    paddingHorizontal: 60,
    backgroundColor: C.coverBgDeep,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  coverFooterText: {
    fontSize: 8,
    color: C.textFaint,
    fontFamily: "Helvetica",
    letterSpacing: 2,
  },

  /* ── Content pages ──────────────────────────── */
  contentPage: {
    backgroundColor: C.white,
    paddingTop: 50,
    paddingBottom: 52,
    paddingHorizontal: 55,
  },

  // Fixed top header (repeats on every page)
  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 9,
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    borderBottomStyle: "solid",
  },
  pageHeaderBrand: {
    fontSize: 7,
    color: "#9d96d4",
    fontFamily: "Helvetica",
    letterSpacing: 1.5,
  },
  headerAccentBar: { width: 22, height: 2, backgroundColor: C.accent },

  // Section
  sectionBox: { marginBottom: 16 },
  sectionHeading: {
    fontSize: 8,
    color: C.accent,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 2.5,
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: C.border,
    borderBottomStyle: "solid",
  },
  subHeading: {
    fontSize: 11.5,
    color: "#3d3a60",
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
    marginTop: 10,
  },
  para: {
    fontSize: 10.5,
    color: C.bodyText,
    fontFamily: "Helvetica",
    lineHeight: 1.75,
    marginBottom: 7,
  },
  bold: { fontFamily: "Helvetica-Bold", color: "#111128" },
  oblique: { fontFamily: "Helvetica-Oblique" },
  quoteBox: {
    borderLeftWidth: 3,
    borderLeftColor: C.accent,
    borderLeftStyle: "solid",
    backgroundColor: C.quoteBg,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginVertical: 8,
  },
  quoteText: {
    fontSize: 10.5,
    color: "#555",
    fontFamily: "Times-Roman",
    lineHeight: 1.75,
  },

  // Fixed bottom footer
  pageFooter: {
    position: "absolute",
    bottom: 26,
    left: 55,
    right: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerBrand: { fontSize: 8, color: "#c8c4f0", fontFamily: "Helvetica" },
  pageNum: { fontSize: 8, color: "#9d96d4", fontFamily: "Helvetica" },
});

// ── Block renderer ─────────────────────────────────────────────────────────────

function renderBlock(b: Block, i: number) {
  if (b.kind === "h3") {
    return <Text key={i} style={s.subHeading}>{b.text}</Text>;
  }
  if (b.kind === "quote") {
    return (
      <View key={i} style={s.quoteBox}>
        <Text style={s.quoteText}>{b.text}</Text>
      </View>
    );
  }
  // paragraph with inline bold/italic
  return (
    <Text key={i} style={s.para}>
      {b.spans.map((span, j) => (
        <Text
          key={j}
          style={[s.para, span.bold ? s.bold : {}, span.italic ? s.oblique : {}]}
        >
          {span.t}
        </Text>
      ))}
    </Text>
  );
}

// ── Main PDF component ─────────────────────────────────────────────────────────

interface InformePDFProps {
  content: string;
  date: string;
}

export function InformePDF({ content, date }: InformePDFProps) {
  const sections = parseMarkdown(content);

  const formattedDate = new Date(date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Document
      title="Tu Informe de Sueños — EntiendetuSueño"
      author="EntiendetuSueño"
      subject="Análisis psicológico de tu sueño"
    >
      {/* ── PAGE 1: COVER ── */}
      <Page size="A4" style={s.coverPage}>
        <View style={s.coverMain}>
          {/* Decorative element */}
          <View style={s.decoRow}>
            <View style={s.decoBar} />
            <View style={s.decoSmallDot} />
            <View style={s.decoDot} />
            <View style={s.decoSmallDot} />
            <View style={s.decoBar} />
          </View>

          <Text style={s.coverTitle}>Tu Informe{"\n"}de Sueños</Text>
          <Text style={s.coverSub}>PSICOLOGÍA · NEUROCIENCIA · INTERPRETACIÓN</Text>
          <View style={s.divider} />
          <Text style={s.coverDate}>{formattedDate}</Text>

          <Text style={s.coverQuote}>
            {'"'}Los sueños son el camino real{"\n"}hacia el inconsciente.{'"'}
          </Text>
          <Text style={s.coverQuoteAuthor}>— Carl Jung</Text>
        </View>

        <View style={s.coverFooter}>
          <Text style={s.coverFooterText}>ENTIENDE TU SUEÑO</Text>
          <Text style={s.coverFooterText}>entiendetusueno.com</Text>
        </View>
      </Page>

      {/* ── PAGE 2+: CONTENT ── */}
      <Page size="A4" style={s.contentPage} wrap>
        {/* Fixed header on every page */}
        <View style={s.pageHeader} fixed>
          <Text style={s.pageHeaderBrand}>ENTIENDE TU SUEÑO · Informe de Sueños</Text>
          <View style={s.headerAccentBar} />
        </View>

        {/* Sections */}
        {sections.map((section, i) => (
          <View key={i} style={s.sectionBox} wrap={false}>
            {section.heading && (
              <Text style={s.sectionHeading}>{section.heading}</Text>
            )}
            {section.blocks.map((block, j) => renderBlock(block, j))}
          </View>
        ))}

        {/* Fixed footer with page numbers on every page */}
        <View style={s.pageFooter} fixed>
          <Text style={s.footerBrand}>EntiendetuSueño</Text>
          <Text
            style={s.pageNum}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
