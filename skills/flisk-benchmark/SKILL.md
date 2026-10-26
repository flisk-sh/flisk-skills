---
name: flisk-benchmark
description: Measure how many services fit on a machine, idle memory per service, start times and image sizes for Flisk stacks. Use the verified scripts and methods from flisk. Use when validating the north-star of 100 services on 16 GB or investigating performance.
license: MIT
compatibility: Requires the flisk CLI, Docker and the benchmark scripts in flisk. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Benchmark Flisk scale and footprint

Measure real metrics instead of guessing. Primary north-star: 100 services on a 16 GB machine.

## Workflow

1. Prefer the verified tools in flisk: `scripts/benchmark/container-scale.ts` and `scripts/autoresearch/layer-eval.sh`.
2. Measure idle memory via Docker VM meminfo, not only `docker stats` (which undercounts).
3. Start containers in parallel when timing boot.
4. Record primary metric `mem_per_service_mib`, image sizes, and health status.
5. See the claims registry and benchmark docs before publishing numbers.

## Guardrails

- Always report what was measured vs estimated.
- Warn the user before launching dozens of containers.
- Do not claim website numbers without re-measuring on the current code.
