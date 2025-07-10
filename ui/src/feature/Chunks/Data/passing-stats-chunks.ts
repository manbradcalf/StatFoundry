import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";
import { SlotType } from "../Enums/SlotType";
import { PLAYER_GAME_INFO_PROPERTIES } from "../Views/PlayerGameInfo";
import { PASSING_STATS } from "../Views/PassingStats";
import { PLAYER_SEASON_INFO_PROPERTIES } from "../Views/PlayerSeasonInfo";

// Dynamically generate filter & AND chunks for each passing stat (Season & Game levels)
const FILTER_AND_AND_CHUNKS: Chunk[] = PASSING_STATS.flatMap((statKey) => {
  const baseSlots = [
    {
      Name: "stat",
      Value: statKey,
      SlotValueTypes: [SlotType.SelectPassingStats],
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
      `CALL (p) { MATCH (p)-[:HAD]->(ps:PlayerSeason) WHERE ps.{stat} {condition} {value} RETURN ps as passingSeasonStats }`,
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [{ Name: "passingSeasonStats", AliasType: AliasType.QBSeason }],
    Slots: baseSlots,
  };

  const seasonAnd: Chunk = {
    English: "and ...",
    Cypher: "",
    EnglishTemplate: `and who had {condition} {value} {stat} in that Season`,
    CypherTemplate:
      `MATCH (passingSeasonStats) WHERE passingSeasonStats.{stat} {condition} {value}`,
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "passingSeasonStats", AliasType: AliasType.QBSeason }],
    Provides: [{ Name: "passingSeasonStats", AliasType: AliasType.QBSeason }],
    Slots: baseSlots,
  };

  const gameFilter: Chunk = {
    English: `who had [${statKey}] in a Game`,
    Cypher: "",
    EnglishTemplate: `who had {condition} {value} {stat} in a Game`,
    CypherTemplate:
      `CALL (p) { MATCH (p)-[:HAD]->(pg:PlayerGame) WHERE pg.{stat} {condition} {value} RETURN pg as passingGameStats }`,
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [{ Name: "passingGameStats", AliasType: AliasType.QBGame }],
    Slots: baseSlots,
  };

  const gameAnd: Chunk = {
    English: "and ...",
    Cypher: "",
    EnglishTemplate: `and who had {condition} {value} {stat} in that Game`,
    CypherTemplate:
      `MATCH (passingGameStats) WHERE passingGameStats.{stat} {condition} {value}`,
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "passingGameStats", AliasType: AliasType.QBGame }],
    Provides: [{ Name: "passingGameStats", AliasType: AliasType.QBGame }],
    Slots: baseSlots,
  };

  return [seasonFilter, seasonAnd, gameFilter, gameAnd];
});

// Return chunks for convenience (game & season)
const RETURN_CHUNKS: Chunk[] = [
  {
    English: "return passing stats by game",
    Cypher: `RETURN passingGameStats.${[...PLAYER_GAME_INFO_PROPERTIES, ...PASSING_STATS].join(", passingGameStats.")}`,
    QueryType: QueryType.RETURN,
    Requires: [{ Name: "passingGameStats", AliasType: AliasType.QBGame }],
    Provides: [],
    Slots: [],
  },
  {
    English: "return passing stats by season",
    Cypher: `RETURN passingSeasonStats.${[...PLAYER_SEASON_INFO_PROPERTIES, ...PASSING_STATS].join(", passingSeasonStats.")}`,
    QueryType: QueryType.RETURN,
    Requires: [{ Name: "passingSeasonStats", AliasType: AliasType.QBSeason }],
    Provides: [],
    Slots: [],
  },
];

export const PASSING_STATS_CHUNKS: Chunk[] = [...FILTER_AND_AND_CHUNKS, ...RETURN_CHUNKS];
