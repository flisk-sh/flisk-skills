---
name: flisk-demo-bubbles
description: Hand out a personalised Flisk demo ("Grok bubbles") for a person from what they build - reply with a demo.flisk.sh link, or call the JSON API or the make_demo MCP tool, and post the reply it returns exactly. Use when asked for a Flisk demo for someone, or when someone describes an app and a runnable local stack would help. Not for editing a real project; for that use flisk-scaffold.
license: MIT
compatibility: Needs network access to https://demo.flisk.sh. The demo itself runs locally on Docker and Tilt and does not deploy.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Flisk demo bubbles

A demo bubble is a personalised Flisk stack made for an X handle from the words of what they build. Code renders every
`service.json` from a fixed menu of parts, so nothing reaches the page that was invented. Do not write `service.json` files or
commands yourself for a demo: hand out the link.

## Workflow

1. Take the person's X handle and a few words from their posts: `postgres`, `worker`, `email`, `redis`, `realtime`, `solidity`,
   `indexer`, `agent`, `mcp`, `storefront`, `vue`, `python`, or `connected to <Platform>`.
2. Pick one way to ask:
   - A link you write: `https://demo.flisk.sh/<x-handle>/<what-they-build-in-dashes>`. Opening it builds the demo.
   - The JSON API: `GET https://demo.flisk.sh/v1/demo?user=<handle>&q=<words>` returns `reply` and `url`.
   - The MCP tool `make_demo` (`user`, `q`, `plain`) at `https://demo.flisk.sh/mcp`.
3. Post the `reply` text exactly as written. It already contains the link, in the format
   `🫧 @handle, for your app, here is a runnable local stack:` then the link on its own line, then what is inside.
4. Add `plain=1` (`plain: true` in MCP) when the person is not a developer. The reply then says what they get in everyday words
   and leaves out Docker and Tilt. The demo is the same.

## Rules

- A demo is made from parts of a fixed menu. If the person names a platform with no hand-built wiring, the demo gets placeholder
  keys and the request is logged; say so instead of claiming it is connected.
- Opening a link or calling the API starts a CI build, capped per hour overall, per handle and per IP. Do not loop over handles.
- It is a local dev stack, not a deployment.

## Check

`GET https://demo.flisk.sh/v1/demo/<id>` returns `status` (`building`, `ready`, `failed`) and the repo once built.
