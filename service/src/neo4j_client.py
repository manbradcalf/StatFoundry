import json

from neo4j import GraphDatabase, READ_ACCESS, RoutingControl
from src.config import AUTH, URI


def create_driver(uri, auth):
    return GraphDatabase.driver(
        uri,
        auth=auth,
        # Force the driver to recycle connections frequently
        max_connection_lifetime=30,  # seconds; keep short to avoid stale Azure SNAT sockets
        # Enable liveness checks so it tests connections before using them
        liveness_check_timeout=60,  # seconds; driver pings sockets periodically
    )


def close_driver(driver):
    driver.close()


# Initialize Neo4j driver
driver = create_driver(URI, AUTH)


SCHEMA_SNAPSHOT_LABEL = "SchemaSnapshot"


def compute_schema(driver):
    """Introspect the live graph. Expensive (scans every relationship), so the
    API serves the stored snapshot instead; see save_schema_snapshot."""
    # Private query constants (denoted by underscore prefix)
    _fetch_relationships_schema = """
    CALL db.schema.relTypeProperties()
    YIELD relType, propertyName, propertyTypes
    WITH relType, collect({name:propertyName, type:propertyTypes[0]}) AS properties
    RETURN collect({relationship: relType, properties: properties}) AS rel_schema
    """

    _fetch_nodes_schema = """
    CALL db.schema.nodeTypeProperties()
    YIELD nodeType, nodeLabels, propertyName, propertyTypes
    WHERE NOT $snapshot_label IN nodeLabels
    WITH nodeType, collect({name: propertyName, type: propertyTypes[0]}) AS properties
    RETURN collect({label: nodeType, properties: properties}) AS node_schema
    """

    _fetch_rel_patterns = """
    MATCH (n)-[r]->(m)
    WITH DISTINCT labels(n)[0] AS from_label, type(r) AS rel_type, labels(m)[0] AS to_label
    RETURN from_label, rel_type, to_label
    ORDER BY rel_type
    """

    with driver.session() as session:
        node_properties = session.run(
            _fetch_nodes_schema, snapshot_label=SCHEMA_SNAPSHOT_LABEL
        ).single()["node_schema"]
        rel_properties = session.run(_fetch_relationships_schema).single()["rel_schema"]
        rel_patterns = list(session.run(_fetch_rel_patterns))

    return {
        "nodes": [
            {"label": node["label"], "properties": node["properties"]}
            for node in node_properties
        ],
        "relationships": [
            {"relationship": rel["relationship"], "properties": rel["properties"]}
            for rel in rel_properties
        ],
        "patterns": [
            {
                "fromLabel": rel["from_label"] if rel["from_label"] else "?",
                "relType": rel["rel_type"] if rel["rel_type"] else "?",
                "toLabel": rel["to_label"] if rel["to_label"] else "?",
            }
            for rel in rel_patterns
        ],
    }


def save_schema_snapshot(driver):
    """Recompute the schema and store it in the graph. Run after every write
    that can change the schema (ingestion, manual migrations)."""
    schema = compute_schema(driver)
    driver.execute_query(
        f"""
        MERGE (s:{SCHEMA_SNAPSHOT_LABEL} {{id: 'current'}})
        SET s.json = $json, s.updated_at = datetime()
        """,
        json=json.dumps(schema),
    )
    return schema


def fetch_schema(driver):
    """Serve the stored snapshot. Falls back to live introspection (without
    writing, so the API stays read-only) if no snapshot exists yet."""
    records, _, _ = driver.execute_query(
        f"MATCH (s:{SCHEMA_SNAPSHOT_LABEL} {{id: 'current'}}) RETURN s.json AS json",
        routing_=RoutingControl.READ,
    )
    if records:
        return json.loads(records[0]["json"])
    return compute_schema(driver)


def execute_readonly_query(driver, query):
    """
    Executes a Cypher query after validating it's read-only.

    Args:
        driver: Neo4j driver instance
        query (str): The Cypher query to execute

    Returns:
        list: Query results as list of dictionaries

    Raises:
        ValueError: If query contains write operations
    """
    with driver.session(default_access_mode=READ_ACCESS) as session:  # noqa: F821
        result = session.run(query)

        # TODO: what to do with datetime objects here? flatten? return only unix timestamp?
        return [record.data() for record in result]


# Export the driver and fetch_schema for use in other modules
__all__ = ["driver", "fetch_schema", "save_schema_snapshot"]
