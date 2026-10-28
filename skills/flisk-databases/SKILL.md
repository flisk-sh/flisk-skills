---
name: flisk-databases
description: Give a Flisk service a database and migrations - scaffold a backend with `--feature prisma` (adds a `<name>-migrator` resource) or `--feature drizzle`, or run Atlas, Dbmate, TypeORM, MikroORM or another tool as a one-shot migrator job, and connect through the generated `DATABASE_URL`. Use when adding database access, ORM or migration tooling to a service, or when migrations or connections fail. To wipe, seed or snapshot existing data, use flisk-data.
license: MIT
compatibility: Requires the flisk CLI and Docker. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Databases and migrations

Every Flisk project gets one shared Postgres; you do not add one. Each stack gets its own database, and Compose sets each backend's `DATABASE_URL` to it.

## Workflow

1. Pick the tool when you scaffold the service:
   ```bash
   flisk resource orders-api --type backend --feature prisma --stack shop --yes   # Prisma schema + orders-api-migrator
   flisk resource orders-api --type backend --feature drizzle --stack shop --yes  # Drizzle client in src/db.ts + /health/db, no migrator
   ```
   For an existing service, add `"prisma"` to `featuresEnabled` in its `service.json` once it has a `prisma/schema.prisma`.
2. Run migrations in their own migrator resource, never from the API's start script. Prisma gets one generated. For Drizzle, Atlas, Dbmate, TypeORM, MikroORM or Ptah, copy the matching one-shot job from [examples/byo-jobs](https://github.com/flisk-sh/flisk/tree/main/examples/byo-jobs) and register it with `--type bring-your-own --restart no`.
3. Read the connection string from the environment (`DATABASE_URL`); do not hard-code one.
4. `flisk up <stack>` starts Postgres, then the migrator, then the services that depend on it.
5. If a connection or migration fails, run `flisk doctor` (it checks `DB_PASSWORD` and `DATABASE_URL` in `.env`) and read the migrator's logs with `flisk logs -s <name>-migrator`.

## Guardrails

- A service depends on Postgres through `dependsOn`; list the migrator instead of `postgres` when it creates your tables.
- The Postgres volume keeps the password it was created with; changing `DB_PASSWORD` later does not change it (see flisk-data to reset).
- Do not commit secrets or local data.
