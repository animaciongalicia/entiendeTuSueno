import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic();

// ── Rate limiting en memoria (por IP, ventana deslizante 1 minuto) ──────────
// Para producción multi-instancia usar Upstash Redis en su lugar.
const RATE_LIMIT_MAX = 5; // requests por ventana
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minuto
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

const SYSTEM_PROMPT = `Eres una herramienta de autoconocimiento a través de los sueños para entiendeTuSueño.

Tu trabajo NO es decirle a la persona "qué significa" su sueño con una lista de símbolos.
Tu trabajo es ayudarle a conectar lo que soñó con lo que probablemente está viviendo.

Cuando alguien describe su sueño, haz esto en orden:

1. REFLEJA el tono emocional del sueño en 1-2 frases. Cómo se siente, qué sensación transmite. Sin interpretar aún.

2. CONECTA con la vida real. Propón 2-3 preguntas o conexiones concretas:
   - ¿Hay algo en tu vida ahora que se parezca a cómo te sentiste en el sueño?
   - Miedos actuales, relaciones, decisiones pendientes, estrés, cambios recientes, deseos no expresados.
   - Usa frases como "¿Hay algo en tu vida ahora mismo que...?", "Este sueño parece resonar con...", "Cuando soñamos así en momentos de..."

3. PERSPECTIVA psicológica breve. Una idea de Jung, neurociencia del sueño (Walker, Hobson) o psicología cognitiva que ilumine. Máximo 2 frases. Sin jerga.

4. CONSEJO PRÁCTICO. Una pregunta concreta para reflexionar hoy, o una acción pequeña.

ESTILO:
- Tono: honesto, cercano, sin condescendencia. Como un amigo con formación en psicología.
- NUNCA: "este sueño significa X", predicciones, esoterismo, numerología, astrología.
- SÍ: "parece que tu mente está procesando...", "¿podría ser que...?", "esto conecta con..."
- Longitud: 250-350 palabras máximo. Denso pero útil.
- Idioma: siempre en español.
- NO uses listas con bullets. Escribe en párrafos naturales.
- Al final, una sola pregunta en negrita para que la persona reflexione.`;

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: "Demasiadas solicitudes. Espera un minuto e inténtalo de nuevo." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "60",
        },
      }
    );
  }

  const body = await request.json().catch(() => ({}));
  const { dream, contexto } = body as { dream?: unknown; contexto?: unknown };

  // Validar dream
  if (!dream || typeof dream !== "string" || dream.trim().length < 10) {
    return new Response(
      JSON.stringify({ error: "Descripción del sueño demasiado corta." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  if (dream.trim().length > 2000) {
    return new Response(
      JSON.stringify({ error: "Descripción demasiado larga. Máximo 2000 caracteres." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Validar contexto (opcional)
  if (contexto !== undefined && contexto !== null) {
    if (typeof contexto !== "string" || contexto.trim().length > 1000) {
      return new Response(
        JSON.stringify({ error: "El contexto no puede superar los 1000 caracteres." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  const userMessage =
    contexto && typeof contexto === "string" && contexto.trim().length > 0
      ? `Mi sueño: ${dream.trim()}\n\nContexto adicional: ${contexto.trim()}`
      : `Mi sueño: ${dream.trim()}`;

  const model = process.env.ANTHROPIC_MODEL ?? "claude-opus-4-6";
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const messageStream = client.messages.stream({
          model,
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userMessage }],
        });

        for await (const event of messageStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Error desconocido";
        controller.enqueue(encoder.encode(`\n\n[Error: ${msg}]`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Accel-Buffering": "no",
    },
  });
}
