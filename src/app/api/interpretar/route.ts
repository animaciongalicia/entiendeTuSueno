import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic();

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
  const { dream, contexto } = await request.json();

  if (!dream || typeof dream !== "string" || dream.trim().length < 10) {
    return new Response(
      JSON.stringify({ error: "Descripción del sueño demasiado corta." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const userMessage = contexto
    ? `Mi sueño: ${dream.trim()}\n\nContexto adicional: ${contexto.trim()}`
    : `Mi sueño: ${dream.trim()}`;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const messageStream = client.messages.stream({
          model: "claude-opus-4-6",
          max_tokens: 1024,
          thinking: { type: "adaptive" },
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
