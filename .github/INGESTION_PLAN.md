Single Sequential Workflow Implementation Plan

Goal

Create one GitHub Actions workflow that runs all three ETL scripts in sequence, ensuring data consistency and simplified monitoring.

Implementation Plan

1. Create GitHub Workflow

- File: .github/workflows/weekly-stats-ingestion.yml
- Sequential execution: games → pbp → players
- Fail-fast behavior (if one fails, stop all)
- Both scheduled (weekly) and manual triggers

2. Set Up GitHub Repository Secrets

- NEO4J_URI - Your Aura connection string
- NEO4J_USER - Database username
- NEO4J_PASSWORD - Database password

3. Create Missing ETL Scripts

- ingest_weekly_game_stats.py (based on existing player stats pattern)
- ingest_weekly_pbp_stats.py (based on existing player stats pattern)

4. Update Dependencies

- Create/update requirements.txt with neo4j driver
- Ensure all scripts use consistent Neo4j connection pattern

5. Workflow Features

- Run every Tuesday at 10 AM UTC (after NFL week completion)
- Manual dispatch option for testing/debugging
- Proper error handling and logging
- Clear job names for easy monitoring

Benefits

- Data consistency: All-or-nothing execution ensures clean graph state
- Simple monitoring: One workflow to track in GitHub Actions
- Dependency order: Games → PBP → Players logical sequence
- Shared setup: Common Python environment and credentials
