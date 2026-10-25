---
name: flisk-upgrade
description: Upgrade the Flisk CLI, pin versions, and handle breaking changes or generated-file drift after an upgrade. Use when moving to a newer flisk version or when doctor reports version-related issues.
license: MIT
compatibility: Requires the flisk CLI. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Upgrading Flisk

Core CLI is MIT and needs no key. Follow the upgrading guide.

## Workflow

1. Check current version with `flisk --version`.
2. Install the new version (`npm install -g @flisk-sh/flisk` or the binary installer).
3. Run `flisk doctor` in each project; regenerate generated files if drift is reported.
4. Review the changelog and docs/upgrading.md for any required project changes.
5. Re-run `flisk up` and confirm stacks start.

## Guardrails

- Pin versions in CI or team environments if needed.
- Generated files may change; never hand-merge them.
- Premium features require a key and are optional.
