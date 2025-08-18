import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // TODO: verify signature
  const event = await req.json().catch(() => ({}));
  return NextResponse.json({ ok: true, type: (event as any).type });
}

