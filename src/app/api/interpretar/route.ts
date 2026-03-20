import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const client = new Anthropic();

// ── Rate limiting en memoria (por IP, ventana deslizante 1 minuto) ──────────
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const ipRequests = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipRequests.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  ipRequests.set(ip, [...timestamps, now]);
  return false;
}

const SYSTEM_PROMPT = `Eres un psicólogo especializado en análisis junguiano y neurociencia del sueño. Generas informes de interpretación profundos, honestos y psicológicamente fundamentados. Sin superstición, sin esoterismo, sin predicciones. Solo psicología real.

El usuario te aporta: la descripción de su sueño, los sentimientos que experimentó y los símbolos más prominentes que aparecieron.

Estructura el informe en DOS PARTES separadas por la línea exacta ---PREMIUM--- (sola en su propia línea, sin espacios adicionales).

=== PARTE GRATUITA (400-500 palabras) ===

## Lo que tu sueño está procesando
[Tono emocional dominante y atmósfera general del sueño. Honesto, sin adornos. 80-100 palabras.]

## Lo que tu mente está intentando decirte
[2-3 conexiones concretas con situaciones de vida real, usando los sentimientos y símbolos aportados para personalizar. Frases como "¿hay algo en tu vida ahora que...?", "esto podría conectar con...". 250-280 palabras.]

## Una primera perspectiva
[Una idea de Jung o neurociencia del sueño que ilumine el caso sin ser académica. 70-90 palabras.]

---PREMIUM---

## Significado central del sueño
[El núcleo de lo que este sueño representa en la vida del soñador. Profundo, específico, basado en todos los datos aportados. 180-220 palabras.]

## Análisis de los símbolos clave
[Analiza cada símbolo seleccionado individualmente: su significado psicológico, su relación con el resto del sueño y con la vida real del soñador. 200-280 palabras.]

## Mensaje de tu subconsciente
[Lo que la mente no puede decir en vigilia y está intentando comunicar. Directo, sin rodeos. 120-150 palabras.]

## Bloqueos emocionales detectados
[2-3 bloqueos concretos que este sueño sugiere. Son hipótesis psicológicas, no diagnósticos. 150-180 palabras.]

## Patrones que merece la pena observar
[Cómo este sueño puede conectar con patrones más amplios o repetitivos. 100-120 palabras.]

## Consejo de interpretación práctico
[Una acción concreta y realizable esta semana para trabajar lo que el sueño señala. 80-100 palabras.]

## Para reflexionar
[Una sola pregunta en **negrita** que invite a introspección genuina. 20-30 palabras.]

REGLAS ABSOLUTAS:
- Idioma: siempre español.
- Tono: honesto, cercano, sin condescendencia. Como un psicólogo que también es amigo.
- NUNCA: "este sueño significa X", predicciones, esoterismo, numerología, "augura", "predice".
- SÍ: "parece que tu mente está procesando...", "esto podría conectar con...", "tu subconsciente parece señalar...".
- Escribe en párrafos naturales dentro de cada sección. Sin bullets dentro de las secciones.
- La línea ---PREMIUM--- debe aparecer SOLA en su propia línea, exactamente así.`;

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Espera un minuto e inténtalo de nuevo." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  const body = await request.json().catch(() => ({}));
  const { dream, feelings, symbols, email } = body as {
    dream?: unknown;
    feelings?: unknown;
    symbols?: unknown;
    email?: unknown;
  };

  if (!dream || typeof dream !== "string" || dream.trim().length < 10) {
    return NextResponse.json(
      { error: "Descripción del sueño demasiado corta." },
      { status: 400 }
    );
  }
  if (dream.trim().length > 600) {
    return NextResponse.json(
      { error: "Descripción demasiado larga. Máximo 600 caracteres." },
      { status: 400 }
    );
  }

  const feelingsList = Array.isArray(feelings)
    ? feelings.filter((f): f is string => typeof f === "string").slice(0, 4)
    : [];
  const symbolsList = Array.isArray(symbols)
    ? symbols.filter((s): s is string => typeof s === "string").slice(0, 3)
    : [];
  const emailStr = typeof email === "string" && email.trim() ? email.trim() : null;

  const userMessage = [
    `Mi sueño: ${dream.trim()}`,
    feelingsList.length > 0
      ? `Sentimientos durante el sueño: ${feelingsList.join(", ")}`
      : null,
    symbolsList.length > 0
      ? `Símbolos presentes: ${symbolsList.join(", ")}`
      : null,
  ]
    .filter(Boolean)
    .join("\n\n");

  const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6";

  try {
    const message = await client.messages.create({
      model,
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const fullText =
      message.content[0].type === "text" ? message.content[0].text : "";

    const sep = "---PREMIUM---";
    const idx = fullText.indexOf(sep);
    const freeResult = idx !== -1 ? fullText.slice(0, idx).trim() : fullText.trim();
    const premiumResult = idx !== -1 ? fullText.slice(idx + sep.length).trim() : "";

    const { data, error } = await supabaseAdmin
      .from("dream_reports")
      .insert({
        email: emailStr,
        dream: dream.trim(),
        feelings: feelingsList,
        symbols: symbolsList,
        free_result: freeResult,
        premium_result: premiumResult,
        paid: false,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
    }

    return NextResponse.json({
      free: freeResult,
      premium: premiumResult,
      reportId: data?.id ?? null,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Error desconocido";
    console.error("API error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
