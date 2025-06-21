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

  slots.forEach(({ Name, Value }) => {
    // Use global regex to replace every occurrence of the placeholder
    const pattern = new RegExp(`\\{${Name}\\}`, 'g');
    output = output.replace(pattern, String(Value));
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
import { Chunk, Slot } from "../feature/Chunks/Chunk";

export function buildFilledChunk(original: Chunk): Chunk {
  const filledEnglish = fillTemplate(original.English, original.Slots);
  const filledCypher = fillTemplate(original.Cypher, original.Slots);

  return {
    ...original,
    English: filledEnglish,
    Cypher: filledCypher,
  };
}