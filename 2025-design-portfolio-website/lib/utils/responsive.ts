/**
 * Responsive Utility Functions
 *
 * This file contains utility functions to help with responsive design.
 *
 * Features:
 * - Breakpoint detection
 * - Responsive value selection
 * - Device type detection
 */

// Breakpoint values in pixels
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

type Breakpoint = keyof typeof breakpoints

/**
 * Gets a value based on the current breakpoint
 * @param values - Object with values for different breakpoints
 * @param defaultValue - Default value if no breakpoint matches
 * @returns The value for the current breakpoint
 */
export function getResponsiveValue<T>(values: Partial<Record<Breakpoint, T>>, defaultValue: T): T {
  // This function should be used with a hook like useMediaQuery
  // Here we're just providing the implementation
  if (typeof window === "undefined") {
    return defaultValue
  }

  const width = window.innerWidth

  // Find the largest breakpoint that's smaller than the current width
  const breakpointEntries = Object.entries(breakpoints) as [Breakpoint, number][]
  const sortedBreakpoints = breakpointEntries.sort((a, b) => b[1] - a[1])

  for (const [breakpoint, minWidth] of sortedBreakpoints) {
    if (width >= minWidth && values[breakpoint] !== undefined) {
      return values[breakpoint] as T
    }
  }

  return defaultValue
}

/**
 * Detects if the current device is a mobile device
 * @returns Whether the device is a mobile device
 */
export function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") {
    return false
  }

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

/**
 * Detects if the current device has touch capabilities
 * @returns Whether the device has touch capabilities
 */
export function hasTouchCapabilities(): boolean {
  if (typeof window === "undefined") {
    return false
  }

  return "ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0
}
