const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

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
      ...this.generateReturnChunks()
    ];
    return chunks;
  }

  generateEntityMatchChunks() {
    return this.schema.nodes.map(node => ({
      English: `${this.pluralizeLabel(node.label)}`,
      Cypher: `MATCH (${this.getVariableName(node.label)}:${node.label})`,
      QueryType: "MATCH_START",
      Requires: [],
      Provides: [{ Name: this.getVariableName(node.label), AliasType: node.label }],
      Slots: []
    }));
  }

  generatePropertyFilterChunks() {
    const chunks = [];
    this.schema.nodes.forEach(node => {
      const numericProperties = this.getNumericProperties(node);
      const stringProperties = this.getStringProperties(node);

      // Generate numeric comparison chunks
      numericProperties.forEach(prop => {
        const readableProp = this.makePropertyReadable(prop);
        const defaultValue = this.getDefaultValue(prop);

        ['>', '<', '>=', '<=', '='].forEach(operator => {
          const operatorWord = this.getOperatorWord(operator);
          chunks.push({
            English: `with [${readableProp}] ${operatorWord} ${defaultValue}`,
            Cypher: `WHERE ${this.getVariableName(node.label)}.${prop} ${operator} ${defaultValue}`,
            EnglishTemplate: `with ${readableProp} ${operatorWord} {value}`,
            CypherTemplate: `WHERE ${this.getVariableName(node.label)}.${prop} ${operator} {value}`,
            QueryType: "FILTER",
            Requires: [{ Name: this.getVariableName(node.label), AliasType: node.label }],
            Provides: [{ Name: this.getVariableName(node.label), AliasType: node.label }],
            Slots: [{ Name: 'value', Value: defaultValue, SlotValueTypes: ["FilterValue"] }]
          });
        });
      });

      // Generate string equality chunks
      stringProperties.forEach(prop => {
        const readableProp = this.makePropertyReadable(prop);
        chunks.push({
          English: `with [${readableProp}] equal to "example"`,
          Cypher: `WHERE ${this.getVariableName(node.label)}.${prop} = "example"`,
          EnglishTemplate: `with ${readableProp} equal to "{value}"`,
          CypherTemplate: `WHERE ${this.getVariableName(node.label)}.${prop} = "{value}"`,
          QueryType: "FILTER",
          Requires: [{ Name: this.getVariableName(node.label), AliasType: node.label }],
          Provides: [{ Name: this.getVariableName(node.label), AliasType: node.label }],
          Slots: [{ Name: 'value', Value: 'example', SlotValueTypes: ["FilterValue"] }]
        });
      });
    });
    return chunks;
  }

  generateRelationshipTraversalChunks() {
    return this.schema.patterns.map(pattern => {
      const fromVar = this.getVariableName(pattern.fromLabel);
      const toVar = this.getVariableName(pattern.toLabel);
      return {
        English: `${this.getRelationshipDescription(pattern)}`,
        Cypher: `MATCH (${fromVar}:${pattern.fromLabel})-[:${pattern.relType}]->(${toVar}:${pattern.toLabel})`,
        QueryType: "JUNCTION",
        Requires: [{ Name: fromVar, AliasType: pattern.fromLabel }],
        Provides: [
          { Name: fromVar, AliasType: pattern.fromLabel },
          { Name: toVar, AliasType: pattern.toLabel }
        ],
        Slots: []
      };
    });
  }

  generateReturnChunks() {
    const chunks = [];
    this.schema.nodes.forEach(node => {
      // Generate return all properties chunk
      chunks.push({
        English: `return ${node.label.toLowerCase()} information`,
        Cypher: `RETURN ${this.getVariableName(node.label)}`,
        QueryType: "RETURN",
        Requires: [{ Name: this.getVariableName(node.label), AliasType: node.label }],
        Provides: [],
        Slots: []
      });

      // Generate return specific property chunks
      node.properties.forEach(prop => {
        chunks.push({
          English: `return ${prop}`,
          Cypher: `RETURN ${this.getVariableName(node.label)}.${prop}`,
          QueryType: "RETURN",
          Requires: [{ Name: this.getVariableName(node.label), AliasType: node.label }],
          Provides: [],
          Slots: []
        });
      });
    });
    return chunks;
  }

  // Helper methods (simplified versions)
  getVariableName(label) {
    const mapping = {
      Player: "p", Team: "t", Game: "g", Season: "s",
      PlayerGame: "pg", PlayerSeason: "ps", TeamGame: "tg", TeamSeason: "ts"
    };
    return mapping[label] || label.toLowerCase().charAt(0);
  }

  pluralizeLabel(label) {
    const mapping = {
      Player: "Players", Team: "Teams", Game: "Games", Season: "Seasons",
      PlayerGame: "Player Games", PlayerSeason: "Player Seasons",
      TeamGame: "Team Games", TeamSeason: "Team Seasons"
    };
    return mapping[label] || `${label}s`;
  }

  getNumericProperties(node) {
    const skipProperties = ["player_id", "player_season_id", "gsis_id", "esb_id", "smart_id", 
      "game_id", "nfl_detail_id", "old_game_id", "current_team_id", "player_game_id", 
      "gsis_it_id", "stadium_id", "team_seq"];
    const numericKeywords = ["yards", "tds", "attempts", "completions", "interceptions", 
      "rating", "epa", "cpoe", "carries", "targets", "receptions", "fumbles", "points", 
      "score", "week", "season", "weight", "height", "jersey_number", "age"];
    
    return node.properties.filter(prop => 
      !skipProperties.includes(prop) && 
      numericKeywords.some(keyword => prop.toLowerCase().includes(keyword))
    );
  }

  getStringProperties(node) {
    const skipProperties = ["player_id", "player_season_id", "gsis_id", "esb_id", "smart_id", 
      "game_id", "nfl_detail_id", "old_game_id", "current_team_id", "player_game_id", 
      "gsis_it_id", "stadium_id", "team_seq"];
    const stringKeywords = ["name", "position", "team", "opponent", "home_team", "away_team", 
      "result", "location", "surface", "roof", "div_game", "playoff"];
    
    return node.properties.filter(prop => 
      !skipProperties.includes(prop) && 
      stringKeywords.some(keyword => prop.toLowerCase().includes(keyword))
    );
  }

  makePropertyReadable(property) {
    const essentialMappings = {
      passing_tds: "passing touchdowns",
      rushing_tds: "rushing touchdowns", 
      receiving_tds: "receiving touchdowns"
    };
    return essentialMappings[property] || property.replace(/_/g, ' ');
  }

  getDefaultValue(property) {
    if (property.includes("yards")) return 100;
    if (property.includes("tds")) return 2;
    if (property.includes("season")) return 2023;
    return 10;
  }

  getOperatorWord(operator) {
    const mapping = {
      '>': 'greater than', '<': 'less than', '>=': 'greater than or equal to',
      '<=': 'less than or equal to', '=': 'equal to'
    };
    return mapping[operator] || operator;
  }

  getRelationshipDescription(pattern) {
    const descriptions = {
      HAD: "had", PLAYED_FOR: "played for", PLAYED_AGAINST: "played against",
      COACHED: "coached", ATTENDED: "attended"
    };
    const relDescription = descriptions[pattern.relType] || 
      pattern.relType.toLowerCase().replace('_', ' ');
    return `who ${relDescription} ${pattern.toLabel.toLowerCase()}`;
  }
}

