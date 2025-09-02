const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

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
      ...this.generateReturnChunks(),
    ];
    return chunks;
  }

  generateEntityMatchChunks() {
    return this.schema.nodes.map((node) => ({
      English: `${this.pluralizeLabel(node.label)}`,
      Cypher: `MATCH (${this.getVariableName(node.label)}:${node.label})`,
      QueryType: "MATCH_START",
      Requires: [],
      Provides: [
        { Name: this.getVariableName(node.label), AliasType: node.label },
      ],
      Slots: [],
    }));
  }

  generatePropertyFilterChunks() {
    const chunks = [];
    this.schema.nodes.forEach((node) => {
      const numericProperties = this.getNumericProperties(node);
      console.log(`numbers for ${node.label}`, numericProperties);
      const stringProperties = this.getStringProperties(node);
      console.log(`strings for ${node.label}`, stringProperties);
      const stringArrayProperties = this.getStringArrayProperties(node);
      console.log(`string arrays for ${node.label}`, stringArrayProperties);

      // Generate numeric comparison chunks
      numericProperties.forEach((prop) => {
        chunks.push({
          English: `[${prop.name}] (${node.label})`,
          Cypher: ` ${this.getVariableName(node.label)}.${prop.name} `,
          EnglishTemplate: `${prop.name} {condition} {value}`,
          CypherTemplate: `${this.getVariableName(node.label)}.${prop.name} {condition} {value}`,
          QueryType: "FILTER",
          Requires: [
            { Name: this.getVariableName(node.label), AliasType: node.label },
          ],
          Provides: [
            { Name: this.getVariableName(node.label), AliasType: node.label },
          ],
          Slots: [
            {
              Name: "stat",
              Value: prop.name,
              SlotValueTypes: ["MultiStatFilter"],
            },
            {
              Name: "condition",
              Value: ">",
              SlotValueTypes: ["FilterCondition"],
            },
            {
              Name: "value",
              Value: 100,
              SlotValueTypes: ["FilterValue"],
            },
          ],
        });
      });

      // Generate string equality chunks
      stringProperties.forEach((prop) => {
        const readableProp = prop.name;
        chunks.push({
          English: `[${prop.name}] (${node.label})`,
          Cypher: ` ${this.getVariableName(node.label)}.${prop.name} {condition} {value}`,
          EnglishTemplate: `with ${readableProp} equal to {value}`,
          CypherTemplate: ` ${this.getVariableName(node.label)}.${prop.name} = {value}`,
          QueryType: "FILTER",
          Requires: [
            { Name: this.getVariableName(node.label), AliasType: node.label },
          ],
          Provides: [
            { Name: this.getVariableName(node.label), AliasType: node.label },
          ],
          Slots: [
            {
              Name: "stat",
              Value: prop.name,
              SlotValueTypes: ["MultiStatFilter"],
            },
            {
              Name: "condition",
              Value: "=",
              SlotValueTypes: ["FilterCondition"],
            },
            {
              Name: "value",
              Value: "something",
              SlotValueTypes: ["FilterValue"],
            },
          ],
        });

        // Generate string array contains chunks
        stringArrayProperties.forEach((prop) => {
          const readableProp = prop.name;
          chunks.push({
            English: `for [${prop.name}] (${node.label})`,
            EnglishTemplate: `with ${readableProp} equal to {value}`,
            CypherTemplate: `{value} IN ${this.getVariableName(node.label)}.${prop.name}`,
            QueryType: "FILTER",
            Requires: [
              { Name: this.getVariableName(node.label), AliasType: node.label },
            ],
            Provides: [
              { Name: this.getVariableName(node.label), AliasType: node.label },
            ],
            Slots: [
              {
                Name: "stat",
                Value: prop.name,
                SlotValueTypes: ["MultiStatFilter"],
              },
              {
                Name: "condition",
                Value: "=",
                SlotValueTypes: ["FilterCondition"],
              },
              {
                Name: "value",
                Value: "something",
                SlotValueTypes: ["FilterValue"],
              },
            ],
          });
        });
      });
    });
    return chunks;
  }

  generateRelationshipTraversalChunks() {
    return this.schema.patterns.map((pattern) => {
      const fromVar = this.getVariableName(pattern.fromLabel);
      const toVar = this.getVariableName(pattern.toLabel);
      return {
        English: `${this.getRelationshipDescription(pattern)}`,
        Cypher: `MATCH (${fromVar}:${pattern.fromLabel})-[:${pattern.relType}]->(${toVar}:${pattern.toLabel})`,
        QueryType: "JUNCTION",
        Requires: [{ Name: fromVar, AliasType: pattern.fromLabel }],
        Provides: [
          { Name: fromVar, AliasType: pattern.fromLabel },
          { Name: toVar, AliasType: pattern.toLabel },
        ],
        Slots: [],
      };
    });
  }

  generateReturnChunks() {
    const chunks = [];
    this.schema.nodes.forEach((node) => {
      // Generate return all properties chunk
      chunks.push({
        English: `return ${node.label.toLowerCase()} information`,
        Cypher: `RETURN ${this.getVariableName(node.label)}`,
        QueryType: "RETURN",
        Requires: [
          { Name: this.getVariableName(node.label), AliasType: node.label },
        ],
        Provides: [],
        Slots: [],
      });

      // Generate return specific property chunks
      node.properties.forEach((prop) => {
        chunks.push({
          English: `return ${prop.name}`,
          Cypher: `RETURN ${this.getVariableName(node.label)}.${prop}`,
          QueryType: "RETURN",
          Requires: [
            { Name: this.getVariableName(node.label), AliasType: node.label },
          ],
          Provides: [],
          Slots: [],
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

  getRelationshipDescription(pattern) {
    const descriptions = {
      HAD: "had",
      PLAYED_FOR: "played for",
      PLAYED_AGAINST: "played against",
      COACHED: "coached",
      ATTENDED: "attended",
    };
    const relDescription =
      descriptions[pattern.relType] ||
      pattern.relType.toLowerCase().replace("_", " ");
    return `${pattern.fromLabel} ${relDescription} ${pattern.toLabel}`;
  }
}

async function generateChunks() {
  try {
    // github sets CI=true during actions automatically
    console.log(process.env);
    const isCI = process.env.CI === "true";
    console.log("🔄 Fetching schema from API...");
    console.log("🤖 isCI:", isCI);

    // Determine API endpoint based on environment
    const baseUrl = isCI
      ? "https://statfoundry-service-a7crg2fjazb4c8c5.scm.eastus-01.azurewebsites.net/"
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
        headers: { Authorization: "Bearer admin-dev-key-123" },
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

    // Clean up schema (remove backticks and colons from labels)
    const cleanedSchema = {
      ...response.data,
      nodes: response.data.nodes.map((node) => ({
        ...node,
        label: node.label.replace(/[:`]/g, ""),
      })),
      patterns: response.data.patterns.map((pattern) => ({
        ...pattern,
        fromLabel: pattern.fromLabel.replace(/[:`]/g, ""),
        toLabel: pattern.toLabel.replace(/[:`]/g, ""),
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
