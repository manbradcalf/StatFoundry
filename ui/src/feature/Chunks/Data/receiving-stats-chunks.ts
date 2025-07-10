import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";
import { SlotType } from "../Enums/SlotType";
import { PLAYER_GAME_INFO_PROPERTIES } from "../Views/PlayerGameInfo";
import { RECEIVING_STATS } from "../Views/ReceivingStats";
import { PLAYER_SEASON_INFO_PROPERTIES } from "../Views/PlayerSeasonInfo";

// Generate dynamic chunks for each receiving stat covering Season & Game levels
const FILTER_AND_AND_CHUNKS: Chunk[] = RECEIVING_STATS.flatMap((statKey) => {
  const baseSlots = [
    {
      Name: "stat",
      Value: statKey,
      SlotValueTypes: [SlotType.SelectReceivingStats],
    },
    {
      Name: "condition",
      Value: ">",
      SlotValueTypes: [SlotType.FilterCondition],
    },
    {
      Name: "value",
      Value: 100,
      SlotValueTypes: [SlotType.FilterValue],
    },
  ];

  const seasonFilter: Chunk = {
    English: `who had [${statKey}] in a Season`,
    Cypher: "",
    EnglishTemplate: `who had {condition} {value} {stat} in a Season`,
    CypherTemplate:
      `CALL (p) { MATCH (p)-[:HAD]->(ps:PlayerSeason) WHERE ps.{stat} {condition} {value} RETURN ps as receivingSeasonStats }`,
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [{ Name: "receivingSeasonStats", AliasType: AliasType.WRSeason }],
    Slots: baseSlots,
  };

  const seasonAnd: Chunk = {
    English: "and ...",
    Cypher: "",
    EnglishTemplate: `and who had {condition} {value} {stat} in that Season`,
    CypherTemplate:
      `MATCH (receivingSeasonStats) WHERE receivingSeasonStats.{stat} {condition} {value}`,
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "receivingSeasonStats", AliasType: AliasType.WRSeason }],
    Provides: [{ Name: "receivingSeasonStats", AliasType: AliasType.WRSeason }],
    Slots: baseSlots,
  };

  const gameFilter: Chunk = {
    English: `who had [${statKey}] in a Game`,
    Cypher: "",
    EnglishTemplate: `who had {condition} {value} {stat} in a Game`,
    CypherTemplate:
      `CALL (p) { MATCH (p)-[:HAD]->(pg:PlayerGame) WHERE pg.{stat} {condition} {value} RETURN pg as receivingGameStats }`,
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [{ Name: "receivingGameStats", AliasType: AliasType.WRGame }],
    Slots: baseSlots,
  };

  const gameAnd: Chunk = {
    English: "and ...",
    Cypher: "",
    EnglishTemplate: `and who had {condition} {value} {stat} in that Game`,
    CypherTemplate:
      `MATCH (receivingGameStats) WHERE receivingGameStats.{stat} {condition} {value}`,
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "receivingGameStats", AliasType: AliasType.WRGame }],
    Provides: [{ Name: "receivingGameStats", AliasType: AliasType.WRGame }],
    Slots: baseSlots,
  };

  return [seasonFilter, seasonAnd, gameFilter, gameAnd];
});

const RETURN_CHUNKS: Chunk[] = [
  {
    English: "return receiving stats by game",
    Cypher: `RETURN receivingGameStats.${[...PLAYER_GAME_INFO_PROPERTIES, ...RECEIVING_STATS].join(", receivingGameStats.")}`,
    QueryType: QueryType.RETURN,
    Requires: [{ Name: "receivingGameStats", AliasType: AliasType.WRGame }],
    Provides: [],
    Slots: [],
  },
  {
    English: "return receiving stats by season",
    Cypher: `RETURN receivingSeasonStats.${[...PLAYER_SEASON_INFO_PROPERTIES, ...RECEIVING_STATS].join(", receivingSeasonStats.")}`,
    QueryType: QueryType.RETURN,
    Requires: [{ Name: "receivingSeasonStats", AliasType: AliasType.WRSeason }],
    Provides: [],
    Slots: [],
  },
];

export const RECEIVING_STATS_CHUNKS: Chunk[] = [...FILTER_AND_AND_CHUNKS, ...RETURN_CHUNKS];
