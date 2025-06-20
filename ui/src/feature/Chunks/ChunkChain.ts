import { Chunk } from "./Chunk";
import { Entity } from "./EntityTypes/Entity";
import { ChunkNode } from "./IChunkNode";
import { QueryType } from "./QueryType";

export type ChunkChainState = {
  head: ChunkNode | null;
  tail: ChunkNode | null;
  aliases: Alias[];
  english: string;
  cypher: string;
};

type Alias = {
  name: string;
  entity: Entity;
};

/**
 * Linked-list chain manager for chunks.
 */
export class ChunkChain {
  head: ChunkNode | null = null;
  tail: ChunkNode | null = null;
  aliases: Alias[] = [];

  /**
   * Add a chunk to the end of the chain.
   * @param chunk The chunk to add.
   */
  append(chunk: Chunk<Entity>): ChunkNode {
    const node: ChunkNode = { chunk, prev: this.tail, next: null };
    if (!this.head) {
      this.head = node;
    }
    if (this.tail) {
      this.tail.next = node;
    }
    this.tail = node;

    // add aliases to be available for use in WITH cypher clauses
    // remove duplicates if they exits
    this.aliases = [
      ...this.aliases,
      ...Object.entries(chunk.Slots).map(([key, value]) => ({
        name: key, // what the user typed in the slot + default alias name like p, pg, etc
        entity: value as Entity,
      })),
    ];
    console.log(this.aliases);

    return node;
  }

  /**
   * Remove the last chunk from the chain.
   * todo: figure out how to remove the chunk when the user deletes the english description
   */
  pop(): ChunkNode | null {
    if (!this.tail) return null;
    const removed = this.tail;
    this.tail = removed.prev;
    if (this.tail) this.tail.next = null;
    if (removed === this.head) this.head = null;
    return removed;
  }

  /**
   * Get all chunks as an array (for UI, debugging, etc).
   */
  toArray(): Chunk<Entity>[] {
    const arr: Chunk<Entity>[] = [];
    let node = this.head;
    while (node) {
      arr.push(node.chunk);
      node = node.next;
    }
    return arr;
  }

  /**
   * Traverse the chain and build the full Cypher and English description.
   */
  update(): ChunkChainState {
    let englishParts: string[] = [];
    let cypherParts: string[] = [];

    let node = this.head;

    while (node) {
      const { chunk } = node;
      // add the chunk's english and cypher to the parts
      englishParts.push(chunk.English);
      cypherParts.push(chunk.Cypher.trim());

      node = node.next;
    }

    return {
      head: this.head,
      tail: this.tail,
      aliases: this.aliases,
      english: englishParts.join(" and "),
      cypher: cypherParts.join(" AND "),
    };
  }

  /**
   * Get the next valid chunks for the current chunk.
   * @returns The next valid chunks.
   */
  getNextValidChunksFromChunks(chunks: Chunk<Entity>[]): Chunk<Entity>[] {
    const nextValidChunks: Chunk<Entity>[] = [];
    const currentAliases = this.aliases;

    for (const chunk of chunks) {
      if (isValidNextChunk(chunk, currentAliases)) {
        nextValidChunks.push(chunk);
      }
    }

    return nextValidChunks;
  }
}

function isValidNextChunk(
  chunk: Chunk<Entity>,
  currentAliases: Alias[]
): boolean {
  var inputsAreSatisfied = chunk.RequiredInputs.every((input) =>
    currentAliases.some((alias) => typeof alias.entity === typeof input)
  );

  var queryTypeIsMatch = true;
  if (
    chunk.QueryType === QueryType.RETURN ||
    chunk.QueryType === QueryType.FILTER
  ) {
    if (currentAliases.length === 0) {
      queryTypeIsMatch = false;
    }
  }
  return inputsAreSatisfied && queryTypeIsMatch;
}

// TODO: Replace Slot Values in Cypher and English
