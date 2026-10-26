---
name: flisk-doctor-verbose
description: Run flisk doctor with extra verbosity and interpret detailed output when the standard check is not enough. Use for hard-to-diagnose environment or generated-file problems.
license: MIT
compatibility: Requires the flisk CLI. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Verbose doctor

Standard `flisk doctor` is the starting point. For deeper insight use verbose flags or follow the output carefully.

## Workflow

1. Run `flisk doctor` and capture the full output.
2. If needed, set `TDK_DEBUG=1` and re-run with `--verbose` on related commands.
3. Distinguish host prerequisites (Docker, Tilt, Bun) from project config issues.
4. Fix the named source (service.json, .env, missing assets) and re-check.
5. See the detailed flisk-troubleshoot skill for measured failure modes.

## Guardrails

- Do not claim readiness until doctor exits clean.
- Ask before large builds or many containers.
