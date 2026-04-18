"use client";

interface AdSlotProps {
  slot: "header-below" | "article-mid" | "sidebar";
  className?: string;
}

export default function AdSlot({ slot, className = "" }: AdSlotProps) {
  const labels: Record<AdSlotProps["slot"], string> = {
    "header-below": "Anuncio — Cabecera",
    "article-mid": "Anuncio — Artículo",
    "sidebar": "Anuncio — Sidebar",
  };

  const heights: Record<AdSlotProps["slot"], string> = {
    "header-below": "h-[90px]",
    "article-mid": "h-[250px]",
    "sidebar": "h-[600px]",
  };

  return (
    <div
      className={`flex items-center justify-center border border-dashed border-[#2a2a4a] bg-[#12121e] rounded-lg text-xs text-[#4a4760] ${heights[slot]} ${className}`}
      aria-hidden="true"
      data-ad-slot={slot}
    >
      {labels[slot]}
    </div>
  );
}
