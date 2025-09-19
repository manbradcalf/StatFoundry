# Schema-Agnostic Architecture README

## Core Philosophy

This system is designed to be **completely domain-agnostic** - it should work equally well with NFL stats, e-commerce data, medical research, or any other schema without code changes.

## The Abstraction Principle

**The system should never know what the data means, only its structure.**

### What the System Should Know:
- Nodes and relationships exist
- Properties have data types (string, number, boolean, arrays)
- Structural patterns and connections
- Generic query building patterns

### What the System Should NOT Know:
- That "Player" entities exist
- What "rushing_yards" represents
- That "fantasy points" are meaningful
- Any domain-specific business logic

## Current Problems (2025-01-18)

### Generation Scripts Have Hardcoding:
1. **generateTypes.js** - Hardcoded "RUSHING_STATS", "FANTASY_STATS" combinations
2. **generateChunks.js** - Hardcoded entity name mappings and default values
3. **Property categorization** - Hardcoded regex patterns for "info" vs "stats"

### UI Layer Has Domain Assumptions:
1. **Column groupings** - "Rushing Stats", "Passing Stats" are NFL-specific
2. **Component structure** - Player-specific components baked into architecture
3. **Import dependencies** - Files expect specific constant names to exist

## The Vision

Transform this into a **generic database exploration tool** where:

1. **Schema is the single source of truth** - All structure comes from the database schema
2. **Generated code is purely structural** - No semantic meaning embedded
3. **UI adapts to any schema** - Works with orders, patients, games, anything
4. **Zero hardcoded entity names** - System discovers entities dynamically

## Success Test

**"Schema Swap Test"**: If someone replaces the NFL schema with an e-commerce schema tomorrow, the entire application should work without any code changes - just different data flowing through the same abstract patterns.

## Next Steps

1. Remove hardcoded combinations from generation scripts
2. Replace domain-specific UI groupings with generic type-based groupings
3. Make property categorization schema-driven instead of regex-based
4. Eliminate all entity name assumptions throughout the stack

The goal is a truly abstract system that treats data as data, regardless of what that data represents in the real world.

## Architecture Layers

```
Database Schema (Single Source of Truth)
    ↓
Generation Scripts (Pure Structure, No Semantics)
    ↓
Generated Types/Chunks (Generic Patterns)
    ↓
UI Components (Domain-Agnostic)
    ↓
User Interface (Adapts to Any Schema)
```

Every layer should only understand structure and patterns, never meaning or domain-specific concepts.