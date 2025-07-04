import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { Label } from "../Enums/Label";
import { SlotType } from "../Enums/SlotType";
import { PLAYER_INFO_PROPERTIES } from "../Views/PlayerInfo";

export const PLAYER_INFO_CHUNKS: Chunk[] = [
  {
    English: "return player info",
    Cypher: `RETURN p.${[...PLAYER_INFO_PROPERTIES].join(", p.")} LIMIT 10`,
    QueryType: QueryType.RETURN,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [],
    Slots: [],
  },
  {
    English: "with [name]",
    Cypher: "",
    EnglishTemplate: "named {name}",
    CypherTemplate: "WHERE p.display_name = {name}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [{ Name: "p", Label: Label.Player }],
    Slots: [
      {
        Name: "name",
        Value: "John Doe",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "currently on [team]",
    Cypher: "",
    EnglishTemplate: "currently on {team}",
    CypherTemplate: "WHERE p.team_abbr = {team} AND p.status='ACT'",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [{ Name: "p", Label: Label.Player }],
    Slots: [
      {
        Name: "team",
        Value: "SEA",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "who have played at least [number] for [team]",
    Cypher: "",
    EnglishTemplate: "who have played {num} for {team}",
    CypherTemplate: "MATCH (p)-[:HAD]->(pg:PlayerGame) WHERE pg.recent_team = {team} WITH p, collect(pg) as games WHERE size(games) >= {num} UNWIND games as pg",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [{ Name: "p", Label: Label.Player }, { Name: "pg", Label: Label.PlayerGame }],
    Slots: [
      {
        Name: "num",
        Value: 10,
        SlotValueTypes: [SlotType.FilterValue],
      },
      {
        Name: "team",
        Value: "SEA",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
];
