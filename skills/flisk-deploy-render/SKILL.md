---
name: flisk-deploy-render
description: Deploy a Flisk local stack to Render. Complete separate skill for Render. Use when the user wants to take a working flisk up stack to Render.
license: MIT
compatibility: Requires a working local Flisk stack first. Render dashboard or render.yaml recommended.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Deploy to Render

Flisk is local-only. This skill covers deploying to Render.

## Workflow

1. Confirm the stack works locally with `flisk doctor && flisk up <stack>`.
2. Extract service contracts from service.json.
3. Create a render.yaml or configure services in the dashboard.
4. Set environment variables and secrets.
5. Deploy and verify health endpoints.

## Guardrails

- Do not deploy local generated files.
- Keep production config separate from local service.json.
