---
name: flisk-deploy-fly
description: Deploy a TDK local stack to Fly.io. Complete separate skill for Fly. Use when the user wants to take a working tdk up stack to Fly.io.
license: MIT
compatibility: Requires a working local TDK stack first. flyctl recommended.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Deploy to Fly.io

TDK is local-only. This skill covers deploying to Fly.io.

## Workflow

1. Confirm the stack works locally: `tdk doctor && tdk up <stack>`.
2. Extract the contract from service.json.
3. Create a fly.toml per service or use a multi-app setup.
4. Set secrets with `fly secrets set`.
5. Deploy with `fly deploy` and verify health.

## Guardrails

- Use production Dockerfiles, not local generated ones.
- Keep local and production configs separate.
