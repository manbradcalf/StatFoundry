import { Chunk } from "../feature/Chunks/Chunk";
import { Entity } from "../feature/Chunks/EntityTypes/Entity";

export interface Suggestion {
  chunk: Chunk<Entity>;
}
