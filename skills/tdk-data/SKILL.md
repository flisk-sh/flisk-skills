---
name: tdk-data
description: Manage local data for TDK stacks: reset, seed, snapshot and restore Postgres volumes. Use when you need a clean database, reproducible seed data, or to preserve state across tdk down.
license: MIT
compatibility: Requires the tdk CLI, Docker and a running or previously run stack. Does not deploy.
metadata:
  author: tdk-landscape
  version: "1.0"
---

# Local data: reset, seed, snapshot

TDK runs Postgres locally. Manage its data without hand-editing volumes.

## Workflow

1. Identify the project Postgres container (usually named after the project).
2. For a clean start: stop the stack, remove the volume if needed, then `tdk up` again (data is re-initialized from service definitions or seed scripts).
3. Use project-specific seed commands or scripts documented in the examples.
4. Snapshot important volumes before destructive experiments.
5. See docs/data.md in tdk-cli-core for reset, seed and snapshot patterns.

## Guardrails

- Volumes survive `tdk down` by design. Explicitly remove them only when you want a reset.
- Never commit local data or .env secrets.
- Check service.json for database dependencies before assuming a shared Postgres.
