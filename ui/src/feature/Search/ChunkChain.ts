import { Chunk } from "./Chunk";
import { ChunkNode } from "./IChunkNode";

/**
 * Linked-list chain manager for chunks.
 */
export class ChunkChain {
  head: ChunkNode | null = null;
  tail: ChunkNode | null = null;
  outputVars: string[] = [];

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

    // add outputs to be available for use in WITH cypher clauses
    // remove duplicates if they exits
    this.outputVars = [...this.outputVars, ...chunk.Outputs];

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
   * Get the next valid chunks for the current chunk.
   * @param allChunks - All chunks.
   * @returns The next valid chunks.
   */
  getNextValidChunks(allChunks: Chunk[]): Chunk[] {
    return allChunks.filter((chunk) =>
      chunk.RequiredInputs.every((input) =>
        this.tail?.chunk.Outputs.includes(input)
      )
    );
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

function replacePlaceholders(
  English: string,
  slotValues: Record<string, string>
): string {
  throw new Error("Function not implemented.");
}
