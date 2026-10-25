---
name: flisk-deploy-heroku
description: Deploy a TDK local stack to Heroku. Complete separate skill for Heroku. Use when the user wants to take a working tdk up stack to Heroku.
license: MIT
compatibility: Requires a working local TDK stack first. Heroku CLI recommended.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Deploy to Heroku

TDK is local-only. This skill covers deploying to Heroku.

## Workflow

1. Confirm the stack works locally: `tdk doctor && tdk up <stack>`.
2. Extract the contract from service.json.
3. Create a Heroku app and set config vars.
4. Use a Procfile or container registry for the services.
5. Deploy and verify health endpoints.

## Guardrails

- Do not deploy local generated files.
- Keep production config separate from local service.json.
