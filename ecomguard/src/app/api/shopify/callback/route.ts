import { NextRequest, NextResponse } from "next/server";
import { shopify } from "@/lib/shopify";

export async function GET(req: NextRequest) {
  if (!shopify) return NextResponse.redirect(new URL("/docs", req.url));
  const result = await shopify.auth.callback({ rawRequest: req });
  // TODO: persist tokens to integrations table
  void result; // to avoid unused warning in skeleton
  return NextResponse.redirect(new URL("/(app)/onboarding", req.url));
}

