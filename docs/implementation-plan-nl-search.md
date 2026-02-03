# Implementation Plan: Natural Language to Cypher Search + RAG Showcase

**Created**: 2026-01-04
**Status**: Ready for Implementation

## Overview

Add an experimental natural language search feature using Claude Sonnet 4.5 to translate free-text queries into Cypher, while maintaining the deterministic chunk-based system as the primary interface. Create accompanying content to showcase RAG capabilities to prospective clients.

**Strategic Positioning**: Experimental feature that demonstrates evolved LLM capabilities (models have significantly improved since initial 2021-2022 attempts) while preserving the deterministic approach as the reliable fallback.

**Key User Input**: "I didn't know as much back then, and models have gotten better... hoping you can help point me in the right direction"

---

## Part 1: Natural Language to Cypher Implementation

### Architecture: Modern NL-to-Cypher Approach

The implementation will use a **three-stage pipeline** with structured output and validation:

```
User Input → Schema-Aware Prompt → Claude API → Structured Output → Validation → Execution
                                                      ↓ (if invalid)
                                                 Error Context → Retry
```

**Key Innovation**: Use Claude's structured output (JSON mode) to generate not just raw Cypher, but a structured response including:
- The generated Cypher query
- Reasoning/explanation of the query
- Confidence score
- Suggested fallback to chunk system if confidence is low

### Backend Implementation

#### 1. Modular Architecture

**File Structure**:
```
service/src/
├── app.py                      (modify - add /api/nl-search endpoint)
├── neo4j_client.py            (existing)
├── requests.py                (modify - add NLSearchRequest model)
├── config.py                  (modify - add ANTHROPIC_API_KEY)
├── nl_query/                  (NEW DIRECTORY)
│   ├── __init__.py
│   ├── orchestrator.py        (main NL query handler)
│   ├── schema_formatter.py    (format Neo4j schema for Claude)
│   ├── prompt_builder.py      (construct Claude prompts)
│   ├── examples_repository.py (few-shot example management)
│   ├── cypher_validator.py    (validate generated Cypher)
│   ├── claude_client.py       (Anthropic SDK wrapper)
│   └── models.py              (Pydantic models for structured output)
```

**Key Functions**:
- `build_schema_context()`: Formats Neo4j schema into LLM-friendly context
- `build_few_shot_examples()`: Curates example NL→Cypher pairs
- `generate_cypher_from_nl()`: Main Claude API call with prompt
- `validate_and_sanitize_cypher()`: Query validation before execution
- `refine_with_error_context()`: Retry logic if query fails

**Schema Context Strategy**:
```python
def build_schema_context(schema: dict) -> str:
    """
    Builds a comprehensive schema description for Claude.

    Format:
    - Node types with properties (type-annotated)
    - Relationship patterns (from→rel→to)
    - Example property values for context
    - Common query patterns
    """
```

**Few-Shot Examples** (5-7 curated examples):
```python
EXAMPLES = [
    {
        "nl": "Show me all quarterbacks",
        "cypher": "MATCH (p:Player) WHERE p.position = 'QB' RETURN p.name, p.team_abbr"
    },
    {
        "nl": "Which running backs rushed for over 100 yards in week 5 of 2024?",
        "cypher": "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE p.position = 'RB' AND pg.season = 2024 AND pg.week = 5 AND pg.rushing_yards > 100 RETURN p.name, pg.rushing_yards ORDER BY pg.rushing_yards DESC"
    },
    # ... more examples covering different complexity levels
]
```

**Claude API Integration**:
```python
import anthropic

async def generate_cypher_from_nl(
    nl_query: str,
    schema: dict,
    api_key: str
) -> dict:
    """
    Translates natural language to Cypher using Claude Sonnet 4.5.
    """
    client = anthropic.Anthropic(api_key=api_key)

    schema_context = build_schema_context(schema)
    examples = build_few_shot_examples()

    response = client.messages.create(
        model="claude-sonnet-4-5-20250929",
        max_tokens=2000,
        temperature=0,  # Deterministic for consistency
        system=SYSTEM_PROMPT.format(
            schema_context=schema_context,
            few_shot_examples=examples
        ),
        messages=[{
            "role": "user",
            "content": f"Translate this question to Cypher:\n\n{nl_query}"
        }]
    )

    # Parse structured JSON response
    result = json.loads(response.content[0].text)
    return result
```

