from neo4j import GraphDatabase

def create_driver(uri, auth):
    return GraphDatabase.driver(uri, auth=auth)

def close_driver(driver):
    driver.close()

def fetch_schema(driver):
    with driver.session() as session:
        node_properties = session.run(_fetch_nodes_schema).single()["node_schema"]
        rel_properties = session.run(_fetch_relationships_schema).single()["rel_schema"]
        rel_patterns = list(session.run(_fetch_rel_patterns))

    return {
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
        "patterns": [
            {
                "fromLabel": rel["from_label"] if rel["from_label"] else "?",
                "relType": rel["rel_type"] if rel["rel_type"] else "?",
                "toLabel": rel["to_label"] if rel["to_label"] else "?"
            }
            for rel in rel_patterns
        ]
    }

# Private query constants (denoted by underscore prefix)
_fetch_relationships_schema = """
    CALL db.schema.relTypeProperties()
    YIELD relType, propertyName
    WITH relType, collect(propertyName) AS properties
    RETURN collect({relationship: relType, properties: properties}) AS rel_schema
"""

_fetch_nodes_schema = """
    CALL db.schema.nodeTypeProperties()
    YIELD nodeType, propertyName
    WITH nodeType, collect(propertyName) AS properties
    RETURN collect({label: nodeType, properties: properties}) AS node_schema 
"""

_fetch_rel_patterns = """
    MATCH (n)-[r]->(m)
    WITH DISTINCT labels(n)[0] AS from_label, type(r) AS rel_type, labels(m)[0] AS to_label
    RETURN from_label, rel_type, to_label
    ORDER BY rel_type
""" 