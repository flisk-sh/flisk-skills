---
name: tdk-ai-agent-build
description: Scaffold a complete local agent system (agent + MCP tools server + database + queue) in one stack. Use when building AI agent applications next to services.
license: MIT
compatibility: Requires the tdk CLI, Docker and Tilt. Does not deploy.
metadata:
  author: tdk-landscape
  version: "1.0"
---

# Build AI agent systems

TDK is the local runtime for agent systems behind one gateway.

## Workflow

```bash
tdk resource bot --type agent --stack shop --yes
tdk resource tools-mcp --type mcp --stack shop --yes
tdk up shop
```

Agents get durable checkpoint volumes, sticky `x-session-id` routing, graceful SIGTERM drain, `/health` and `/ready`.

## Guardrails

- See the AI agents guide and honest comparison with other frameworks.
- Use `tdk mcp` so coding agents can drive the stack themselves.
- Keep everything local; do not invent external orchestrators.
