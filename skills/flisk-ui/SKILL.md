---
name: flisk-ui
description: Use `flisk ui` (alias `flisk interactive`), the interactive terminal dashboard, to browse a project's stacks, services, Tilt events, generated files and config with the keyboard - tabs, search, enabled-only filter, ASCII mode for NO_COLOR terminals. Use when a person wants to look around a project interactively. Coding agents and scripts should read `flisk status --json` and `flisk networks --json` instead, because the UI needs a real terminal.
license: MIT
compatibility: Requires the flisk CLI and an interactive terminal. The Events tab needs a running Tilt. Does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Terminal UI

`flisk ui` opens a dashboard with five tabs: Overview, Resources, Events, Files and Config.

## Workflow

1. From the project root, run `flisk ui`. Start the stack first with `flisk up` if you want live Events.
2. Move around:

   | Key | Does |
   | --- | --- |
   | `1`-`5`, `Tab` / `Shift+Tab` | switch tab |
   | `↑`/`↓` or `j`/`k`, `g`/`G`, `PgUp`/`PgDn` | move the highlight |
   | `Enter` or `Space` / `Esc` | open the highlighted stack, service or file / go back |
   | `/` | search (`Enter` keeps the filter, `Esc` clears it) |
   | `e` | toggle enabled-only and all services |
   | `r` | refresh (on Events: reload events) |
   | `?` / `q` | help / quit |

3. Flags: `--no-animations` for a static spinner, `--high-contrast` for high-contrast colours. With `NO_COLOR` set or `TERM=dumb` it switches to plain ASCII.

## Guardrails

- The UI is for looking. Changes still go through `service.json` and the CLI (`flisk resource`, `flisk up`, `flisk restart`).
- If Events says "Tilt is not running or its UI is unreachable", run `flisk up`, then press `r`.
- Do not drive it from an agent or CI; it needs a TTY. Use the `--json` commands instead.
- Full key list: [docs/ui.md](https://github.com/flisk-sh/flisk/blob/main/docs/ui.md).
