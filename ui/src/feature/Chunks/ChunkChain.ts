import { Chunk } from "./Chunk";
import { ChunkNode } from "./IChunkNode";
import { QueryType } from "./QueryType";

/**
 * Linked-list chain manager for chunks.
 */
export class ChunkChain {
  head: ChunkNode | null = null;
  tail: ChunkNode | null = null;
  // this is where the magic happens
  aliases: Record<string, any> = {};

  /**
   * Add a chunk to the end of the chain.
   * @param chunk The chunk to add.
   */
  append(chunk: Chunk): ChunkNode {
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
    this.aliases = { ...this.aliases, ...chunk.SlotValues };
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
  toArray(): Chunk[] {
    const arr: Chunk[] = [];
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
  buildQuery(): { English: string; Cypher: string } {
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
      English: englishParts.join(" "),
      Cypher: cypherParts.filter(Boolean).join("\n"),
    };
  }

  /**
   * Get the next valid chunks for the current chunk.
   * @returns The next valid chunks.
   */
  getNextValidChunks(allChunks: Chunk[]): Chunk[] {
    const nextValidChunks: Chunk[] = [];
    const currentAliases = this.aliases;

    for (const chunk of allChunks) {
      if (isValidNextChunk(chunk, currentAliases)) {
        nextValidChunks.push(chunk);
      }
    }

    return nextValidChunks;
  }
}

function isValidNextChunk(
  chunk: Chunk,
  currentAliases: Record<string, any>
): boolean {
  var inputsAreSatisfied = chunk.RequiredInputs.every(
    // type check the values of the required inputs against the current aliases
    // TODO: what if we have multiple aliases with the same type?
    // TODO: How do we choose which one to use
    (input) => {
      const aliasValues = Object.values(currentAliases);
      return aliasValues.some((alias) => typeof alias === typeof input);
    }
  );

  // TODO: Formalize this
  // Examples where this is false:
  // 1. chunk.QueryType === RETURN && this.aliases.length === 0
  // 2. chunk.QueryType === FILTER && this.aliases.length === 0
  var queryTypeIsMatch = true;

  return inputsAreSatisfied && queryTypeIsMatch;
}

// TODO: Replace Slot Values in Cypher and English
