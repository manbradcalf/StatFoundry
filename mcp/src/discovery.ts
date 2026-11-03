// discovery.ts — public discovery documents, all driven by config.
//
// The server card follows SEP-2127 "MCP Server Cards" (DRAFT — path and
// schema may change before it merges into the spec). Its shape is a subset
// of the MCP Registry's server.json schema. Optional fields are omitted
// entirely when unset — never emitted as empty strings.
import { config } from "./config.js";

export function buildServerCard(): Record<string, unknown> {
  const card: Record<string, unknown> = {
    $schema:
      "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
    name: config.cardName, // reverse-DNS, e.g. "com.example.mcp/public-mcp-starter"
    version: config.version,
    description: config.description,
    title: config.title,
    remotes: [
      {
        type: "streamable-http",
        url: config.mcpEndpoint,
        supportedProtocolVersions: [config.protocolVersion],
      },
    ],
  };
  if (config.websiteUrl) card.websiteUrl = config.websiteUrl;
  if (config.repositoryUrl) {
    card.repository = {
      url: config.repositoryUrl,
      source: config.repositorySource,
    };
  }
  if (config.iconUrl) {
    card.icons = [{ src: config.iconUrl, mimeType: config.iconMime }];
  }
  if (config.operator || config.contactEmail) {
    card._meta = {
      [`${config.cardNamespace}/operator`]: {
        name: config.operator,
        ...(config.contactEmail ? { email: config.contactEmail } : {}),
      },
    };
  }
  return card;
}

export function buildRootSummary(): Record<string, unknown> {
  return {
    name: config.name,
    title: config.title,
    description: config.description,
    version: config.version,
    operator: config.operator,
    ...(config.contactEmail ? { contact: config.contactEmail } : {}),
    ...(config.websiteUrl ? { website: config.websiteUrl } : {}),
    mcp: {
      endpoint: config.mcpEndpoint,
      transport: "streamable-http",
      protocolVersion: config.protocolVersion,
      authentication: "none",
    },
    discovery: ["/.well-known/mcp-server-card", "/.well-known/mcp.json"],
  };
}