**Validation Layer**:
```python
def validate_and_sanitize_cypher(cypher: str) -> tuple[bool, str]:
    """
    Validates Cypher query before execution.

    Checks:
    - No write operations (CREATE, MERGE, DELETE, SET, REMOVE)
    - Valid Cypher syntax (basic parsing)
    - No dangerous patterns (DETACH DELETE, etc.)

    Returns: (is_valid, error_message_if_invalid)
    """
    # Check for write operations
    write_keywords = ['CREATE', 'MERGE', 'DELETE', 'SET', 'REMOVE', 'DROP']
    upper_query = cypher.upper()

    for keyword in write_keywords:
        if keyword in upper_query:
            return False, f"Write operation '{keyword}' not allowed"

    # Basic syntax validation
    if 'MATCH' not in upper_query:
        return False, "Query must contain MATCH clause"

    if 'RETURN' not in upper_query:
        return False, "Query must contain RETURN clause"

    return True, ""
```

#### 2. New API Endpoint: `POST /api/nl-search`

**File**: `service/src/app.py`

See full implementation in detailed plan above.

#### 3. Dependencies

**File**: `service/requirements.txt`

Add:
```
anthropic>=0.40.0
```

### Frontend Implementation

#### 1. New Search Mode Toggle

**File**: `ui/src/components/SearchBar.tsx` (modify)

Add toggle/tabs to switch between "Guided" and "Natural Language" modes.

#### 2. New Components

- `NaturalLanguageInput.tsx` - Free-text input component
- `CypherPreview.tsx` - Show generated query
- `FeedbackButtons.tsx` - User feedback (👍👎)
- `useNLSearch.ts` - API integration hook

See detailed implementations in full plan.

### Prompt Engineering Strategy

**Modern Best Practices (2024-2025)**:

1. **Schema Decomposition**: Provide node types, properties, and relationships separately
2. **Few-Shot Learning**: Include 5-7 diverse examples covering different complexity levels
3. **Explicit Constraints**: Clear rules for read-only, schema adherence
4. **Structured Output**: JSON mode with `{cypher, explanation, confidence}` format
5. **Prompt Caching**: Cache the schema portion (reduces API costs by ~90%)

**Core Prompt Template**:
```
You are a Neo4j Cypher query expert. Given a natural language question, generate a valid Cypher query.

# Schema
{schema_context}

# Important Rules:
1. ONLY use node types and properties from the schema above
2. ALL queries must be READ-ONLY (MATCH, RETURN, WHERE, WITH only)
3. Use RETURN to specify exactly what data to retrieve
4. Variable names should be short and clear (p for Player, pg for PlayerGame, g for Game)
5. When filtering by team, check BOTH home_team and away_team
6. Property names are case-sensitive
7. Use DISTINCT when returning players to avoid duplicates

# Example Queries
{few_shot_examples}

# User Question
{user_query}

# Your Task
Generate a Cypher query. Return JSON:
{
  "cypher": "the complete Cypher query",
  "explanation": "brief explanation of what the query does",
  "confidence": "high/medium/low"
}
```

**Caching Strategy**:
- Use Claude's built-in prompt caching for schema portion
- Application-level cache for exact query → Cypher mappings (Redis/in-memory, 1hr TTL)
- Invalidate on schema changes

---

## Risk Mitigation & Production Readiness

### Common Failure Modes & Solutions

| Failure Mode | Mitigation Strategy |
|--------------|---------------------|
| **Hallucinated schema entities** | Validate all labels/properties against schema before execution |
| **Write operations attempted** | Strict validation blocks CREATE/DELETE/SET/MERGE |
| **API rate limits** | Exponential backoff, suggest chunk mode during outages |
| **Ambiguous queries** | Return confidence score, ask for clarification if < 70% |
| **Performance issues** | Set query timeout (5s), add LIMIT to open-ended queries |
| **Cost overruns** | Prompt caching, query caching, monthly budget alerts |
| **Incorrect results** | User feedback loop (👍👎), log all queries for review |
| **Schema drift** | Regenerate prompt on schema changes (webhook from ETL) |

### Monitoring & Observability

**Metrics to Track**:
- Success rate (valid Cypher / total queries)
- User feedback ratio (thumbs up / thumbs down)
- Average response time (target: <2s)
- API costs per query
- Fallback rate (NL → Chunk mode)
- Most common query patterns

