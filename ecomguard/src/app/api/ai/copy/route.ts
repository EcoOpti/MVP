import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const schema = z.object({
    template: z.string(),
    tone: z.string().default("friendly"),
    variables: z.record(z.any()).optional(),
  });
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });
  const { template, tone } = parsed.data;
  const mk = (v: "A" | "B") => ({
    variant: v,
    subject: "We saved your cart!",
    body: template.replaceAll("{tone}", tone).slice(0, 90),
  });
  return NextResponse.json([mk("A"), mk("B")]);
}

