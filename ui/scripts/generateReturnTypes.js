const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

class TypeScriptViewGenerator {
  constructor(schema) {
    this.schema = schema;
  }

  generateAllViews() {
    this.schema.nodes.forEach((node) => {
      this.generateViewForNode(node);
    });

    // Generate combined views
    this.generateCombinedViews();
  }

  generateViewForNode(node) {
    const viewName = this.getViewName(node.label);
    const properties = this.categorizeProperties(node.properties);

    // Generate base info properties (non-statistical)
    if (properties.info.length > 0) {
      this.generateInfoView(node.label, properties.info);
    }

    // Generate stat properties if they exist
    if (properties.stats.length > 0) {
      this.generateStatsView(node.label, properties.stats);
    }
  }

  generateInfoView(label, infoProperties) {
    const fileName = this.getInfoFileName(label);
    const constantName = this.getInfoConstantName(label);

    const content = `export const ${constantName} = [
${infoProperties.map((prop) => `  "${prop.name}",`).join("\n")}
];
`;

    this.writeViewFile(fileName, content);
  }

  generateStatsView(label, statProperties) {
    const fileName = this.getStatsFileName(label);
    const constantName = this.getStatsConstantName(label);

    // Generate base stats array
    const content = `export const ${constantName} = [
${statProperties.map((prop) => `  { key: "${prop.name}", type: "${prop.type}" },`).join("\n")}
];

export const ${constantName}_SEASON = [
  ...${constantName},
  { key: "teams", type: "string" }, // many teams per player per season
];

export const ${constantName}_GAME = [
  ...${constantName},
  { key: "recent_team", type: "string" }, // one team per player per game
];
`;

    this.writeViewFile(fileName, content);
  }

  generateCombinedViews() {
    // Generate FlexStats (combination of rushing and receiving)
    const flexContent = `export const RUSHING_STATS = [
  { key: "carries", type: "number" },
  { key: "yards_per_carry", type: "number" },
  { key: "rushing_yards", type: "number" },
  { key: "rushing_tds", type: "number" },
  { key: "rushing_first_downs", type: "number" },
  { key: "rushing_epa", type: "number" },
  { key: "rushing_fumbles", type: "number" },
  { key: "rushing_fumbles_lost", type: "number" },
];

export const RECEIVING_STATS = [
  { key: "receptions", type: "number" },
  { key: "receiving_yards", type: "number" },
  { key: "receiving_tds", type: "number" },
  { key: "receiving_air_yards", type: "number" },
  { key: "receiving_first_downs", type: "number" },
  { key: "receiving_epa", type: "number" },
  { key: "air_yards_share", type: "number" },
  { key: "targets", type: "number" },
  { key: "target_share", type: "number" },
];
export const FLEX_STATS = [...RUSHING_STATS, ...RECEIVING_STATS];

export const FLEX_STATS_SEASON = [
  ...FLEX_STATS,
  { key: "teams", type: "string" }, // many teams per player per season
];

export const FLEX_STATS_GAME = [
  ...FLEX_STATS,
  { key: "recent_team", type: "string" }, // one team per player per game
];
`;

    this.writeViewFile("FlexStats.ts", flexContent);

    // Generate FantasyStats
    const fantasyContent = `export const FANTASY_STATS = [
  { key: "fantasy_points", type: "number" },
  { key: "fantasy_points_ppr", type: "number" },
];
`;

    this.writeViewFile("FantasyStats.ts", fantasyContent);
  }

  categorizeProperties(properties) {
    const info = [];
    const stats = [];

    properties.forEach((prop) => {
      const propData = this.parseProperty(prop);

      // Categorize as info if it's basic identification/metadata
      if (this.isInfoProperty(propData.name)) {
        info.push(propData);
      } else {
        stats.push(propData);
      }
    });

    return { info, stats };
  }

  parseProperty(prop) {
    // Handle different property formats from schema
    if (typeof prop === "string") {
      return {
        name: prop,
        type: "string", // default type
      };
    } else if (prop.name && prop.type) {
      return {
        name: prop.name,
        type: this.mapSchemaTypeToTS(prop.type),
      };
    }

    return { name: prop, type: "string" };
  }

  mapSchemaTypeToTS(schemaType) {
    const typeMapping = {
      Double: "number",
      Long: "number",
      Integer: "number",
      String: "string",
      StringArray: "string",
      Boolean: "boolean",
    };

    return typeMapping[schemaType] || "string";
  }

  isInfoProperty(propName) {
    const infoPatterns = [
      /^.*_id$/,
      /^.*_name$/,
      /^display_name$/,
      /^position$/,
      /^team/,
      /^season$/,
      /^week$/,
      /^game_id$/,
      /^opponent/,
      /^recent_team$/,
      /^won$/,
      /^coach/,
      /^odds$/,
    ];

    return infoPatterns.some((pattern) => pattern.test(propName));
  }

  getViewName(label) {
    return label.replace(/[:`]/g, "");
  }

  getInfoFileName(label) {
    const cleanLabel = this.getViewName(label);
    return `${cleanLabel}Info.ts`;
  }

  getStatsFileName(label) {
    const cleanLabel = this.getViewName(label);
    return `${cleanLabel}Stats.ts`;
  }

  getInfoConstantName(label) {
    const cleanLabel = this.getViewName(label);
    // Handle special cases for backward compatibility
    if (cleanLabel === "PlayerGame") {
      return "PLAYER_GAME_INFO_PROPERTIES";
    }
    if (cleanLabel === "PlayerSeason") {
      return "PLAYER_SEASON_INFO_PROPERTIES";
    }
    return `${cleanLabel.toUpperCase()}_INFO_PROPERTIES`;
  }

  getStatsConstantName(label) {
    const cleanLabel = this.getViewName(label);
    return `${cleanLabel.toUpperCase()}_STATS`;
  }

  writeViewFile(fileName, content) {
    const viewsDir = path.join(__dirname, "../src/feature/Chunks/Views");
    const filePath = path.join(viewsDir, fileName);

    // Ensure directory exists
    if (!fs.existsSync(viewsDir)) {
      fs.mkdirSync(viewsDir, { recursive: true });
    }

    fs.writeFileSync(filePath, content, "utf8");
    console.log(` Generated view file: ${fileName}`);
  }
}

async function generateTypes() {
  try {
    // github sets CI=true during actions automatically
    const isCI = process.env.CI === "true";
    console.log("= Fetching schema from API for type generation...");
    console.log("> isCI:", isCI);

    // Determine API endpoint based on environment
    const baseUrl = isCI
      ? process.env.REACT_APP_SERVICE_URL
      : "http://localhost:8000";

    console.log(`< Environment: ${isCI ? "Production" : "Development"}`);
    console.log(`= API URL: ${baseUrl}`);

    // Fetch schema from API (reusing generateChunks.js logic)
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
      `=� Schema loaded: ${cleanedSchema.nodes.length} nodes, ${cleanedSchema.patterns.length} patterns`,
    );

    // Generate TypeScript views
    const generator = new TypeScriptViewGenerator(cleanedSchema);
    generator.generateAllViews();

    console.log(` TypeScript view files generated successfully`);
  } catch (error) {
    console.error("L Error generating types:", error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateTypes();
}

module.exports = { generateTypes };

