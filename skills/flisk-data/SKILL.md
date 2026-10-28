---
name: flisk-data
description: Reset, seed, snapshot and restore the data in a Flisk project's shared local Postgres - wipe everything, drop one stack's database, run a seed job, or pg_dump and pg_restore a database. Use when the user needs a clean database, reproducible seed data, or to keep state across experiments. To add a database to a service or set up migrations, use flisk-databases.
license: MIT
compatibility: Requires the flisk CLI, Docker and a stack that has run at least once. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Local data: reset, seed, snapshot

Flisk runs one Postgres container per project. Each stack has its own database in it, shared by that stack's services.

## Find the names

| Thing | Name (`<project>` and `<stack>` with `-` replaced by `_`) |
| --- | --- |
| Container | `<project>_postgres` |
| Superuser | `<project>` (password: `DB_PASSWORD` in the project `.env`) |
| Database | `<project>_<stack>` |
| Volume | `database-management_<project>_postgres_data` |
| Host port | `15432`, or `FLISK_POSTGRES_PORT` |

`<project>` is `project.name` in `.flisk/project.json`. Confirm on the machine: `docker volume ls | grep postgres_data`, and `docker exec <project>_postgres psql -U <project> -d postgres -c '\l'`.

## Workflow

- **Everything from scratch** (all stacks lose their data):
  ```bash
  flisk down
  docker volume rm database-management_<project>_postgres_data
  flisk up
  ```
- **One stack's database** (Postgres must be running):
  ```bash
  docker exec <project>_postgres psql -U <project> -d postgres -c "DROP DATABASE <project>_<stack> WITH (FORCE)"
  docker exec <project>_postgres createdb -U <project> -O <project> <project>_<stack>
  ```
  It comes back empty; migrations run again only when the migrator runs again (`flisk up`, or `flisk restart <name>-migrator`).
- **Seed:** run the seed as a one-shot bring-your-own job (`flisk resource seed --type bring-your-own --dockerfile ./Dockerfile --restart no --stack <stack> --yes`) that depends on the migrator, and make it idempotent.
- **Snapshot and restore:**
  ```bash
  docker exec <project>_postgres pg_dump -U <project> -Fc <project>_<stack> > <stack>.dump
  docker exec -i <project>_postgres pg_restore -U <project> -d <project>_<stack> --clean --if-exists --no-owner < <stack>.dump
  ```

## Guardrails

- Volumes survive `flisk down` by design; `flisk down --prune-networks` removes networks, not volumes. Ask before removing a volume.
- Flisk has no `db reset` or `db seed` command; use the steps above.
- Never commit dumps, local data or `.env`. Anonymise any dump that comes from production.
- Details and a worked seed example: [docs/data.md](https://github.com/flisk-sh/flisk/blob/main/docs/data.md).
