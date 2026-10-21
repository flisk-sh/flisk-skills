---
name: tdk-agents
description: Scaffold and run AI agents, MCP tool servers, databases and queues in one local stack with tdk. Use when building agent systems that need durable checkpoints, sticky sessions, health checks and a single gateway.
license: MIT
compatibility: Requires the tdk CLI, Docker and Tilt. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Run AI agents next to services

TDK is the local runtime for agent systems: agent + MCP tools + database + queue behind one command.

## Workflow

1. Scaffold:
   ```bash
   tdk resource bot --type agent --stack shop --yes
   tdk resource tools-mcp --type mcp --stack shop --yes
   ```
2. `tdk up shop`
3. Agents receive durable checkpoint volumes that survive `tdk down`, sticky session routing via `x-session-id`, graceful SIGTERM drain, Docker `/health` and application `/ready` checks.

## Guardrails

- See the AI agents guide in flisk docs.
- Do not invent Kubernetes or external orchestrators; keep everything in the local Docker + Tilt stack.
- Compare honestly with other agent frameworks via the documented comparison.
