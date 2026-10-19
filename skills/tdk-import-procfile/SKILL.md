---
name: tdk-import-procfile
description: Turn Procfile processes into TDK bring-your-own resources. Use when a repo has a Procfile and you want the web, worker, or release processes to run under `tdk up`.
license: MIT
compatibility: Requires the tdk CLI. Does not deploy.
metadata:
  author: tdk-landscape
  version: "1.0"
---

# Import Procfile processes into TDK

A Procfile lists process types and their start commands. TDK does not read Procfiles natively in the current `tdk import` (it reads root `docker-compose.yml`). Wrap each process as a BYO resource.

## Workflow

1. List the processes in the Procfile (`web`, `worker`, `release`, etc.).
2. For each process that should run locally, create a small Dockerfile that runs the same command and listens on `$PORT`.
3. Add it as a BYO resource:

```bash
tdk resource web --type bring-your-own --stack app \
  --dockerfile ./Dockerfile --health-path /health \
  --path services/app/web --yes
```

4. For a one-shot `release` or migration process, set `--restart no`.
5. Run `tdk doctor` then `tdk up <stack>`.

## Guardrails

- The container must read `PORT` and bind to `0.0.0.0`.
- Put environment values in the project `.env`. Do not hard-code secrets in the Dockerfile.
- Prefer the official scaffolders when the process is a standard backend or frontend that TDK can generate.
- TDK is local only. The Procfile remains the source for production process management if you still use it.
