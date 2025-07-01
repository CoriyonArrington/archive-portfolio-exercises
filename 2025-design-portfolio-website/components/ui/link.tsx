"use client"

import * as React from "react"
import NextLink from "next/link"
import { cn } from "@/lib/utils"

// Props interface for the Link component
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children?: React.ReactNode
  className?: string
  external?: boolean
}

// Custom Link component that handles both internal and external links
// Also supports smooth scrolling to anchor links
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, className, external, ...props }, ref) => {
    // Check if the link is a hash link (anchor)
    const isHash = href.startsWith("#")
    // Check if the link is external
    const isExternal = external || href.startsWith("http") || href.startsWith("mailto:")

    // Handle click for hash links to enable smooth scrolling
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isHash) {
        e.preventDefault()
        const element = document.querySelector(href)
        if (element) {
          const yOffset = -100 // Adjust based on header height
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: "smooth" })
        }
      }

      if (props.onClick) {
        props.onClick(e)
      }
    }

    // For external links, use a regular anchor tag
    if (isExternal) {
      return (
        <a
          ref={ref}
          href={href}
          className={cn("transition-colors", className)}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      )
    }

    // For internal links, use Next.js Link component
    return (
      <NextLink ref={ref} href={href} className={cn("transition-colors", className)} onClick={handleClick} {...props}>
        {children}
      </NextLink>
    )
  },
)

Link.displayName = "Link"

export { Link }
