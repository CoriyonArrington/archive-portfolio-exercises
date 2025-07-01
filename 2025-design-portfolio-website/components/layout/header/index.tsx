"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowRight } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { NavLinks } from "./nav-links"
import { MobileNav } from "./mobile-nav"

// Header component that appears at the top of every page
// Includes navigation links and theme toggle
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 sm:px-6 md:px-8 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
            <img
              src="https://cezymahmqxazoloshntq.supabase.co/storage/v1/object/public/images//7jislqci8pr_1741721211664.png"
              alt="Avatar"
              className="object-cover"
            />
          </div>
          <span>
            Coriyon's <span className="text-[#4CAF50]">Studio</span>
          </span>
        </Link>

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex items-center justify-center">
          <NavLinks pathname={pathname} />
        </div>

        {/* Right side actions - Theme toggle and Get in touch */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle showLabel={false} />
          <Button asChild className="bg-green-700 hover:bg-green-800 text-white">
            <Link href="/contact" className="flex items-center gap-2">
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle showLabel={false} />
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 text-foreground"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-[1.2rem] w-[1.2rem]" /> : <Menu className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && <MobileNav pathname={pathname} onLinkClick={() => setIsMenuOpen(false)} />}
    </header>
  )
}
