/**
 * Represents the types that can be found on a node in Neo4j graph
 */
export type Entity = {
  label: string;
  properties: Record<string, any>;
};
