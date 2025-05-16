import { Schema, BaseChunk } from "./types";

export const generateChunksFromSchema = (schema: Schema): BaseChunk[] => {
  const chunks: BaseChunk[] = [];

  // Generate chunks for each label
  schema.nodes.forEach((node) => {
    // Basic match chunk
    chunks.push({
      English: `Find {${node.label}}`,
      Cypher: `MATCH (${node.label.toLowerCase()}:${node.label})`,
      Outputs: [node.label.toLowerCase()],
      Inputs: [],
      NextValidChunks: [],
      Color: "green",
    });

    // Where chunk for each property
    node.properties.forEach((property) => {
      chunks.push({
        English: `${node.label} ${property} is {value}`,
        // todo: handle multiple conditions like >, <, =, !=, etc.
        Cypher: `WHERE ${node.label.toLowerCase()}.${property} = {value}`,
        Outputs: [node.label.toLowerCase()],
        Inputs: [node.label.toLowerCase()],
        NextValidChunks: [],
        Color: "blue",
      });
    });
  });

  // Generate pattern chunks
  schema.patterns.forEach((pattern) => {
    chunks.push({
      English: `${pattern.fromLabel} ${pattern.relType} ${pattern.toLabel}`,
      Cypher: `MATCH (${pattern.fromLabel.toLowerCase()}:${pattern.fromLabel})-[r:${pattern.relType}]->(${pattern.toLabel.toLowerCase()}:${pattern.toLabel})`,
      // todo: this should output aliased(?) toLabel properties
      Outputs: [pattern.fromLabel.toLowerCase(), pattern.toLabel.toLowerCase()],
      Inputs: [],
      NextValidChunks: [],
      Color: "red",
    });
  });

  // Populate NextValidChunks based on Inputs/Outputs compatibility
  chunks.forEach((chunk) => {
    chunk.NextValidChunks = chunks.filter((nextChunk) =>
      nextChunk.Inputs.every((input) => chunk.Outputs.includes(input))
    );
  });

  return chunks;
};
