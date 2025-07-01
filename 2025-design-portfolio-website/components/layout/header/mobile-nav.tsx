"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { useState } from "react"

interface MobileNavProps {
  pathname: string
  onLinkClick: () => void
}

interface NavLink {
  name: string
  path: string
  isButton?: boolean
}

interface NavSection {
  title: string
  links: NavLink[]
}

export function MobileNav({ pathname, onLinkClick }: MobileNavProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  // Main navigation items
  const mainLinks = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
  ]

  // Sections with dropdown menus
  const sections: NavSection[] = [
    {
      title: "Resources",
      links: [
        { name: "Process", path: "/process" },
        { name: "Testimonials", path: "/testimonials" },
        { name: "FAQ", path: "/faqs" },
      ],
    },
    {
      title: "Explore",
      links: [
        { name: "Playground", path: "/playground" },
        { name: "Feedback", path: "#feedback", isButton: true },
      ],
    },
  ]

  const handleSectionToggle = (title: string) => {
    setActiveSection(activeSection === title ? null : title)
  }

  const handleFeedbackClick = () => {
    if (typeof window !== "undefined" && window.document.getElementById("feedback-modal")) {
      const feedbackModal = document.getElementById("feedback-modal")
      if (feedbackModal) {
        ;(feedbackModal as any).showModal?.()
      }
    }
    onLinkClick()
  }

  return (
    <div className="border-t py-6">
      <div className="container flex flex-col">
        {/* Main navigation links with consistent spacing */}
        <nav className="flex flex-col">
          {mainLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "py-3 text-lg font-medium transition-colors hover:text-primary",
                pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path))
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
              onClick={onLinkClick}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Dropdown sections with consistent spacing */}
        <div className="flex flex-col mt-4 border-t pt-4">
          {sections.map((section) => (
            <div key={section.title} className="py-1">
              <button
                className="flex w-full items-center justify-between py-3 text-lg font-medium text-muted-foreground hover:text-primary"
                onClick={() => handleSectionToggle(section.title)}
              >
                {section.title}
                <ChevronRight
                  className={cn("h-5 w-5 transition-transform", activeSection === section.title ? "rotate-90" : "")}
                />
              </button>
              {activeSection === section.title && (
                <div className="pl-4 py-2 flex flex-col">
                  {section.links.map((link) =>
                    link.isButton ? (
                      <button
                        key={link.name}
                        onClick={handleFeedbackClick}
                        className="py-2 text-base font-medium text-muted-foreground hover:text-primary text-left"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <Link
                        key={link.path}
                        href={link.path}
                        className={cn(
                          "py-2 text-base font-medium transition-colors hover:text-primary",
                          pathname === link.path || pathname.startsWith(`${link.path}/`)
                            ? "text-primary"
                            : "text-muted-foreground",
                        )}
                        onClick={onLinkClick}
                      >
                        {link.name}
                      </Link>
                    ),
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Get in touch button with consistent spacing */}
        <div className="mt-6 pt-4 border-t">
          <Button asChild className="w-full" onClick={onLinkClick}>
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
