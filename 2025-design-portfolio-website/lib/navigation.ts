// Define the site navigation structure with all pages in the desired order
export interface NavigationItem {
  title: string
  href: string
  category: "main" | "resources" | "explore" | "other"
}

// Define all pages in the site in the desired navigation order
export const siteNavigation: NavigationItem[] = [
  { title: "Home", href: "/", category: "main" },
  { title: "Work", href: "/work", category: "main" },
  { title: "Services", href: "/services", category: "main" },
  { title: "About", href: "/about", category: "main" },
  { title: "Process", href: "/process", category: "resources" },
  { title: "Testimonials", href: "/testimonials", category: "resources" },
  { title: "FAQ", href: "/faqs", category: "resources" },
  { title: "Playground", href: "/playground", category: "explore" },
  // Feedback is handled differently as it's a modal, not a page
  { title: "Contact", href: "/contact", category: "main" },
  // Future pages can be added here in their appropriate categories
  // { title: "Blog", href: "/blog", category: "resources" },
  // { title: "Newsletter", href: "/newsletter", category: "resources" },
  // { title: "Components", href: "/components", category: "explore" },
  // { title: "Roadmap", href: "/roadmap", category: "explore" },
]

// Function to get the previous and next pages based on the current pathname
export function getAdjacentPages(pathname: string): {
  prevPage: NavigationItem | null
  nextPage: NavigationItem | null
} {
  // Normalize the pathname to handle trailing slashes and work/* paths
  let normalizedPath = pathname

  // Handle work/* paths - we'll treat them as /work for navigation purposes
  if (pathname.startsWith("/work/")) {
    normalizedPath = "/work"
  }

  // Find the index of the current page
  const currentIndex = siteNavigation.findIndex((item) => item.href === normalizedPath)

  // If the page isn't in our navigation (like admin pages), return null for both
  if (currentIndex === -1) {
    return { prevPage: null, nextPage: null }
  }

  // Get the previous and next pages
  const prevPage = currentIndex > 0 ? siteNavigation[currentIndex - 1] : null
  const nextPage = currentIndex < siteNavigation.length - 1 ? siteNavigation[currentIndex + 1] : null

  return { prevPage, nextPage }
}
