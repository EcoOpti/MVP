export type RiskType = "return" | "abandonment" | "churn";

export function scoreRisk(
  type: RiskType,
  features: Record<string, number | string | boolean>,
) {
  const base = type === "return" ? 0.45 : type === "abandonment" ? 0.5 : 0.4;
  let score = base;
  if (typeof features.cart_value === "number") score += Math.min(features.cart_value / 1000, 0.2);
  if (typeof features.past_returns === "number") score += Math.min(features.past_returns * 0.08, 0.25);
  if (typeof features.days_since_last_purchase === "number")
    score += Math.min(features.days_since_last_purchase / 200, 0.2);
  if (features.discount_applied === true) score -= 0.05;
  score = Math.max(0, Math.min(1, score));
  const threshold = type === "return" ? 0.6 : type === "abandonment" ? 0.55 : 0.58;
  const reason = score >= threshold ? "High risk based on heuristics" : "Below threshold";
  return { score, reason, threshold };
}

