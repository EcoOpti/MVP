import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";
import { env } from "./env";

export const shopify =
  env.SHOPIFY_API_KEY && env.SHOPIFY_API_SECRET && env.SHOPIFY_APP_URL
    ? shopifyApi({
        apiKey: env.SHOPIFY_API_KEY,
        apiSecretKey: env.SHOPIFY_API_SECRET,
        scopes: (env.SHOPIFY_SCOPES ?? "").split(",").map((s) => s.trim()).filter(Boolean),
        isEmbeddedApp: false,
        hostName: new URL(env.SHOPIFY_APP_URL).host,
        apiVersion: LATEST_API_VERSION,
      })
    : null;

