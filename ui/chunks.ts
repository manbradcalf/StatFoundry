/**
 * Type definition for a single query chunk.
 */
export interface Chunk {
  English: string;
  Cypher: string;
  Outputs: string[];
  Inputs: string[];
  NextValidChunks: Chunk[];
  slotValues?: Record<string, string>;
}

/**
 * Node in the linked-list chain of chunks.
 * Use explicit null for next/prev to avoid TS assignment issues.
 */
export interface ChunkNode {
  chunk: Chunk;
  next: ChunkNode | null;
  prev: ChunkNode | null;
}

/**
 * Linked-list chain manager for chunks.
 */
export class ChunkChain {
  head: ChunkNode | null = null;
  tail: ChunkNode | null = null;

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
    return node;
  }

  /**
   * Remove the last chunk from the chain.
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
   * Traverse the chain and build the full Cypher and English description.
   * Applies WITH clauses as needed.
   */
  buildQuery(): { English: string; Cypher: string; Outputs: string[] } {
    let englishParts: string[] = [];
    let cypherParts: string[] = [];
    let outputs: string[] = [];
    let node = this.head;

    while (node) {
      const { chunk } = node;
      // Add WITH clause if needed (not for the first chunk)
      if (cypherParts.length && chunk.Inputs.length > 0) {
        cypherParts.push(`WITH ${chunk.Inputs.join(", ")}`);
      }
      englishParts.push(chunk.English);
      cypherParts.push(chunk.Cypher.trim());
      outputs = [...new Set([...outputs, ...chunk.Outputs])];
      node = node.next;
    }

    return {
      English: englishParts.join(" "),
      Cypher: cypherParts.filter(Boolean).join("\n"),
      Outputs: outputs,
    };
  }

  /**
   * Replace slot placeholders in all chunks with provided values.
   * @param slotValuesMap Map of chunk index to slot values.
   */
  fillSlots(slotValuesMap: Record<number, Record<string, string>>) {
    let node = this.head;
    let idx = 0;
    while (node) {
      const slotValues = slotValuesMap[idx] || {};
      node.chunk.English = replacePlaceholders(node.chunk.English, slotValues);
      node.chunk.Cypher = replacePlaceholders(node.chunk.Cypher, slotValues);
      node = node.next;
      idx++;
    }
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
}

/**
 * Utility to replace {placeholders} in a template string.
 */
function replacePlaceholders(template: string, values: Record<string, string>): string {
  return template.replace(/\{(.*?)\}/g, (match, key) => {
    const trimmedKey = key.trim();
    return values.hasOwnProperty(trimmedKey) ? values[trimmedKey] : match;
  });
}

/**
 * Factory to create a new chunk.
 */
export function createChunk({ English, Cypher, Outputs, Inputs }: Omit<Chunk, 'NextValidChunks'>): Chunk {
  return {
    English,
    Cypher,
    Outputs,
    Inputs,
    NextValidChunks: [],
  };
}

/**
 * Factory for a return clause chunk.
 */
export interface ReturnClauseChunk {
  English: string;
  ReturnClause: string;
  Inputs: string[];
  ApplyReturnClause(cypherSoFar: string): string;
}

export function createReturnChunk({ English, ReturnClause, Inputs }: Omit<ReturnClauseChunk, 'ApplyReturnClause'>): ReturnClauseChunk {
  return {
    English,
    ReturnClause,
    Inputs,
    ApplyReturnClause(cypherSoFar: string) {
      return cypherSoFar + "\nRETURN " + this.ReturnClause;
    },
  };
}

/**
 * Returns the list of chunks whose Inputs are all satisfied by the given chunk's Outputs.
 * @param currentChunk The chunk to check from.
 * @param allChunks Array of all possible chunks.
 * @returns Array of valid next chunks.
 */
export function getNextValidChunks(currentChunk: Chunk, allChunks: Chunk[]): Chunk[] {
  return allChunks.filter(nextChunk =>
    nextChunk.Inputs.every(input => currentChunk.Outputs.includes(input))
  );
}