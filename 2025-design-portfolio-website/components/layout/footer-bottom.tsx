import Link from "next/link"

// Bottom section of the footer with copyright and legal links
export function FooterBottom() {
  // Get current year for copyright notice
  const currentYear = new Date().getFullYear()

  // Array of legal links
  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
  ]

  return (
    <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-sm text-muted-foreground">&copy; {currentYear} Designer Portfolio. All rights reserved.</p>
      <div className="flex gap-6">
        {legalLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

