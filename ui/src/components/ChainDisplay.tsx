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
      {chainArray.map((chunk, index) => (
        <div key={index} className="chunk-item">
          <strong>Chunk {index + 1}:</strong> {chunk.English}
          <br />
          <small>Inputs: [{chunk.Inputs.join(', ')}] → Outputs: [{chunk.Outputs.join(', ')}]</small>
        </div>
      ))}
    </div>
  );
}; 