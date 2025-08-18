# EcomGuard — The Complete Ecommerce Revenue Protection Engine

Production-ready SaaS skeleton with Next.js + TypeScript, Tailwind, Supabase, Stripe.

## Quickstart
- Copy envs: `cp .env.example .env.local` and fill values
- Install deps: `npm install`
- Run dev: `npm run dev`

## SDK Snippet
```html
<script src="/sdk.js" async></script>
<script>
  window.EcomGuard('init', { ingestUrl: '/api/public/ingest' });
  window.EcomGuard('event', 'page_view', { path: location.pathname });
</script>
```

## Endpoints
- POST `/api/public/ingest`
- POST `/api/ai/score`
- POST `/api/ai/copy`
- POST `/api/hooks/{cart-abandoned|order-created|shipment-delivered|nightly-churn}`