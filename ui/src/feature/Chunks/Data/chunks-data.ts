import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { Label } from "../Enums/Label";
import { PLAYER_GAME_INFO_PROPERTIES } from "../Views/PlayerGameInfo";
import { PASSING_STATS } from "../Views/PassingStats";
import { RECEIVING_STATS } from "../Views/ReceivingStats";
import { PLAYER_SEASON_INFO_PROPERTIES } from "../Views/PlayerSeasonInfo";
import { RUSHING_STATS } from "../Views/RushingStats";
import { PLAYER_INFO_CHUNKS } from "./player-info-chunks";
import { PLAYER_GAME_CHUNKS } from "./playergame-chunks";
import { PASSING_STATS_CHUNKS } from "./passing-stats-chunks";
import { RECEIVING_STATS_CHUNKS } from "./receiving-stats-chunks";
import { RUSHING_STATS_CHUNKS } from "./rushing-stats-chunks";
import { MATCH_ENTITY_CHUNKS } from "./match-entity-chunks";
import { PLAYER_INFO_PROPERTIES } from "../Views/PlayerInfo";

export function getAvailableChunks(): Chunk[] {
  return [
    ...MATCH_ENTITY_CHUNKS,
    ...PLAYER_INFO_CHUNKS,
    ...PLAYER_GAME_CHUNKS,
    ...PASSING_STATS_CHUNKS,
    ...RECEIVING_STATS_CHUNKS,
    ...RUSHING_STATS_CHUNKS,
    {
      English: "return player season rushing stats",
      Cypher: `RETURN ps.${[...PLAYER_SEASON_INFO_PROPERTIES, ...RUSHING_STATS].join(", ps.")} LIMIT 10`,
      QueryType: QueryType.RETURN,
      Inputs: [{ Name: "ps", Label: Label.PlayerSeason }],
      Outputs: [],
      Slots: [],
    },
    {
      English: "return player season receiving stats",
      Cypher: `RETURN ps.${[...PLAYER_SEASON_INFO_PROPERTIES, ...RECEIVING_STATS].join(", ps.")} LIMIT 10`,
      QueryType: QueryType.RETURN,
      Inputs: [{ Name: "ps", Label: Label.PlayerSeason }],
      Outputs: [],
      Slots: [],
    },
    {
      English: "return player season rushing and receiving stats",
      Cypher: `RETURN ps.${[...PLAYER_SEASON_INFO_PROPERTIES, ...RUSHING_STATS, ...RECEIVING_STATS].join(", ps.")} LIMIT 10`,
      QueryType: QueryType.RETURN,
      Inputs: [{ Name: "ps", Label: Label.PlayerSeason }],
      Outputs: [],
      Slots: [],
    },
    {
      English: "return player season passing stats",
      Cypher: `RETURN ps.${[...PLAYER_SEASON_INFO_PROPERTIES, ...PASSING_STATS].join(", ps.")} LIMIT 10`,
      QueryType: QueryType.RETURN,
      Inputs: [{ Name: "ps", Label: Label.PlayerSeason }],
      Outputs: [],
      Slots: [],
    },
  ];
}
