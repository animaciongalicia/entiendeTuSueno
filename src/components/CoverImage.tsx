"use client";

import { useState } from "react";
import Image from "next/image";

interface CoverImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackEmoji?: string;
  categorySlug?: string;
  priority?: boolean;
  sizes?: string;
}

const categoryEmojis: Record<string, string> = {
  // Categorías originales
  animales: "🐍",
  espiritual: "✨",
  "muerte-miedo": "🌑",
  personas: "👥",
  "amor-ex": "💔",
  "dinero-trabajo": "💰",
  cuerpo: "🫀",
  guias: "📖",
  // Categorías nuevas
  "suenos-recurrentes": "🔁",
  "ciencia-del-sueno": "🧠",
  "simbolos-en-suenos": "🔮",
  relaciones: "🫂",
  "trabajo-y-dinero": "💼",
  emociones: "🌊",
  "ansiedad-y-miedos": "😰",
  "cuerpo-y-mente": "🌿",
};

const categoryColors: Record<string, string> = {
  // Categorías originales
  animales: "from-emerald-900/40 to-[#12121e]",
  espiritual: "from-cyan-900/40 to-[#12121e]",
  "muerte-miedo": "from-violet-900/40 to-[#12121e]",
  personas: "from-indigo-900/40 to-[#12121e]",
  "amor-ex": "from-pink-900/40 to-[#12121e]",
  "dinero-trabajo": "from-amber-900/40 to-[#12121e]",
  cuerpo: "from-orange-900/40 to-[#12121e]",
  guias: "from-lime-900/40 to-[#12121e]",
  // Categorías nuevas
  "suenos-recurrentes": "from-purple-900/40 to-[#12121e]",
  "ciencia-del-sueno": "from-blue-900/40 to-[#12121e]",
  "simbolos-en-suenos": "from-fuchsia-900/40 to-[#12121e]",
  relaciones: "from-rose-900/40 to-[#12121e]",
  "trabajo-y-dinero": "from-yellow-900/40 to-[#12121e]",
  emociones: "from-teal-900/40 to-[#12121e]",
  "ansiedad-y-miedos": "from-red-900/40 to-[#12121e]",
  "cuerpo-y-mente": "from-green-900/40 to-[#12121e]",
};

export default function CoverImage({
  src,
  alt,
  className = "",
  fallbackEmoji,
  categorySlug,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: CoverImageProps) {
  const [error, setError] = useState(false);

  const emoji = fallbackEmoji ?? (categorySlug ? categoryEmojis[categorySlug] : null) ?? "🌙";
  const gradient = categorySlug
    ? (categoryColors[categorySlug] ?? "from-[#2a2a4a] to-[#12121e]")
    : "from-[#2a2a4a] to-[#12121e]";

  if (error || !src) {
    return (
      <div className={`bg-gradient-to-br ${gradient} flex items-center justify-center ${className}`}>
        <span className="text-5xl opacity-40" aria-hidden="true">{emoji}</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
        onError={() => setError(true)}
      />
    </div>
  );
}
