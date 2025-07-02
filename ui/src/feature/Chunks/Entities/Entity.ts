import { Label } from "../Enums/Label";

/**
 * Represents the types that can be found on a node in Neo4j graph
 */
export type Entity = {
  label: Label;
  properties: Record<string, any>;
};
