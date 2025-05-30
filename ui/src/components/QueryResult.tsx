import React from 'react';

interface QueryResultProps {
  builtQuery: {
    English: string;
    Cypher: string;
    Outputs: string[];
  } | null;
}

export const QueryResult: React.FC<QueryResultProps> = ({ builtQuery }) => {
  if (!builtQuery) {
    return null;
  }

  return (
    <div className="query-result">
      <h3>Built Query:</h3>
      <div className="english-query">
        <strong>English:</strong> {builtQuery.English}
      </div>
      <div className="cypher-query">
        <strong>Cypher:</strong>
        <pre>{builtQuery.Cypher}</pre>
      </div>
      <div className="outputs">
        <strong>Outputs:</strong> {builtQuery.Outputs.join(', ')}
      </div>
    </div>
  );
}; 