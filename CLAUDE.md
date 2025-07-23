you are an extremely experienced software developer who
specialized in javascript and python and all their relevant libraries and toolings.

always use best practices for either react or fastapi

check yourself for antipatterns

keep things as simple as possible

don't overengineer solutions

understand that ben, the person talking to you, likes things to be explainable

The information below should help you with this repo. this repo is statfoundry.

# StatFoundry Query Builder - Design Philosophy & Implementation Rules

## The Real Vision (Why This Matters)

### Not Just Stats - Multi-Domain Knowledge Graph

- **Current State**: Player statistics (passing yards, receptions, etc.)
- **12-Month Goal**: Owners, coaches, officials, birthplaces, colleges, coaching trees, schemes, weather, news articles
- **End State**: Any piece of NFL information connected to any other piece

### Why Neo4j Makes Sense

- **Simple Queries**: "Players with >300 passing yards" could be SQL
- **Complex Queries**: "SEC RBs who rushed 100+ yards in snow against 4-3 defenses" - this is where graphs shine
- **Network Analysis**: PageRank for Super Bowl predictions based on team/player relationship strength
- **Pattern Discovery**: Find connections across disparate data ("Aquarius QBs struggle in west coast primetime")

### Evolution of Query Complexity

```typescript
// Phase 1 (MVP): Simple stats
{
  English: "with over 300 passing yards";
}

// Phase 2: Multi-domain
{
  English: "who attended SEC schools";
}
{
  English: "in games with snow";
}
{
  English: "against 4-3 defenses";
}

// Phase 3: Deep relationships
{
  English: "coached by disciples of Bill Walsh";
}
{
  English: "against teams with similar injury patterns";
}
```

## Core Design Philosophy

### Deterministic Over Flexible

- **Goal**: Build a deterministic system that users can learn and master
- **NOT Goal**: Build a flexible NLP system that handles multiple ways to ask the same question
- **Rationale**: Inconsistency is worse than learning curve. One clear way to ask each question.
- **Why It Matters More**: Complex relationship queries need precision - no room for ambiguity

### Relationship Traversal Language (Not SQL for Graph)

- **Mental Model**: Building complex paths through connected data
- **User Experience**: "Show me players WHERE [complex relationship path]"
- **Technical Reality**: Chunk-based Neo4j/Cypher query construction
- **Key Insight**: We're not building a stats tool that uses graph DB - we're building a relationship traversal interface

## Product Strategy (Long-term)

### Phase 1 (MVP): Simple Stats Queries

- Focus: Player statistics, basic filtering
- Interface: Deterministic chunk selection
- Complexity: Low - essentially WHERE clauses
- Goal: Prove concept, learn user patterns

### Phase 2 (Growth): Multi-Domain Knowledge Graph

- Add: Coaches, weather, college backgrounds, schemes, etc.
- Same deterministic interface, exponentially richer vocabulary
- Queries become complex relationship traversals
- Example: "SEC players who played in snow against 4-3 defenses"

### Phase 3 (Advanced): Deep Network Analysis

- PageRank-style algorithms for predictions
- Pattern discovery across all domains
- Coaching tree analysis, scheme evolution tracking
- True knowledge graph with thousands of entity types

## Network Analysis Potential

### PageRank Applications

- **Team Strength**: Teams that beat teams that beat good teams rank higher
- **Player Impact**: Players who outperform against players who usually shut down good opponents
- **Coaching Trees**: Success "flows" through mentorship relationships
- **Scheme Evolution**: Track how defensive/offensive concepts spread through the league

### Pattern Discovery Examples

- Astrological signs vs performance in specific conditions
- College conference backgrounds vs NFL success patterns
- Weather/location correlations with player performance
- Coaching tree influences on team culture/performance

## Technical Implementation Rules

### Chunk System Architecture

- **Chunk**: Single query operation with English description + Cypher
- **ChunkChain**: Linked list of chunks that compile to full query
- The rest of the implementation is fluid. The most recent can be found in the react app's feature/Chunks dir

### Suggestion Engine - Keep It Simple

```typescript
// THIS - Simple compatibility checking
getNextValidChunks(allChunks: Chunk[]): Chunk[] {
  return allChunks.filter((chunk) =>
    chunk.RequiredInputs.every(input => this.outputVars.includes(input)) &&
    getValidNextChunkTypes(this.tail?.chunk.Type).includes(chunk.Type)
  );
}

// NOT THIS - Complex confidence scoring, search ranking, NLP
```

### Backward Compatibility Strategy

- Keep existing string-based `Outputs: ["p", "pg"]` working
- Add optional `SemanticOutputs` for gradual migration
- Don't break existing chunks while adding semantic types

### Polymorphic Chunks (Multiple Input Types)

