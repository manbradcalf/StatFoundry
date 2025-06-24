import { DataType as DataType } from "./LabelsEnum";

/**
 * Represents the types that can be found on a node in Neo4j graph
 */
export type Entity = {
  label: DataType;
  properties: Record<string, any>;
};
