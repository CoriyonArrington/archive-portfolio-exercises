"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

// Props interface for the NavLinks component
interface NavLinksProps {
  pathname: string
}

// Desktop navigation links component
export function NavLinks({ pathname }: NavLinksProps) {
  return (
    <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
      {/* Primary navigation items with consistent spacing */}
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-primary" : "text-muted-foreground",
        )}
        aria-current={pathname === "/" ? "page" : undefined}
      >
        Home
      </Link>
      <Link
        href="/work"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/work" || pathname.startsWith("/work/") ? "text-primary" : "text-muted-foreground",
        )}
        aria-current={pathname === "/work" || pathname.startsWith("/work/") ? "page" : undefined}
      >
        Work
      </Link>
      <Link
        href="/services"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/services" ? "text-primary" : "text-muted-foreground",
        )}
        aria-current={pathname === "/services" ? "page" : undefined}
      >
        Services
      </Link>
      <Link
        href="/about"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/about" ? "text-primary" : "text-muted-foreground",
        )}
        aria-current={pathname === "/about" ? "page" : undefined}
      >
        About
      </Link>
    </nav>
  )
}
