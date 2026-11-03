import { NextFunction, Request, Response } from "express";

// Fully public server: wildcard CORS everywhere. SEP-2127 requires "*" on
// the server card; browser-based MCP clients need Mcp-Session-Id exposed on
// /mcp responses. No credentials exist anywhere, so "*" is safe.
export function publicCors(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept, Mcp-Session-Id, Mcp-Protocol-Version, Last-Event-ID",
  );
  res.setHeader(
    "Access-Control-Expose-Headers",
    "Mcp-Session-Id, Mcp-Protocol-Version",
  );
  res.setHeader("Access-Control-Max-Age", "86400");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
}
