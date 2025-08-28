import { Chunk } from '../Types/Chunk';
import { QueryType } from '../Enums/QueryType';
import { Alias } from '../Types/Alias';
import { SlotType } from '../Enums/SlotType';
import { Schema, SchemaNode, SchemaPattern } from '../Types/Schema';

export class DynamicChunkGenerator {
  private schema: Schema | null = null;
  private generatedChunks: Chunk[] = [];

  async fetchSchema(): Promise<Schema> {
    try {
      const response = await fetch('/api/schema', {
        headers: {
          'Authorization': 'Bearer admin-dev-key-123'
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch schema: ${response.statusText}`);
      }
      const data = await response.json();
      // Clean up the schema by removing extra characters from labels
      const cleanedSchema = {
        ...data.schema,
        nodes: data.schema.nodes.map((node: any) => ({
          ...node,
          label: node.label.replace(/[:`]/g, '') // Remove colons and backticks
        })),
        patterns: data.schema.patterns.map((pattern: any) => ({
          ...pattern,
          fromLabel: pattern.fromLabel.replace(/[:`]/g, ''),
          toLabel: pattern.toLabel.replace(/[:`]/g, '')
        }))
      };
      this.schema = cleanedSchema;
      return this.schema!;
    } catch (error) {
      console.error('Error fetching schema:', error);
      throw error;
    }
  }

  async generateChunks(): Promise<Chunk[]> {
    if (!this.schema) {
      await this.fetchSchema();
    }

    if (!this.schema) {
      throw new Error('Schema not available');
    }

    this.generatedChunks = [
      ...this.generateEntityMatchChunks(),
      ...this.generatePropertyFilterChunks(),
      ...this.generateRelationshipTraversalChunks(),
      ...this.generateReturnChunks()
    ];

    // Write chunks to JSON file for inspection
    this.writeChunksToFile();

    return this.generatedChunks;
  }

  private writeChunksToFile(): void {
    try {
      const chunksData = {
        generated_at: new Date().toISOString(),
        total_chunks: this.generatedChunks.length,
        chunks: this.generatedChunks
      };
      
      console.log('Generated Dynamic Chunks:', JSON.stringify(chunksData, null, 2));
      console.log(`\n📝 Copy the above JSON to save ${this.generatedChunks.length} dynamic chunks to a file`);
    } catch (error) {
      console.error('Error writing chunks to console:', error);
    }
  }

  private generateEntityMatchChunks(): Chunk[] {
    if (!this.schema) return [];

    return this.schema.nodes.map(node => ({
      English: `${this.pluralizeLabel(node.label)}`,
      Cypher: `MATCH (${this.getVariableName(node.label)}:${node.label})`,
      QueryType: QueryType.MATCH_START,
      Requires: [] as Alias[],
      Provides: [{ Name: this.getVariableName(node.label), AliasType: node.label as any }],
      Slots: []
    }));
  }

  private generatePropertyFilterChunks(): Chunk[] {
    if (!this.schema) return [];

    const chunks: Chunk[] = [];

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
            English: `with ${readableProp} ${operatorWord} ${defaultValue}`,
            Cypher: `WHERE ${this.getVariableName(node.label)}.${prop} ${operator} ${defaultValue}`,
            EnglishTemplate: `with ${readableProp} ${operatorWord} {value}`,
            CypherTemplate: `WHERE ${this.getVariableName(node.label)}.${prop} ${operator} {value}`,
            QueryType: QueryType.FILTER,
            Requires: [{ Name: this.getVariableName(node.label), AliasType: node.label as any }],
            Provides: [{ Name: this.getVariableName(node.label), AliasType: node.label as any }],
            Slots: [{
              Name: 'value',
              Value: defaultValue,
              SlotValueTypes: [SlotType.FilterValue]
            }]
          });
        });
      });

      // Generate string equality chunks
      stringProperties.forEach(prop => {
        const readableProp = this.makePropertyReadable(prop);
        chunks.push({
          English: `with ${readableProp} equal to "example"`,
          Cypher: `WHERE ${this.getVariableName(node.label)}.${prop} = "example"`,
          EnglishTemplate: `with ${readableProp} equal to "{value}"`,
          CypherTemplate: `WHERE ${this.getVariableName(node.label)}.${prop} = "{value}"`,
          QueryType: QueryType.FILTER,
          Requires: [{ Name: this.getVariableName(node.label), AliasType: node.label as any }],
          Provides: [{ Name: this.getVariableName(node.label), AliasType: node.label as any }],
          Slots: [{
            Name: 'value',
            Value: 'example',
            SlotValueTypes: [SlotType.FilterValue]
          }]
        });
      });
    });

    return chunks;
  }

  private generateRelationshipTraversalChunks(): Chunk[] {
    if (!this.schema) return [];

    return this.schema.patterns.map(pattern => {
      const fromVar = this.getVariableName(pattern.fromLabel);
      const toVar = this.getVariableName(pattern.toLabel);

      return {
        English: `${this.getRelationshipDescription(pattern)}`,
        Cypher: `MATCH (${fromVar}:${pattern.fromLabel})-[:${pattern.relType}]->(${toVar}:${pattern.toLabel})`,
        QueryType: QueryType.JUNCTION,
        Requires: [{ Name: fromVar, AliasType: pattern.fromLabel as any }],
        Provides: [
          { Name: fromVar, AliasType: pattern.fromLabel as any },
          { Name: toVar, AliasType: pattern.toLabel as any }
        ],
        Slots: []
      };
    });
  }

  private generateReturnChunks(): Chunk[] {
    if (!this.schema) return [];

    const chunks: Chunk[] = [];

    this.schema.nodes.forEach(node => {
      // Generate return all properties chunk
      chunks.push({
        English: `return ${node.label.toLowerCase()} information`,
        Cypher: `RETURN ${this.getVariableName(node.label)}`,
        QueryType: QueryType.RETURN,
        Requires: [{ Name: this.getVariableName(node.label), AliasType: node.label as any }],
        Provides: [],
        Slots: []
      });

      // Generate return specific property chunks
      node.properties.forEach(prop => {
        chunks.push({
          English: `return ${prop}`,
          Cypher: `RETURN ${this.getVariableName(node.label)}.${prop}`,
          QueryType: QueryType.RETURN,
          Requires: [{ Name: this.getVariableName(node.label), AliasType: node.label as any }],
          Provides: [],
          Slots: []
        });
      });
    });

    return chunks;
  }

  private getVariableName(label: string): string {
    const mapping: Record<string, string> = {
      'Player': 'p',
      'Team': 't',
      'Game': 'g',
      'Season': 's',
      'PlayerGame': 'pg',
      'PlayerSeason': 'ps',
      'TeamGame': 'tg',
      'TeamSeason': 'ts'
    };
    return mapping[label] || label.toLowerCase().charAt(0);
  }

  private pluralizeLabel(label: string): string {
    const mapping: Record<string, string> = {
      'Player': 'Players',
      'Team': 'Teams',
      'Game': 'Games',
      'Season': 'Seasons',
      'PlayerGame': 'Player Games',
      'PlayerSeason': 'Player Seasons',
      'TeamGame': 'Team Games',
      'TeamSeason': 'Team Seasons'
    };
    return mapping[label] || `${label}s`;
  }

  private getNumericProperties(node: SchemaNode): string[] {
    const SKIP_PROPERTIES = [
      'player_id', 'player_season_id', 'gsis_id', 'esb_id', 'smart_id', 
      'game_id', 'nfl_detail_id', 'old_game_id', 'current_team_id',
      'player_game_id', 'gsis_it_id', 'stadium_id', 'team_seq'
    ];

    const numericKeywords = [
      'yards', 'tds', 'attempts', 'completions', 'interceptions',
      'rating', 'epa', 'cpoe', 'carries', 'targets', 'receptions',
      'fumbles', 'points', 'score', 'week', 'season',
      'weight', 'height', 'jersey_number', 'age'
    ];

    return node.properties.filter(prop =>
      !SKIP_PROPERTIES.includes(prop) &&
      numericKeywords.some(keyword => prop.toLowerCase().includes(keyword))
    );
  }

  private getStringProperties(node: SchemaNode): string[] {
    const SKIP_PROPERTIES = [
      'player_id', 'player_season_id', 'gsis_id', 'esb_id', 'smart_id', 
      'game_id', 'nfl_detail_id', 'old_game_id', 'current_team_id',
      'player_game_id', 'gsis_it_id', 'stadium_id', 'team_seq'
    ];

    const stringKeywords = [
      'name', 'position', 'team', 'opponent', 'home_team', 'away_team',
      'result', 'location', 'surface', 'roof', 'div_game', 'playoff'
    ];

    return node.properties.filter(prop =>
      !SKIP_PROPERTIES.includes(prop) &&
      stringKeywords.some(keyword => prop.toLowerCase().includes(keyword))
    );
  }

  private makePropertyReadable(property: string): string {
    const READABLE_NAMES: Record<string, string> = {
      'passing_yards': 'passing yards',
      'passing_tds': 'passing touchdowns',
      'rushing_yards': 'rushing yards', 
      'rushing_tds': 'rushing touchdowns',
      'receiving_yards': 'receiving yards',
      'receiving_tds': 'receiving touchdowns',
      'player_display_name': 'player name',
      'display_name': 'name',
      'jersey_number': 'jersey number',
      'uniform_number': 'uniform number',
      'position_group': 'position group',
      'team_abbr': 'team',
      'opponent_team': 'opponent team',
      'recent_team': 'recent team',
      'home_team': 'home team',
      'away_team': 'away team',
      'season_type': 'season type'
    };

    return READABLE_NAMES[property] || property.replace(/_/g, ' ');
  }

  private getDefaultValue(property: string): any {
    // Smart defaults based on property type
    if (property.includes('yards')) return 100;
    if (property.includes('tds') || property.includes('touchdowns')) return 2;
    if (property.includes('attempts') || property.includes('carries')) return 10;
    if (property.includes('receptions') || property.includes('targets')) return 5;
    if (property.includes('week')) return 5;
    if (property.includes('season')) return 2023;
    if (property.includes('weight')) return 200;
    if (property.includes('height')) return 72;
    if (property.includes('age')) return 25;
    
    return 100; // Default fallback
  }

  private getOperatorWord(operator: string): string {
    const mapping: Record<string, string> = {
      '>': 'greater than',
      '<': 'less than',
      '>=': 'greater than or equal to',
      '<=': 'less than or equal to',
      '=': 'equal to'
    };
    return mapping[operator] || operator;
  }

  private getRelationshipDescription(pattern: SchemaPattern): string {
    const descriptions: Record<string, string> = {
      'HAD': 'had',
      'PLAYED_FOR': 'played for',
      'PLAYED_AGAINST': 'played against',
      'COACHED': 'coached',
      'ATTENDED': 'attended'
    };

    const relDescription = descriptions[pattern.relType] || pattern.relType.toLowerCase().replace('_', ' ');
    return `who ${relDescription} ${pattern.toLabel.toLowerCase()}`;
  }

  getGeneratedChunks(): Chunk[] {
    return this.generatedChunks;
  }

  async refreshChunks(): Promise<Chunk[]> {
    this.schema = null;
    this.generatedChunks = [];
    return this.generateChunks();
  }
}
