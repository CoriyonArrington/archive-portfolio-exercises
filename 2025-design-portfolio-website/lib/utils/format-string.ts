/**
 * Formats a string value by removing brackets, quotes, and extra whitespace
 * Used for cleaning up data from API responses
 *
 * @param value - The value to format
 * @returns A cleaned string
 */
export function formatString(value: unknown): string {
  if (typeof value === "string") {
    return value.replace(/^\[+|\]+|"+/g, "").trim()
  }
  return String(value)
}
