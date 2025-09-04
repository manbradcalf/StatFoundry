# Simplified NFLVerse ETL Workflow Implementation Plan

## Overview
Create a single GitHub Actions workflow that ingests weekly NFL data from NFLVerse releases, combining:
- Game data (from NFLVerse schedules - exact location TBD)
- Player stats (from NFLVerse `stats_player` release)
- Play-by-play data (from NFLVerse `pbp` release)
- Coach data (from external GitHub CSV: https://github.com/samhoppen/NFL_public/blob/main/data/all_playcallers.csv)

## Implementation Tasks

### 1. **Create GitHub Actions Workflow**
```
.github/workflows/weekly-nflverse-ingestion.yml
```
- **Trigger**: Scheduled weekly + manual dispatch
- **Timing**: Run after NFLVerse archive workflow completes
- **Sequential execution**: Games → PBP → Players (fail-fast)

### 2. **Set Up Repository Secrets**
- `NEO4J_URI`, `NEO4J_USER`, `NEO4J_PASSWORD` for Aura connection
- All scripts use environment variables for credentials

### 3. **Create/Update ETL Scripts**
- `ingest_weekly_game_stats.py` - Download game data + coaches, ingest to Neo4j
- `ingest_weekly_pbp_stats.py` - Download PBP data, ingest to Neo4j  
- Update existing `ingest_weekly_player_stats.py` - Use NFLVerse CSV instead of nfl_data_py

### 4. **Update Dependencies**
- `requirements.txt` with `neo4j` Python driver
- Remove nfl_data_py dependency, use pandas + requests for CSV processing

### 5. **Implementation Notes**
- **Game data source**: Research NFLVerse releases during implementation
- **Data format**: Expect comprehensive schedules CSV with weather/venue/betting data
- **Coach data**: Download from samhoppen's GitHub repo weekly
- **Error handling**: All-or-nothing execution per acceptance criteria

## Success Criteria
- Automated weekly ingestion matching your existing rich game nodes
- Sequential workflow that fails fast if any script errors
- Clean migration from nfl_data_py to NFLVerse CSV releases

Ready to tackle tomorrow!