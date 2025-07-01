
/**
 * Utility functions for responsive design
 */

/**
 * Common breakpoint values for responsive design
 * Matches Tailwind's default breakpoints
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * Checks if the viewport is at or above a specific breakpoint
 * 
 * @param {keyof typeof breakpoints} breakpoint - The breakpoint to check
 * @returns {boolean} True if viewport width is >= the breakpoint
 */
export function isAboveBreakpoint(breakpoint: keyof typeof breakpoints): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints[breakpoint];
}

/**
 * Returns tailwind classes for responsive font sizes
 * 
 * @param {Object} options - Configuration options
 * @param {string} options.base - Base font size class
 * @param {string} options.sm - Small screen font size class
 * @param {string} options.md - Medium screen font size class
 * @param {string} options.lg - Large screen font size class
 * @returns {string} Combined Tailwind classes for responsive font sizing
 */
export function responsiveFontClasses({ 
  base, 
  sm, 
  md, 
  lg 
}: { 
  base: string;
  sm?: string;
  md?: string;
  lg?: string;
}): string {
  return [
    base,
    sm ? `sm:${sm}` : '',
    md ? `md:${md}` : '',
    lg ? `lg:${lg}` : '',
  ].filter(Boolean).join(' ');
}
