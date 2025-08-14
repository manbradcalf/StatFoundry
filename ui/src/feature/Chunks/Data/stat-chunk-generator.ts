import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";
import { SlotType } from "../Enums/SlotType";

export interface StatDefinition {
  key: string;
  type: "number" | "string";
  defaultValue?: number | string;
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
  const entityLabel = entityType === "season" ? "PlayerSeason" : "PlayerGame";
  const aliasType =
    entityType === "season" ? AliasType.PlayerSeason : AliasType.PlayerGame;

  for (const stat of stats) {
    // Filter start chunk
    chunks.push({
      English: `${entityType}s with [${stat.key}]`,
      Cypher: "",
      EnglishTemplate: `with {condition} {value} {stat} in a ${entityType}`,
      CypherTemplate: `MATCH (p)-[:HAD]->(${entityAlias}:${entityLabel}) WHERE ${entityAlias}.{stat} {condition} {value}`,
      QueryType: QueryType.FILTER_START,
      Requires: [
        { Name: "p", AliasType: AliasType.Player },
        { Name: entityAlias, AliasType: aliasType },
      ],
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
            stat.defaultValue ?? (stat.type === "number" ? 100 : "example"),
          SlotValueTypes: [SlotType.FilterValue],
        },
      ],
      SuggestionKeywords: [stat.key, entityType],
    });

    // Filter extend chunk
    chunks.push({
      English: `[${stat.key}]`,
      Cypher: "",
      EnglishTemplate: `and with {condition} {value} {stat}`,
      CypherTemplate: ` AND ${entityAlias}.{stat} {condition} {value}`,
      QueryType: QueryType.FILTER_EXTEND,
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
            stat.defaultValue ?? (stat.type === "number" ? 100 : "example"),
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
    // Filter start chunk - starts fresh from Play entities
    chunks.push({
      English: `plays with [${stat.key}]`,
      Cypher: "",
      EnglishTemplate: `plays with {condition} {value} {stat}`,
      CypherTemplate: `MATCH (play:Play) WHERE play.{stat} {condition} {value}`,
      QueryType: QueryType.FILTER_START,
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
            stat.defaultValue ?? (stat.type === "number" ? 100 : "example"),
          SlotValueTypes: [SlotType.FilterValue],
        },
      ],
      SuggestionKeywords: [stat.key, "play", "plays"],
    });

    // Filter extend chunk - add additional play conditions
    chunks.push({
      English: `[${stat.key}]`,
      Cypher: "",
      EnglishTemplate: `and {condition} {value} {stat}`,
      CypherTemplate: ` AND play.{stat} {condition} {value}`,
      QueryType: QueryType.FILTER_EXTEND,
      Requires: [{ Name: "play", AliasType: AliasType.Play }],
      Provides: [],
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
            stat.defaultValue ?? (stat.type === "number" ? 100 : "example"),
          SlotValueTypes: [SlotType.FilterValue],
        },
      ],
      SuggestionKeywords: [stat.key, "play"],
    });
  }

  return chunks;
}
