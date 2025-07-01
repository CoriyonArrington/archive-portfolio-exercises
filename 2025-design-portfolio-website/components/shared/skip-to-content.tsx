/**
 * SkipToContent component
 *
 * Provides a skip link for keyboard users to bypass navigation
 * Only visible when focused, improving keyboard navigation
 */
import Link from "next/link"

export function SkipToContent() {
  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
    >
      Skip to content
    </Link>
  )
}
