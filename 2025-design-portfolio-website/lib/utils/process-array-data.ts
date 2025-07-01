/**
 * Processes array data from API responses
 * Handles various formats including JSON strings, arrays, and comma-separated strings
 *
 * @param data - The data to process
 * @returns An array of strings
 */
export function processArrayData(data: unknown): string[] {
  if (Array.isArray(data)) {
    return data.map((item) => {
      // If the item is a string that starts with [ or ", clean it up
      if (typeof item === "string") {
        return item.replace(/^\[+|\]+|"+/g, "").trim()
      }
      return String(item)
    })
  }

  if (typeof data === "string") {
    // Try to parse JSON string
    try {
      const parsed = JSON.parse(data)
      if (Array.isArray(parsed)) {
        return parsed.map((item) => (typeof item === "string" ? item.replace(/^\[+|\]+|"+/g, "").trim() : String(item)))
      }
      // If it's a single string in JSON format
      return [parsed.replace(/^\[+|\]+|"+/g, "").trim()]
    } catch (error) {
      // Silent fail for parsing errors, continue with comma splitting
      console.debug("JSON parse error, falling back to comma splitting:", error)
    }
    // Not a JSON string, try comma splitting
    return data.split(",").map((item) => item.replace(/^\[+|\]+|"+/g, "").trim())
  }

  return data
    ? [
        String(data)
          .replace(/^\[+|\]+|"+/g, "")
          .trim(),
      ]
    : []
}
