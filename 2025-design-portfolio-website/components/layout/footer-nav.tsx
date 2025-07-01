import Link from "next/link"

// Navigation links component for the footer
export function FooterNav() {
  // Primary navigation links
  const primaryLinks = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  // Resources links
  const resourcesLinks = [
    { name: "Process", path: "/process" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "FAQ", path: "/faqs" },
  ]

  // Explore links
  const exploreLinks = [
    { name: "Playground", path: "/playground" },
    { name: "Feedback", path: "/feedback" },
  ]

  return (
    <div>
      <h3 className="font-medium mb-4">Navigation</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Primary Navigation */}
        <div>
          <h4 className="text-sm font-medium mb-2 text-muted-foreground">Main</h4>
          <ul className="space-y-2">
            {primaryLinks.map((link) => (
              <li key={link.path}>
                <Link href={link.path} className="text-muted-foreground hover:text-primary transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-sm font-medium mb-2 text-muted-foreground">Resources</h4>
          <ul className="space-y-2">
            {resourcesLinks.map((link) => (
              <li key={link.path}>
                <Link href={link.path} className="text-muted-foreground hover:text-primary transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-sm font-medium mb-2 text-muted-foreground">Explore</h4>
          <ul className="space-y-2">
            {exploreLinks.map((link) => (
              <li key={link.path}>
                <Link href={link.path} className="text-muted-foreground hover:text-primary transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

