
/**
 * Utility functions for improving accessibility
 */

/**
 * Generates a unique ID for use with ARIA attributes
 * 
 * @param {string} prefix - Prefix for the ID to make it more descriptive
 * @returns {string} A unique ID string
 */
export function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Creates an object with common accessibility attributes for interactive elements
 * 
 * @param {string} label - The accessible label
 * @param {boolean} isPressed - Whether the element is in a pressed state (for buttons)
 * @param {boolean} isExpanded - Whether the element controls an expandable section
 * @returns {Object} Object with appropriate aria attributes
 */
export function getAccessibilityProps(label: string, isPressed?: boolean, isExpanded?: boolean) {
  const props: Record<string, string | boolean> = {
    'aria-label': label,
  };
  
  if (isPressed !== undefined) {
    props['aria-pressed'] = isPressed;
  }
  
  if (isExpanded !== undefined) {
    props['aria-expanded'] = isExpanded;
  }
  
  return props;
}

/**
 * Keyboard event handler for accessibility
 * Allows triggering click events on Space or Enter keys
 * 
 * @param {Function} onClick - The click handler function
 * @returns {Function} Keyboard event handler
 */
export function handleKeyboardAccessibility(onClick: () => void) {
  return (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };
}
