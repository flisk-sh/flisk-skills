---
name: flisk-import-procfile
description: Turn the processes of a Procfile (web, worker, release) into Flisk bring-your-own resources, one small Dockerfile per process plus `flisk resource --type bring-your-own` (with `--restart no` for one-shot release tasks). Use when a repo has a Procfile (Heroku-style) and the user wants those processes under `flisk up`; `flisk import` does not read Procfiles. For a docker-compose.yml use flisk-import-compose; for any other Dockerfile or image use flisk-byo.
license: MIT
compatibility: Requires the flisk CLI. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Import Procfile processes into Flisk

A Procfile lists process types and their start commands. Flisk does not read Procfiles natively in the current `flisk import` (it reads root `docker-compose.yml`). Wrap each process as a BYO resource.

## Workflow

1. List the processes in the Procfile (`web`, `worker`, `release`, etc.).
2. For each process that should run locally, create a small Dockerfile that runs the same command and listens on `$PORT`.
3. Add it as a BYO resource:

```bash
flisk resource web --type bring-your-own --stack app \
  --dockerfile ./Dockerfile --health-path /health \
  --path services/app/web --yes
```

4. For a one-shot `release` or migration process, set `--restart no`.
5. Run `flisk doctor` then `flisk up <stack>`.

## Guardrails

- The container must read `PORT` and bind to `0.0.0.0`.
- Put environment values in the project `.env`. Do not hard-code secrets in the Dockerfile.
- Prefer the official scaffolders when the process is a standard backend or frontend that Flisk can generate.
- Flisk is local only. The Procfile remains the source for production process management if you still use it.