async function generateChunks() {
  try {
    console.log('🔄 Fetching schema from API...');
    
    // Fetch schema from API
    const response = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'localhost',
        port: 8000,
        path: '/api/schema',
        method: 'GET',
        headers: { 'Authorization': 'Bearer admin-dev-key-123' }
      };
      
      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            resolve({ data: JSON.parse(data) });
          } catch (e) {
            reject(new Error('Invalid JSON response'));
          }
        });
      });
      
      req.on('error', reject);
      req.end();
    });

    // Clean up schema (remove backticks and colons from labels)
    const cleanedSchema = {
      ...response.data,
      nodes: response.data.nodes.map(node => ({
        ...node,
        label: node.label.replace(/[:`]/g, '')
      })),
      patterns: response.data.patterns.map(pattern => ({
        ...pattern,
        fromLabel: pattern.fromLabel.replace(/[:`]/g, ''),
        toLabel: pattern.toLabel.replace(/[:`]/g, '')
      }))
    };

    console.log(`📊 Schema loaded: ${cleanedSchema.nodes.length} nodes, ${cleanedSchema.patterns.length} patterns`);

    // Generate chunks
    const generator = new SimpleChunkGenerator(cleanedSchema);
    const generatedChunks = generator.generateChunks();

    console.log(`🎲 Generated ${generatedChunks.length} chunks`);

    // Create JSON file content
    const fileContent = JSON.stringify(generatedChunks, null, 2);

    // Write to file
    const outputPath = path.join(__dirname, '../src/feature/Chunks/Data/generated-chunks.json');
    fs.writeFileSync(outputPath, fileContent, 'utf8');

    console.log(`✅ Generated chunks written to: ${outputPath}`);
    console.log(`📝 Total chunks: ${generatedChunks.length}`);

  } catch (error) {
    console.error('❌ Error generating chunks:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateChunks();
}

module.exports = { generateChunks };