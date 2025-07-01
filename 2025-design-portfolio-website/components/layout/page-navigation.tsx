"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function PageNavigation() {
  const pathname = usePathname()

  // Define the navigation routes in order
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/work", label: "Work" },
    { path: "/services", label: "Services" },
    { path: "/process", label: "Process" },
    { path: "/about", label: "About" },
    { path: "/testimonials", label: "Testimonials" },
    { path: "/contact", label: "Contact" },
  ]

  // Find the current index in the navigation links
  const currentIndex = navLinks.findIndex((link) => link.path === pathname)

  // Calculate previous and next link indices based on the navLinks array order
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : null
  const nextIndex = currentIndex < navLinks.length - 1 ? currentIndex + 1 : null

  // Only show previous/next if we have valid indices
  const showPrevious = prevIndex !== null
  const showNext = nextIndex !== null

  // Check if we're on a nested page (like project details)
  const isNestedPage =
    pathname.split("/").length > 2 && (pathname.includes("/work/") || pathname.includes("/services/"))

  // Don't render anything for nested pages
  if (isNestedPage) {
    return null
  }

  return (
    <div className="border-y">
      <div className="container py-12 lg:pl-12 lg:pr-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {showPrevious && (
            <Link
              href={navLinks[prevIndex].path}
              className="border rounded-lg p-6 flex items-center hover:bg-muted transition-colors group"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            >
              <div className="flex items-center space-x-4">
                <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <p className="text-sm text-muted-foreground">Previous</p>
                  <h3 className="font-medium text-xl font-playfair group-hover:text-primary transition-colors">
                    {navLinks[prevIndex].label}
                  </h3>
                </div>
              </div>
            </Link>
          )}

          {showNext && (
            <Link
              href={navLinks[nextIndex].path}
              className={`border rounded-lg p-6 flex items-center justify-between hover:bg-muted transition-colors group ${!showPrevious ? "md:col-span-2" : ""}`}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            >
              <div>
                <p className="text-sm text-muted-foreground">Next</p>
                <h3 className="font-medium text-xl font-playfair group-hover:text-primary transition-colors">
                  {navLinks[nextIndex].label}
                </h3>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

