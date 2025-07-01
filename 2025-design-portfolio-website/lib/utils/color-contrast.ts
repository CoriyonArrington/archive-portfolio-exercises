/**
 * Color Contrast Utility Functions
 *
 * This file contains utility functions to help ensure proper color contrast
 * for accessibility compliance (WCAG 2.1).
 *
 * Features:
 * - Calculate contrast ratio between colors
 * - Check if contrast meets WCAG AA or AAA standards
 * - Get accessible text color based on background
 */

/**
 * Converts a hex color to RGB values
 * @param hex - Hex color code (e.g., "#ffffff")
 * @returns RGB values as an object
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove # if present
  const cleanHex = hex.startsWith("#") ? hex.slice(1) : hex

  // Parse hex values
  const r = Number.parseInt(cleanHex.substring(0, 2), 16)
  const g = Number.parseInt(cleanHex.substring(2, 4), 16)
  const b = Number.parseInt(cleanHex.substring(4, 6), 16)

  return { r, g, b }
}

/**
 * Calculates the relative luminance of a color
 * @param color - RGB color values
 * @returns Relative luminance value
 */
function getLuminance({ r, g, b }: { r: number; g: number; b: number }): number {
  // Convert RGB to sRGB
  const sR = r / 255
  const sG = g / 255
  const sB = b / 255

  // Calculate luminance
  const R = sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4)
  const G = sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4)
  const B = sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4)

  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

/**
 * Calculates the contrast ratio between two colors
 * @param color1 - First hex color
 * @param color2 - Second hex color
 * @returns Contrast ratio (1:1 to 21:1)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const luminance1 = getLuminance(hexToRgb(color1))
  const luminance2 = getLuminance(hexToRgb(color2))

  // Calculate contrast ratio
  const lighter = Math.max(luminance1, luminance2)
  const darker = Math.min(luminance1, luminance2)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Checks if the contrast ratio meets WCAG standards
 * @param ratio - Contrast ratio
 * @param level - WCAG level (AA or AAA)
 * @param isLargeText - Whether the text is large (>=18pt or >=14pt bold)
 * @returns Whether the contrast meets the specified standard
 */
export function meetsContrastStandard(ratio: number, level: "AA" | "AAA" = "AA", isLargeText = false): boolean {
  if (level === "AA") {
    return isLargeText ? ratio >= 3 : ratio >= 4.5
  } else {
    return isLargeText ? ratio >= 4.5 : ratio >= 7
  }
}

/**
 * Gets the most accessible text color (black or white) for a background
 * @param backgroundColor - Background color in hex
 * @returns "#ffffff" or "#000000" based on which has better contrast
 */
export function getAccessibleTextColor(backgroundColor: string): string {
  const whiteContrast = getContrastRatio(backgroundColor, "#ffffff")
  const blackContrast = getContrastRatio(backgroundColor, "#000000")

  return whiteContrast > blackContrast ? "#ffffff" : "#000000"
}
