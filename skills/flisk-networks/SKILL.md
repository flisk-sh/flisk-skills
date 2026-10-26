---
name: flisk-networks
description: Use flisk networks to inspect routed URLs, Traefik routes and the full local topology before or after flisk up. Use when debugging reachability or listing what is running.
license: MIT
compatibility: Requires the flisk CLI. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Networks and topology

`flisk networks` shows the routed URLs and how services are linked.

## Workflow

1. Run `flisk networks` from the project root.
2. Use the printed hostnames and paths (e.g. `http://api.shop.localhost/api/orders`).
3. Combine with `flisk ui` for interactive inspection.
4. After changes to service.json, re-run to confirm new routes.

## Guardrails

- Always prefer the URLs printed by `flisk up` or `flisk networks` over hard-coded ones.
- Port selection is automatic; see the flisk-ports skill.
