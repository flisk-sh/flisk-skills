---
name: flisk-dry-run
description: Preview what a Flisk command would do without changing anything - `flisk up <stack> --dry-run` (services, URLs, host ports, the Tilt command, and the drift and minFliskVersion gates), `flisk up --dry-run --json` for CI, and the dry runs of `flisk down`, `flisk import`, `flisk doctor --fix` and `flisk upgrade --all`. Use before a first or large `flisk up`, in CI checks, or when an agent should show the plan before acting. To actually start and verify a stack, follow up with `flisk up`.
license: MIT
compatibility: Requires the flisk CLI and a Flisk project. Starts no containers. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Dry runs

Every `--dry-run` below only reads; it is safe to run repeatedly.

## Workflow

1. Preview the stack: `flisk up <stack> --dry-run` (omit `<stack>` for every stack; add `--only <service...>` for a subset). It prints:
   - `Would start N services from ...` and each service name,
   - the frontend and backend URLs, with each backend's health path,
   - the host ports it would use, and a notice when it falls back from port 80,
   - then exits without starting Docker or Tilt.
2. Read the gates: a dry run fails (exit 1) for the same reasons a real run would refuse - generated files edited by hand (drift) or a CLI older than `minFliskVersion`. Fix the source and re-run.
3. For CI or an agent, use `flisk up <stack> --dry-run --json`: one object with `dryRun: true`, `stack`, `services`, the `tilt up` `command`, and with `--only` also `requested` and `declaredDependencies`.
4. Adjust `service.json`, the stack or `--only`, and preview again. Start for real with `flisk up <stack>` once the plan matches what the user asked for.

## Other dry runs

| Command | Shows |
| --- | --- |
| `flisk down --dry-run` | what would be stopped |
| `flisk import . --dry-run` | the services a root `docker-compose.yml` would become, and what is dropped |
| `flisk doctor --fix --dry-run` | the network and probe repairs, without applying them |
| `flisk upgrade --all --dry-run` | every Flisk install on `PATH` that would be upgraded |

## Guardrails

- A dry run still needs a valid project; run `flisk doctor` first when it fails on configuration.
- A dry run does not build images, so it cannot catch build or runtime errors. Say so when reporting a clean preview.
- Show the user the services and URLs from the preview before starting a large stack.
