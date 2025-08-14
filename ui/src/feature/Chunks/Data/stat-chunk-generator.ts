import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";
import { SlotType } from "../Enums/SlotType";

export interface StatDefinition {
  key: string;
  type: "number" | "string" | "boolean";
  defaultValue?: number | string | boolean;
}

/**
 * Generates standardized stat chunks for filtering by player stats
 */
export function generateStatChunks(
  stats: StatDefinition[],
  entityType: "season" | "game",
  slotType: SlotType,
): Chunk[] {
  const chunks: Chunk[] = [];

  const entityAlias = entityType === "season" ? "ps" : "pg";
  const aliasType =
    entityType === "season" ? AliasType.PlayerSeason : AliasType.PlayerGame;

  for (const stat of stats) {
    // Single filter chunk for each stat
    chunks.push({
      English: `[${stat.key}]`,
      Cypher: "",
      EnglishTemplate: `with {condition} {value} {stat}`,
      CypherTemplate: `${entityAlias}.{stat} {condition} {value}`,
      QueryType: QueryType.FILTER,
      Requires: [{ Name: entityAlias, AliasType: aliasType }],
      Provides: [{ Name: entityAlias, AliasType: aliasType }],
      Slots: [
        {
          Name: "stat",
          Value: stat.key,
          SlotValueTypes: [slotType],
        },
        {
          Name: "condition",
          Value: stat.type === "number" ? ">" : "=",
          SlotValueTypes: [SlotType.FilterCondition],
        },
        {
          Name: "value",
          Value:
            stat.defaultValue ??
            (stat.type === "number"
              ? 100
              : stat.type === "boolean"
                ? true
                : "example"),
          SlotValueTypes: [SlotType.FilterValue],
        },
      ],
      SuggestionKeywords: [stat.key, entityType],
    });
  }

  return chunks;
}

/**
 * Generates standardized play stat chunks for filtering by play properties
 * Different from game/season stats - these are event-level, not player aggregates
 */
export function generatePlayStatChunks(
  stats: StatDefinition[],
  slotType: SlotType,
): Chunk[] {
  const chunks: Chunk[] = [];

  for (const stat of stats) {
    // Single filter chunk for each play property
    chunks.push({
      English: `[${stat.key}]`,
      Cypher: "",
      EnglishTemplate: `with {condition} {value} {stat}`,
      CypherTemplate: `play.{stat} {condition} {value}`,
      QueryType: QueryType.FILTER,
      Requires: [{ Name: "play", AliasType: AliasType.Play }],
      Provides: [{ Name: "play", AliasType: AliasType.Play }],
      Slots: [
        {
          Name: "stat",
          Value: stat.key,
          SlotValueTypes: [slotType],
        },
        {
          Name: "condition",
          Value: stat.type === "number" ? ">" : "=",
          SlotValueTypes: [SlotType.FilterCondition],
        },
        {
          Name: "value",
          Value:
            stat.defaultValue ??
            (stat.type === "number"
              ? 100
              : stat.type === "boolean"
                ? true
                : "example"),
          SlotValueTypes: [SlotType.FilterValue],
        },
      ],
      SuggestionKeywords: [stat.key, "play"],
    });
  }

  return chunks;
}
