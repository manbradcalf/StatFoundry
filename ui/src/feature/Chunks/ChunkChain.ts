import { Chunk } from "./Types/Chunk";
import { ChunkNode } from "./Types/IChunkNode";
import { Alias } from "./Types/Alias";
import { QueryType } from "./Enums/QueryType";

/**
 * Linked-list chain manager for chunks.
 */
export class ChunkChain {
  Head: ChunkNode | null = null;
  Tail: ChunkNode | null = null;
  Aliases: Alias[] = [];
  English: string = "";
  Cypher: string = "";

  /**
   * Add a chunk to the end of the chain.
   * @param chunk The chunk to add.
   */
  append(chunk: Chunk): ChunkNode {
    const node: ChunkNode = { chunk, prev: this.Tail, next: null };
    if (!this.Head) {
      this.Head = node;
    }
    if (this.Tail) {
      this.Tail.next = node;
    }
    this.Tail = node;

    // add the outputs of the chunk to our chain's aliases
    this.Aliases.push(...chunk.Outputs);
    // dedup by alias name
    this.Aliases = this.Aliases.filter(
      (alias, index, self) =>
        index === self.findIndex((t) => t.Name === alias.Name)
    );
    console.log("chunkchain", this.toArray());
    return node;
  }

  /**
   * Remove the last chunk from the chain.
   * todo: figure out how to remove the chunk when the user deletes the english description
   */
  pop(): ChunkNode | null {
    if (!this.Tail) return null;
    const removed = this.Tail;
    this.Tail = removed.prev;
    if (this.Tail) this.Tail.next = null;
    if (removed === this.Head) this.Head = null;
    return removed;
  }

  /**
   * Get all chunks as an array (for UI, debugging, etc).
   */
  toArray(): Chunk[] {
    const arr: Chunk[] = [];
    let node = this.Head;
    while (node) {
      arr.push(node.chunk);
      node = node.next;
    }
    return arr;
  }

  /**
   * Traverse the chain and build the full Cypher and English description.
   */
  update(): ChunkChain {
    let englishParts: string[] = [];
    let cypherParts: string[] = [];
    let aliases: Alias[] = [];

    let node = this.Head;

    while (node) {
      const { chunk } = node;
      // add the chunk's english and cypher to the parts
      englishParts.push(chunk.English);
      cypherParts.push(chunk.Cypher.trim());

      // add the chunk's aliases to the aliases
      aliases.push(...chunk.Outputs);

      node = node.next;
    }

    this.Cypher = cypherParts.join(" WITH * \n");
    return this;
  }

  /**
   * Get the next valid chunks for the current chunk.
   * @returns The next valid chunks.
   */
  getNextValidChunksFromChunks(chunks: Chunk[]): Chunk[] {
    const nextValidChunks: Chunk[] = [];
    const currentAliases = this.Aliases;

    for (const chunk of chunks) {
      if (isValidNextChunk(chunk, currentAliases)) {
        nextValidChunks.push(chunk);
      }
    }

    return nextValidChunks;
  }
}

function isValidNextChunk(chunk: Chunk, currentAliases: Alias[]): boolean {
  // filter out invalid query types before we check if we have enough of each type
  if (
    chunk.Inputs.length === 0 &&
    (chunk.QueryType === QueryType.RETURN ||
      chunk.QueryType === QueryType.FILTER)
  ) {
    return false;
  }

  // Count how many of each entity type we need vs have
  const needed = chunk.Inputs.reduce(
    (acc, alias) => {
      acc[alias.Label] = (acc[alias.Label] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const available = currentAliases.reduce(
    (acc, alias) => {
      acc[alias.Label] = (acc[alias.Label] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Check if we have enough of each type
  return Object.entries(needed).every(
    ([label, count]) => (available[label] || 0) >= count
  );
}
