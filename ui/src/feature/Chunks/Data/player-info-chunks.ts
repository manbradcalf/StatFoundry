import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { Label } from "../Enums/Label";
import { SlotType } from "../Enums/SlotType";
import { PLAYER_INFO_PROPERTIES } from "../Views/PlayerInfo";

export const PLAYER_INFO_CHUNKS: Chunk[] = [
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
    English: "who have played at least [number] games for [team]",
    Cypher: "",
    EnglishTemplate: "who have played {num} games for {team}",
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
  {
    English: "who went to [college]",
    Cypher: "",
    EnglishTemplate: "who went to {college}",
    CypherTemplate: "MATCH (p) where p.college_name={college}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [{ Name: "p", Label: Label.Player }],
    Slots: [
      {
        Name: "college",
        Value: "Virginia Tech",
        SlotValueTypes: [SlotType.FilterValue],
      }
    ],
  }
];
