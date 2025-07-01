/**
 * String utility functions
 *
 * This file contains utility functions for working with strings.
 */

/**
 * Truncate a string to a specified length and add an ellipsis if needed
 * @param str The string to truncate
 * @param length The maximum length of the string
 * @param ellipsis The ellipsis to add (default: '...')
 * @returns The truncated string
 */
export function truncate(str: string, length: number, ellipsis = "..."): string {
    if (!str) return ""
    if (str.length <= length) return str
  
    return str.slice(0, length) + ellipsis
  }
  
  /**
   * Convert a string to title case
   * @param str The string to convert
   * @returns The string in title case
   */
  export function toTitleCase(str: string): string {
    if (!str) return ""
  
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }
  
  /**
   * Convert a string to kebab case
   * @param str The string to convert
   * @returns The string in kebab case
   */
  export function toKebabCase(str: string): string {
    if (!str) return ""
  
    return str
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .toLowerCase()
  }
  
  /**
   * Convert a string to camel case
   * @param str The string to convert
   * @returns The string in camel case
   */
  export function toCamelCase(str: string): string {
    if (!str) return ""
  
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => (index === 0 ? letter.toLowerCase() : letter.toUpperCase()))
      .replace(/[\s-_]+/g, "")
  }
  
  /**
   * Convert a string to pascal case
   * @param str The string to convert
   * @returns The string in pascal case
   */
  export function toPascalCase(str: string): string {
    if (!str) return ""
  
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter) => letter.toUpperCase()).replace(/[\s-_]+/g, "")
  }
  
  /**
   * Generate a slug from a string
   * @param str The string to generate a slug from
   * @returns The slug
   */
  export function slugify(str: string): string {
    if (!str) return ""
  
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }
  
  