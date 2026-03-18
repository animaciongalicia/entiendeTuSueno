import type { Metadata } from "next";
import InterpretadorClient from "./InterpretadorClient";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Entender mi sueño — Interpretador con IA",
  description:
    "Describe tu sueño y te ayudamos a entender qué está procesando tu mente y cómo conecta con lo que estás viviendo. Sin superstición. Con psicología real.",
  alternates: { canonical: `${SITE_URL}/interpretador` },
};

export default function InterpretadorPage() {
  return <InterpretadorClient />;
}
