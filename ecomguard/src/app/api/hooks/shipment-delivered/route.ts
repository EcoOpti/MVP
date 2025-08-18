import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const key = req.headers.get("x-eg-key") || "anon";
  const { allowed } = rateLimit(`hook:shipment-delivered:${key}`, 10, 60_000);
  if (!allowed) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  const payload = await req.json().catch(() => ({}));
  return NextResponse.json({ ok: true, hook: "shipment-delivered", received: payload });
}

