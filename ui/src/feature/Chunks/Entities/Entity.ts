import { AliasType } from "../Enums/AliasType";

/**
 * Represents the types that can be found on a node in Neo4j graph
 */
export type Entity = {
  label: AliasType;
  properties: Record<string, any>;
};
