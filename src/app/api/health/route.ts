import { NextResponse } from "next/server";

/**
 * GET /api/health
 *
 * Endpoint de monitoreo. Retorna el estado del servicio y la versión.
 * Compatible con Vercel, UptimeRobot, Better Uptime, etc.
 */
export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version ?? "unknown",
    },
    {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    }
  );
}
