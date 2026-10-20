#!/usr/bin/env node
// Smoke test for the public-mcp-starter template. Confirms:
//   1. No endpoint requires authentication (zero credentials sent; any
//      401/403 anywhere fails the run).
//   2. Discovery documents exist and return real config-driven content.
//   3. The credential-free MCP handshake works end to end.
//
// Usage:
//   npm run smoke                          # against http://localhost:$PORT
//   npm run smoke -- https://mcp.example.com
const BASE = (
  process.argv[2] ?? `http://localhost:${process.env.PORT ?? 3000}`
).replace(/\/$/, "");

const results = [];
const warnings = [];
let sawAuthChallenge = false;

function check(name, ok, detail = "") {
  results.push({ name, ok, detail });
}

function noteStatus(status) {
  if (status === 401 || status === 403) sawAuthChallenge = true;
}

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  noteStatus(res.status);
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    /* non-JSON body */
  }
  return { res, json };
}

async function rpc(body, sessionId) {
  const headers = {
    "content-type": "application/json",
    accept: "application/json, text/event-stream",
  };
  if (sessionId) headers["mcp-session-id"] = sessionId;
  const res = await fetch(`${BASE}/mcp`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  noteStatus(res.status);
  const text = await res.text();
  let message = null;
  if ((res.headers.get("content-type") ?? "").includes("text/event-stream")) {
    for (const line of text.split("\n")) {
      if (line.startsWith("data:")) {
        message = JSON.parse(line.slice(5).trim());
        break;
      }
    }
  } else if (text) {
    try {
      message = JSON.parse(text);
    } catch {
      /* non-JSON body */
    }
  }
  return { res, message };
}

// ── 1. Server card ─────────────────────────────────────────────────────
const card = await get("/.well-known/mcp-server-card");
check(
  "GET /.well-known/mcp-server-card returns 200 JSON",
  card.res.status === 200 && card.json !== null,
  `status ${card.res.status}`,
);
check(
  "card served with Access-Control-Allow-Origin: *",
  card.res.headers.get("access-control-allow-origin") === "*",
);
if (card.json) {
  check(
    "card name is reverse-DNS namespace/id",
    typeof card.json.name === "string" &&
      /^[a-z0-9.-]+\/[A-Za-z0-9._-]+$/.test(card.json.name),
    `name: ${card.json.name}`,
  );
  check(
    "card has version and description",
    Boolean(card.json.version) && Boolean(card.json.description),
  );
  const remote = card.json.remotes?.[0];
  check(
    "card remote is streamable-http ending in /mcp",
    remote?.type === "streamable-http" && remote?.url?.endsWith("/mcp"),
    `remote: ${JSON.stringify(remote)}`,
  );
  const cardText = JSON.stringify(card.json);
  if (cardText.includes("yourdomain.com") || cardText.includes("Your Company")) {
    warnings.push(
      "card still contains template placeholders (yourdomain.com / Your Company) — set the MCP_* env vars",
    );
  }
}

// ── 2. mcp.json alias ──────────────────────────────────────────────────
const alias = await get("/.well-known/mcp.json");
check(
  "GET /.well-known/mcp.json is identical to the card",
  alias.res.status === 200 &&
    JSON.stringify(alias.json) === JSON.stringify(card.json),
  `status ${alias.res.status}`,
);

// ── 3. Root summary ────────────────────────────────────────────────────
const root = await get("/");
check(
  "GET / returns 200 JSON with name, description, mcp.endpoint",
  root.res.status === 200 &&
    Boolean(root.json?.name) &&
    Boolean(root.json?.description) &&
    Boolean(root.json?.mcp?.endpoint),
  `status ${root.res.status}`,
);

// ── 4. CORS preflight ──────────────────────────────────────────────────
const preflight = await fetch(`${BASE}/mcp`, { method: "OPTIONS" });
noteStatus(preflight.status);
check(
  "OPTIONS /mcp returns 204 with wildcard CORS",
  preflight.status === 204 &&
    preflight.headers.get("access-control-allow-origin") === "*",
  `status ${preflight.status}`,
);

// ── 5. initialize with zero credentials ────────────────────────────────
const init = await rpc({
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: {
    protocolVersion: "2025-11-25",
    capabilities: {},
    clientInfo: { name: "smoke-test", version: "0.0.0" },
  },
});
check(
  "initialize succeeds with no Authorization header",
  init.res.status === 200,
  init.res.status === 401 || init.res.status === 403
    ? "ENDPOINT REQUIRES AUTH — this template must be public"
    : `status ${init.res.status}`,
);
const serverInfo = init.message?.result?.serverInfo;
check(
  "initialize result has serverInfo name + version",
  Boolean(serverInfo?.name) && Boolean(serverInfo?.version),
  `serverInfo: ${JSON.stringify(serverInfo)}`,
);
check(
  "initialize result has non-empty instructions",
  typeof init.message?.result?.instructions === "string" &&
    init.message.result.instructions.length > 0,
);
const sessionId = init.res.headers.get("mcp-session-id");
check(
  "Mcp-Session-Id response header present",
  Boolean(sessionId),
);

// ── 6-8. initialized → tools/list → session teardown ───────────────────
if (sessionId) {
  const initialized = await rpc(
    { jsonrpc: "2.0", method: "notifications/initialized" },
    sessionId,
  );
  check(
    "notifications/initialized accepted (202)",
    initialized.res.status === 202,
    `status ${initialized.res.status}`,
  );

  const tools = await rpc(
    { jsonrpc: "2.0", id: 2, method: "tools/list" },
    sessionId,
  );
  const names = (tools.message?.result?.tools ?? []).map((t) => t.name);
  check(
    "tools/list works with no credentials and includes echo + ping",
    tools.res.status === 200 &&
      names.includes("echo") &&
      names.includes("ping"),
    `tools: ${names.join(", ") || "(none)"}`,
  );

  const del = await fetch(`${BASE}/mcp`, {
    method: "DELETE",
    headers: { "mcp-session-id": sessionId },
  });
  noteStatus(del.status);
  check(
    "DELETE /mcp tears down the session",
    del.status >= 200 && del.status < 300,
    `status ${del.status}`,
  );
}

// ── 9. Global no-auth assertion ────────────────────────────────────────
check("no response anywhere in the run was 401/403", !sawAuthChallenge);

// ── Report ─────────────────────────────────────────────────────────────
console.log(`\nSmoke test against ${BASE}\n`);
for (const r of results) {
  console.log(`  ${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.detail && !r.ok ? ` — ${r.detail}` : ""}`);
}
for (const w of warnings) {
  console.log(`  WARN  ${w}`);
}
const failed = results.filter((r) => !r.ok);
console.log(
  `\n${results.length - failed.length}/${results.length} checks passed` +
    (warnings.length ? `, ${warnings.length} warning(s)` : ""),
);
process.exit(failed.length ? 1 : 0);
