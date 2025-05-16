// region: schema types
// see service/src/neo4j_client.py fetch_schema() for the schema definition
export interface Schema {
  nodes: Node[];
  relationships: Relationship[];
  patterns: Pattern[];
}

export interface Node {
  label: string;
  properties: string[];
}

export interface Relationship {
  from: string;
  to: string;
  relType: string;
}

export interface Pattern {
  fromLabel: string;
  relType: string;
  toLabel: string;
}
// endregion: schema types

// region: chunk types
export interface BaseChunk {
  English: string;
  Cypher: string;
  Outputs: string[];
  Inputs: string[];
  Color: string;
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

// endregion: chunk types
