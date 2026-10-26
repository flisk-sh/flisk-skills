---
name: flisk-ai-agent-build
description: Scaffold a complete local agent system (agent + MCP tools server + database + queue) in one stack. Use when building AI agent applications next to services.
license: MIT
compatibility: Requires the flisk CLI, Docker and Tilt. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Build AI agent systems

Flisk is the local runtime for agent systems behind one gateway.

## Workflow

```bash
flisk resource bot --type agent --stack shop --yes
flisk resource tools-mcp --type mcp --stack shop --yes
flisk up shop
```

Agents get durable checkpoint volumes, sticky `x-session-id` routing, graceful SIGTERM drain, `/health` and `/ready`.

## Guardrails

- See the AI agents guide and honest comparison with other frameworks.
- Use `flisk mcp` so coding agents can drive the stack themselves.
- Keep everything local; do not invent external orchestrators.
