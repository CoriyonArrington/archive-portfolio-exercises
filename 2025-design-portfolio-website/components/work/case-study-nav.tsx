"use client"

import { useState, useEffect, useMemo } from "react"
import { Link } from "@/components/ui/link"
import { cn } from "@/lib/utils"

export default function CaseStudyNav() {
  const [activeSection, setActiveSection] = useState<string>("overview")

  // Use useMemo to prevent the sections array from being recreated on every render
  const sections = useMemo(
    () => [
      { id: "overview", label: "Overview" },
      { id: "challenge", label: "Challenge" },
      { id: "solution", label: "Solution" },
      { id: "outcome", label: "Outcome" },
      { id: "process", label: "Process" },
    ],
    [],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -80% 0px" },
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id)
        if (element) observer.unobserve(element)
      })
    }
  }, [sections])

  return (
    <nav className="sticky top-20 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b mb-8">
      <div className="flex overflow-x-auto py-2 gap-6">
        {sections.map(({ id, label }) => (
          <Link
            key={id}
            href={`#${id}`}
            className={cn(
              "text-sm font-medium transition-colors hover:text-foreground",
              activeSection === id ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
