from neo4j import GraphDatabase, READ_ACCESS
from neo4j.time import DateTime, Date, Time, Duration
from src.config import AUTH, URI


def serialize_neo4j_value(value):
    """
    Recursively serializes Neo4j values, converting temporal types to
    JSON-serializable format with both timestamp and display string.
    """
    if isinstance(value, DateTime):
        # Convert to Python datetime, then to ISO string and timestamp
        py_dt = value.to_native()
        return {
            "timestamp": int(py_dt.timestamp()),
            "display": py_dt.strftime("%Y-%m-%d")
        }
    elif isinstance(value, Date):
        py_date = value.to_native()
        return {
            "timestamp": int(py_date.toordinal()),
            "display": py_date.strftime("%Y-%m-%d")
        }
    elif isinstance(value, Time):
        py_time = value.to_native()
        return {
            "timestamp": (py_time.hour * 3600 + py_time.minute * 60 + py_time.second),
            "display": py_time.strftime("%H:%M:%S")
        }
    elif isinstance(value, Duration):
        # Duration doesn't have to_native(), handle manually
        total_seconds = value.hours_minutes_seconds_nanoseconds[0] * 3600 + \
                       value.hours_minutes_seconds_nanoseconds[1] * 60 + \
                       value.hours_minutes_seconds_nanoseconds[2]
        return {
            "timestamp": total_seconds,
            "display": f"{value.months}mo {value.days}d {total_seconds}s"
        }
    elif isinstance(value, dict):
        return {k: serialize_neo4j_value(v) for k, v in value.items()}
    elif isinstance(value, list):
        return [serialize_neo4j_value(item) for item in value]
    else:
        return value


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


def fetch_schema(driver):
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

        # Serialize Neo4j temporal types (DateTime, Date, etc.) to JSON-friendly format
        return [serialize_neo4j_value(record.data()) for record in result]


# Export the driver and fetch_schema for use in other modules
__all__ = ["driver", "fetch_schema"]
