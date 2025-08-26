export interface SchemaNode {
  label: string;
  properties: string[];
}

export interface SchemaRelationship {
  relationship: string;
  properties: string[];
}

export interface SchemaPattern {
  fromLabel: string;
  relType: string;
  toLabel: string;
}

export interface Schema {
  nodes: SchemaNode[];
  relationships: SchemaRelationship[];
  patterns: SchemaPattern[];
}

export interface ChunkTemplate {
  englishPattern: string;
  cypherPattern: string;
  queryType: string;
  inputTypes: string[];
  outputTypes: string[];
  propertyName?: string;
  relationshipType?: string;
}