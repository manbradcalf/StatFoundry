import React from 'react';

/**
 * Creates highlighted text by finding [bracket] patterns in the English text
 * and wrapping them with highlighting spans.
 */
export function createHighlightedText(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];

  // Look for [placeholder] patterns
  const placeholderRegex = /\[([^\]]+)\]/g;
  let lastIndex = 0;
  let match;
  let matchIndex = 0;

  while ((match = placeholderRegex.exec(text)) !== null) {
    // Add text before placeholder
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Add highlighted placeholder
    parts.push(
      React.createElement(
        'span',
        { key: `placeholder-${matchIndex}`, className: 'suggestion-slot-value' },
        match[1]
      )
    );

    lastIndex = match.index + match[0].length;
    matchIndex++;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return React.createElement(React.Fragment, null, ...parts);
}
