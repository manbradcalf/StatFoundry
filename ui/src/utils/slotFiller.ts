import { Chunk } from "../feature/Chunks/Types/Chunk";
import { Slot } from "../feature/Chunks/Types/Slot";
/**
 * Replace all slot placeholders in the template string with their corresponding values.
 * A placeholder is denoted with curly braces e.g. {property}.
 *
 * @param template The string that contains placeholders.
 * @param slots    A collection of slots with values to substitute.
 * @returns        The template with all placeholders substituted.
 */
export function fillTemplate(template: string, slots: Slot[]): string {
  let output = template;

  // Slot names that should NOT be quoted in Cypher, as they represent
  // identifiers (like property names) or operators.
  const nonLiteralNames = ["property", "condition", "stat"];

  slots.forEach(({ Name, Value }) => {
    const pattern = new RegExp(`\\{${Name}(?:\\.[a-zA-Z0-9_]+)?\\}`, "g");


    // Only quote the value if it's a string AND its name indicates
    // it's a literal value, not an identifier or operator.
    const shouldQuote =
      typeof Value === "string" && !nonLiteralNames.includes(Name);
    const replacement = shouldQuote ? `'${Value}'` : String(Value);

    output = output.replace(pattern, replacement);
  });

  return output;
}

/**
 * Utility that returns a shallow copy of a chunk with English & Cypher strings
 * having their placeholders replaced with current Slot values.
 *
 * Note: the original chunk object is left unmodified to avoid accidental
 * mutation of the static chunk catalogue.
 */

export function buildFilledChunk(original: Chunk): Chunk {
  // Fill the templates with current slot values
  const filledEnglish = fillTemplate(original.EnglishTemplate || original.English, original.Slots);
  const filledCypher = fillTemplate(original.CypherTemplate || original.Cypher, original.Slots);

  return {
    ...original,
    // These are the filled versions used for display and query execution
    English: filledEnglish,
    Cypher: filledCypher,
    // Templates are already provided by the chunk data, just pass them through
    EnglishTemplate: original.EnglishTemplate,
    CypherTemplate: original.CypherTemplate,
  };
}
