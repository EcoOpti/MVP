import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // TODO: Validate HMAC
  const topic = req.headers.get("x-shopify-topic");
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ ok: true, topic, received: body });
}

