import os
from neo4j_client import create_driver, fetch_schema

# Demo database credentials
URI = os.getenv("NEO4J_FOOTBALLSTATS_URI")  # footballstats db
AUTH = (
    os.getenv("NEO4J_FOOTBALLSTATS_USERNAME"),
    os.getenv("NEO4J_FOOTBALLSTATS_PASSWORD"),
)

# Initialize Neo4j driver
driver = create_driver(URI, AUTH)

# Export the driver and fetch_schema for use in other modules
__all__ = ['driver', 'fetch_schema']

# build queries to fetch schema
fetch_relationships_schema = """
    CALL db.schema.relTypeProperties()
    YIELD relType, propertyName
    WITH relType, collect(propertyName) AS properties
    RETURN collect({relationship: relType, properties: properties}) AS rel_schema
"""

fetch_nodes_schema = """
    CALL db.schema.nodeTypeProperties()
    YIELD nodeType, propertyName
    WITH nodeType, collect(propertyName) AS properties
    RETURN collect({label: nodeType, properties: properties}) AS node_schema 
"""

# TODO: consider refactoring this to better suit the concept of subgraphs and support multi hop relationships
fetch_rel_patterns = """
    MATCH (n)-[r]->(m)
    WITH DISTINCT labels(n)[0] AS from_label, type(r) AS rel_type, labels(m)[0] AS to_label
    RETURN from_label, rel_type, to_label
    ORDER BY rel_type
"""

# Assuming driver is already initialized
def fetch_schema(driver):
    with driver.session() as session:
        # Collect all results first
        # TODO: why is this single()? why not just have the query return top 1
        node_properties = session.run(fetch_nodes_schema).single()["node_schema"]
        rel_properties = session.run(fetch_relationships_schema).single()["rel_schema"]
        rel_patterns = list(session.run(fetch_rel_patterns))  # Convert to list to consume result

    # Create a structured schema object
    schema = {
        "nodes": [
            {
                "label": node["label"],
                "properties": node["properties"]
            }
            for node in node_properties
        ],
        "relationships": [
            {
                "relationship": rel["relationship"],
                "properties": rel["properties"]
            }
            for rel in rel_properties
        ],
        # TODO: consider renaming this to "subgraphs" and having keys to each subgraph
        # ex: "subgraphs": [{"player season": {"fromLabel": rel["from_label"]..., toLabel: ...}}]
        "patterns": [
            {
                "fromLabel": rel["from_label"] if rel["from_label"] else "?",
                "relType": rel["rel_type"] if rel["rel_type"] else "?",
                "toLabel": rel["to_label"] if rel["to_label"] else "?"
            }
            for rel in rel_patterns
        ]
    }

    return schema
