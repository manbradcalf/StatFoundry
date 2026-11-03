"""Backfill PlayerGame defensive stats for seasons that predate the new
defensive-column mappings in load_playergames.py.

PBP (Play) data in this graph starts at 2023, so those are the seasons we
backfill defensive stats for (keeping defensive stats and PBP joinable).
Extend SEASONS to go further back if the nflverse CSVs are available.
"""

import sys

from src.neo4j_client import driver, save_schema_snapshot
from scripts.etl.cypher.load_playergames import run

# Seasons to backfill (PBP coverage is 2023+).
SEASONS = [2023, 2024, 2025]


def main() -> None:
    for season in SEASONS:
        run(season)

    print("Refreshing schema snapshot...")
    schema = save_schema_snapshot(driver)
    print(
        f"Schema snapshot saved: {len(schema['nodes'])} labels, "
        f"{len(schema['relationships'])} relationship types, "
        f"{len(schema['patterns'])} patterns"
    )


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"ERROR: backfill failed: {e}")
        sys.exit(1)