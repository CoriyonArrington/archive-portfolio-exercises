"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { X, Palette, Code2, Layout, UserX, Grid } from "lucide-react"

interface ClientProblem {
  problem?: string
  title?: string
  description?: string
  icon?: React.ReactNode
}

export default function ClientProblems() {
  const problems: ClientProblem[] = [
    {
      title: "Complex User Interfaces",
      description: "Struggling with complex user interfaces that frustrate your customers",
      icon: <Layout className="h-6 w-6" />,
    },
    {
      title: "Low User Adoption",
      description: "Dealing with low user adoption and high abandonment rates",
      icon: <UserX className="h-6 w-6" />,
    },
    {
      title: "Inconsistent Design System",
      description: "Lacking a cohesive design system that scales across products",
      icon: <Grid className="h-6 w-6" />,
    },
    {
      title: "Inconsistent Brand Experience",
      description:
        "Your digital presence lacks cohesion across platforms, diluting your brand impact and confusing potential clients.",
      icon: <Palette className="h-6 w-6" />,
    },
    {
      title: "Outdated Technology Stack",
      description:
        "Your current website uses legacy technologies that are slow, difficult to maintain, and lack modern features.",
      icon: <Code2 className="h-6 w-6" />,
    },
  ]

  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
          } else {
            entry.target.classList.remove("is-visible")
          }
        })
      },
      { threshold: 0.3 }, // Trigger when 30% of the item is visible
    )

    itemRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref)
      }
    })

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref)
        }
      })
    }
  }, [])

  return (
    <section className="py-24" aria-labelledby="client-problems-heading">
      <div className="w-full">
        <h2 id="client-problems-heading" className="text-3xl md:text-4xl font-bold mb-8">
          Are you facing these challenges?
        </h2>

        <div className="space-y-4">
          {problems.map((item, index) => {
            return (
              <div
                ref={(el) => (itemRefs.current[index] = el)}
                key={index}
                className="group bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-start gap-4 
                  transition-all duration-300 ease-in-out cursor-pointer
                  relative overflow-hidden [&.is-visible]:animate-fade-in"
              >
                {/* Hover/scroll background effect */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-500/5 
                  transform -translate-x-full group-hover:translate-x-0 .is-visible:translate-x-0 transition-transform duration-500 ease-out"
                ></div>

                {/* Left border accent that slides in */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 
                  transform -translate-y-full group-hover:translate-y-0 .is-visible:translate-y-0 transition-transform duration-300 ease-out"
                ></div>

                <div
                  className="bg-red-500 dark:bg-red-500/90 p-3 rounded-xl transition-all duration-300 
                  relative z-10 group-hover:bg-red-600 dark:group-hover:bg-red-600/90 .is-visible:bg-red-600 dark:.is-visible:bg-red-600/90"
                >
                  {item.icon ? (
                    <div
                      className="text-red-100 transition-all duration-300
                      group-hover:scale-110 group-hover:rotate-3 .is-visible:scale-110 .is-visible:rotate-3"
                    >
                      {item.icon}
                    </div>
                  ) : (
                    <X className="h-6 w-6 text-red-100" />
                  )}
                </div>
                <div className="relative z-10 transition-all duration-300 group-hover:translate-x-1 .is-visible:translate-x-1">
                  <p className="text-foreground dark:text-white text-base font-medium">{item.title}</p>
                  <p className="text-muted-foreground dark:text-gray-400">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

