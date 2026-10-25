---
name: flisk-layout
description: Organize Flisk projects across one or more repositories, handle name clashes, CODEOWNERS and layouts for 5, 20 or 50 services. Use when deciding project structure or onboarding a team.
license: MIT
compatibility: Requires the flisk CLI. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Layout and ownership

One project or one per repo; services can live in other repositories.

## Workflow

1. Decide the layout (single monorepo vs multi-repo) based on team size.
2. Use the documented patterns for 5, 20 and 50 services.
3. Copy `rules/AGENTS.landscape.md` as the root AGENTS.md.
4. Handle name clashes and ownership via CODEOWNERS if needed.
5. See docs/layout.md in flisk.

## Guardrails

- Do not copy the entire skills catalog into every project; install once.
- Generated directories may have their own AGENTS.md fences.
- Keep the service.json contract as the single source of truth.
