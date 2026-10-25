---
name: flisk-dry-run
description: Preview what tdk up will do with --dry-run before starting containers. Useful for agents and CI to check URLs and selected services.
license: MIT
compatibility: Requires the tdk CLI. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Dry-run preview

`tdk up <stack> --dry-run` shows selected services and URLs without launching Docker.

## Workflow

1. Run `tdk up shop --dry-run` from the project root.
2. Inspect the printed ports, URLs and resource list.
3. Adjust service.json or focus flags, then re-run the dry-run.
4. Proceed to a real `tdk up` only after the preview looks correct.

## Guardrails

- Safe for agents to run repeatedly.
- Still requires a valid project configuration (`tdk doctor` first).
