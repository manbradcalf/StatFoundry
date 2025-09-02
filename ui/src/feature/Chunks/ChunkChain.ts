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
    this.Aliases.push(...chunk.Provides);
    // dedup by alias name
    this.Aliases = this.Aliases.filter(
      (alias, index, self) =>
        index === self.findIndex((t) => t.Name === alias.Name),
    );
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
   * Insert a chunk at a specific index in the chain.
   * @param index The index to insert at (0 = before first chunk)
   * @param chunk The chunk to insert
   */
  insertAt(index: number, chunk: Chunk): ChunkNode {
    const newNode: ChunkNode = { chunk, prev: null, next: null };

    if (index === 0 || !this.Head) {
      // Insert at beginning
      newNode.next = this.Head;
      if (this.Head) this.Head.prev = newNode;
      this.Head = newNode;
      if (!this.Tail) this.Tail = newNode;
    } else {
      // Find the node at the target index
      let current: ChunkNode | null = this.Head;
      let currentIndex = 0;

      while (current && currentIndex < index) {
        current = current.next;
        currentIndex++;
      }

      if (current) {
        // Insert before the current node
        newNode.next = current;
        newNode.prev = current.prev;
        if (current.prev) current.prev.next = newNode;
        current.prev = newNode;
      } else {
        // Insert at end
        newNode.prev = this.Tail;
        if (this.Tail) this.Tail.next = newNode;
        this.Tail = newNode;
      }
    }

    return newNode;
  }

  /**
   * Traverse the chain and build the full Cypher and English description.
   */
  compile(): ChunkChain {
    let englishParts: string[] = [];
    let cypherParts: string[] = [];
    let aliases: Alias[] = [];

    let node = this.Head;

    while (node) {
      const { chunk } = node;
      // Use CypherTemplate if Cypher is empty, then trim
      let cypherPart = (chunk.Cypher || chunk.CypherTemplate || "").trim();

      // All FILTER starts with WHERE
      if (chunk.QueryType === QueryType.FILTER && cypherPart) {
        // TODO: this could probably be more efficient with subqueries
        // First filter: ensure it starts with WHERE and end with WITH *
        cypherPart = `WHERE ${cypherPart} WITH *`;
      }

      // add the chunk's english and cypher to the parts
      englishParts.push(chunk.English);
      cypherParts.push(cypherPart);

      // add the chunk's aliases to the aliases
      aliases.push(...chunk.Provides);

      node = node.next;
    }

    this.English = englishParts.join(" ");
    this.Cypher += cypherParts.join(" ");
    return this;
  }

  updateChunkAtIndex(index: number, newChunk: Chunk): ChunkChain {
    let node = this.Head;
    let i = 0;
    while (node && i < index) {
      node = node.next;
      i++;
    }
    if (node) {
      node.chunk = newChunk;
    } else {
      alert(`No editable chunk at index ${index}`);
    }
    return this;
  }
  /**
   * Get the next valid chunks for the current chunk.
   * @returns The next valid chunks.
   */
  getNextValidChunksFromChunks(chunksToCheck: Chunk[]): Chunk[] {
    const nextValidChunks: Chunk[] = [];
    const currentAliases = this.Aliases;

    for (const chunk of chunksToCheck) {
      if (isValidNextChunk(chunk, currentAliases)) {
        nextValidChunks.push(chunk);
      }
    }

    return nextValidChunks;
  }
}

function isValidNextChunk(chunk: Chunk, currentAliases: Alias[]): boolean {
  // can't start if we've already started
  if (currentAliases.length > 0 && chunk.QueryType === QueryType.MATCH_START) {
    return false;
  }

  // can't filter what we don't have
  if (
    currentAliases.length === 0 &&
    chunk.QueryType !== QueryType.MATCH_START
  ) {
    return false;
  }

  // Count how many of each entity type we need vs have
  const needed = chunk.Requires.reduce(
    (acc, alias) => {
      acc[alias.AliasType] = (acc[alias.AliasType] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const available = currentAliases.reduce(
    (acc, alias) => {
      acc[alias.AliasType] = (acc[alias.AliasType] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Check if we have enough of each type
  return Object.entries(needed).every(
    ([label, count]) => (available[label] || 0) >= count,
  );
}
