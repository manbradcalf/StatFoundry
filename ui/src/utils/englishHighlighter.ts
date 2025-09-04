import React from 'react';

/**
 * Creates highlighted text by finding semantic bracket patterns in the English text
 * and wrapping them with appropriate highlighting spans based on prefix type.
 * 
 * Supports:
 * - e[entity] -> green highlighting
 * - r[relationship] -> orange highlighting  
 * - f[filter] -> blue highlighting
 * - [legacy] -> blue highlighting (for backwards compatibility)
 */
export function createHighlightedText(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];

  // Define patterns for each semantic type
  const patterns = [
    { regex: /e\[([^\]]+)\]/g, className: 'suggestion-entity-value', type: 'entity' },
    { regex: /r\[([^\]]+)\]/g, className: 'suggestion-relationship-value', type: 'relationship' },
    { regex: /f\[([^\]]+)\]/g, className: 'suggestion-filter-value', type: 'filter' },
    { regex: /\[([^\]]+)\]/g, className: 'suggestion-slot-value', type: 'legacy' }
  ];

  // Find all matches across all patterns
  const allMatches: Array<{
    match: RegExpExecArray;
    className: string;
    type: string;
  }> = [];

  patterns.forEach(pattern => {
    let match;
    const regex = new RegExp(pattern.regex.source, 'g'); // Create fresh regex instance
    while ((match = regex.exec(text)) !== null) {
      allMatches.push({
        match,
        className: pattern.className,
        type: pattern.type
      });
    }
  });

  // Sort matches by position
  allMatches.sort((a, b) => a.match.index - b.match.index);

  let lastIndex = 0;
  let matchIndex = 0;

  allMatches.forEach(({ match, className, type }) => {
    // Skip overlapping matches (prioritize earlier patterns)
    if (match.index < lastIndex) {
      return;
    }

    // Add text before this match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Add highlighted content
    parts.push(
      React.createElement(
        'span',
        { 
          key: `${type}-${matchIndex}`, 
          className: className,
          'data-semantic-type': type
        },
        match[1]
      )
    );

    lastIndex = match.index + match[0].length;
    matchIndex++;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return React.createElement(React.Fragment, null, ...parts);
}
