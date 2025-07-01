"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface Section {
  id: string
}

interface AboutNavProps {
  sections: Section[]
}

const AboutNav: React.FC<AboutNavProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null)

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
  }, [sections]) // Added sections to the dependency array

  return (
    <nav>
      {sections.map(({ id }) => (
        <a key={id} href={`#${id}`} className={activeSection === id ? "active" : ""}>
          {id}
        </a>
      ))}
    </nav>
  )
}

export default AboutNav

