import { Entity } from "./EntityTypes/Entity";
import { LabelNames } from "./EntityTypes/LabelsEnum";
import { QueryType } from "./QueryType";

/**
 * Class representing a single query chunk.
 */
export type Chunk<T extends Entity> = {
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
   * The labels of the entities that are required for the chunk to build the cypher.
   */
  readonly RequiredInputs: LabelNames[];

  /**
   * The values to fill the slots with.
   * This contains example/default values for the entity's properties
   */
  readonly Slots: Record<string, any>;
};
