export interface NodeSchema {
  label: string;
  properties: string[];
}

export interface RelationshipSchema {
  relationship: string;
  properties: string[];
}

export interface PatternSchema {
  fromLabel: string;
  relType: string;
  toLabel: string;
}

export interface Schema {
  nodes: NodeSchema[];
  relationships: RelationshipSchema[];
  patterns: PatternSchema[];
}

export interface BaseChunk {
  English: string;
  Cypher: string;
  Outputs: string[];
  Inputs: string[];
  NextValidChunks: BaseChunk[];
}

export interface ReturnClauseChunk {
  English: string;
  ReturnClause: string;
  Inputs: string[];
}

export interface ChunkSuggestion {
  chunk: BaseChunk;
  matchScore: number;
  placeholders: string[];
}

export interface PlaceholderValue {
  key: string;
  value: string;
}
