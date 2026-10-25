---
name: flisk-deploy-cloudflare
description: Deploy a Flisk frontend or compatible service to Cloudflare (Pages or Workers). Complete separate skill for Cloudflare. Use when the user wants to ship a Flisk frontend to Cloudflare.
license: MIT
compatibility: Requires a working local Flisk stack first. Wrangler CLI recommended.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Deploy to Cloudflare

Flisk is local-only. This skill covers deploying compatible parts to Cloudflare.

## Workflow

1. Confirm the frontend works locally with `flisk up`.
2. Identify the frontend service (Vite/React/Vue).
3. Use Cloudflare Pages for static/Vite builds or Workers for edge functions.
4. Set environment variables in the Cloudflare dashboard.
5. Deploy with Wrangler or the Git integration and verify.

## Guardrails

- Best for frontends and edge. Full multi-service Docker stacks stay local or go elsewhere.
- Keep the local service.json as the source of truth.
