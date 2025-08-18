import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async (req) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
  const { template, tone } = await req.json();
  const mk = (v: "A" | "B") => ({
    variant: v,
    subject: "We saved your cart!",
    body: String(template || "").slice(0, 90),
  });
  return new Response(JSON.stringify([mk("A"), mk("B")]), {
    headers: { "content-type": "application/json" },
  });
});

