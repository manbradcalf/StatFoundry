import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import z from "zod";
import { config } from "./config.js";

export function registerTools(server: McpServer): McpServer {
  server.registerTool(
    "runQuery",
    {
      title: "runQuery",
      description:
        "Runs a read-only Neo4j Cypher query against the StatFoundry NFL graph and returns the rows as JSON. " +
        "Use getSchema first so the query only uses labels and properties that exist.",
      inputSchema: { cypherQuery: z.string() },
    },
    async ({ cypherQuery }) => ({
      content: [
        {
          type: "text",
          text: await callService("/api/query", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cypher_query: cypherQuery }),
          }),
        },
      ],
    }),
  );

  return server;
}

async function callService(path: string, init?: RequestInit): Promise<string> {
  const res = await fetch(`${config.serviceUrl}${path}`, init);
  const body = await res.text();
  if (!res.ok) throw new Error(`StatFoundry ${path} failed (${res.status}): ${body}`);
  return body;
}
