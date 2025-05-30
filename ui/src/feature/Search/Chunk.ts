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
