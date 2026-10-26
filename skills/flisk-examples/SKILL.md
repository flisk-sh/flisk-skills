---
name: flisk-examples
description: Start from the official runnable examples (one-backend, Python, Helm, BYO, full multi-service). Use when onboarding or learning Flisk patterns.
license: MIT
compatibility: Requires the flisk CLI. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Runnable examples

Use the examples in flisk to see real patterns.

## Workflow

1. `flisk project example` fetches a working example.
2. Or clone specific ones: one-backend, one-backend-python, one-backend-helm, byo, tdk-example.
3. `cd` into it, run `flisk doctor` then `flisk up`.
4. Study the service.json and generated files.

## Guardrails

- Examples are the source of truth for supported patterns.
- Do not copy generated files; regenerate them.
