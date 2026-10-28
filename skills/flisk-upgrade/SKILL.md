---
name: flisk-upgrade
description: Upgrade the Flisk CLI with `flisk upgrade` (or npm), keep a team on a minimum version with `minFliskVersion` in .flisk/project.json, and handle generated-file drift after an upgrade. Use when moving to a newer flisk, when `flisk doctor` or `flisk up` says the CLI is older than the project requires, or when several flisk installs are on PATH. For drift that is not caused by an upgrade, use flisk-generated-files.
license: MIT
compatibility: Requires the flisk CLI. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Upgrading Flisk

## Workflow

1. Check the current version: `flisk --version`.
2. Upgrade:
   - `flisk upgrade` updates the install it runs from to the latest release (it has no version argument).
   - `flisk upgrade --all --dry-run` lists every Flisk install on `PATH`; `flisk upgrade --all` updates each of them.
   - A specific version from npm: `npm install -g @flisk-sh/flisk@<version>`.
3. In each project run `flisk doctor`, then `flisk up`. `flisk up` regenerates the service files; run `flisk config regenerate` if `flisk config verify` still reports project-level drift.
4. Read the [changelog](https://github.com/flisk-sh/flisk/blob/main/docs/CHANGELOG.md) for flags that were renamed or are scheduled for removal.

## Keep a team on one version

Add a floor to `.flisk/project.json` and commit it:

```json
{ "minFliskVersion": "1.4.0" }
```

`flisk doctor` and `flisk up` (also `--dry-run`) then fail on an older CLI and print `Run: flisk upgrade`. It is a floor, not a pin. `flisk up --ignore-version` skips the check once, with a warning.

## Guardrails

- Never hand-merge generated files after an upgrade; regenerate them.
- Do not run `flisk upgrade` inside tests or probes: on a git-linked install it updates and rebuilds that checkout.
- Guide: [docs/upgrading.md](https://github.com/flisk-sh/flisk/blob/main/docs/upgrading.md).
