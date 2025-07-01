"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"

interface TimelineItemProps {
  year: string
  role: string
  company: string
  description: string
  achievements: string[]
  image?: string
}

export function TimelineItem({ year, role, company, description, achievements, image }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (itemRef.current) {
      observer.observe(itemRef.current)
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current)
      }
    }
  }, [])

  return (
    <div ref={itemRef} className="relative mb-16 last:mb-0">
      <div className="absolute -ml-[25px] flex h-full w-12 items-start justify-center">
        <div
          className={`z-20 mt-2 h-4 w-4 rounded-full border-2 border-background transition-colors duration-500 ${
            isVisible ? "bg-primary" : "bg-muted"
          }`}
        />
      </div>
      <div
        className={`ml-8 grid grid-cols-1 gap-8 md:gap-12 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-50 translate-y-4"
        }`}
      >
        <div>
          <h3 className="mb-2 text-xl font-bold text-primary">{year}</h3>
          <h4 className="mb-3 text-2xl font-bold">{role}</h4>
          <p className="mb-4 text-lg font-medium">{company}</p>
          <p className="mb-6 text-muted-foreground">{description}</p>
          {achievements.length > 0 && (
            <div className="mb-6">
              <h5 className="mb-3 font-medium">Key Achievements:</h5>
              <ul className="space-y-2">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mt-2 mr-2 h-2 w-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {image && (
          <div className="overflow-hidden rounded-lg">
            <Image
              src={image || "/placeholder.svg"}
              alt={`${role} at ${company}`}
              width={600}
              height={400}
              className="w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default function Timeline({ items }: { items: TimelineItemProps[] }) {
  return (
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 ml-[7px] w-[2px] bg-border">
        <div className="absolute top-0 h-24 w-full bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 h-24 w-full bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="ml-6">
        {items.map((item, index) => (
          <TimelineItem key={index} {...item} />
        ))}
      </div>
    </div>
  )
}
