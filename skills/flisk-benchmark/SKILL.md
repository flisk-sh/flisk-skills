---
name: flisk-benchmark
description: Measure how many Flisk services fit on a machine - idle memory per service from the Docker VM (not `docker stats`), parallel start-up time, real image disk use, and health - with the benchmark scripts in a flisk checkout. Use when validating the 100-services-on-16-GB goal, checking a published performance number, or answering "how many services can my laptop run". To change the Docker layers and keep only improvements, use layer-autoresearch; to fix a slow or failing stack, use flisk-starlark-perf or flisk-troubleshoot.
license: MIT
compatibility: Requires the flisk CLI, Docker, and a flisk checkout for the benchmark scripts. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Benchmark Flisk scale and footprint

Measure instead of guessing. The goal is 100 services on a 16 GB machine.

## Workflow

1. Warn the user before starting dozens of containers, and give an estimate.
2. Use the scripts in flisk: `bun scripts/benchmark/container-scale.ts --synthetic --tiers 5,20,100` for synthetic containers, or its default (Compose) mode for real generated services.
3. Memory: read the Docker VM's own memory, not `docker stats`, which leaves out per-container overhead:
   ```bash
   docker run --rm alpine awk '/MemTotal/{t=$2}/MemAvailable/{a=$2}END{printf "%d MiB used\n",(t-a)/1024}' /proc/meminfo
   ```
   Take it before and after starting the containers; divide the difference by the count. Small counts are noisy, so repeat and report the range.
4. Time: start containers in parallel, as Tilt does; a serial loop measures the launcher.
5. Disk: `docker system df` is real use. `docker images` counts shared layers once per image. `docker history <image>` shows what fills one.
6. Budget: (Docker VM MemTotal − about 512 MiB for infrastructure) ÷ 100 = the per-service budget.
7. Record `mem_per_service_mib`, start time, image sizes and how many were healthy.

## Guardrails

- Report what was measured, what was estimated and what was not run.
- Idle numbers are not numbers under load; say which you have.
- Re-measure on current code before repeating a number from the website or the docs.
