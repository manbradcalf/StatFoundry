import re

from neo4j import GraphDatabase, READ_ACCESS

from src.config import AUTH, URI

# Private query constants (denoted by underscore prefix)
_fetch_relationships_schema = """
    CALL db.schema.relTypeProperties()
    YIELD relType, propertyName, propertyTypes
    WITH relType, collect({name:propertyName, type:propertyTypes[0]}) AS properties
    RETURN collect({relationship: relType, properties: properties}) AS rel_schema
"""

_fetch_nodes_schema = """
    CALL db.schema.nodeTypeProperties()
    YIELD nodeType, propertyName, propertyTypes
    WITH nodeType, collect({name: propertyName, type: propertyTypes[0]}) AS properties
    RETURN collect({label: nodeType, properties: properties}) AS node_schema
"""

_fetch_rel_patterns = """
    MATCH (n)-[r]->(m)
    WITH DISTINCT labels(n)[0] AS from_label, type(r) AS rel_type, labels(m)[0] AS to_label
    RETURN from_label, rel_type, to_label
    ORDER BY rel_type
"""


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


# TODO: Replace with MCP?
def fetch_schema(driver):
    with driver.session() as session:
        node_properties = session.run(_fetch_nodes_schema).single()["node_schema"]
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


def is_read_only_query(query):
    """
    Validates that a Cypher query is read-only (no mutations allowed).

    Args:
        query (str): The Cypher query to validate

    Returns:
        bool: True if query is read-only, False otherwise

    Raises:
        ValueError: If query contains write operations
    """
    # Remove comments and normalize whitespace
    clean_query = re.sub(r"//.*?$", "", query, flags=re.MULTILINE)
    clean_query = re.sub(r"/\*.*?\*/", "", clean_query, flags=re.DOTALL)
    clean_query = re.sub(r"\s+", " ", clean_query).strip().upper()

    # List of strictly write operations that should be blocked
    write_operations = [
        "CREATE",
        "MERGE",
        "DELETE",
        "DETACH DELETE",
        "REMOVE",
        "SET",
        "DROP",
        "ALTER",
        "LOAD CSV",
    ]

    # Check for write operations
    for operation in write_operations:
        if operation in clean_query:
            raise ValueError(
                f"Write operation '{operation}' is not allowed. Only READ queries are permitted."
            )

    return True


def execute_query(driver, query):
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
    # Validate query is read-only
    is_read_only_query(query)

    with driver.session(default_access_mode=READ_ACCESS) as session:  # noqa: F821
        result = session.run(query)
        return [record.data() for record in result]


# Export the driver and fetch_schema for use in other modules
__all__ = ["driver", "fetch_schema"]
