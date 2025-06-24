import { Alias } from "./Alias";
import { Slot } from "./Slot";
import { QueryType } from "../Enums/QueryType";

/**
 * Class representing a single query chunk.
 */
export type Chunk = {
  /**
   * The English translation of the query snippet represented by the Chunk.
   */
  readonly English: string;

  /**
   * The Cypher query for the query snippet represented by the Chunk.
   */
  readonly Cypher: string;

  /**
   * The type of query this chunk represents.
   */
  readonly QueryType: QueryType;

  /**
   * The aliases required for the chunk to build the cypher.
   * Each alias is a pair of [aliasName, entityType] representing the required entity types
   * that must be available in the chain before this chunk can be used.
   */
  readonly Inputs: Alias[];

  /**
   * The types of the entities that are aliased by the chunk.
   * The key is the alias name, and the value is the label of the entity.
   */
  readonly Outputs: Alias[];

  /**
   * The values to fill the slots with.
   * This contains example/default values for the entity's properties
   */
  Slots: Slot[];
};
