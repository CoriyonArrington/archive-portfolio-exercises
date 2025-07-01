"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Linkedin, Mail, Map } from "lucide-react"
import { useEffect } from "react"

export default function Footer() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top on route changes
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [pathname])

  const handleFeedbackClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // Dispatch a custom event to open the feedback modal
    window.dispatchEvent(new CustomEvent("openFeedback"))
  }

  return (
    <footer className="bg-background">
      <div className="container mx-auto px-4 py-16 md:px-8 lg:px-16">
        {/* Single row layout with responsive adjustments */}
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Logo and description */}
          <div className="flex-none md:w-5/12 lg:w-4/12 mb-10 md:mb-0">
            <Link href="/" className="font-playfair text-xl font-bold inline-flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden border mr-3">
                <img
                  src="https://cezymahmqxazoloshntq.supabase.co/storage/v1/object/public/images//7jislqci8pr_1741721211664.png"
                  alt="Coriyon"
                  className="w-full h-full object-cover"
                />
              </div>
              <span>
                Coriyon's <span className="text-[#4CAF50]">Studio</span>
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Senior Product Designer with a biomedical engineering background. I specialize in creating seamless
              customer experiences for tech startups and enterprises.
            </p>
          </div>

          {/* Navigation columns */}
          <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {/* Main Navigation */}
            <div>
              <h3 className="text-base font-medium mb-4">Main</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/work" className="text-muted-foreground hover:text-primary transition-colors">
                    Work
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-base font-medium mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/process" className="text-muted-foreground hover:text-primary transition-colors">
                    Process
                  </Link>
                </li>
                <li>
                  <Link href="/testimonials" className="text-muted-foreground hover:text-primary transition-colors">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="/faqs" className="text-muted-foreground hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Explore */}
            <div>
              <h3 className="text-base font-medium mb-4">Explore</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/playground" className="text-muted-foreground hover:text-primary transition-colors">
                    Playground
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleFeedbackClick}
                    className="text-muted-foreground hover:text-primary transition-colors bg-transparent border-none p-0 cursor-pointer"
                  >
                    Feedback
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact information */}
            <div>
              <h3 className="text-base font-medium mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <Link
                    href="mailto:coriyonarrington@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors truncate"
                  >
                    coriyonarrington@gmail.com
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <Link
                    href="https://www.linkedin.com/in/coriyon/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <Map className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">Minneapolis, MN</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="container mx-auto px-4 py-6 md:px-8 lg:px-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Coriyon's Portfolio. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
