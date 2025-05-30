/**
 * Type definition for a single query chunk.
 * @param English - The English description of the chunk.
 * @param Cypher - The Cypher query for the chunk.
 * @param Outputs - The outputs of the chunk.
 * @param RequiredInputs - The inputs that are required for the chunk to build the cypher.
 * @param Inputs - All Inputs, including all transient inputs passed down by any previous chunk.
 * The idea being that even if the next chunk does not need the input, it can still be passed down the chain for later use.
 * @param slotValues - The values to fill the slots with.
 */
export interface Chunk {
  English: string;
  Cypher: string;
  Outputs: string[];
  RequiredInputs: string[];
  Inputs: string[];
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
      outputs = Array.from(new Set([...outputs, ...chunk.Outputs]));
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
}

/**
 * Utility to replace {placeholders} in a template string.
 */
function replacePlaceholders(
  template: string,
  values: Record<string, string>
): string {
  return template.replace(/\{(.*?)\}/g, (match, key) => {
    const trimmedKey = key.trim();
    return values.hasOwnProperty(trimmedKey) ? values[trimmedKey] : match;
  });
}

/**
 * Returns the list of chunks whose Inputs are all satisfied by the given chunk's Outputs.
 * @param currentChunk The chunk to check from.
 * @param allChunks Array of all possible chunks.
 * @returns Array of valid next chunks.
 */
export function getNextValidChunks(
  currentChunk: Chunk,
  allChunks: Chunk[]
): Chunk[] {
  return allChunks.filter((nextChunk) =>
    nextChunk.Inputs.every((input) => currentChunk.Outputs.includes(input))
  );
}

/**
  Chunk ideas

  get stats meeting condition
    get (player | team) (game | season) where (condition) 
    ex: get <player games> where passing touchdowns > 3

  get stats where average meets condition 
    get (player | team) (game | season) stat where avg(stat) was (condition)
    ex: get <player games> where the average passing touchdowns was > 3
  
  get stretch of stats
    get stretch of (duration) (player | team) (game | season) where (condition)
    ex: get <5 game stretch> of <player games> where passing touchdowns > 3

  aggregate over stretch of player games
    with stretch, get (aggregation) (player | team) (game | season) stat over (duration)
    ex: get 5 game stretch of <player games> where the sum of passing touchdowns was > 15
    ex: get 5 game stretch of <player games> where the avg passing touchdowns was = 3

  
  
  
  
  
  
  
 */
