---
name: flisk-ui
description: Use the interactive terminal UI (flisk ui) to inspect running stacks and resources. Keyboard navigation, search and tabs.
license: MIT
compatibility: Requires the flisk CLI and a running or inspectable project. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Terminal UI

`flisk ui` opens a dashboard for inspecting services.

## Workflow

1. With a project present, run `flisk ui`.
2. Navigate with ↑/↓ or j/k, search with /, jump with 1-5 or g/G.
3. See docs/ui.md for the full key binding reference.

## Guardrails

- The UI is for inspection; changes still go through service.json and the CLI.
- Works alongside normal `flisk up` sessions.
