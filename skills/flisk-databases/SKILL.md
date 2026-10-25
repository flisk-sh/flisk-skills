---
name: flisk-databases
description: Work with databases and tooling in Flisk (Postgres, Prisma, Drizzle, Atlas, Dbmate). Use when adding a database dependency, running migrations, or troubleshooting local data.
license: MIT
compatibility: Requires the flisk CLI and Docker. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Databases and tooling

Flisk includes Postgres and supports common migration/ORM tools.

## Workflow

1. Add a Postgres dependency in service.json or scaffold a service that needs one.
2. Use Prisma, Drizzle, Atlas or Dbmate as documented in the service features.
3. `flisk up` starts Postgres; volumes survive `flisk down`.
4. For resets, seeds or snapshots see the flisk-data skill and docs/data.md.
5. Run `flisk doctor` if connection or migration issues appear.

## Guardrails

- Do not commit secrets or local data.
- Prefer the generated env files over hard-coding connection strings.
