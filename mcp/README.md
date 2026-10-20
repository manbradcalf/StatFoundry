# public-mcp-starter

A starter template for **fully public, no-auth MCP servers** — a self-describing
"billboard" endpoint meant to be discovered by AI agents wandering the open MCP
ecosystem. Its job is to be easy to find, easy to size up in one request, and to
leave a good impression (and a way to make contact) on behalf of whoever stood
it up. This is a lead-gen surface, not a private tool server: **there is
intentionally no authentication anywhere.**

```
agent ──HTTPS──▶ nginx ──▶ Express (host check) ──▶ MCP Streamable HTTP (/mcp)
                                   ├─▶ GET /                         JSON summary
                                   └─▶ GET /.well-known/mcp-server-card   discovery card
```

## Features

- **Public by design** — zero credentials on every endpoint; the smoke test fails if anything returns 401/403
- **Discovery card** at `/.well-known/mcp-server-card` (draft SEP-2127), plus a `/.well-known/mcp.json` alias
- **Root JSON summary** at `GET /` — name, description, contact, endpoint, in one request
- **Config-driven branding** — every name, description, and contact field comes from env vars; rebrand a fork without touching code
- Fleshed-out `initialize` response: `serverInfo` (name, title, version, description, websiteUrl, icons) + `instructions`
- Wildcard CORS so browser-based agents can connect
- Sessioned Streamable HTTP transport (`@modelcontextprotocol/sdk`), host-header validation against DNS rebinding
- Two demo tools (`echo`, `ping`) showing the `registerTool` + Zod pattern
- `npm run smoke` — end-to-end no-auth + discovery verification

## Requirements

Node.js 20+ (the smoke test uses global `fetch`).

## Quick start

```bash
cp .env.example .env    # then edit — see Configuration
npm install
npm run dev             # tsx watch on src/server.ts
npm run smoke           # verify discovery + credential-free handshake
```

For the MCP Inspector against a local server: `npm run inspect-local`.

## Configuration

Everything an agent (or human) sees about this server comes from these env
vars, read in exactly one file: `src/config.ts`. `.env` is loaded by your
process manager (`set -a; source .env; set +a` locally, `EnvironmentFile=` in
systemd, the `env` block in `ecosystem.config.cjs` for pm2).

| Variable | Default | Purpose |
|---|---|---|
| `PUBLIC_HOST` | `mcp.yourdomain.com` | Public hostname — Host-header allowlist, derived URLs, derived card name |
| `PUBLIC_BASE_URL` | `https://$PUBLIC_HOST` (`http://…:$PORT` if localhost) | Override the derived base URL |
| `PORT` | `3000` | Listen port |
| `BIND_ADDR` | `127.0.0.1` | Listen address — keep on localhost behind nginx |
| `EXTRA_HOSTS` | (empty) | Comma-separated extra allowed `Host` hostnames |
| `MCP_NAME` | `public-mcp-starter` | Machine name (`serverInfo.name`, card name slug) |
| `MCP_TITLE` | `Public MCP Starter` | Human display name |
| `MCP_DESCRIPTION` | template sentence | One-line description, shown everywhere |
| `MCP_OPERATOR` | `Your Company` | Who runs this server (instructions, root JSON, card `_meta`) |
| `MCP_CONTACT_EMAIL` | (empty, omitted) | Contact for humans — surfaces in instructions, root JSON `contact`, card `_meta` |
| `MCP_WEBSITE_URL` | (empty, omitted) | "Learn more" link (`serverInfo.websiteUrl`, card, root JSON) |
| `MCP_REPOSITORY_URL` / `MCP_REPOSITORY_SOURCE` | (empty) / `github` | Card `repository` block |
| `MCP_ICON_URL` / `MCP_ICON_MIME` | (empty) / `image/png` | Icon for `serverInfo.icons` and the card |
| `MCP_CARD_NAME` | reverse-DNS of `PUBLIC_HOST` + `/$MCP_NAME` | Override the card's registry-style name |
| `MCP_INSTRUCTIONS` | composed from operator/contact/card URL | Override the `initialize` `instructions` text |

The server **version** is single-sourced from `package.json` — bump it there.

## Forking this template (rebranding checklist)

For the next person who stands one of these up:

1. **Edit `.env`** — set `PUBLIC_HOST`, `MCP_NAME`, `MCP_TITLE`, `MCP_DESCRIPTION`,
   `MCP_OPERATOR`, `MCP_CONTACT_EMAIL`, `MCP_WEBSITE_URL`. That is the entire
   rebrand; no code changes.
