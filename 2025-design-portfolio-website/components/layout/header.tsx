"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
// Change the import for ModeToggle
import { ModeToggle } from "@/components/shared/mode-toggle"
import { cn } from "@/lib/utils"
import { useFeedback } from "@/components/providers/feedback-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { openFeedback } = useFeedback()

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Define navigation items
  const mainNavItems = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
  ]

  const resourcesItems = [
    { name: "Process", path: "/process" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "FAQ", path: "/faqs" },
  ]

  const exploreItems = [
    { name: "Playground", path: "/playground" },
    { name: "Feedback", path: "#feedback", isButton: true },
  ]

  // Handle feedback button click
  const handleFeedbackClick = () => {
    setIsMenuOpen(false) // Close mobile menu first
    setTimeout(() => {
      openFeedback() // Open feedback modal using context
    }, 100)
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow",
        scrolled ? "shadow-sm" : "",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
            <img
              src="https://cezymahmqxazoloshntq.supabase.co/storage/v1/object/public/images//7jislqci8pr_1741721211664.png"
              alt="Avatar"
              className="object-cover"
            />
          </div>
          Coriyon
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
          {/* Primary navigation items */}
          {mainNavItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path))
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
              aria-current={
                pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path)) ? "page" : undefined
              }
            >
              {item.name}
            </Link>
          ))}

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
                <DropdownMenuItem key={item.path || item.name}>
                  {item.isButton ? (
                    <button onClick={handleFeedbackClick} className="w-full text-left cursor-pointer">
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      href={item.path}
                      className={cn(
                        "w-full cursor-pointer",
                        pathname === item.path || pathname.startsWith(`${item.path}/`)
                          ? "font-medium text-primary"
                          : "",
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Right side actions - Theme toggle and Get in touch */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <Button asChild>
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t py-6 md:hidden">
          <div className="container flex flex-col">
            {/* Main navigation links */}
            <nav className="flex flex-col">
              {mainNavItems.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    "py-3 text-lg font-medium transition-colors hover:text-primary",
                    pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path))
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Dropdown sections */}
            <div className="flex flex-col mt-4 border-t pt-4">
              {/* Resources section */}
              <div className="py-1">
                <div className="py-3 text-lg font-medium text-muted-foreground">Resources</div>
                <div className="pl-4 py-2 flex flex-col">
                  {resourcesItems.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={cn(
                        "py-2 text-base font-medium transition-colors hover:text-primary",
                        pathname === link.path || pathname.startsWith(`${link.path}/`)
                          ? "text-primary"
                          : "text-muted-foreground",
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Explore section */}
              <div className="py-1">
                <div className="py-3 text-lg font-medium text-muted-foreground">Explore</div>
                <div className="pl-4 py-2 flex flex-col">
                  {exploreItems.map((link) =>
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
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Get in touch button */}
            <div className="mt-6 pt-4 border-t">
              <Button asChild className="w-full" onClick={() => setIsMenuOpen(false)}>
                <Link href="/contact">Get in touch</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

