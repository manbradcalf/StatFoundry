const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

// Parse Neo4j nodeType format :`Label1`:`Label2` into ["Label1", "Label2"]
function parseNodeTypeLabels(nodeType) {
  return nodeType
    .split(":")
    .map((l) => l.replace(/`/g, "").trim())
    .filter(Boolean);
}

// Since we can't directly import TypeScript modules in Node.js,
// we'll replicate the chunk generation logic here
class SimpleChunkGenerator {
  constructor(schema) {
    this.schema = schema;
  }

  generateChunks() {
    const chunks = [
      ...this.generateEntityMatchChunks(),
      ...this.generatePropertyFilterChunks(),
      ...this.generateRelationshipTraversalChunks(),
      // ...this.generateReturnChunks(),
    ];
    return chunks;
  }

  generateEntityMatchChunks() {
    const chunks = [];
    const seenLabels = new Set();

    this.schema.nodes.forEach((node) => {
      node.labels.forEach((label) => {
        if (seenLabels.has(label)) return;
        seenLabels.add(label);

        chunks.push({
          English: `${this.pluralizeLabel(label)}`,
          Cypher: `MATCH (${this.getVariableName(label)}:${label})`,
          QueryType: "MATCH_START",
          Requires: [],
          Provides: [{ Name: this.getVariableName(label), AliasType: label }],
          Slots: [],
        });
      });
    });

    return chunks;
  }

  generatePropertyFilterChunks() {
    const chunks = [];
    const seen = new Set(); // Dedupe by (label, property)

    this.schema.nodes.forEach((node) => {
      const numericProperties = this.getNumericProperties(node);
      const stringProperties = this.getStringProperties(node);
      const stringArrayProperties = this.getStringArrayProperties(node);

      // Generate filters for each label this node has
      node.labels.forEach((label) => {
        // Generate numeric comparison chunks
        numericProperties.forEach((prop) => {
          const key = `${label}-${prop.name}-numeric`;
          if (seen.has(key)) return;
          seen.add(key);

          chunks.push({
            English: `[${prop.name}] (${label})`,
            Cypher: ` ${this.getVariableName(label)}.${prop.name} `,
            EnglishTemplate: `${prop.name} {condition} {value}`,
            CypherTemplate: `${this.getVariableName(label)}.${prop.name} {condition} {value}`,
            QueryType: "FILTER",
            Requires: [{ Name: this.getVariableName(label), AliasType: label }],
            Provides: [{ Name: this.getVariableName(label), AliasType: label }],
            Slots: [
              { Name: "stat", Value: prop.name, SlotValueTypes: ["Filter"] },
              { Name: "condition", Value: ">", SlotValueTypes: ["FilterCondition"] },
              { Name: "value", Value: 100, SlotValueTypes: ["FilterValue"] },
            ],
          });
        });

        // Generate string equality chunks
        stringProperties.forEach((prop) => {
          const key = `${label}-${prop.name}-string`;
          if (seen.has(key)) return;
          seen.add(key);

          chunks.push({
            English: `[${prop.name}] (${label})`,
            Cypher: ` ${this.getVariableName(label)}.${prop.name} {condition} {value}`,
            EnglishTemplate: `with ${prop.name} {condition} {value}`,
            CypherTemplate: ` ${this.getVariableName(label)}.${prop.name} {condition} {value}`,
            QueryType: "FILTER",
            Requires: [{ Name: this.getVariableName(label), AliasType: label }],
            Provides: [{ Name: this.getVariableName(label), AliasType: label }],
            Slots: [
              { Name: "stat", Value: prop.name, SlotValueTypes: ["Filter"] },
              { Name: "condition", Value: "=", SlotValueTypes: ["FilterCondition"] },
              { Name: "value", Value: "something", SlotValueTypes: ["FilterValue"] },
            ],
          });
        });

        // Generate string array contains chunks
        stringArrayProperties.forEach((prop) => {
          const key = `${label}-${prop.name}-array`;
          if (seen.has(key)) return;
          seen.add(key);

          chunks.push({
            English: `with [${prop.name}] in [${prop.name}] (${label})`,
            EnglishTemplate: `with {value} in ${prop.name}`,
            CypherTemplate: `{value} IN ${this.getVariableName(label)}.${prop.name}`,
            QueryType: "FILTER",
            Requires: [{ Name: this.getVariableName(label), AliasType: label }],
            Provides: [{ Name: this.getVariableName(label), AliasType: label }],
            Slots: [
              { Name: "value", Value: "BAL", SlotValueTypes: ["FilterValue"] },
              { Name: "condition", Value: "in", SlotValueTypes: ["FilterCondition"] },
              { Name: "stat", Value: prop.name, SlotValueTypes: ["Filter"] },
            ],
          });
        });
      });
    });
    return chunks;
  }

  generateRelationshipTraversalChunks() {
    console.log("creating relationship chunks:");
    const chunks = [];
    const seen = new Set();

    this.schema.patterns.forEach((pattern) => {
      // Generate chunk for each from/to label combination
      pattern.fromLabels.forEach((fromLabel) => {
        pattern.toLabels.forEach((toLabel) => {
          const fromVar = this.getVariableName(fromLabel);
          const toVar = this.getVariableName(toLabel);

          // OUTGOING: (from)-[:REL]->(to) - requires from
          const outKey = `${fromLabel}-${pattern.relType}->${toLabel}`;
          if (!seen.has(outKey)) {
            seen.add(outKey);
            console.log(`${fromLabel} - ${pattern.relType} -> ${toLabel}`);

            chunks.push({
              English: `[${fromLabel}] - r[${pattern.relType}] -> [${toLabel}]`,
              EnglishTemplate: `${fromLabel} - ${pattern.relType} -> ${toLabel}`,
              Cypher: `MATCH (${fromVar}:${fromLabel})-[:${pattern.relType}]->(${toVar}:${toLabel})`,
              QueryType: "JUNCTION",
              Requires: [{ Name: fromVar, AliasType: fromLabel }],
              Provides: [
                { Name: fromVar, AliasType: fromLabel },
                { Name: toVar, AliasType: toLabel },
              ],
              Slots: [],
            });
          }

          // INCOMING: (to)<-[:REL]-(from) - requires to
          const inKey = `${toLabel}<-${pattern.relType}-${fromLabel}`;
          if (!seen.has(inKey)) {
            seen.add(inKey);
            console.log(`${toLabel} <- ${pattern.relType} - ${fromLabel}`);

            chunks.push({
              English: `[${toLabel}] <- r[${pattern.relType}] - [${fromLabel}]`,
              EnglishTemplate: `${toLabel} <- ${pattern.relType} - ${fromLabel}`,
              Cypher: `MATCH (${toVar}:${toLabel})<-[:${pattern.relType}]-(${fromVar}:${fromLabel})`,
              QueryType: "JUNCTION",
              Requires: [{ Name: toVar, AliasType: toLabel }],
              Provides: [
                { Name: toVar, AliasType: toLabel },
                { Name: fromVar, AliasType: fromLabel },
              ],
              Slots: [],
            });
          }
        });
      });
    });

    return chunks;
  }

  // Helper methods (simplified versions)
  getVariableName(label) {
    const mapping = {
      Player: "p",
      Team: "t",
      Game: "g",
      Season: "s",
      PlayerGame: "pg",
      PlayerSeason: "ps",
      TeamGame: "tg",
      TeamSeason: "ts",
      College: "col",
      CollegeConference: "cc",
      Coach: "coa",
      Official: "o",
    };
    return mapping[label] || label.toLowerCase().charAt(0);
  }

  pluralizeLabel(label) {
    const mapping = {
      Player: "Players",
      Team: "Teams",
      Game: "Games",
      Season: "Seasons",
      PlayerGame: "Player Games",
      PlayerSeason: "Player Seasons",
      TeamGame: "Team Games",
      TeamSeason: "Team Seasons",
    };
    return mapping[label] || `${label}s`;
  }

  getNumericProperties(node) {
    return node.properties.filter(
      (p) => p.type === "Double" || p.type === "Long",
    );
  }

  getStringProperties(node) {
    return node.properties.filter((p) => p.type === "String");
  }

  // e.g. PlayerSeason teams = ["LAR","MIN"] for a player traded mid season
  getStringArrayProperties(node) {
    return node.properties.filter((p) => p.type === "StringArray");
  }

  getDefaultValue(property) {
    if (property.includes("yards")) return 100;
    if (property.includes("tds")) return 2;
    if (property.includes("season")) return 2023;
    return 10;
  }
}

async function generateChunks() {
  try {
    // github sets CI=true during actions automatically
    const isCI = process.env.CI === "true";
    console.log("🔄 Fetching schema from API...");
    console.log("🤖 isCI:", isCI);

    // Determine API endpoint based on environment
    const baseUrl = isCI
      ? process.env.REACT_APP_SERVICE_URL
      : "http://localhost:8000";

    console.log(`🌐 Environment: ${isCI ? "Production" : "Development"}`);
    console.log(`🔗 API URL: ${baseUrl}`);

    // Fetch schema from API
    const response = await new Promise((resolve, reject) => {
      const url = new URL("/api/schema", baseUrl);
      const options = {
        hostname: url.hostname,
        port: url.port || (url.protocol === "https:" ? 443 : 80),
        path: url.pathname,
        method: "GET",
      };

      const requestModule = url.protocol === "https:" ? https : http;
      const req = requestModule.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            resolve({ data: JSON.parse(data) });
          } catch (e) {
            reject(new Error("Invalid JSON response"));
          }
        });
      });

      req.on("error", reject);
      req.end();
    });

    // Parse labels into arrays
    const cleanedSchema = {
      ...response.data,
      nodes: response.data.nodes.map((node) => ({
        ...node,
        labels: parseNodeTypeLabels(node.label),
      })),
      patterns: response.data.patterns.map((pattern) => ({
        ...pattern,
        // fromLabels/toLabels are already arrays from backend
        fromLabels: pattern.fromLabels,
        toLabels: pattern.toLabels,
      })),
    };

    console.log(
      `📊 Schema loaded: ${cleanedSchema.nodes.length} nodes, ${cleanedSchema.patterns.length} patterns`,
    );

    // Generate chunks
    const generator = new SimpleChunkGenerator(cleanedSchema);
    const generatedChunks = generator.generateChunks();

    console.log(`🎲 Generated ${generatedChunks.length} chunks`);

    // Create JSON file content
    const fileContent = JSON.stringify(generatedChunks, null, 2);

    // Write to file
    const outputPath = path.join(
      __dirname,
      "../src/feature/Chunks/Data/generated-chunks.json",
    );
    fs.writeFileSync(outputPath, fileContent, "utf8");

    console.log(`✅ Generated chunks written to: ${outputPath}`);
    console.log(`📝 Total chunks: ${generatedChunks.length}`);
  } catch (error) {
    console.error("❌ Error generating chunks:", error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateChunks();
}

module.exports = { generateChunks };
