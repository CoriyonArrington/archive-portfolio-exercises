"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface AboutSidebarNavProps {
  sections: {
    id: string
    label: string
  }[]
}

export default function AboutSidebarNav({ sections }: AboutSidebarNavProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id)

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
    <nav className="space-y-1">
      {sections.map((section) => (
        <Link
          key={section.id}
          href={`#${section.id}`}
          className={cn(
            "block py-2 px-3 rounded-md text-sm font-medium transition-colors hover:bg-muted",
            activeSection === section.id ? "bg-muted text-foreground" : "text-muted-foreground",
          )}
        >
          {section.label}
        </Link>
      ))}
    </nav>
  )
}

