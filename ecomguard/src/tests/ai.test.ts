import { describe, it, expect } from "vitest";
import { scoreRisk } from "@/lib/risk";

describe("scoreRisk", () => {
  it("returns higher risk for more returns", () => {
    const a = scoreRisk("return", { past_returns: 0, cart_value: 0 });
    const b = scoreRisk("return", { past_returns: 5, cart_value: 0 });
    expect(b.score).toBeGreaterThan(a.score);
  });
});

