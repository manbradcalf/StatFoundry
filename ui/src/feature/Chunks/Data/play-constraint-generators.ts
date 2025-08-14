import { AliasType } from "../Enums/AliasType";
import { QueryType } from "../Enums/QueryType";
import { SlotType } from "../Enums/SlotType";
import { Chunk } from "../Types/Chunk";
import { ConstraintDefinition } from "./constraints/constraint";

// JUNCTION chunks for Play-to-Game relationships
export const PLAY_JUNCTION_CHUNKS: Chunk[] = [
  {
    English: "of all Games",
    Cypher: "MATCH (play)-[:OF]->(g:Game)",
    QueryType: QueryType.JUNCTION,
    Requires: [{ Name: "play", AliasType: AliasType.Play }],
    Provides: [
      { Name: "g", AliasType: AliasType.Game },
      { Name: "play", AliasType: AliasType.Play },
    ],
    Slots: [],
    SuggestionKeywords: ["games", "all games"],
  },
  {
    English: "of Season 2024",
    EnglishTemplate: "of Season {season}",
    Cypher: "MATCH (play)-[:OF]->(g:Game) WHERE g.season = 2024",
    CypherTemplate: "MATCH (play)-[:OF]->(g:Game) WHERE g.season = {season}",
    QueryType: QueryType.JUNCTION,
    Requires: [{ Name: "play", AliasType: AliasType.Play }],
    Provides: [
      { Name: "g", AliasType: AliasType.Game },
      { Name: "play", AliasType: AliasType.Play },
    ],
    Slots: [
      { Name: "season", Value: "2024", SlotValueTypes: [SlotType.FilterValue] },
    ],
    SuggestionKeywords: ["season", "year"],
  },
  {
    English: "between Seasons 2023 and 2024",
    EnglishTemplate: "between Seasons {startSeason} and {endSeason}",
    Cypher:
      "MATCH (play)-[:OF]->(g:Game) WHERE g.season >= 2023 AND g.season <= 2024",
    CypherTemplate:
      "MATCH (play)-[:OF]->(g:Game) WHERE g.season >= {startSeason} AND g.season <= {endSeason}",
    QueryType: QueryType.JUNCTION,
    Requires: [{ Name: "play", AliasType: AliasType.Play }],
    Provides: [
      { Name: "g", AliasType: AliasType.Game },
      { Name: "play", AliasType: AliasType.Play },
    ],
    Slots: [
      {
        Name: "startSeason",
        Value: "2023",
        SlotValueTypes: [SlotType.FilterValue],
      },
      {
        Name: "endSeason",
        Value: "2024",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
    SuggestionKeywords: ["between seasons", "season range"],
  },
  {
    English: "of all Games during 2024 Regular Season",
    EnglishTemplate: "of all Games during {season} Regular Season",
    Cypher:
      "MATCH (play)-[:OF]->(g:Game) WHERE g.season = 2024 AND g.season_type = 'REG'",
    CypherTemplate:
      "MATCH (play)-[:OF]->(g:Game) WHERE g.season = {season} AND g.season_type = 'REG'",
    QueryType: QueryType.JUNCTION,
    Requires: [{ Name: "play", AliasType: AliasType.Play }],
    Provides: [
      { Name: "g", AliasType: AliasType.Game },
      { Name: "play", AliasType: AliasType.Play },
    ],
    Slots: [
      { Name: "season", Value: "2024", SlotValueTypes: [SlotType.FilterValue] },
    ],
    SuggestionKeywords: ["regular season", "reg season"],
  },
  {
    English: "of all Games during 2024 Post Season",
    EnglishTemplate: "of all Games during {season} Post Season",
    Cypher:
      "MATCH (play)-[:OF]->(g:Game) WHERE g.season = 2024 AND g.season_type = 'POST'",
    CypherTemplate:
      "MATCH (play)-[:OF]->(g:Game) WHERE g.season = {season} AND g.season_type = 'POST'",
    QueryType: QueryType.JUNCTION,
    Requires: [{ Name: "play", AliasType: AliasType.Play }],
    Provides: [
      { Name: "g", AliasType: AliasType.Game },
      { Name: "play", AliasType: AliasType.Play },
    ],
    Slots: [
      { Name: "season", Value: "2024", SlotValueTypes: [SlotType.FilterValue] },
    ],
    SuggestionKeywords: ["post season", "playoffs", "postseason"],
  },
  {
    English: "of all Games during 2024",
    EnglishTemplate: "of all Games during {season}",
    Cypher: "MATCH (play)-[:OF]->(g:Game) WHERE g.season = 2024",
    CypherTemplate: "MATCH (play)-[:OF]->(g:Game) WHERE g.season = {season}",
    QueryType: QueryType.JUNCTION,
    Requires: [{ Name: "play", AliasType: AliasType.Play }],
    Provides: [
      { Name: "g", AliasType: AliasType.Game },
      { Name: "play", AliasType: AliasType.Play },
    ],
    Slots: [
      { Name: "season", Value: "2024", SlotValueTypes: [SlotType.FilterValue] },
    ],
    SuggestionKeywords: ["during season", "season"],
  },
  {
    English: "of all Games during Week 2",
    EnglishTemplate: "of all Games during Week {week}",
    Cypher: "MATCH (play)-[:OF]->(g:Game) WHERE g.week = 2",
    CypherTemplate: "MATCH (play)-[:OF]->(g:Game) WHERE g.week = {week}",
    QueryType: QueryType.JUNCTION,
    Requires: [{ Name: "play", AliasType: AliasType.Play }],
    Provides: [
      { Name: "g", AliasType: AliasType.Game },
      { Name: "play", AliasType: AliasType.Play },
    ],
    Slots: [{ Name: "week", Value: 2, SlotValueTypes: [SlotType.FilterValue] }],
    SuggestionKeywords: ["week", "during week"],
  },
  {
    English: "of all Games between Weeks 2 and 7",
    EnglishTemplate: "of all Games between Weeks {startWeek} and {endWeek}",
    Cypher: "MATCH (play)-[:OF]->(g:Game) WHERE g.week >= 2 AND g.week <= 7",
    CypherTemplate:
      "MATCH (play)-[:OF]->(g:Game) WHERE g.week >= {startWeek} AND g.week <= {endWeek}",
    QueryType: QueryType.JUNCTION,
    Requires: [{ Name: "play", AliasType: AliasType.Play }],
    Provides: [
      { Name: "g", AliasType: AliasType.Game },
      { Name: "play", AliasType: AliasType.Play },
    ],
    Slots: [
      { Name: "startWeek", Value: 2, SlotValueTypes: [SlotType.FilterValue] },
      { Name: "endWeek", Value: 7, SlotValueTypes: [SlotType.FilterValue] },
    ],
    SuggestionKeywords: ["between weeks", "week range"],
  },
];

export const PLAY_CONSTRAINTS: ConstraintDefinition[] = [
  {
    english: "on [1] down",
    englishTemplate: "on down {down} ",
    cypherTemplate: "MATCH (play:Play) WHERE play.down = {down}",
    queryType: QueryType.FILTER_START,
    slots: [{ name: "down", defaultValue: 1, slotType: SlotType.FilterValue }],
    keywords: ["first", "first", "down", "1st"],
  },
];

export const PLAY_CONSTRAINT_EXTENSIONS: ConstraintDefinition[] = [
  {
    english: "while [team] on Offense",
    englishTemplate: "while {team} on Offense",
    cypherTemplate: "AND play.posteam = {team}",
    queryType: QueryType.FILTER_EXTEND,
    slots: [
      { name: "posteam", defaultValue: "MIN", slotType: SlotType.FilterValue },
    ],
    keywords: ["games", "game"],
  },
  {
    english: "while [team] on Defense",
    englishTemplate: "while {team} on Offense",
    cypherTemplate: "AND play.posteam = {team}",
    queryType: QueryType.FILTER_EXTEND,
    slots: [
      { name: "defteam", defaultValue: "MIN", slotType: SlotType.FilterValue },
    ],
    keywords: ["games", "game"],
  },
  {
    english: "during the [2024] season",
    englishTemplate: "during the {season} season",
    cypherTemplate:
      "MATCH (play:Play)-[:OF]->(g:Game) WHERE g.season = {season}",
    queryType: QueryType.FILTER_EXTEND,
    slots: [
      { name: "season", defaultValue: 2024, slotType: SlotType.FilterValue },
    ],
    keywords: ["plays", "play", "during", "season"],
  },
  {
    english: "in games between [2020] and [2024]",
    englishTemplate:
      "in games between the {seasonStart} and {seasonEnd} seasons",
    cypherTemplate:
      "AND pg.season >= {seasonStart} AND pg.season <= {seasonEnd}",
    queryType: QueryType.FILTER_EXTEND,
    slots: [
      {
        name: "seasonStart",
        defaultValue: 2020,
        slotType: SlotType.FilterValue,
      },
      { name: "seasonEnd", defaultValue: 2024, slotType: SlotType.FilterValue },
    ],
    keywords: ["games", "game", "between"],
  },
];

export const PLAY_BOOLEAN_CONSTRAINTS = [
  {
    english: "and scored a touchdown",
    cypher: "AND play.touchdown = true",
    keywords: ["scored", "touchdown", "td"],
  },
];

export function generatePlayConstraintChunks(): Chunk[] {
  const chunks: Chunk[] = [];

  // Add JUNCTION chunks first
  chunks.push(...PLAY_JUNCTION_CHUNKS);
  // Generate FILTER_START chunks
  for (const constraint of PLAY_CONSTRAINTS) {
    chunks.push({
      English: constraint.english,
      Cypher: "",
      EnglishTemplate: constraint.englishTemplate,
      CypherTemplate: constraint.cypherTemplate,
      QueryType: constraint.queryType,
      Requires: [{ Name: "play", AliasType: AliasType.Play }],
      Provides: [{ Name: "play", AliasType: AliasType.Play }],
      Slots: constraint.slots.map((slot) => ({
        Name: slot.name,
        Value: slot.defaultValue,
        SlotValueTypes: [slot.slotType],
      })),
      SuggestionKeywords: constraint.keywords,
    });
  }
  // Generate FILTER_EXTEND chunks
  for (const extension of PLAY_CONSTRAINT_EXTENSIONS) {
    chunks.push({
      English: extension.english,
      Cypher: "",
      EnglishTemplate: extension.englishTemplate,
      CypherTemplate: extension.cypherTemplate,
      QueryType: extension.queryType,
      Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
      Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
      Slots: extension.slots.map((slot) => ({
        Name: slot.name,
        Value: slot.defaultValue,
        SlotValueTypes: [slot.slotType],
      })),
      SuggestionKeywords: extension.keywords,
    });
  }

  // Generate boolean constraint chunks
  for (const constraint of PLAY_BOOLEAN_CONSTRAINTS) {
    chunks.push({
      English: constraint.english,
      Cypher: constraint.cypher,
      QueryType: QueryType.FILTER_EXTEND,
      Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
      Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
      Slots: [],
      SuggestionKeywords: constraint.keywords,
    });
  }
  return chunks;
}