2. **Bump `package.json`** — `name` and `version` for your fork.
3. **Replace the demo tools** in `src/tools.ts` (see [Adding tools](#adding-tools)).
4. Know where your metadata surfaces — all driven by the same `src/config.ts`:
   - the `initialize` response (`serverInfo` + `instructions`) — the only surface every MCP client is guaranteed to read
   - `GET /.well-known/mcp-server-card` and `GET /.well-known/mcp.json`
   - `GET /` (JSON summary)
5. **Verify with zero credentials** — see below, then `npm run smoke -- https://your-host` as the final gate.

```bash
# The discovery card — no credentials, CORS *
curl -s https://mcp.yourdomain.com/.well-known/mcp-server-card | jq

# The MCP handshake — still no credentials. Note the Mcp-Session-Id header:
curl -si https://mcp.yourdomain.com/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-11-25","capabilities":{},"clientInfo":{"name":"curl","version":"0.0.0"}}}'

# tools/list, using the session id from the previous response's headers:
curl -s https://mcp.yourdomain.com/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -H "Mcp-Session-Id: <id from above>" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/list"}'
```

## Discovery: what's standard and what isn't

As of mid-2026 there is **no finalized well-known discovery standard for MCP
servers**. What this template serves, and why:

- **`initialize` response** — the only *standardized* discovery surface
  (MCP spec 2025-11-25). `serverInfo` carries `name`, `title`, `version`,
  `description`, `websiteUrl`, and `icons`; `instructions` carries the
  operator/contact blurb. Every compliant client sees this.
- **`/.well-known/mcp-server-card`** — implements **SEP-2127 "MCP Server
  Cards"**, which is a **DRAFT**: the path and schema may change before it
  merges. The document is a subset of the MCP Registry's `server.json` schema
  (`$schema` pinned to `2025-12-11`). Served with `Access-Control-Allow-Origin: *`
  and no auth, per the draft.
- **`/.well-known/mcp.json`** — a **non-standard convenience alias** for the
  same document; agents in the wild are known to probe this path.
- Deliberately **not** served: OAuth discovery documents
  (`oauth-protected-resource`, `oauth-authorization-server`) — those are for
  authenticated servers (RFC 9728), and this template has no auth; and
  `ai-plugin.json` — a defunct OpenAI Plugins artifact with no standing in MCP.

## Smoke test

```bash
npm run smoke                          # against http://localhost:$PORT
npm run smoke -- https://mcp.yourdomain.com
```

Asserts, with zero credentials sent: the card and its alias return 200 with
config-driven content (warns if template placeholders remain); `GET /` works;
CORS preflight works; `initialize` → `notifications/initialized` → `tools/list`
→ `DELETE` all succeed; and **no response in the entire run was 401/403**.
Exits non-zero on any failure — usable in CI or post-deploy.

## Connecting a client

No headers, no tokens, anywhere:

```bash
# Claude Code
claude mcp add --transport http my-server https://mcp.yourdomain.com/mcp

# MCP Inspector
npx @modelcontextprotocol/inspector    # transport: Streamable HTTP, URL as above
```

claude.ai web/mobile custom connectors can use the URL directly — no-auth
remote servers connect without an OAuth flow.

## Production deployment

1. Node 20+ on the box; clone your fork; `npm install && npm run build`.
2. Create `.env` from `.env.example` (see Configuration).
3. Run under a process manager — pm2 (`pm2 start ecosystem.config.cjs`) or a
   systemd unit with `EnvironmentFile=/path/to/.env`.
4. nginx in front: copy `deploy/nginx.conf.example`. Note it proxies
   **`location /`** — not just `/mcp` — so the discovery endpoints work, and
   includes a `limit_req` rate limit since the endpoint is anonymous.
5. Verify end to end: `npm run smoke -- https://mcp.yourdomain.com`.

## Adding tools

Tools live in `src/tools.ts`:

```ts
server.registerTool(
  "echo",
  {
    title: "echo",
    description: "Repeats the string back to the caller",
    inputSchema: { input: z.string() },   // Zod raw shape
  },
  async ({ input }) => ({ content: [{ type: "text", text: input }] }),
);
```

## Security notes

Everything on this server is **public by design** — treat it accordingly:

- Never register tools that expose secrets, private data, or state-changing
  side effects. If a tool shouldn't be called by a stranger, it doesn't belong
  in this template — use an authenticated server instead.
- Host-header validation is kept (DNS-rebinding mitigation); add hostnames via
  `EXTRA_HOSTS` if you serve under more than one name.
- Rate-limit at nginx (the example config does).
- Sessions live in an in-memory `Map` with no idle eviction — fine for
  lightweight billboard tools; add a sweep if your tools get heavier.
- If you find yourself wanting auth, this is the wrong starting point.

## Project layout

```
src/
  server.ts      Express app, transport sessions, routes
  config.ts      ALL env-var reads — the single rebranding surface
  discovery.ts   server card + root summary builders
  cors.ts        wildcard CORS middleware
  tools.ts       demo tools (echo, ping)
scripts/
  smoke.mjs      no-auth + discovery verification
deploy/
  nginx.conf.example
ecosystem.config.cjs   pm2 process file
.env.example
```

## License

MIT
