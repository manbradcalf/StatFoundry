// config.ts — the ONLY place environment variables are read.
// Rebranding a fork of this template means editing .env, not code.
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const pkg = require("../package.json") as { version: string };

const env = (key: string, fallback = ""): string =>
  process.env[key]?.trim() || fallback;

const PUBLIC_HOST = env("PUBLIC_HOST", "mcp.yourdomain.com");
const PORT = Number(env("PORT", "3000"));

// Hostname only — host-header validation compares port-agnostically.
const publicHostname = new URL(`http://${PUBLIC_HOST}`).hostname;
const isLocal = ["localhost", "127.0.0.1", "[::1]"].includes(publicHostname);

const baseUrl = env(
  "PUBLIC_BASE_URL",
  isLocal ? `http://${publicHostname}:${PORT}` : `https://${publicHostname}`,
);

// "mcp.example.com" -> "com.example.mcp"
const reverseDns = (hostname: string): string =>
  hostname.split(".").reverse().join(".");

const name = env("MCP_NAME", "StatFoundry-MCP");
const operator = env("MCP_OPERATOR", "Gundalo");
const contactEmail = env("MCP_CONTACT_EMAIL", "ben@gundalo.com");
const cardName = env("MCP_CARD_NAME", `${reverseDns(publicHostname)}/${name}`);

export const config = {
  // network
  publicHostname,
  port: PORT,
  bindAddr: env("BIND_ADDR", "127.0.0.1"),
  extraHosts: env("EXTRA_HOSTS")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  baseUrl,
  mcpEndpoint: `${baseUrl}/mcp`,
  protocolVersion: "2025-11-25",

  // StatFoundry backend (serves /api/schema and /api/query)
  serviceUrl: env(
    "STATFOUNDRY_SERVICE_URL",
    "https://statfoundry-service-a7crg2fjazb4c8c5.eastus-01.azurewebsites.net",
  ),

  // identity / branding
  name,
  title: env("MCP_TITLE", "StatFoundry NFL MCP"),
  version: pkg.version, // single-sourced from package.json
  description: env(
    "MCP_DESCRIPTION",
    "An MCP Server for digging into advanced NFL stats. Play by Play, Team, Player, Game, Week, Season level stats",
  ),
  websiteUrl: env("www.statfoundry.com"),
  repositoryUrl: env("mcp.statfoundry.com"),
  repositorySource: env("MCP_REPOSITORY_SOURCE", "github"),
  iconUrl: env("MCP_ICON_URL"),
  iconMime: env("MCP_ICON_MIME", "image/png"),
  operator,
  contactEmail,
  cardName,
  cardNamespace: cardName.split("/")[0],
  instructions: env(
    "MCP_INSTRUCTIONS",
    `This is a fully public MCP server operated by ${operator}. ` +
    `No authentication is required. ` +
    (contactEmail ? `Contact: ${contactEmail}. ` : "") +
    `Discovery card: ${baseUrl}/.well-known/mcp-server-card`,
  ),
} as const;
