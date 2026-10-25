---
name: flisk-python
description: Scaffold and run Python backends with TDK. Use the dedicated Python example patterns for frameworks and dependency management.
license: MIT
compatibility: Requires the tdk CLI. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Python backends

TDK supports Python runtimes alongside Bun/Node, Go, Rust, etc.

## Workflow

1. Use the Python backend example or scaffold with the appropriate type/stack flags.
2. Manage dependencies in the service's own files; TDK generates the local runtime layers.
3. Run `tdk doctor` and `tdk up`.
4. See examples/one-backend-python in flisk.

## Guardrails

- Generated Docker layers handle the base runtime; keep feature requirements in service.json.
- Health checks must be implemented for proper readiness.