**Logging**:
```python
logger.info({
    "event": "nl_query",
    "query": user_query,
    "generated_cypher": cypher,
    "validation_passed": is_valid,
    "execution_time_ms": duration,
    "result_count": len(results),
    "confidence": confidence
})
```

### Cost Analysis

**Claude Sonnet 4.5 Pricing**:
- Input: $3 / million tokens
- Output: $15 / million tokens

**Typical Query Cost**:
- Schema: ~2000 tokens (cached after first use)
- Examples: ~1500 tokens (cached)
- User query: ~50 tokens
- Output: ~200 tokens

**With Caching**:
- First query: $0.012
- Subsequent queries: $0.003 (90% reduction)

**Monthly Estimates**:
- 1,000 queries: $3/month
- 10,000 queries: $30/month
- 100,000 queries: $300/month

**ROI**:
- Data analyst time saved: 5 min → 30 sec per query
- Enables non-technical self-service
- Cost: $360/year (at 10k queries/month)
- vs hiring analyst: $100k/year
- **ROI: 277x**

---

## Part 2: Blog Post / Video Script

### Target Audience
Business and product leaders evaluating RAG solutions for complex data querying

### Impressive Example Queries for Demo

**Simple (Warm-Up)**:
1. "Show me all quarterbacks" → Demonstrates basic entity matching
2. "Running backs with over 100 rushing yards in a game" → Shows filtering

**Single-Hop Relationship**:
3. "Players who played for the Bills" → Demonstrates Player→PlayerGame→Game traversal
4. "Top 5 wide receivers by total receiving yards in 2025" → Shows aggregation + ordering

**Multi-Hop Reasoning (Show-Stoppers)**:
5. "Which running backs under 25 were coached by Super Bowl winners" → Multi-hop + filters
6. "Find games where the underdog won by more than 14 points" → Complex business logic
7. "Players who scored touchdowns in 3 consecutive games" → Pattern matching
8. "Compare Josh Allen's stats to other QBs in cold weather games" → Contextual analysis

### Video Script Outline

**Duration**: 3-5 minutes

**Scene 1: The Problem** (30 sec)
- Show traditional query building (SQL/Cypher editor)
- "This works, but requires technical expertise"

**Scene 2: The Vision** (30 sec)
- Show natural language input
- "What if you could just ask?"

**Scene 3: Live Demo** (2-3 min)
- Screen recording showing 3-4 example queries
- Show results appearing
- Show "View Generated Cypher" to demonstrate transparency
- Show confidence scoring
- Show fallback to guided search when appropriate

**Scene 4: Architecture** (30 sec)
- Simple diagram: User → Claude → Validation → Neo4j → Results
- Mention hybrid approach

**Scene 5: Broader Applications** (30 sec)
- Quick montage of other domains (legal, healthcare, etc.)
- "Same approach, different data"

**Scene 6: Call to Action** (15 sec)
- "Want to explore how this could work for your data?"
- Contact info

---

## Implementation Phases

### Phase 1: MVP (Core NL-to-Cypher)
**Priority**: Must-have for initial release

**Backend**:
- [ ] Create `nl_query/` directory structure
- [ ] Implement orchestrator.py with basic Claude integration
- [ ] Add `/api/nl-search` endpoint
- [ ] Implement schema context builder
- [ ] Add 5-7 few-shot examples
- [ ] Basic validation (no writes, has MATCH/RETURN)
- [ ] Add Anthropic dependency + env var

**Frontend**:
- [ ] Add search mode toggle to SearchBar
- [ ] Create NaturalLanguageInput component
- [ ] Create useNLSearch hook
- [ ] Update SearchResults to show metadata (optional)
- [ ] Add simple CSS for new components

**Testing**:
- [ ] Manual testing with 10-15 diverse queries
- [ ] Verify generated Cypher is safe and valid
- [ ] Test error handling (malformed input, API failures)

### Phase 2: Refinements (Improve Accuracy)
**Priority**: Important for production quality

- [ ] Collect example queries from actual usage
- [ ] Refine few-shot examples based on failures
- [ ] Add iterative refinement (retry with error context)
- [ ] Implement caching (NL query → Cypher mapping)
- [ ] Add user feedback mechanism (thumbs up/down)

