---
name: tdk-deploy-gcp
description: Deploy a TDK local stack to Google Cloud (Cloud Run, GKE, App Engine, or Compute Engine). Complete separate skill for GCP. Use when the user wants to take a working tdk up stack to Google Cloud.
license: MIT
compatibility: Requires a working local TDK stack first. gcloud CLI recommended.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Deploy to Google Cloud

TDK is local-only. This skill covers taking a validated local stack to GCP.

## Workflow

1. Confirm the stack works locally: `tdk doctor && tdk up <stack>`.
2. Extract the contract from service.json.
3. Preferred target: Cloud Run for containers, or GKE for more complex stacks.
4. Build and push the production image to Artifact Registry.
5. Deploy with Cloud Run service YAML or `gcloud run deploy`, mapping env and secrets from Secret Manager.
6. Verify the health endpoint.

## Guardrails

- Do not deploy local generated files.
- Use production-grade images and secret management.
