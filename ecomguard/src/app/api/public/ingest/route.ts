import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "edge";

const eventSchema = z.object({
  name: z.string(),
  payload: z.record(z.any()).optional(),
  store_id: z.string().uuid().optional(),
  customer_id: z.string().uuid().optional(),
  ts: z.number().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });
  const event = parsed.data;

  if (!supabaseAdmin) return NextResponse.json({ ok: true, dev: true });
  const { error } = await supabaseAdmin.from("events").insert({
    name: event.name,
    payload: event.payload ?? {},
    store_id: event.store_id ?? null,
    customer_id: event.customer_id ?? null,
    ts: event.ts ? new Date(event.ts) : new Date(),
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

