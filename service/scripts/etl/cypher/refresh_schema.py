import sys
from src.neo4j_client import driver, save_schema_snapshot

# Recompute the graph schema and store it as the snapshot /api/schema serves.
# Run after any load or migration that can add labels, properties or relationships.
try:
    schema = save_schema_snapshot(driver)
    print(
        f"Schema snapshot saved: {len(schema['nodes'])} labels, "
        f"{len(schema['relationships'])} relationship types, "
        f"{len(schema['patterns'])} patterns"
    )
except Exception as e:
    print(f"ERROR: Failed to refresh schema snapshot: {e}")
    sys.exit(1)
