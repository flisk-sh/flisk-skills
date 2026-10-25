---
name: flisk-dry-run
description: Preview what flisk up will do with --dry-run before starting containers. Useful for agents and CI to check URLs and selected services.
license: MIT
compatibility: Requires the flisk CLI. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Dry-run preview

`flisk up <stack> --dry-run` shows selected services and URLs without launching Docker.

## Workflow

1. Run `flisk up shop --dry-run` from the project root.
2. Inspect the printed ports, URLs and resource list.
3. Adjust service.json or focus flags, then re-run the dry-run.
4. Proceed to a real `flisk up` only after the preview looks correct.

## Guardrails

- Safe for agents to run repeatedly.
- Still requires a valid project configuration (`flisk doctor` first).
