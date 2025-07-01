"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Props interface for the NavLinks component
interface NavLinksProps {
  pathname: string
}

// Define dropdown menu items
const resourcesItems = [
  { name: "Process", path: "/process" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "FAQ", path: "/faqs" },
  // Future items
  // { name: "Blog", path: "/blog" },
  // { name: "Newsletter", path: "/newsletter" },
]

const exploreItems = [
  { name: "Playground", path: "/playground" },
  // Future items
  // { name: "Components", path: "/components" },
  // { name: "Roadmap", path: "/roadmap" },
]

// Desktop navigation links component
export function NavLinks({ pathname }: NavLinksProps) {
  return (
    <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
      {/* Primary navigation items */}
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
      <Link
        href="/contact"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/contact" ? "text-primary" : "text-muted-foreground",
        )}
        aria-current={pathname === "/contact" ? "page" : undefined}
      >
        Contact
      </Link>

      {/* Resources dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary text-muted-foreground focus-visible:outline-none">
          Resources <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {resourcesItems.map((item) => (
            <DropdownMenuItem key={item.path} asChild>
              <Link
                href={item.path}
                className={cn(
                  "w-full cursor-pointer",
                  pathname === item.path || pathname.startsWith(`${item.path}/`) ? "font-medium text-primary" : "",
                )}
              >
                {item.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Explore dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary text-muted-foreground focus-visible:outline-none">
          Explore <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {exploreItems.map((item) => (
            <DropdownMenuItem key={item.path} asChild>
              <Link
                href={item.path}
                className={cn(
                  "w-full cursor-pointer",
                  pathname === item.path || pathname.startsWith(`${item.path}/`) ? "font-medium text-primary" : "",
                )}
              >
                {item.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Feedback link */}
      <button
        onClick={() => {
          // Assuming there's a global function to open the feedback modal
          // This would need to be implemented or adjusted based on your actual feedback mechanism
          if (typeof window !== "undefined" && window.document.getElementById("feedback-modal")) {
            const feedbackModal = document.getElementById("feedback-modal")
            if (feedbackModal) {
              ;(feedbackModal as any).showModal?.()
            }
          }
        }}
        className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
      >
        Feedback
      </button>

      <ModeToggle />
    </nav>
  )
}

