import { Entity } from "./Entities";
import { QueryType } from "./QueryType";

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
   * The inputs that are required for the chunk to build the cypher.
   */
  readonly RequiredInputs: Entity[];

  /**
   * The values to fill the slots with.
   */
  readonly SlotValues: Record<string, string>;
};
