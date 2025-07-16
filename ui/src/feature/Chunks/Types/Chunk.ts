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
   * The original English template with placeholders like {threshold}, {property}.
   * This is preserved so we can re-edit chunks after they've been filled.
   * Example: "who had over {threshold} {property}" vs filled "who had over 300 rushing_yards"
   * Required for chunks with slots, optional for chunks without slots.
   */
  readonly EnglishTemplate?: string;

  /**
   * The original Cypher template with placeholders like {threshold}, {property}.
   * This is preserved so we can re-edit chunks after they've been filled.
   * Example: "WHERE pg.{property} > {threshold}" vs filled "WHERE pg.rushing_yards > 300"
   * Required for chunks with slots, optional for chunks without slots.
   */
  readonly CypherTemplate?: string;

  /**
   * The type of query this chunk represents.
   */
  readonly QueryType: QueryType;

  /**
   * The aliases required for the chunk to build the cypher.
   * Each alias is a pair of [aliasName, entityType] representing the required entity types
   * that must be available in the chain before this chunk can be used.
   */
  readonly Requires: Alias[];

  /**
   * The types of the entities that are aliased by the chunk.
   * The key is the alias name, and the value is the label of the entity.
   */
  readonly Provides: Alias[];

  /**
   * The values to fill the slots with.
   * This contains example/default values for the entity's properties
   */
  Slots: Slot[];

  /**
   * The keywords to use for suggestions.
   */
  readonly SuggestionKeywords?: string[];
};
