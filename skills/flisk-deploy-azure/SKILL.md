---
name: flisk-deploy-azure
description: Deploy a TDK local stack to Azure (Container Apps, AKS, App Service, or Functions). Complete separate skill for Azure. Use when the user wants to take a working tdk up stack to Azure.
license: MIT
compatibility: Requires a working local TDK stack first. Azure CLI recommended.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Deploy to Azure

TDK is local-only. This skill covers taking a validated local stack to Azure.

## Workflow

1. Confirm the stack works locally: `tdk doctor && tdk up <stack>`.
2. Extract the contract from service.json.
3. Preferred targets: Azure Container Apps or AKS.
4. Push the production image to Azure Container Registry.
5. Deploy with Container Apps YAML or Bicep/Terraform, wiring secrets via Key Vault.
6. Verify health.

## Guardrails

- Keep local and production configs separate.
- Never commit local generated files or secrets.
