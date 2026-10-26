---
name: flisk-deploy-alongside
description: Use Flisk for local development while keeping production deploy tools (Helm, Argo CD, Kustomize, cloud hosts). Understand the boundary and how to hand off. Use when a team already has a deploy pipeline.
license: MIT
compatibility: Requires the flisk CLI for local work. Does not replace production deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Deploy alongside Flisk

Flisk is local only. Production stays with your existing tools.

## Workflow

1. Develop and test with `flisk up`.
2. The service.json is the contract; generated local files are not the production artifacts.
3. See the with-Helm guide and the scope docs for what carries over.
4. Use cloud/devcontainer environments for remote agent hosts if needed (see agent-hosts docs).
5. Do not generate Kubernetes manifests from Flisk.

## Guardrails

- Explicitly not a deploy tool. No Kubernetes required on the machine.
- Keep local Docker+Tilt and production Helm/Argo clearly separated.
