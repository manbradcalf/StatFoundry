import { Chunk } from "./feature/Chunks/Chunk";
import { Entity } from "./feature/Chunks/EntityTypes/Entity";
import { LabelNames } from "./feature/Chunks/EntityTypes/LabelsEnum";
import { Player } from "./feature/Chunks/EntityTypes/Player";
import { QueryType } from "./feature/Chunks/QueryType";
// TODO: Replace this hardcoded list of chunks
// with a dynamically generated list
// mapped from the result of GET /api/schema

// Sample chunks that represent the StatNug functionality
export function getAvailableChunks(): Chunk<Entity>[] {
  return [
    {
      English: "Get all players",
      Cypher: "MATCH (p:Player) RETURN p",
      QueryType: QueryType.RETURN,
      RequiredInputs: [],
      Slots: {},
    },
    {
      English: "Get all players with a certain position",
      Cypher: "MATCH (p:Player) WHERE p.position = $position RETURN p",
      QueryType: QueryType.FILTER,
      RequiredInputs: [LabelNames.Player],
      Slots: {
        position: "RB",
      },
    },
    {
      English:
        "Get all players who played in a game between {season1} and {season2}",
      Cypher:
        "MATCH (p:Player) WHERE p.season >= $season1 AND p.season <= $season2 RETURN p",
      QueryType: QueryType.FILTER,
      RequiredInputs: [LabelNames.Player],
      Slots: {
        season1: 2024,
        season2: 2025,
      },
    },
  ];
}
