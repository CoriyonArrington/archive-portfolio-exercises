"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function Footer() {
  const pathname = usePathname()
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)

  // Define the navigation routes in order
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/work", label: "Work" },
    { path: "/services", label: "Services" },
    { path: "/process", label: "Process" },
    { path: "/about", label: "About" },
    { path: "/testimonials", label: "Testimonials" },
    { path: "/contact", label: "Contact" },
    { path: "/faqs", label: "FAQ" },
  ]

  // Find the current index in the navigation links
  const currentIndex = navLinks.findIndex((link) => link.path === pathname)

  // Special conditions: no previous on home, no next on contact
  const showPrevious = pathname !== "/"
  const showNext = pathname !== "/contact"

  // Calculate previous and next link indices
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : 0
  const nextIndex = currentIndex < navLinks.length - 1 ? currentIndex + 1 : navLinks.length - 1

  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Your Name
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/yourusername/portfolio"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <nav className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          <Link href="/projects" className="text-sm font-medium hover:underline underline-offset-4">
            Projects
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:underline underline-offset-4">
            Blog
          </Link>
          <Link href="/playground" className="text-sm font-medium hover:underline underline-offset-4">
            Playground
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
            Contact
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </footer>
  )
}
