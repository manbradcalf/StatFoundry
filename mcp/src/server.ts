// server.ts — Public, no-auth remote MCP server (Streamable HTTP) for
// deployment behind nginx. There is intentionally NO authentication in this
// template: it is a discovery/billboard surface, not a private tool server.
import express, { Request, Response } from "express";
import { randomUUID } from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { hostHeaderValidation } from "@modelcontextprotocol/sdk/server/middleware/hostHeaderValidation.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { registerTools } from "./tools.js";
import { config } from "./config.js";
import { publicCors } from "./cors.js";
import { buildRootSummary, buildServerCard } from "./discovery.js";

interface Session {
  server: McpServer;
  transport: StreamableHTTPServerTransport;
}

// This map enables multiple clients to use the server at once
// Each client gets their own Session
// and each Session contains a StreamableHTTPServerTransport
const transports = new Map<string, Session>();

const app = express();
app.use(express.json());

// CORS before host validation so even rejections are readable from browsers.
app.use(publicCors);

// DNS-rebinding mitigation, applied once at the app level. The check is
// port-agnostic, so entries are bare hostnames. localhost entries keep the
// Inspector and the smoke test working with no extra configuration.
app.use(
  hostHeaderValidation([
    config.publicHostname,
    "localhost",
    "127.0.0.1",
    "[::1]",
    ...config.extraHosts,
  ]),
);

function buildServer(): McpServer {
  const server = new McpServer(
    {
      name: config.name,
      title: config.title,
      version: config.version,
      description: config.description,
      ...(config.websiteUrl ? { websiteUrl: config.websiteUrl } : {}),
      ...(config.iconUrl
        ? { icons: [{ src: config.iconUrl, mimeType: config.iconMime }] }
        : {}),
    },
    { instructions: config.instructions },
  );
  return registerTools(server);
}

// Returns a JSON-RPC 500 if a handler throws/rejects; Express won't catch
// async errors on its own, so an unwrapped rejection would hang the request.
function sendError(res: Response): void {
  if (res.headersSent) return;
  res.status(500).json({
    jsonrpc: "2.0",
    error: { code: -32603, message: "Internal server error" },
    id: null,
  });
}

async function handleConnection(req: Request, res: Response): Promise<void> {
  try {
    const sessionId = req.headers["mcp-session-id"] as string | undefined;

    if (sessionId && transports.has(sessionId)) {
      await transports
        .get(sessionId)!
        .transport.handleRequest(req, res, req.body);
      return;
    }

    if (isInitializeRequest(req.body)) {
      const server = buildServer();
      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        onsessioninitialized: (id: string) => {
          transports.set(id, { server, transport });
        },
      });
      transport.onclose = () => {
        const id = transport.sessionId;
        if (!id || !transports.has(id)) return;
        const session = transports.get(id)!;
        // Delete BEFORE closing: server.close() closes the transport, which
        // re-fires onclose — the map check above stops the recursion.
        transports.delete(id);
        void session.server.close();
      };
      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
      return;
    }

    res.status(400).json({
      jsonrpc: "2.0",
      error: { code: -32000, message: "No valid session ID" },
      id: null,
    });
  } catch (err) {
    console.error("POST /mcp failed:", err);
    sendError(res);
  }
}

async function handleSession(req: Request, res: Response): Promise<void> {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  const session = sessionId ? transports.get(sessionId) : undefined;
  if (!session) {
    res.status(400).send("Invalid session");
    return;
  }
  try {
    await session.transport.handleRequest(req, res);
  } catch (err) {
    console.error("session request failed:", err);
    sendError(res);
  }
}

// Discovery surfaces — config is static, so the documents are built once.
const serverCard = buildServerCard();
const rootSummary = buildRootSummary();

function serveCard(_req: Request, res: Response): void {
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.json(serverCard);
}

app.get("/.well-known/mcp-server-card", serveCard); // SEP-2127 (DRAFT)
app.get("/.well-known/mcp.json", serveCard); // non-standard alias agents probe
app.get("/", (_req: Request, res: Response) => {
  res.json(rootSummary);
});

app.post("/mcp", handleConnection);
app.get("/mcp", handleSession);
app.delete("/mcp", handleSession);
app.listen(config.port, config.bindAddr, () =>
  console.log(
    `${config.name} v${config.version} on ${config.bindAddr}:${config.port} — ` +
      `MCP at /mcp, card at /.well-known/mcp-server-card`,
  ),
);
