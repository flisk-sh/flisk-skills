---
name: tdk-deploy-railway
description: Deploy a TDK local stack to Railway. Complete separate skill for Railway. Use when the user wants to take a working tdk up stack to Railway.
license: MIT
compatibility: Requires a working local TDK stack first. Railway CLI or Git integration recommended.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Deploy to Railway

TDK is local-only. This skill covers deploying to Railway.

## Workflow

1. Confirm the stack works locally with `tdk doctor && tdk up <stack>`.
2. Extract service contracts from service.json.
3. Connect the repo or use the Railway CLI.
4. Set environment variables and secrets in the Railway dashboard.
5. Deploy services (containers or buildpacks) and verify health endpoints.

## Guardrails

- Do not deploy local generated files.
- Keep production config separate from local service.json.
