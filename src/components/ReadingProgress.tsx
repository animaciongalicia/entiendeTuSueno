"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress(): React.ReactElement | null {
  // progress: valor visual exacto (0-100)
  // ariaValue: solo se actualiza cada 5% para no saturar lectores de pantalla
  const [progress, setProgress] = useState(0);
  const [ariaValue, setAriaValue] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const next = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      setProgress(next);
      setAriaValue((prev) => {
        const rounded = Math.round(next / 5) * 5;
        return rounded !== prev ? rounded : prev;
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-50 h-[3px] bg-[#7c6af7] transition-all duration-75 ease-out"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-label="Progreso de lectura"
      aria-valuenow={ariaValue}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
