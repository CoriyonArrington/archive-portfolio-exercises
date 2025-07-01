/**
 * SkipToContent component
 *
 * Provides a skip link for keyboard users to bypass navigation
 * Improves accessibility by allowing keyboard users to skip directly to main content
 */
export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:p-4 focus:bg-background focus:text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
    >
      Skip to content
    </a>
  )
}
