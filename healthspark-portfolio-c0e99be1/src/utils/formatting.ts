
/**
 * Utility functions for string formatting
 */

/**
 * Converts a string to title case format
 * 
 * @param {string} text - The input string to format
 * @returns {string} The formatted string in title case
 */
export function toTitleCase(text: string): string {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Converts a string to kebab case format
 * 
 * @param {string} text - The input string to format
 * @returns {string} The formatted string in kebab-case
 */
export function toKebabCase(text: string): string {
  return text
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

/**
 * Truncates a string to a maximum length with ellipsis
 * 
 * @param {string} text - The input string to truncate
 * @param {number} maxLength - Maximum length of the string
 * @returns {string} The truncated string with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
