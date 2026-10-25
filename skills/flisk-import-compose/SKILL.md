---
name: flisk-import-compose
description: Import an existing Docker Compose project into TDK using `tdk import`. Use when a repo has a root docker-compose.yml and you want the services to run under `tdk up` as bring-your-own resources.
license: MIT
compatibility: Requires the tdk CLI 1.3.145 or later. Does not deploy. Does not start containers.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Import Docker Compose into TDK

`tdk import` reads the root `docker-compose.yml` and writes one bring-your-own `service.json` per service.

## Workflow

1. From the repo root run `tdk import . --dry-run` to see the plan.
2. Review what maps and what is dropped (see Guardrails).
3. Run `tdk import .` (prompts) or `tdk import . --yes` to write.
4. Put needed environment values in the project `.env`. Values from Compose are never copied.
5. Run `tdk doctor` then `tdk up <stack>`.

## What maps

- `build` → `buildContext` + `dockerfile` (TDK builds; does not pull the tag)
- `image` (no build) → `image`
- one published port ≥ 1024 → `port` (unchanged)
- port < 1024 → a free port from 4000-5999 (container must listen on `$PORT`)
- HTTP URL in `healthcheck.test` → `healthCheckPath`
- `depends_on` → `dependsOn` (only services in this import)

Every imported service is `appType: "bring-your-own"`. Database and broker ports become private (`exposeViaProxy: false`).

## Guardrails

- Reads only the root `docker-compose.yml`. Does not read `compose.yaml`, overrides, or nested files.
- Drops: volumes, command, entrypoint, env_file, networks, restart, profiles, extends, out-of-tree builds, and images with `${VAR}`.
- Never edits the Compose file. Never overwrites an existing `service.json` without `--force`.
- Does not start anything. Requires TDK core 1.3.145 or later for a project that has `.tdk/project.json` but no Tiltfile yet.
- Put secrets in `.env`, not in the plan output.
