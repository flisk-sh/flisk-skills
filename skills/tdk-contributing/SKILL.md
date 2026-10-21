---
name: tdk-contributing
description: "Guide for contributors working inside the flisk repository: engine edits, tests, syncing skills, and following AGENTS.cli-core.md."
license: MIT
compatibility: Requires a flisk checkout. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Contributing to flisk

Use the contributor rules and keep the skills mirror in sync.

## Workflow

1. Read `rules/AGENTS.cli-core.md` and copy it as the root AGENTS.md when working in core.
2. Edit engine, CLI or generators; never hand-edit the generated skill mirrors.
3. After changing skills in tdk-skills, run the sync script in flisk.
4. Run relevant tests (`tests/tilt-engine/`, e2e) before committing.
5. See CONTRIBUTING.md and the operator runbook.

## Guardrails

- Pause any auto-commit tools during experiments.
- Keep generated files and skills mirrors derived, not edited.
