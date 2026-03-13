import type { Metadata } from "next";
import InterpretadorClient from "./InterpretadorClient";

export const metadata: Metadata = {
  title: "Entender mi sueño — Interpretador con IA",
  description:
    "Describe tu sueño y te ayudamos a entender qué está procesando tu mente y cómo conecta con lo que estás viviendo. Sin superstición. Con psicología real.",
  alternates: { canonical: "https://entiendetusueno.com/interpretador" },
};

export default function InterpretadorPage() {
  return <InterpretadorClient />;
}
