/**
 * AffiliateCTA — sección de recursos relacionados con afiliación.
 *
 * Solo se renderiza cuando el artículo tiene `enlaces_afiliados` populado.
 * Activar cuando haya programa de afiliación aprobado (Amazon Afiliados,
 * Audible, apps de meditación/sueño, etc.)
 *
 * Uso en articles.ts:
 *   enlaces_afiliados: [
 *     {
 *       texto: "Por qué dormimos — Matthew Walker",
 *       url: "https://amzn.to/XXXXXXX",
 *       descripcion: "El libro de referencia sobre la ciencia del sueño. Lectura esencial.",
 *     },
 *   ],
 */

interface AffiliateLink {
  texto: string;
  url: string;
  descripcion?: string;
}

interface Props {
  enlaces: AffiliateLink[];
}

export default function AffiliateCTA({ enlaces }: Props) {
  if (!enlaces || enlaces.length === 0) return null;

  return (
    <section className="mt-10 rounded-xl border border-[#2a2a4a] bg-[#12121e] p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#4a4760] mb-4">
        Recursos recomendados
      </p>
      <div className="space-y-3">
        {enlaces.map((enlace, i) => (
          <a
            key={i}
            href={enlace.url}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="group flex items-start gap-3 rounded-lg border border-[#2a2a4a] bg-[#1a1a2e] p-4 hover:border-[#7c6af7]/50 transition-colors"
          >
            <span className="text-lg shrink-0 mt-0.5">📖</span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#e8e6f0] group-hover:text-[#9580ff] transition-colors leading-snug">
                {enlace.texto}
              </p>
              {enlace.descripcion && (
                <p className="text-xs text-[#6b6880] mt-1 leading-relaxed">
                  {enlace.descripcion}
                </p>
              )}
            </div>
            <span className="text-xs text-[#4a4760] shrink-0 mt-0.5 ml-auto">→</span>
          </a>
        ))}
      </div>
      <p className="mt-3 text-xs text-[#4a4760]">
        Estos enlaces son de afiliado. Si compras a través de ellos, recibimos una pequeña comisión sin coste adicional para ti.
      </p>
    </section>
  );
}
