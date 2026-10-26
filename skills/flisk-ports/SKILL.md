---
name: flisk-ports
description: Understand Flisk port selection (port 80 or 8080-8180), Traefik routing, localhost URLs and TDK_HTTP_PORT overrides. Use when services are unreachable, ports conflict, or you need to test from another device.
license: MIT
compatibility: Requires the flisk CLI and Docker. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Ports, Traefik and localhost URLs

`flisk up` chooses host ports and prints the exact URLs. Traefik routes to services.

## Workflow

1. Always use the URLs printed by `flisk up` (or `flisk networks`).
2. Port 80 is used when free (no port in URL); otherwise a free port from 8080-8180 is chosen.
3. Override with `TDK_HTTP_PORT`, `TDK_HTTPS_PORT` or `TDK_POSTGRES_PORT`.
4. Ports bind to 127.0.0.1 by default. Set `TDK_BIND_ADDRESS=0.0.0.0` only when you need to reach them from another machine (flisk doctor warns).
5. A resource named `orders-api` is typically served at `/api/orders`.

## Guardrails

- Do not hard-code ports in service.json unless overriding is intentional.
- On Linux/WSL2 non-root users often fall back to the high port range.
- Check `flisk networks` for the full routing table.
