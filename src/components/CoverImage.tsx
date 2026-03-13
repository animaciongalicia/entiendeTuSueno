"use client";

import { useState } from "react";

interface CoverImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackEmoji?: string;
  categorySlug?: string;
}

const categoryEmojis: Record<string, string> = {
  animales: "🐍",
  espiritual: "✨",
  "muerte-miedo": "🌑",
  personas: "👥",
  "amor-ex": "💔",
  "dinero-trabajo": "💰",
  cuerpo: "🫀",
  guias: "📖",
};

const categoryColors: Record<string, string> = {
  animales: "from-emerald-900/40 to-[#12121e]",
  espiritual: "from-cyan-900/40 to-[#12121e]",
  "muerte-miedo": "from-violet-900/40 to-[#12121e]",
  personas: "from-indigo-900/40 to-[#12121e]",
  "amor-ex": "from-pink-900/40 to-[#12121e]",
  "dinero-trabajo": "from-amber-900/40 to-[#12121e]",
  cuerpo: "from-orange-900/40 to-[#12121e]",
  guias: "from-lime-900/40 to-[#12121e]",
};

export default function CoverImage({ src, alt, className = "", fallbackEmoji, categorySlug }: CoverImageProps) {
  const [error, setError] = useState(false);

  const emoji = fallbackEmoji ?? (categorySlug ? categoryEmojis[categorySlug] : null) ?? "🌙";
  const gradient = categorySlug ? categoryColors[categorySlug] ?? "from-[#2a2a4a] to-[#12121e]" : "from-[#2a2a4a] to-[#12121e]";

  if (error || !src) {
    return (
      <div className={`bg-gradient-to-br ${gradient} flex items-center justify-center ${className}`}>
        <span className="text-5xl opacity-40" aria-hidden="true">{emoji}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={`object-cover ${className}`}
      loading="lazy"
    />
  );
}
