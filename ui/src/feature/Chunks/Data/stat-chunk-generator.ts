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
  slotType: SlotType
): Chunk[] {
  const chunks: Chunk[] = [];
  
  const entityAlias = entityType === "season" ? "ps" : "pg";
  const entityLabel = entityType === "season" ? "PlayerSeason" : "PlayerGame";
  const aliasType = entityType === "season" ? AliasType.PlayerSeason : AliasType.PlayerGame;
  
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
        { Name: entityAlias, AliasType: aliasType }
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
          Value: stat.defaultValue ?? (stat.type === "number" ? 100 : "example"),
          SlotValueTypes: [SlotType.FilterValue],
        },
      ],
      SuggestionKeywords: [stat.key, entityType]
    });

    // Filter extend chunk
    chunks.push({
      English: `...and [${stat.key}]`,
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
          Value: stat.defaultValue ?? (stat.type === "number" ? 100 : "example"),
          SlotValueTypes: [SlotType.FilterValue],
        },
      ],
      SuggestionKeywords: [stat.key, entityType]
    });
  }
  
  return chunks;
}