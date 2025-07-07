
import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { Label } from "../Enums/Label";
import { PASSING_STATS } from "../Views/PassingStats";
import { RECEIVING_STATS } from "../Views/ReceivingStats";
import { PLAYER_SEASON_INFO_PROPERTIES } from "../Views/PlayerSeasonInfo";
import { RUSHING_STATS } from "../Views/RushingStats";

export const RETURN_CHUNKS: Chunk[] = [
  // {
  //   English: "return player rushing stats by season",
  //   Cypher: `RETURN ps.${[...PLAYER_SEASON_INFO_PROPERTIES, ...RUSHING_STATS].join(", ps.")} LIMIT 10`,
  //   QueryType: QueryType.RETURN,
  //   Inputs: [{ Name: "ps", Label: Label.PlayerSeason }],
  //   Outputs: [],
  //   Slots: [],
  // },
  // {
  //   English: "return player receiving stats by season",
  //   Cypher: `RETURN ps.${[...PLAYER_SEASON_INFO_PROPERTIES, ...RECEIVING_STATS].join(", ps.")} LIMIT 10`,
  //   QueryType: QueryType.RETURN,
  //   Inputs: [{ Name: "ps", Label: Label.PlayerSeason }],
  //   Outputs: [],
  //   Slots: [],
  // },
  // {
  //   English: "return player rushing and receiving stats by season",
  //   Cypher: `RETURN ps.${[...PLAYER_SEASON_INFO_PROPERTIES, ...RUSHING_STATS, ...RECEIVING_STATS].join(", ps.")} LIMIT 10`,
  //   QueryType: QueryType.RETURN,
  //   Inputs: [{ Name: "ps", Label: Label.PlayerSeason }],
  //   Outputs: [],
  //   Slots: [],
  // },
  // {
  //   English: "return player passing stats by game",
  //   Cypher: `RETURN pg.${[...PLAYER_SEASON_INFO_PROPERTIES, ...PASSING_STATS].join(", pg.")} LIMIT 10`,
  //   QueryType: QueryType.RETURN,
  //   Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
  //   Outputs: [],
  //   Slots: [],
  // },
  // {
  //   English: "return player passing stats by season",
  //   Cypher: `RETURN ps.${[...PLAYER_SEASON_INFO_PROPERTIES, ...PASSING_STATS].join(", ps.")} LIMIT 10`,
  //   QueryType: QueryType.RETURN,
  //   Inputs: [{ Name: "ps", Label: Label.PlayerSeason }],
  //   Outputs: [],
  //   Slots: [],
  // },
];
