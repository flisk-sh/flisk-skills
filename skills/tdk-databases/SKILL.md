---
name: tdk-databases
description: Work with databases and tooling in TDK (Postgres, Prisma, Drizzle, Atlas, Dbmate). Use when adding a database dependency, running migrations, or troubleshooting local data.
license: MIT
compatibility: Requires the tdk CLI and Docker. Does not deploy.
metadata:
  author: tdk-landscape
  version: "1.0"
---

# Databases and tooling

TDK includes Postgres and supports common migration/ORM tools.

## Workflow

1. Add a Postgres dependency in service.json or scaffold a service that needs one.
2. Use Prisma, Drizzle, Atlas or Dbmate as documented in the service features.
3. `tdk up` starts Postgres; volumes survive `tdk down`.
4. For resets, seeds or snapshots see the tdk-data skill and docs/data.md.
5. Run `tdk doctor` if connection or migration issues appear.

## Guardrails

- Do not commit secrets or local data.
- Prefer the generated env files over hard-coding connection strings.
