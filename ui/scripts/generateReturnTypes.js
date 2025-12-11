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
      console.log("generating views for node");
      console.log(node);
      this.generateViewForNode(node);
    });
  }

  generateViewForNode(node) {
    // Generate base info properties (non-statistical)
    if (node.properties.length > 0) {
      this.generateView(node.label, node.properties);
    }
  }

  generateView(label, properties) {
    const fileName = this.getFileName(label);
    const constantName = this.getConstantName(label);

    // Generate base properties array
    const content = `export const ${constantName} = [${properties.map((prop) => `  { key: "${prop.name}", type: "${prop.type}" },`).join("\n")}];`;

    // Generate a valid TypeScript interface as a string template
    const labelInterface = `\nexport interface ${label}Properties {
${properties.map((prop) => `  ${prop.name}: ${this.mapSchemaTypeToTS(prop.type)};`).join("\n")}
}`;

    this.writeViewFile(fileName, content + labelInterface);
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

  getViewName(label) {
    return label.replace(/[:`]/g, "");
  }

  getFileName(label) {
    const cleanLabel = this.getViewName(label);
    return `${cleanLabel}LabelView.ts`;
  }

  getConstantName(label) {
    const cleanLabel = this.getViewName(label);
    return `${cleanLabel.toUpperCase()}_LABEL_PROPERTIES`;
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
    console.log("= Fetching schema from API for type generation...");
    console.log("> isCI:", isCI);

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
    console.log(error)
    console.error("L Error generating types:", error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateTypes();
}

module.exports = { generateTypes };
