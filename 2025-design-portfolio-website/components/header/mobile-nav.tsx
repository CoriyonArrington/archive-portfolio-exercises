"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Props interface for the MobileNav component
interface MobileNavProps {
  pathname: string
  onLinkClick: () => void
  setOpen: (open: boolean) => void
}

// Define dropdown menu items
const resourcesItems = [
  {
    name: "Process",
    path: "/process",
    description: "Learn about my design process and methodology.",
  },
  {
    name: "Testimonials",
    path: "/testimonials",
    description: "See what clients say about working with me.",
  },
  {
    name: "FAQ",
    path: "/faqs",
    description: "Answers to frequently asked questions.",
  },
]

const exploreItems = [
  {
    name: "Playground",
    path: "/playground",
    description: "Explore interactive design experiments.",
  },
]

// Mobile navigation menu component
// Appears when the menu button is clicked on small screens
export function MobileNav({ pathname, onLinkClick, setOpen }: MobileNavProps) {
  return (
    <nav className="md:hidden border-t" aria-label="Mobile navigation">
      <div className="container flex flex-col py-4">
        <div className="grid gap-2 py-6">
          {/* Primary navigation */}
          <Link
            href="/"
            className={cn(
              "flex w-full items-center py-2 text-lg font-semibold",
              pathname === "/" ? "text-primary" : "",
            )}
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/work"
            className={cn(
              "flex w-full items-center py-2 text-lg font-semibold",
              pathname === "/work" || pathname.startsWith("/work/") ? "text-primary" : "",
            )}
            onClick={() => setOpen(false)}
          >
            Work
          </Link>
          <Link
            href="/services"
            className={cn(
              "flex w-full items-center py-2 text-lg font-semibold",
              pathname === "/services" ? "text-primary" : "",
            )}
            onClick={() => setOpen(false)}
          >
            Services
          </Link>
          <Link
            href="/about"
            className={cn(
              "flex w-full items-center py-2 text-lg font-semibold",
              pathname === "/about" ? "text-primary" : "",
            )}
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={cn(
              "flex w-full items-center py-2 text-lg font-semibold",
              pathname === "/contact" ? "text-primary" : "",
            )}
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>

          {/* Resources dropdown */}
          <Collapsible className="grid gap-4">
            <CollapsibleTrigger className="flex w-full items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
              Resources <ChevronRight className="ml-auto h-5 w-5 transition-all" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="-mx-6 grid gap-6 bg-muted p-6">
                {resourcesItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="group grid h-auto w-full justify-start gap-1"
                    onClick={() => setOpen(false)}
                  >
                    <div className="text-sm font-medium leading-none group-hover:underline">{item.name}</div>
                    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">{item.description}</div>
                  </Link>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Explore dropdown */}
          <Collapsible className="grid gap-4">
            <CollapsibleTrigger className="flex w-full items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
              Explore <ChevronRight className="ml-auto h-5 w-5 transition-all" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="-mx-6 grid gap-6 bg-muted p-6">
                {exploreItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="group grid h-auto w-full justify-start gap-1"
                    onClick={() => setOpen(false)}
                  >
                    <div className="text-sm font-medium leading-none group-hover:underline">{item.name}</div>
                    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">{item.description}</div>
                  </Link>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Feedback link */}
          <button
            onClick={() => {
              setOpen(false)
              // Assuming there's a global function to open the feedback modal
              if (typeof window !== "undefined" && window.document.getElementById("feedback-modal")) {
                const feedbackModal = document.getElementById("feedback-modal")
                if (feedbackModal) {
                  ;(feedbackModal as any).showModal?.()
                }
              }
            }}
            className="flex w-full items-center py-2 text-lg font-semibold text-left"
          >
            Feedback
          </button>
        </div>
      </div>
    </nav>
  )
}
