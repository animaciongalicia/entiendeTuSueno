"use client";

import { useState } from "react";

interface Props {
  sessionId: string;
}

export default function PrintButton({ sessionId }: Props) {
  const [loading, setLoading] = useState(false);

  function handleDownload() {
    setLoading(true);
    // Navigate to the PDF endpoint — browser auto-downloads the file
    window.location.href = `/api/pdf?session_id=${encodeURIComponent(sessionId)}`;
    // Reset after a few seconds (download starts, user stays on page)
    setTimeout(() => setLoading(false), 4000);
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-full border border-[#2a2a4a] bg-[#1a1a2e] px-5 py-2.5 text-sm font-medium text-[#c0b8f0] hover:border-[#7c6af7]/60 hover:text-[#e8e6f0] transition-colors disabled:opacity-60 disabled:cursor-wait"
    >
      {loading ? (
        <>
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Generando PDF…
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Descargar PDF
        </>
      )}
    </button>
  );
}
