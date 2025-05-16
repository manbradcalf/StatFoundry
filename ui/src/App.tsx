import React from "react";
import ChunkSearch from "./ChunkSearch";

function App() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">StatFoundry Query Builder</h1>
        <ChunkSearch />
      </div>
    </main>
  );
}

export default App; 