/**
 * Utility function to determine if a value is numeric
 * @param value - The value to check
 * @returns true if the value can be treated as a number
 */
export const isNumeric = (value: any): boolean => {
  if (value === null || value === undefined || value === "") return false;
  return !isNaN(Number(value)) && isFinite(Number(value));
};

/**
 * Comparison function for sorting two values
 * Prioritizes numeric comparison over string comparison
 * @param a - First value to compare
 * @param b - Second value to compare
 * @param direction - Sort direction ('asc' or 'desc')
 * @returns comparison result (-1, 0, 1)
 */
export const compareValues = (
  a: any,
  b: any,
  direction: "asc" | "desc"
): number => {
  // Handle null/undefined values - always put them at the end
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;

  // Convert to strings for comparison
  const aStr = String(a).trim();
  const bStr = String(b).trim();

  // If both values are numeric, compare as numbers
  if (isNumeric(aStr) && isNumeric(bStr)) {
    const aNum = Number(aStr);
    const bNum = Number(bStr);
    const result = aNum - bNum;
    return direction === "asc" ? result : -result;
  }

  // Fall back to string comparison (case-insensitive)
  const result = aStr.toLowerCase().localeCompare(bStr.toLowerCase());
  return direction === "asc" ? result : -result;
};

/**
 * Format column header text for display
 * @param key - The column key
 * @returns formatted header text
 */
export const formatColumnHeader = (key: string): string => {
  return key
    .replace(/^[a-z]+\./, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
};
