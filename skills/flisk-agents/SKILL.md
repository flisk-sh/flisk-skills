---
name: flisk-agents
description: Build and operate AI agent resources in a local Flisk stack - scaffold an agent (`--type agent`) next to an MCP tool server, a database and a queue, implement its process contract (`/health`, `/ready`, `POST /turn`, `GET /session`, `GET /sessions` with `x-session-id`), choose checkpoint durability, and inspect sessions with `flisk agent sessions`. Use when an app needs a long-running agent with durable sessions. For a generic backend or worker, use flisk-scaffold.
license: MIT
compatibility: Requires the flisk CLI, Docker and Tilt. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# AI agents in a Flisk stack

Flisk runs an agent, its MCP tools, a database and a queue behind one local gateway, started by one command.

## Workflow

1. Scaffold the agent and its tools in one stack:
   ```bash
   flisk resource bot --type agent --stack shop --yes
   flisk resource tools-mcp --type mcp --stack shop --yes
   ```
   `--durability files` (default) keeps checkpoints on a named Docker volume; `--durability postgres` stores them in the project Postgres. To start from a complete example instead, clone it: `flisk project agent-stack --path <folder> --yes`.
2. Put the agent's logic in the turn handler of the generated `src/index.ts`. List any model API key under `secrets.required` in `service.json` and put the value in the project `.env`.
3. `flisk up shop`, then check `http://api.<project>.localhost/api/bot/health` and `/ready` (use the exact URL from `flisk networks`).
4. Send a turn and read it back:
   ```bash
   curl -X POST -H 'x-session-id: s1' -H 'content-type: application/json' -d '{"input":"hi"}' http://api.<project>.localhost/api/bot/turn
   flisk agent sessions bot              # list sessions (add --watch to refresh)
   flisk agent sessions bot --session-id s1 --json   # read one checkpoint
   ```

## The agent contract

- `/health`: liveness only. Idle is healthy; it never checks the store.
- `/ready`: 200 when the checkpoint store is reachable and the agent is not draining.
- `POST /turn` with `x-session-id`: loads that session's checkpoint, runs the turn, commits the checkpoint.
- `GET /session` with `x-session-id`: returns one session's checkpoint. `GET /sessions` lists all sessions, newest first.
- On SIGTERM the agent stops taking turns and drains for up to 10 s. Checkpoints survive restarts, hot reload and `flisk down`. Delete the volume yourself (`docker volume ls | grep agent-state`) to reset sessions.

## Operating it from a coding agent

Run `flisk mcp` (stdio) so the coding agent drives the stack itself: `agent_list` lists agent resources, and `agent_sessions` takes `resource` plus an optional `sessionId` (without it, it lists the sessions). The rest of the tools mirror the CLI: `up`, `status`, `logs`, `resource_restart`, `down`.

## Guardrails

- Keep the contract routes; Tilt and the CLI rely on them. An agent scaffolded before `GET /sessions` existed returns 404 and the CLI reports `SESSION_LIST_UNSUPPORTED`; copy that handler from a new scaffold.
- Keep everything in the local Docker + Tilt stack; do not invent Kubernetes or another orchestrator.
- Guide: [docs/agents/ai-agents.md](https://github.com/flisk-sh/flisk/blob/main/docs/agents/ai-agents.md).