```typescript
// GOOD - Template-based approach for handling Team vs Player inputs
{
  English: "had {qualifier} {statValue} {statName} in a game",
  AcceptedInputTypes: [DataType.Player, DataType.Team],
  CypherTemplates: {
    [DataType.Player]: `MATCH (p)-[:PLAYED_GAME]->(pg:PlayerGame) WHERE pg.{statName} {qualifier} {statValue}`,
    [DataType.Team]: `MATCH (t)<-[:PLAYED_FOR]-(p:Player)-[:PLAYED_GAME]->(pg:PlayerGame) WHERE pg.{statName} {qualifier} {statValue}`,
  }
}
```

## What NOT to Build (For MVP)

### ❌ Avoid These Temptations

- **Complex suggestion engines** with confidence scoring
- **Natural language parsing** - save for Phase 3 when complexity justifies it
- **Multiple ways to express same query** - deterministic only
- **Flexible search** - guided selection only
- **AI-powered query generation** - defeats the deterministic purpose

### ❌ Anti-Patterns to Avoid

- "Smart" suggestions that try to guess user intent
- Probabilistic matching algorithms
- Free-form text input that gets parsed
- Complex ranking systems (for MVP)

## Learning from Mistakes

### What Went Wrong Initially

- **LLM Translation**: Tried English -> Cypher via LLM, too inconsistent even with schema
- **Over-Engineering**: Built complex suggestion engine when simple filtering works for MVP
- **Flexibility Focus**: Tried to handle multiple ways to ask same question
- **Missing the Vision**: Focused on "stats tool" instead of "relationship traversal language"

### What Works Better

- **Guided Selection**: Show valid next steps, let user choose
- **Simple Rules**: Type compatibility + input/output matching
- **Deterministic**: Same input always produces same output
- **Learnable**: Users can master the "grammar" of the system
- **Precision**: Complex relationship queries require exact specification

## Future Considerations

### When to Add Complexity

- **Phase 2**: When knowledge graph has enough entities to justify relationship complexity
- **Phase 3**: When users demand natural language interface AND the domain is complex enough to justify AI parsing
- **Network Analysis**: When enough relationship data exists to run meaningful PageRank algorithms

### Success Metrics

- **MVP**: Users can build basic stat queries without confusion
- **Phase 2**: Users discover and use relationship queries across domains
- **Phase 3**: System finds genuinely novel patterns in NFL data

### Technology Evolution

- **MVP**: Simple chunk compatibility rules
- **Phase 2**: Schema-driven chunk generation from graph structure
- **Phase 3**: AI-assisted query building with deterministic fallback

## Code Quality Guidelines

### The "Get Shit Done vs Over-Engineering" Continuum

**The Spectrum:**
```
Get Shit Done ←————————————|————————————→ Over-Engineering
(hack it together)    (the sweet spot)    (anticipate everything)
```

**Example: Firebase Auth useEffect Structure**

```typescript
// ❌ TOO FAR LEFT - Lazy/expedient (cramming unrelated concerns together)
useEffect(() => {
  // Handle redirect result  
  getRedirectResult(auth).then(...)
  
  // ALSO set up auth listener (different concern!)
  const unsubscribe = onAuthStateChanged(auth, ...)
  return unsubscribe
}, [])

// ✅ THE SWEET SPOT - Proper separation of concerns
// Handle OAuth redirect result
useEffect(() => {
  getRedirectResult(auth)
    .then((result) => { ... })
    .catch((error) => { ... })
}, [])

// Listen to auth state changes  
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => { ... })
  return unsubscribe
}, [])

// ❌ TOO FAR RIGHT - Over-engineering would be:
// - Custom hook for redirect handling
// - Separate hook for auth state
// - Error boundary wrapper
// - Retry logic with exponential backoff
// - etc.
```

**Key Points:**
- **The sweet spot changes** based on context, timeline, and phase of development
- **When unsure**: Ask Ben where to be on the continuum for the current task
- **Guiding principle**: Separate distinct concerns, but don't create abstractions for abstractions' sake

## Implementation Priorities

1. **Fix type compatibility** - Get semantic types working with existing chunks
2. **Add ChunkType to existing chunks** - Enable smart filtering based on operation types
3. **Test polymorphic chunks** - Handle Team vs Player inputs elegantly
4. **Resist feature creep** - No complex suggestions until Phase 2 complexity justifies them
5. **Plan for schema evolution** - Design chunk system to handle new entity types easily

## Key Insights to Remember

### We're Building Three Things at Once

1. **Programming Language**: Deterministic chunk-based query construction
2. **Domain Interface**: Sports-specific vocabulary for relationship traversal
3. **Pattern Discovery Tool**: Network analysis for finding hidden connections

### Why This Combination Is Unique

- **Graph query builders exist** but are too technical for analysts
- **Sports analytics tools exist** but don't handle complex relationships
- **Network analysis tools exist** but aren't domain-specific or user-friendly
- **This combines all three** with a learnable, deterministic interface

---

_Remember: We're building a relationship traversal language for sports data discovery, not just a stats tool that happens to use a graph database._
