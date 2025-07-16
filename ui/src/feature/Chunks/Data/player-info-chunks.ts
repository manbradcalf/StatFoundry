import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";
import { SlotType } from "../Enums/SlotType";

export const PLAYER_INFO_CHUNKS: Chunk[] = [
  {
    English: "Player named [name]",
    Cypher: "",
    EnglishTemplate: "Player named {name}",
    CypherTemplate: "MATCH (p:Player {display_name: {name} })",
    QueryType: QueryType.MATCH_START,
    Requires: [],
    Provides: [{ Name: "p", AliasType: AliasType.Player }],
    Slots: [
      {
        Name: "name",
        Value: "John Doe",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
    SuggestionKeywords: ["name"]
  },
  {
    English: "currently on [team]",
    Cypher: "",
    EnglishTemplate: "currently on {team}",
    CypherTemplate: "WITH p MATCH (p) WHERE p.team_abbr = {team} AND p.status='ACT'",
    QueryType: QueryType.FILTER_START,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [{ Name: "p", AliasType: AliasType.Player }],
    Slots: [
      {
        Name: "team",
        Value: "SEA",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
    SuggestionKeywords: ["team"]
  },
  {
    English: "who have played at least [number] games for [team]",
    Cypher: "",
    EnglishTemplate: "who have played {num} games for {team}",
    CypherTemplate: `
    CALL (p) { 
      MATCH (p)-[:HAD]->(pg:PlayerGame) 
      WHERE pg.recent_team = {team} 
      WITH p, collect(pg) as games 
      WHERE size(games) >= {num}
      RETURN p as playerWhoPlayedAtLeastGamesForTeam
      }
      WITH *, playerWhoPlayedAtLeastGamesForTeam as p`,

    QueryType: QueryType.FILTER_START,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [{ Name: "p", AliasType: AliasType.Player }],
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
    SuggestionKeywords: ["team"]
  },
  {
    English: "who went to [college]",
    Cypher: "",
    EnglishTemplate: "who went to {college}",
    CypherTemplate: "MATCH (p) where p.college_name={college} WITH p",
    QueryType: QueryType.FILTER_START,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [{ Name: "p", AliasType: AliasType.Player }],
    Slots: [
      {
        Name: "college",
        Value: "Virginia Tech",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
    SuggestionKeywords: ["college", "school"]
  },
];
