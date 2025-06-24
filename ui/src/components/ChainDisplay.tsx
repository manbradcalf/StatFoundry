import React from 'react';
import { useSearch } from '../contexts/SearchContext';

interface ChainDisplayProps {
  title?: string;
}

export const ChainDisplay: React.FC<ChainDisplayProps> = ({
  title = "Current Chain"
}) => {
  const { chain } = useSearch();
  const chainArray = chain.toArray();

  return (
    <div className="chain-debug">
      <h4>{title} ({chainArray.length} chunks):</h4>
      <small>Aliases: [{chain.Aliases.map((alias) => alias.Name).join(', ')}]</small>
      <br />
      <small>cypher: {chain.Cypher}</small>
      {chainArray.map((chunk, index) => (
        <div key={index} className="chunk-item">
          <strong>Chunk {index + 1}:</strong> {chunk.English}
          <br />
          <small>Inputs: [{chunk.Inputs.map((input) => `${input.Name}<${input.Label}>`).join(', ')}]</small>
          <br />
          <small>Outputs: [{chunk.Outputs.map((output) => `${output.Name}<${output.Label}>`).join(', ')}]</small>
          <br />
          <small>Cypher: {chunk.Cypher}</small>
        </div>
      ))}
    </div>
  );
}; 