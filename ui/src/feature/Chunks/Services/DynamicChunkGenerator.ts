import { Chunk } from '../Types/Chunk';
import { QueryType } from '../Enums/QueryType';
import { Label } from '../Enums/Label';
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

    return this.generatedChunks;
  }

  private generateEntityMatchChunks(): Chunk[] {
    if (!this.schema) return [];

    return this.schema.nodes.map(node => ({
      English: `${this.pluralizeLabel(node.label)}`,
      Cypher: `MATCH (${this.getVariableName(node.label)}:${node.label})`,
      QueryType: QueryType.MATCH,
      Inputs: [] as Alias[],
      Outputs: [{ Name: this.getVariableName(node.label), Label: node.label as Label }],
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
        ['>', '<', '>=', '<=', '='].forEach(operator => {
          const operatorWord = this.getOperatorWord(operator);
          chunks.push({
            English: `with ${prop} ${operatorWord} 100`,
            Cypher: `WHERE ${this.getVariableName(node.label)}.${prop} ${operator} 100`,
            EnglishTemplate: `with ${prop} ${operatorWord} {value}`,
            CypherTemplate: `WHERE ${this.getVariableName(node.label)}.${prop} ${operator} {value}`,
            QueryType: QueryType.FILTER,
            Inputs: [{ Name: this.getVariableName(node.label), Label: node.label as Label }],
            Outputs: [{ Name: this.getVariableName(node.label), Label: node.label as Label }],
            Slots: [{
              Name: 'value',
              Value: 100,
              SlotValueTypes: [SlotType.FilterValue]
            }]
          });
        });
      });

      // Generate string equality chunks
      stringProperties.forEach(prop => {
        chunks.push({
          English: `with ${prop} equal to "example"`,
          Cypher: `WHERE ${this.getVariableName(node.label)}.${prop} = "example"`,
          EnglishTemplate: `with ${prop} equal to "{value}"`,
          CypherTemplate: `WHERE ${this.getVariableName(node.label)}.${prop} = "{value}"`,
          QueryType: QueryType.FILTER,
          Inputs: [{ Name: this.getVariableName(node.label), Label: node.label as Label }],
          Outputs: [{ Name: this.getVariableName(node.label), Label: node.label as Label }],
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
        QueryType: QueryType.MATCH_PATH,
        Inputs: [{ Name: fromVar, Label: pattern.fromLabel as Label }],
        Outputs: [
          { Name: fromVar, Label: pattern.fromLabel as Label },
          { Name: toVar, Label: pattern.toLabel as Label }
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
        Inputs: [{ Name: this.getVariableName(node.label), Label: node.label as Label }],
        Outputs: [],
        Slots: []
      });

      // Generate return specific property chunks
      node.properties.forEach(prop => {
        chunks.push({
          English: `return ${prop}`,
          Cypher: `RETURN ${this.getVariableName(node.label)}.${prop}`,
          QueryType: QueryType.RETURN,
          Inputs: [{ Name: this.getVariableName(node.label), Label: node.label as Label }],
          Outputs: [],
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
    const numericKeywords = [
      'yards', 'tds', 'attempts', 'completions', 'interceptions',
      'rating', 'epa', 'cpoe', 'carries', 'targets', 'receptions',
      'fumbles', 'points', 'score', 'week', 'season', 'game_id',
      'weight', 'height', 'jersey_number', 'age'
    ];

    return node.properties.filter(prop =>
      numericKeywords.some(keyword => prop.toLowerCase().includes(keyword))
    );
  }

  private getStringProperties(node: SchemaNode): string[] {
    const stringKeywords = [
      'name', 'position', 'team', 'opponent', 'home_team', 'away_team',
      'result', 'location', 'surface', 'roof', 'div_game', 'playoff'
    ];

    return node.properties.filter(prop =>
      stringKeywords.some(keyword => prop.toLowerCase().includes(keyword))
    );
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
