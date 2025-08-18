import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { scoreRisk } from "@/lib/risk";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const schema = z.object({
    type: z.enum(["return", "abandonment", "churn"]),
    features: z.record(z.union([z.string(), z.boolean(), z.number()])),
  });
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });
  const { type, features } = parsed.data;
  return NextResponse.json(scoreRisk(type, features));
}

