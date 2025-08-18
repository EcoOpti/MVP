import { NextRequest, NextResponse } from "next/server";
import { shopify } from "@/lib/shopify";

export async function GET(req: NextRequest) {
  if (!shopify) return NextResponse.redirect(new URL("/docs", req.url));
  const shop = new URL(req.url).searchParams.get("shop");
  if (!shop) return NextResponse.json({ error: "missing shop" }, { status: 400 });
  const authRoute = await shopify.auth.begin({ shop, callbackPath: "/api/shopify/callback" });
  return NextResponse.redirect(authRoute);
}

