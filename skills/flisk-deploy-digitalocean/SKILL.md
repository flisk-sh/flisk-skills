---
name: flisk-deploy-digitalocean
description: Deploy a Flisk local stack to DigitalOcean (App Platform, Droplets, or Kubernetes). Complete separate skill for DigitalOcean. Use when the user wants to take a working flisk up stack to DigitalOcean.
license: MIT
compatibility: Requires a working local Flisk stack first. doctl or App Platform recommended.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Deploy to DigitalOcean

Flisk is local-only. This skill covers deploying to DigitalOcean.

## Workflow

1. Confirm the stack works locally: `flisk doctor && flisk up <stack>`.
2. Extract the contract from service.json.
3. Preferred target: App Platform for simplicity, or Droplets/Kubernetes for more control.
4. Set environment variables and secrets in the DigitalOcean dashboard or via doctl.
5. Deploy and verify health endpoints.

## Guardrails

- Do not deploy local generated files.
- Keep production config separate from local service.json.
