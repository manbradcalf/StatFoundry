import { Chunk } from "./feature/Chunks/Chunk";
// TODO: Replace this hardcoded list of chunks
// with a dynamically generated list
// mapped from the result of GET /api/schema

// Sample chunks that represent the StatNug functionality
export function getAvailableChunks(): Chunk[] {
  return [
    // Starting chunks (no required inputs)
    {
      English: "Receivers who",
      Cypher: "MATCH (p:Player {position_group: 'WR'})",
      Outputs: ["p"],
      RequiredInputs: [],
      Inputs: [],
    },
    {
      English: "Players who",
      Cypher: "MATCH (p:Player)",
      Outputs: ["p"],
      RequiredInputs: [],
      Inputs: [],
    },
    {
      English: "Quarterbacks who",
      Cypher: "MATCH (p:Player {position: 'QB'})",
      Outputs: ["p"],
      RequiredInputs: [],
      Inputs: [],
    },

    // Game-related chunks (require player)
    {
      English: "caught at least {receptions} receptions in a game",
      Cypher: "WITH pg WHERE pg.receptions >= {receptions}",
      Outputs: ["pg"],
      RequiredInputs: ["pg"],
      Inputs: [],
      slotValues: { receptions: "5" },
    },
    {
      English: "had at least {yards} receiving yards in a game",
      Cypher: "WITH pg, WHERE pg.receiving_yards >= {yards} as ryig",
      Outputs: ["pg", "ryig"],
      RequiredInputs: ["pg"],
      Inputs: [],
      slotValues: { yards: "100" },
    },
    {
      English: "threw at least {touchdowns} passing touchdowns in a game",
      Cypher:
        "MATCH (p)-[:PLAYED_GAME]->(pg:PlayerGame) WHERE pg.passing_tds >= {touchdowns}",
      Outputs: ["p", "pg"],
      RequiredInputs: ["p"],
      Inputs: [],
      slotValues: { touchdowns: "2" },
    },
    {
      English: "had at least {yards} passing yards in a game",
      Cypher:
        "MATCH (p)-[:PLAYED_GAME]->(pg:PlayerGame) WHERE pg.passing_yards >= {yards}",
      Outputs: ["p", "pg"],
      RequiredInputs: ["p"],
      Inputs: [],
      slotValues: { yards: "300" },
    },
    {
      English: "lost",
      Cypher:
        "MATCH (p)-[:PLAYED_GAME]->(pg:PlayerGame)-[:PART_OF_GAME]->(g:Game) WHERE NOT EXISTS { MATCH (g) WHERE g.winner = pg.recent_team }",
      Outputs: ["p", "pg", "g"],
      RequiredInputs: ["p"],
      Inputs: [],
    },
    {
      English: "won",
      Cypher:
        "MATCH (p)-[:PLAYED_GAME]->(pg:PlayerGame)-[:PART_OF_GAME]->(g:Game) WHERE NOT EXISTS { MATCH (g) WHERE g.winner = pg.recent_team }",
      Outputs: ["p", "pg", "g"],
      RequiredInputs: ["pg"],
      Inputs: [],
    },

    // Time-based filters (require player games)
    {
      English: "in those games",
      Cypher: "RETURN p, pg",
      Outputs: ["p", "pg"],
      RequiredInputs: ["pg"],
      Inputs: [],
    },
    {
      English: "in that season",
      Cypher:
        "MATCH (pg)-[:PART_OF_GAME]->(g:Game)-[:DURING_WEEK]->(w:Week)-[:OF_NFL_SEASON]->(s:Season)",
      Outputs: ["p", "pg", "s"],
      RequiredInputs: ["pg"],
      Inputs: [],
    },
    {
      English: "in their career",
      Cypher: "MATCH (p)-[:PLAYED_SEASON]->(ps:PlayerSeason)",
      Outputs: ["p", "ps"],
      RequiredInputs: ["p"],
      Inputs: [],
    },

    // Additional filters that can be chained
    {
      English: "and had at least {receptions} receptions",
      Cypher: "WHERE pg.receptions >= {receptions}",
      Outputs: ["p", "pg"],
      RequiredInputs: ["pg"],
      Inputs: [],
      slotValues: { receptions: "5" },
    },
    {
      English: "and had at least {yards} receiving yards",
      Cypher: "WHERE pg.receiving_yards >= {yards}",
      Outputs: ["p", "pg"],
      RequiredInputs: ["pg"],
      Inputs: [],
      slotValues: { yards: "100" },
    },
    {
      English: "and caught at least {touchdowns} receiving touchdowns",
      Cypher: "WHERE pg.receiving_tds >= {touchdowns}",
      Outputs: ["p", "pg"],
      RequiredInputs: ["pg"],
      Inputs: [],
      slotValues: { touchdowns: "1" },
    },

    // Broadcast-related chunks (matching the UI examples)
    {
      English: "broadcast on NBC",
      Cypher:
        "MATCH (pg)-[:PART_OF_GAME]->(g:Game) WHERE g.broadcast_network = 'NBC'",
      Outputs: ["p", "pg", "g"],
      RequiredInputs: ["pg"],
      Inputs: [],
    },
    {
      English: "haven't won a game broadcast on NBC",
      Cypher:
        "MATCH (p)-[:PLAYED_GAME]->(pg:PlayerGame)-[:PART_OF_GAME]->(g:Game) WHERE g.broadcast_network = 'NBC' AND NOT EXISTS { MATCH (g) WHERE g.winner = pg.recent_team }",
      Outputs: ["p", "pg", "g"],
      RequiredInputs: ["p"],
      Inputs: [],
    },

    // Specific stat combinations
    {
      English: "and had at least 2 3rd down conversions",
      Cypher: "WHERE pg.receiving_first_downs >= 2",
      Outputs: ["p", "pg"],
      RequiredInputs: ["pg"],
      Inputs: [],
    },
    {
      English: "on NBC and had at least 2 3rd down conversions",
      Cypher:
        "MATCH (pg)-[:PART_OF_GAME]->(g:Game) WHERE g.broadcast_network = 'NBC' AND pg.receiving_first_downs >= 2",
      Outputs: ["p", "pg", "g"],
      RequiredInputs: ["pg"],
      Inputs: [],
    },

    // Draft-related chunks
    {
      English: "were drafted before year {year}",
      Cypher: "WHERE p.draft_year < {year}",
      Outputs: ["p"],
      RequiredInputs: ["p"],
      Inputs: [],
      slotValues: { year: "2020" },
    },
    {
      English:
        "were drafted in the {round} round between years {startYear} and {endYear}",
      Cypher:
        "WHERE p.draftround = {round} AND p.draft_year >= {startYear} AND p.draft_year <= {endYear}",
      Outputs: ["p"],
      RequiredInputs: ["p"],
      Inputs: [],
      slotValues: { round: "1", startYear: "2020", endYear: "2023" },
    },

    // Team and position filters
    {
      English: "played with {team}",
      Cypher: "WHERE p.recent_team = '{team}'",
      Outputs: ["p"],
      RequiredInputs: ["p"],
      Inputs: [],
      slotValues: { team: "BUF" },
    },
    {
      English: "who played a different position in college",
      Cypher: "WHERE p.position != p.college_position",
      Outputs: ["p"],
      RequiredInputs: ["p"],
      Inputs: [],
    },
  ];
}