### Phase 3: Content Creation
**Priority**: Must-have for client showcase

- [ ] Write blog post following outline above
- [ ] Record demo video (screen recording + voiceover)
- [ ] Create 3-5 compelling example queries
- [ ] Take screenshots of UI showing both search modes
- [ ] Prepare simple architecture diagram

### Phase 4: Advanced Features (Future)
**Priority**: Nice-to-have

- [ ] LLM suggests which search mode to use based on query
- [ ] Auto-generate few-shot examples from chunk system
- [ ] Multi-turn conversations (follow-up questions with context)
- [ ] Query explanation in plain English
- [ ] Export generated Cypher as reusable template

---

## Critical Files Summary

### Backend Files (Python)

**Create New**:
1. `service/src/nl_query/` - New directory for all NL query logic
   - `orchestrator.py` - Main coordinator (highest priority)
   - `prompt_builder.py` - Prompt engineering (critical for accuracy)
   - `schema_formatter.py` - Schema → prompt formatting
   - `examples_repository.py` - Few-shot example management
   - `claude_client.py` - Anthropic SDK wrapper
   - `cypher_validator.py` - Safety & validation layer
   - `models.py` - Pydantic models
2. `service/.env` - Add ANTHROPIC_API_KEY

**Modify Existing**:
1. `service/src/app.py` - Add `/api/nl-search` endpoint
2. `service/src/requests.py` - Add `NLSearchRequest` model
3. `service/src/config.py` - Add `anthropic_api_key` configuration
4. `service/requirements.txt` - Add `anthropic>=0.40.0`
5. `service/.env.example` - Document ANTHROPIC_API_KEY

### Frontend Files (TypeScript/React)

**Create New**:
1. `ui/src/components/NaturalLanguageInput.tsx` - Free-text input UI
2. `ui/src/components/CypherPreview.tsx` - Show generated query
3. `ui/src/components/FeedbackButtons.tsx` - User feedback (👍👎)
4. `ui/src/hooks/useNLSearch.ts` - API integration hook
5. `ui/src/types/NLQuery.ts` - TypeScript type definitions

**Modify Existing**:
1. `ui/src/components/SearchBar.tsx` - Add mode toggle (Guided vs NL)
2. `ui/src/components/SearchResults.tsx` - Add metadata display
3. `ui/src/components/SearchContent.tsx` - Integrate NL search mode

### Documentation Files

**Create New**:
1. `docs/blog-nl-search-showcase.md` - Blog post content
2. `docs/nl-search-examples.md` - Curated example queries for testing

---

## Success Criteria

**Technical**:
- [ ] 80%+ query success rate (valid Cypher generation)
- [ ] <2s average response time
- [ ] <$50/month API costs at 10k queries
- [ ] Zero write operations allowed through (validation 100% effective)

**User Experience**:
- [ ] Seamless toggle between Guided and NL modes
- [ ] Clear error messages with actionable fallbacks
- [ ] Transparent (users can see generated Cypher)
- [ ] Positive user feedback (>60% thumbs up)

**Business**:
- [ ] Blog post published and shared
- [ ] Video demo recorded and distributed
- [ ] At least 3 client demos scheduled
- [ ] Positive prospective client feedback

---

## Next Steps After Plan Approval

1. **Environment Setup**:
   - Obtain Anthropic API key
   - Add to service/.env
   - Test API connection

2. **Backend MVP** (Priority 1):
   - Create nl_query/ directory structure
   - Implement orchestrator with basic prompt
   - Add /api/nl-search endpoint
   - Test with 10 example queries

3. **Frontend MVP** (Priority 2):
   - Add search mode toggle
   - Create NaturalLanguageInput component
   - Wire up to backend API
   - Test end-to-end flow

4. **Content Creation** (Priority 3):
   - Draft blog post
   - Record demo video
   - Create example query library

5. **Iteration**:
   - Collect user feedback
   - Refine prompts based on failures
   - Expand few-shot examples
   - Optimize costs with caching

---

## Additional Resources

For full implementation details including:
- Complete code examples for all modules
- Detailed blog post narrative
- Full video script with timing
- Comprehensive risk analysis
- Alternative architectures considered
- Research-backed approaches

See: `/Users/biz/.claude/plans/ticklish-dancing-truffle.md`
