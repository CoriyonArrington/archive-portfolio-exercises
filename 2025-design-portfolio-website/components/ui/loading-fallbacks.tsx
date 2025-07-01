/**
 * Loading Fallback Components
 *
 * These components provide visual feedback while content is loading.
 * They use animation to indicate loading state to users.
 *
 * Accessibility features:
 * - ARIA role="status" to announce loading state to screen readers
 * - Visually indicates loading without relying solely on color
 */

export function ProjectsLoadingFallback() {
  return (
    <div
      className="h-96 w-full bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"
      role="status"
      aria-label="Loading projects"
    >
      <span className="sr-only">Loading projects...</span>
    </div>
  )
}

export function SectionLoadingFallback() {
  return (
    <div
      className="h-64 w-full bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"
      role="status"
      aria-label="Loading content"
    >
      <span className="sr-only">Loading content...</span>
    </div>
  )
}
