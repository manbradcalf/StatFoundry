import { ChunkChain, Chunk } from "./chunks";

// Example usage of buildQuery method
function demonstrateBuildQuery() {
  // Create a new chunk chain
  const chain = new ChunkChain();

  // Example chunk 1: Get player data
  const getPlayerChunk: Chunk = {
    English: "Get player Josh Allen",
    Cypher: "MATCH (p:Player {display_name: 'Josh Allen'}) RETURN p",
    Outputs: ["p"],
    RequiredInputs: [],
    Inputs: [],
    NextValidChunks: () => [],
  };

  // Example chunk 2: Get player's games (requires player from previous chunk)
  const getPlayerGamesChunk: Chunk = {
    English: "and get his games from 2023 season",
    Cypher: `MATCH (p)-[:PLAYED_GAME]->(pg:PlayerGame)-[:PART_OF_GAME]->(g:Game)-[:DURING_WEEK]->(w:Week)-[:OF_NFL_SEASON]->(s:Season {season_id: 2023})
RETURN pg, g`,
    Outputs: ["pg", "g"],
    RequiredInputs: ["p"],
    Inputs: ["p"],
    NextValidChunks: () => [],
  };

  // Example chunk 3: Filter games by passing touchdowns (requires player games)
  const filterByPassingTdsChunk: Chunk = {
    English: "where he threw more than 2 passing touchdowns",
    Cypher: "WHERE pg.passing_tds > 2",
    Outputs: ["pg", "g"],
    RequiredInputs: ["pg"],
    Inputs: ["pg", "g"],
    NextValidChunks: () => [],
  };

  // Add chunks to the chain
  chain.append(getPlayerChunk);
  chain.append(getPlayerGamesChunk);
  chain.append(filterByPassingTdsChunk);

  // Build the final query
  const result = chain.buildQuery();

  console.log("=== buildQuery() Example Output ===");
  console.log("\nEnglish Description:");
  console.log(result.English);

  console.log("\nGenerated Cypher Query:");
  console.log(result.Cypher);

  console.log("\nFinal Outputs:");
  console.log(result.Outputs);

  return result;
}

// Example with slot values (placeholders)
function demonstrateBuildQueryWithSlots() {
  const chain = new ChunkChain();

  // Chunk with placeholder values
  const getPlayerWithSlotChunk: Chunk = {
    English: "Get player {playerName}",
    Cypher: "MATCH (p:Player {display_name: '{playerName}'}) RETURN p",
    Outputs: ["p"],
    RequiredInputs: [],
    Inputs: [],
    NextValidChunks: () => [],
    slotValues: { playerName: "Patrick Mahomes" },
  };

  const getSeasonStatsChunk: Chunk = {
    English: "and get their {season} season stats",
    Cypher: `MATCH (p)-[:PLAYED_SEASON]->(ps:PlayerSeason)-[:OF_NFL_SEASON]->(s:Season {season_id: {season}})
RETURN ps`,
    Outputs: ["ps"],
    RequiredInputs: ["p"],
    Inputs: ["p"],
    NextValidChunks: () => [],
    slotValues: { season: "2023" },
  };

  chain.append(getPlayerWithSlotChunk);
  chain.append(getSeasonStatsChunk);

  // Fill slots before building query
  chain.fillSlots({
    0: { playerName: "Patrick Mahomes" },
    1: { season: "2023" },
  });

  const result = chain.buildQuery();

  console.log("\n=== buildQuery() with Slots Example ===");
  console.log("\nEnglish Description:");
  console.log(result.English);

  console.log("\nGenerated Cypher Query:");
  console.log(result.Cypher);

  console.log("\nFinal Outputs:");
  console.log(result.Outputs);

  return result;
}

// Example showing how WITH clauses are automatically added
function demonstrateWithClauses() {
  const chain = new ChunkChain();

  const chunk1: Chunk = {
    English: "Get all players",
    Cypher: "MATCH (p:Player) RETURN p",
    Outputs: ["p"],
    RequiredInputs: [],
    Inputs: [],
    NextValidChunks: () => [],
  };

  const chunk2: Chunk = {
    English: "and their games",
    Cypher: "MATCH (p)-[:PLAYED_GAME]->(pg:PlayerGame) RETURN pg",
    Outputs: ["pg"],
    RequiredInputs: ["p"],
    Inputs: ["p"], // This will trigger a WITH clause
    NextValidChunks: () => [],
  };

  const chunk3: Chunk = {
    English: "and filter by passing yards > 300",
    Cypher: "WHERE pg.passing_yards > 300",
    Outputs: ["pg"],
    RequiredInputs: ["pg"],
    Inputs: ["pg"], // This will also trigger a WITH clause
    NextValidChunks: () => [],
  };

  chain.append(chunk1);
  chain.append(chunk2);
  chain.append(chunk3);

  const result = chain.buildQuery();

  console.log("\n=== buildQuery() WITH Clauses Example ===");
  console.log("\nGenerated Cypher Query:");
  console.log(result.Cypher);

  return result;
}

// Run examples
export function runBuildQueryExamples() {
  console.log("Running buildQuery() examples...\n");

  const example1 = demonstrateBuildQuery();
  const example2 = demonstrateBuildQueryWithSlots();
  const example3 = demonstrateWithClauses();

  return { example1, example2, example3 };
}

// Example of expected outputs:
/*
=== buildQuery() Example Output ===

English Description:
Get player Josh Allen and get his games from 2023 season where he threw more than 2 passing touchdowns

Generated Cypher Query:
MATCH (p:Player {display_name: 'Josh Allen'}) RETURN p
WITH p
MATCH (p)-[:PLAYED_GAME]->(pg:PlayerGame)-[:PART_OF_GAME]->(g:Game)-[:DURING_WEEK]->(w:Week)-[:OF_NFL_SEASON]->(s:Season {season_id: 2023})
RETURN pg, g
WITH pg, g
WHERE pg.passing_tds > 2

Final Outputs:
["p", "pg", "g"]

=== buildQuery() with Slots Example ===

English Description:
Get player Patrick Mahomes and get their 2023 season stats

Generated Cypher Query:
MATCH (p:Player {display_name: 'Patrick Mahomes'}) RETURN p
WITH p
MATCH (p)-[:PLAYED_SEASON]->(ps:PlayerSeason)-[:OF_NFL_SEASON]->(s:Season {season_id: 2023})
RETURN ps

Final Outputs:
["p", "ps"]

=== buildQuery() WITH Clauses Example ===

Generated Cypher Query:
MATCH (p:Player) RETURN p
WITH p
MATCH (p)-[:PLAYED_GAME]->(pg:PlayerGame) RETURN pg
WITH pg
WHERE pg.passing_yards > 300
*/
