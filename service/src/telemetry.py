"""
OpenTelemetry helpers following Microsoft's official Azure Application Insights patterns.
Simple, reusable functions for adding custom attributes to existing spans.
"""

from opentelemetry import trace
from typing import Any


def add_cypher_telemetry(cypher_query: str, query_type: str, **extra_attrs) -> None:
    """
    Add cypher query attributes to the current span following Microsoft best practices.
    
    Uses semantic dot-notation naming convention as recommended by Microsoft:
    - cypher.query: The actual Cypher query string
    - query.type: Type of query (e.g., "custom", "player_lookup", "player_games")
    - query.*: Additional query-related attributes
    
    Args:
        cypher_query: The Cypher query being executed
        query_type: Semantic type of the query operation
        **extra_attrs: Additional attributes to add with "query." prefix
        
    Example:
        add_cypher_telemetry(
            cypher_query="MATCH (p:Player) RETURN p", 
            query_type="player_lookup",
            gsis_id="12345",
            result_count=1
        )
    """
    span = trace.get_current_span()
    if span.is_recording():
        span.set_attribute("cypher.query", cypher_query)
        span.set_attribute("query.type", query_type)
        
        # Add extra attributes with query prefix for consistency
        for key, value in extra_attrs.items():
            # Ensure value is OpenTelemetry-compatible (string, number, or boolean)
            if isinstance(value, (str, int, float, bool)):
                span.set_attribute(f"query.{key}", value)
            else:
                span.set_attribute(f"query.{key}", str(value))


def add_query_result(result_count: int, success: bool = True, error: str = None) -> None:
    """
    Add query result information to the current span.
    
    Args:
        result_count: Number of results returned
        success: Whether the query succeeded
        error: Error message if query failed
        
    Example:
        # Success case
        add_query_result(result_count=len(results))
        
        # Error case  
        add_query_result(result_count=0, success=False, error="Invalid query")
    """
    span = trace.get_current_span()
    if span.is_recording():
        span.set_attribute("query.result_count", result_count)
        span.set_attribute("query.success", success)
        
        if error:
            span.set_attribute("query.error", error)