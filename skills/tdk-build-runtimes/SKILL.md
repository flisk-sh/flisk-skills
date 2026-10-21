---
name: tdk-build-runtimes
description: Scaffold and run services across TDK's supported runtimes and frameworks (Bun, Node, Python, Go, Rust, React, Vue, Svelte, Elysia, Fastify, NestJS). Use when choosing a stack or adding a service in a specific language/framework.
license: MIT
compatibility: Requires the tdk CLI. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Build runtimes and frameworks

TDK natively orchestrates many integration tiers. Scaffold the right type and let the CLI generate the local runtime.

## Workflow

1. Pick the type and framework:
   ```bash
   tdk resource api --type backend --stack shop --yes          # Bun/TS default
   tdk resource py-api --type backend --stack shop --yes       # Python patterns
   tdk resource web --type frontend --stack shop --yes         # React/Vue/Svelte
   ```
2. For specialized frameworks (Elysia, Fastify, NestJS, etc.) use the matching example or adjust the generated starter.
3. Run `tdk doctor` then `tdk up <stack>`.
4. See the one-backend, one-backend-python and full examples.

## Guardrails

- Default starter is Bun/TypeScript. Other runtimes are supported via the generators.
- Do not hand-write Dockerfiles; let TDK generate them from service.json.
