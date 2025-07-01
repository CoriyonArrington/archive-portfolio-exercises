/**
 * SectionHeading component
 *
 * A reusable component for section headings throughout the site
 * Provides consistent styling and structure for page and section titles
 * With simplified progressive disclosure for descriptions
 */
"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

interface SectionHeadingProps {
  title: string
  description?: string
  align?: "left" | "center" | "right"
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  id?: string
}

export function SectionHeading({
  title,
  description,
  align = "left",
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  id,
}: SectionHeadingProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Split description into first sentence and rest
  const splitDescription = () => {
    if (!description) return { firstSentence: "", rest: "" }

    // Match for sentence ending with period, question mark, or exclamation mark followed by space or end of string
    const match = description.match(/^(.*?[.!?])\s(.*)$/s)

    if (match) {
      return {
        firstSentence: match[1],
        rest: match[2],
      }
    }

    // If no match (no sentence ending punctuation), just return the whole text as first sentence
    return {
      firstSentence: description,
      rest: "",
    }
  }

  const { firstSentence, rest } = splitDescription()
  const hasMoreContent = rest.length > 0

  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  }

  return (
    <div className={cn("mb-12", alignmentClasses[align], className)}>
      <h2 id={id} className={cn("text-3xl md:text-4xl font-bold tracking-tight", "mb-6", titleClassName)}>
        {title}
      </h2>
      {description && (
        <div className="relative">
          <p
            className={cn(
              "text-xl text-muted-foreground max-w-3xl",
              align === "center" && "mx-auto",
              align === "right" && "ml-auto",
              descriptionClassName,
            )}
          >
            {firstSentence}
            {hasMoreContent && isExpanded && <span>{" " + rest}</span>}
          </p>

          {hasMoreContent && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={cn(
                "text-sm font-medium mt-3 flex items-center",
                align === "center" && "mx-auto",
                align === "right" && "ml-auto",
                align === "left" && "",
              )}
              aria-expanded={isExpanded}
              aria-controls="description-content"
            >
              {isExpanded ? "See less" : "See more"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn("ml-1 transition-transform", isExpanded ? "rotate-180" : "")}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
