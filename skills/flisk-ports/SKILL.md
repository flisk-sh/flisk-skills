---
name: flisk-ports
description: Find and fix the URLs of a Flisk stack - list routed URLs with `flisk networks` (alias `flisk urls`), understand Traefik routing on `*.localhost`, host port selection (port 80, else 8080-8180) and the FLISK_HTTP_PORT, FLISK_HTTPS_PORT, FLISK_POSTGRES_PORT and FLISK_BIND_ADDRESS overrides. Use when a service is unreachable, returns a Traefik 404, a host port is taken, or you need to reach the stack from another device. Docker network exhaustion is a flisk-doctor topic, not this one.
license: MIT
compatibility: Requires the flisk CLI and Docker. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Ports, routes and localhost URLs

`flisk up` picks the host ports and prints the exact URLs; Traefik routes each request to its service. Use the printed URLs instead of building your own.

## Workflow

1. List the routes: `flisk networks` (add `--stack <stack>`, `--json` for the versioned envelope, or `--raw` for bare URLs). It also checks each URL.
2. Read the shape of a URL:
   - A backend, agent or MCP server named `orders-api` is served at `http://api.<project>.localhost/api/orders` (a trailing `-api` is dropped; `apiPath` in `service.json` overrides the path).
   - A frontend is served under its base path (`basePath` in `service.json`, set with `flisk resource --base-path`); take its full URL from `flisk networks`.
3. Host ports: port 80 is used when free, so URLs carry no port. Otherwise a free port in 8080-8180 is chosen and appears in every URL. Postgres listens on `15432`.
4. Override a port with `FLISK_HTTP_PORT`, `FLISK_HTTPS_PORT` or `FLISK_POSTGRES_PORT` in the environment or the project `.env`.
5. Ports bind to `127.0.0.1`. Set `FLISK_BIND_ADDRESS=0.0.0.0` only to test from another device; `flisk doctor` warns while it is set.
6. After changing a `service.json`, re-run `flisk networks` to confirm the new route.

## Troubleshooting

- `HTTP 404` from Traefik: the URL has no route. Compare it with `flisk networks`.
- A service's own `port` is not published on the host; only Traefik and Postgres are. Reach services through Traefik.
- On Linux or WSL2, a non-root user usually cannot bind port 80, so URLs fall back to the 8080-8180 range.
- `flisk ui` shows the same services interactively.

## Guardrails

- Do not hard-code host ports or URLs in code; read them from the generated environment (for example `env.ts` in a frontend).
- Do not set `port` in `service.json` unless you need a specific container port; `flisk resource` picks a free one in the type's range.
