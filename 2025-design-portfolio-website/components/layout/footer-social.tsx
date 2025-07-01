import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

// Social media links component for the footer
export function FooterSocial() {
  // Array of social media links
  const socialLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />,
    },
    {
      name: "GitHub",
      href: "https://github.com",
      icon: <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />,
    },
    {
      name: "Email",
      href: "mailto:hello@designerportfolio.com",
      icon: <Mail className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />,
    },
  ]

  return (
    <div className="flex gap-4 mt-6">
      {socialLinks.map((link) => (
        <Link key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
          {link.icon}
        </Link>
      ))}
    </div>
  )
}

