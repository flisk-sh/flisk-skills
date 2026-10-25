---
name: flisk-helm
description: Use TDK for local development while keeping Helm, Argo CD or Kustomize for production. Understand the boundary between local Docker+Tilt and cluster deploy. Use when a team already has a Helm workflow.
license: MIT
compatibility: Requires the tdk CLI for local work. Does not replace production deploy tools.
metadata:
  author: flisk-sh
  version: "1.0"
---

# TDK alongside Helm

TDK is local only. Production stays with Helm or your existing tool.

## Workflow

1. Develop and test locally with `tdk up`.
2. The same service.json describes the service; generated local files are not the production artifacts.
3. See the dedicated guide on how TDK CLI works alongside Helm.
4. Do not generate or commit Kubernetes manifests from TDK.

## Guardrails

- Explicitly: TDK is not a deploy tool.
- Scope docs explain what does and does not carry over to production.
- Keep local and production configuration clearly separated.
