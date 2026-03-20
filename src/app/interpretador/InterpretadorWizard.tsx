"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

// ── Data ───────────────────────────────────────────────────────────────────────

const FEELINGS = [
  "Miedo", "Ansiedad", "Confusión", "Tristeza",
  "Rabia", "Nostalgia", "Extrañeza", "Alivio",
  "Culpa", "Soledad", "Urgencia", "Vergüenza",
  "Euforia", "Pérdida", "Amor", "Traición",
];

const SYMBOLS = [
  "Serpientes", "Agua", "Caer", "Volar",
  "Muerte", "Embarazo", "Ex pareja", "Persecución",
  "Oscuridad", "Animales", "Niños", "Casa",
  "Luz", "Huida", "Dinero", "Trabajo",
];

const LOADING_MESSAGES = [
  "Identificando patrones emocionales...",
  "Conectando con tu vida real...",
  "Analizando bloqueos del subconsciente...",
  "Preparando tu informe personalizado...",
];

const DREAM_MAX = 600;
const DREAM_MIN = 20;

// ── Progress bar ───────────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  const pct = step >= 7 ? 100 : Math.round(((step - 1) / 5) * 100);
  return (
    <div className="h-1 w-full bg-[#2a2a4a] rounded-t-2xl overflow-hidden">
      <div
        className="h-full bg-[#7c6af7] transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ── Simple markdown renderer ───────────────────────────────────────────────────

function renderMarkdown(text: string) {
  return text
    .split(/\n\n+/)
    .filter(Boolean)
    .map((block, i) => {
      if (block.startsWith("## ")) {
        return (
          <h3 key={i} className="text-lg font-bold text-[#e8e6f0] mt-7 mb-3 first:mt-0 tracking-wide">
            {block.slice(3)}
          </h3>
        );
      }
      const parts = block.split(/\*\*(.+?)\*\*/g);
      return (
        <p key={i} className="text-sm text-[#8b87a0] leading-relaxed mb-4">
          {parts.map((part, j) =>
            j % 2 === 1
              ? <strong key={j} className="text-[#e8e6f0] font-semibold">{part}</strong>
              : part
          )}
        </p>
      );
    });
}

// ── Step 1: Intro ──────────────────────────────────────────────────────────────

function Step1({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center">
      <div className="text-4xl mb-5">✦</div>
      <h2 className="text-2xl font-bold text-[#f0eeff] mb-3">
        Vamos a descifrarlo <span className="text-[#7c6af7]">juntos</span>
      </h2>
      <p className="text-[#8b87a0] text-sm mb-8 max-w-sm mx-auto leading-relaxed">
        Conectamos lo que soñaste con lo que estás viviendo: tus miedos, tus relaciones,
        tus cambios. Psicología real, sin superstición.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left">
        <div className="rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-4">
          <p className="text-xs font-semibold text-[#7c6af7] mb-1">ℹ Análisis profundo</p>
          <p className="text-xs text-[#8b87a0] leading-relaxed">
            Detectamos bloqueos emocionales y patrones que tu mente está repitiendo.
          </p>
        </div>
        <div className="rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-4">
          <p className="text-xs font-semibold text-[#7c6af7] mb-1">📄 Informe completo</p>
          <p className="text-xs text-[#8b87a0] leading-relaxed">
            Significado central, símbolos, mensaje del subconsciente y consejos prácticos.
          </p>
        </div>
      </div>
      <button
        onClick={onNext}
        className="rounded-full bg-[#7c6af7] px-8 py-3 text-sm font-medium text-white hover:bg-[#9580ff] transition-colors shadow-lg shadow-[#7c6af7]/20"
      >
        Comenzar ahora →
      </button>
    </div>
  );
}

// ── Step 2: Describe el sueño ──────────────────────────────────────────────────

function Step2({
  dream,
  onChange,
  onBack,
  onNext,
}: {
  dream: string;
  onChange: (v: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#f0eeff] mb-2 text-center">
        Describe tu sueño
      </h2>
      <p className="text-[#8b87a0] text-sm text-center mb-6">
        Intenta recordar los detalles más vívidos. ¿Qué sentías? ¿Quién estaba allí?
      </p>
      <textarea
        value={dream}
        onChange={(e) => onChange(e.target.value.slice(0, DREAM_MAX))}
        placeholder="Estaba cayendo en un vacío oscuro, pero de repente..."
        rows={6}
        className="w-full rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] px-4 py-3 text-sm text-[#c0b8f0] placeholder-[#3a3860] resize-none focus:outline-none focus:border-[#7c6af7]/60 transition-colors"
      />
      <div className="flex justify-between items-center mt-1.5 mb-6">
        <span className="text-[10px] text-[#4a4760]">mínimo {DREAM_MIN} caracteres</span>
        <span className={`text-[10px] ${dream.length >= DREAM_MAX - 50 ? "text-amber-400" : "text-[#4a4760]"}`}>
          {dream.length}/{DREAM_MAX}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-sm text-[#4a4760] hover:text-[#8b87a0] transition-colors">
          ← Atrás
        </button>
        <button
          onClick={onNext}
          disabled={dream.trim().length < DREAM_MIN}
          className="rounded-full bg-[#7c6af7] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#9580ff] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}

// ── Step 3: Sentimientos ───────────────────────────────────────────────────────

function Step3({
  feelings,
  onToggle,
  onBack,
  onNext,
}: {
  feelings: string[];
  onToggle: (f: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#f0eeff] mb-2 text-center">
        ¿Cómo te sentiste?
      </h2>
      <p className="text-[#8b87a0] text-sm text-center mb-6">
        Selecciona hasta 4 sentimientos que describían el sueño
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {FEELINGS.map((f) => {
          const active = feelings.includes(f);
          const disabled = !active && feelings.length >= 4;
          return (
            <button
              key={f}
              onClick={() => onToggle(f)}
              disabled={disabled}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-[#7c6af7] text-white"
                  : disabled
                  ? "border border-[#2a2a4a] bg-[#1a1a2e] text-[#3a3860] cursor-not-allowed"
                  : "border border-[#2a2a4a] bg-[#1a1a2e] text-[#8b87a0] hover:border-[#7c6af7]/50 hover:text-[#c0b8f0]"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>
      <p className="text-[10px] text-[#4a4760] text-center mb-6">
        {feelings.length}/4 seleccionados
      </p>
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-sm text-[#4a4760] hover:text-[#8b87a0] transition-colors">
          ← Atrás
        </button>
        <button
          onClick={onNext}
          disabled={feelings.length === 0}
          className="rounded-full bg-[#7c6af7] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#9580ff] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}

// ── Step 4: Símbolos ───────────────────────────────────────────────────────────

function Step4({
  symbols,
  onToggle,
  onBack,
  onNext,
}: {
  symbols: string[];
  onToggle: (s: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#f0eeff] mb-2 text-center">
        Selecciona hasta 3 símbolos
      </h2>
      <p className="text-[#8b87a0] text-sm text-center mb-6">
        ¿Apareció alguno de estos elementos de forma prominente?
      </p>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {SYMBOLS.map((s) => {
          const active = symbols.includes(s);
          const disabled = !active && symbols.length >= 3;
          return (
            <button
              key={s}
              onClick={() => onToggle(s)}
              disabled={disabled}
              className={`rounded-lg px-2 py-2.5 text-xs font-medium transition-colors ${
                active
                  ? "bg-[#7c6af7] text-white"
                  : disabled
                  ? "border border-[#2a2a4a] bg-[#1a1a2e] text-[#3a3860] cursor-not-allowed"
                  : "border border-[#2a2a4a] bg-[#1a1a2e] text-[#8b87a0] hover:border-[#7c6af7]/50 hover:text-[#c0b8f0]"
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>
      <p className="text-[10px] text-[#4a4760] text-center mb-6">
        {symbols.length}/3 seleccionados · puedes continuar sin seleccionar ninguno
      </p>
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-sm text-[#4a4760] hover:text-[#8b87a0] transition-colors">
          ← Atrás
        </button>
        <button
          onClick={onNext}
          className="rounded-full bg-[#7c6af7] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#9580ff] transition-colors"
        >
          Ver interpretación →
        </button>
      </div>
    </div>
  );
}

// ── Step 5: Email ──────────────────────────────────────────────────────────────

function Step5({
  email,
  emailValid,
  onChange,
  onBack,
  onNext,
}: {
  email: string;
  emailValid: boolean;
  onChange: (v: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#f0eeff] mb-2 text-center">
        ¿Dónde enviamos tu informe?
      </h2>
      <p className="text-[#8b87a0] text-sm text-center mb-8 max-w-sm mx-auto leading-relaxed">
        Guarda tu análisis. Solo te contactamos si decides desbloquear el informe completo.
      </p>
      <input
        type="email"
        value={email}
        onChange={(e) => onChange(e.target.value)}
        placeholder="tu@email.com"
        className="w-full rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] px-4 py-3 text-sm text-[#c0b8f0] placeholder-[#3a3860] focus:outline-none focus:border-[#7c6af7]/60 transition-colors mb-2"
      />
      <p className="text-[10px] text-[#4a4760] text-center mb-8">
        Sin spam. Tus datos no se comparten con terceros.
      </p>
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-sm text-[#4a4760] hover:text-[#8b87a0] transition-colors">
          ← Atrás
        </button>
        <button
          onClick={onNext}
          disabled={!emailValid}
          className="rounded-full bg-[#7c6af7] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#9580ff] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Generar mi análisis →
        </button>
      </div>
    </div>
  );
}

// ── Step 6: Loading ────────────────────────────────────────────────────────────

function Step6({ msgIdx, progress }: { msgIdx: number; progress: number }) {
  return (
    <div className="text-center py-10">
      <div className="flex justify-center mb-6">
        <svg
          className="w-12 h-12 animate-spin text-[#7c6af7]"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
          <path
            className="opacity-80"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-[#f0eeff] mb-2 min-h-[1.75rem]">
        {LOADING_MESSAGES[msgIdx]}
      </h2>
      <p className="text-sm text-[#8b87a0] mb-10 max-w-xs mx-auto leading-relaxed">
        Estamos procesando tu sueño con inteligencia de alta precisión.
        No cierres esta ventana.
      </p>
      <div className="w-full max-w-xs mx-auto h-1.5 bg-[#2a2a4a] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#7c6af7] transition-all duration-300 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// ── Step 7: Resultado + paywall ────────────────────────────────────────────────

function Step7({
  freeResult,
  premiumResult,
  feelings,
  reportId,
  onReset,
}: {
  freeResult: string;
  premiumResult: string;
  feelings: string[];
  reportId: string | null;
  onReset: () => void;
}) {
  const tags = feelings.slice(0, 3);
  const premiumHref = reportId ? `/premium?id=${reportId}` : "/premium";

  return (
    <div>
      {/* Alert banner */}
      {tags.length > 0 && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/8 p-4 mb-6 flex gap-3 items-start">
          <span className="text-amber-400 text-base shrink-0 mt-0.5">⚠</span>
          <div>
            <p className="text-sm font-semibold text-amber-300 mb-1.5">
              Hemos detectado patrones importantes
            </p>
            <p className="text-xs text-[#8b87a0] mb-2">
              Tu sueño contiene elementos de alta carga emocional. Tu subconsciente está intentando procesar:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Free result */}
      <h2 className="text-xl font-bold text-[#f0eeff] mb-4">Vista previa del análisis</h2>
      <div className="rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] p-6 mb-8">
        {freeResult ? renderMarkdown(freeResult) : (
          <p className="text-sm text-[#4a4760] italic">No se generó contenido. Inténtalo de nuevo.</p>
        )}
      </div>

      {/* Premium paywall */}
      <div className="relative rounded-xl border border-[#2a2a4a] bg-[#1a1a2e] overflow-hidden">
        {/* Blurred content behind */}
        {premiumResult && (
          <div className="p-5 blur-sm select-none pointer-events-none" aria-hidden="true">
            {renderMarkdown(premiumResult.slice(0, 500) + "...")}
          </div>
        )}
        {/* Overlay */}
        <div className={`${premiumResult ? "absolute inset-0" : ""} flex items-center justify-center bg-gradient-to-t from-[#12121e] via-[#12121e]/90 to-transparent p-8`}>
          <div className="text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="text-lg font-bold text-[#f0eeff] mb-2">Desbloquear Informe Completo</h3>
            <p className="text-xs text-[#8b87a0] mb-1 max-w-xs mx-auto leading-relaxed">
              Significado central · Símbolos clave · Mensaje del subconsciente
            </p>
            <p className="text-xs text-[#8b87a0] mb-5 max-w-xs mx-auto leading-relaxed">
              Bloqueos emocionales · Patrones · Consejo práctico
            </p>
            <Link
              href={premiumHref}
              className="inline-block rounded-full bg-[#7c6af7] px-7 py-3 text-sm font-semibold text-white hover:bg-[#9580ff] transition-colors shadow-lg shadow-[#7c6af7]/30"
            >
              Obtener mi informe completo →
            </Link>
            <p className="text-[10px] text-[#4a4760] mt-3">
              Análisis de 1.500-2.000 palabras basado en psicología real
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onReset}
        className="mt-6 text-xs text-[#4a4760] hover:text-[#8b87a0] transition-colors w-full text-center"
      >
        Interpretar otro sueño
      </button>
    </div>
  );
}

// ── Main wizard ────────────────────────────────────────────────────────────────

export default function InterpretadorWizard() {
  const [step, setStep] = useState(1);
  const [dream, setDream] = useState("");
  const [feelings, setFeelings] = useState<string[]>([]);
  const [symbols, setSymbols] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [freeResult, setFreeResult] = useState("");
  const [premiumResult, setPremiumResult] = useState("");
  const [reportId, setReportId] = useState<string | null>(null);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [apiError, setApiError] = useState("");

  // Loading screen: fake progress + rotating messages
  useEffect(() => {
    if (step !== 6) return;
    const start = Date.now();

    const msgTimer = setInterval(() => {
      setLoadingMsgIdx((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 3000);

    const progTimer = setInterval(() => {
      const elapsed = Date.now() - start;
      setLoadingProgress(Math.min(90, Math.round((elapsed / 30000) * 90)));
    }, 250);

    return () => {
      clearInterval(msgTimer);
      clearInterval(progTimer);
    };
  }, [step]);

  // API call fires when step 6 mounts
  const runAnalysis = useCallback(async () => {
    setApiError("");
    try {
      const res = await fetch("/api/interpretar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dream, feelings, symbols, email }),
      });

      const data = await res.json().catch(() => ({ error: "Error de conexión." }));

      if (!res.ok) {
        setApiError((data as { error?: string }).error ?? "Error de conexión.");
        setStep(2);
        return;
      }

      const { free, premium, reportId: id } = data as {
        free: string;
        premium: string;
        reportId: string | null;
      };

      setFreeResult(free ?? "");
      setPremiumResult(premium ?? "");
      setReportId(id ?? null);
      setLoadingProgress(100);
      setTimeout(() => setStep(7), 500);
    } catch {
      setApiError("Error al conectar con el servidor. Inténtalo de nuevo.");
      setStep(2);
    }
  }, [dream, feelings, symbols, email]);

  useEffect(() => {
    if (step === 6) runAnalysis();
  }, [step, runAnalysis]);

  // Toggle helpers
  const toggleFeeling = (f: string) =>
    setFeelings((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : prev.length < 4 ? [...prev, f] : prev
    );

  const toggleSymbol = (s: string) =>
    setSymbols((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : prev.length < 3 ? [...prev, s] : prev
    );

  const reset = () => {
    setStep(1);
    setDream("");
    setFeelings([]);
    setSymbols([]);
    setEmail("");
    setFreeResult("");
    setPremiumResult("");
    setReportId(null);
    setLoadingMsgIdx(0);
    setLoadingProgress(0);
    setApiError("");
  };

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  return (
    <div className="mx-auto max-w-[750px] px-4 sm:px-6 py-12">
      {apiError && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          {apiError}
        </div>
      )}
      <div className="rounded-2xl border border-[#2a2a4a] bg-[#12121e] overflow-hidden shadow-2xl shadow-black/40">
        <ProgressBar step={step} />
        <div className="p-8 sm:p-10">
          {step === 1 && <Step1 onNext={() => setStep(2)} />}
          {step === 2 && (
            <Step2
              dream={dream}
              onChange={setDream}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <Step3
              feelings={feelings}
              onToggle={toggleFeeling}
              onBack={() => setStep(2)}
              onNext={() => setStep(4)}
            />
          )}
          {step === 4 && (
            <Step4
              symbols={symbols}
              onToggle={toggleSymbol}
              onBack={() => setStep(3)}
              onNext={() => setStep(5)}
            />
          )}
          {step === 5 && (
            <Step5
              email={email}
              emailValid={emailValid}
              onChange={setEmail}
              onBack={() => setStep(4)}
              onNext={() => setStep(6)}
            />
          )}
          {step === 6 && (
            <Step6 msgIdx={loadingMsgIdx} progress={loadingProgress} />
          )}
          {step === 7 && (
            <Step7
              freeResult={freeResult}
              premiumResult={premiumResult}
              feelings={feelings}
              reportId={reportId}
              onReset={reset}
            />
          )}
        </div>
      </div>
    </div>
  );
}
