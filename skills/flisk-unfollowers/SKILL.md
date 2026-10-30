---
name: flisk-unfollowers
description: Find out who unfollowed an X account in a window (10 minutes, 1 hour, 1 day) with the demo.flisk.sh unfollowers API or the get_unfollowers MCP tool, and send follower lists to build the history. Use when asked who unfollowed someone, or to track follower changes. X keeps no unfollow history, so this only knows what lists it was given.
license: MIT
compatibility: Needs network access to https://demo.flisk.sh. No X API key is needed to read; sending lists needs the Worker's callback token.
metadata:
  author: flisk-sh
  version: "1.0"
---

# Who unfollowed

X shows only today's followers, never who left. The Worker keeps its own follower lists and compares them, so the answer
starts after the second list and never reaches back before the first.

## Workflow

1. Ask: `GET https://demo.flisk.sh/v1/unfollowers?user=<handle>&window=10m` (`10m`, `1h`, `1d`; longest 48h), or the MCP tool
   `get_unfollowers` (`user`, `window`) at `https://demo.flisk.sh/mcp`.
2. Read `status`:
   - `tracking_started`: only one list exists. Nobody can be listed yet. Say so and ask again after a window.
   - `ok`: a list at least one window old was compared with the newest. `unfollowers` names the people who left; `gained` counts new followers.
   - `partial`: the history is shorter than the window. `coveredMs` says how much it covers. Say "since I started watching", not "in the last day".
3. Post the `reply` text as written. It is under 240 characters and cuts a long list to "and N more".
4. To add a list: `POST /v1/unfollowers/snapshot?user=<handle>` with `Authorization: Bearer <callback token>` and
   `{"followers": ["ann", "bob"]}` (or `[["id", "ann"], ...]`). One list per minute. A source can be a script or an export.

## Rules

- Never name unfollowers you were not given. If `error` is `no_snapshots`, there is no data; do not guess.
- A daily cap (default 100 stored lists for everyone) protects the shared storage. At `429 daily_limit` wait until 00:00 UTC; reading still works.
- A short window needs a list at least every few minutes. A list that is hours old cannot answer a 10 minute question.
- `not_configured` (503) means the Worker has no storage bound yet.
