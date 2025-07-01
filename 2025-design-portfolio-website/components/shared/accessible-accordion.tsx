"use client"

import type * as React from "react"

/**
 * Accessible Accordion Component
 *
 * This component provides an accessible accordion implementation.
 *
 * Accessibility features:
 * - Proper ARIA roles and attributes
 * - Keyboard navigation
 * - Focus management
 * - Proper heading structure
 */
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionItemProps {
  id: string
  title: string
  children: React.ReactNode
  isOpen?: boolean
  onToggle?: (itemId: string) => void
  headingLevel?: 2 | 3 | 4 | 5 | 6
  className?: string
  titleClassName?: string
  contentClassName?: string
}

export function AccordionItem({
  id,
  title,
  children,
  isOpen = false,
  onToggle,
  headingLevel = 3,
  className,
  titleClassName,
  contentClassName,
}: AccordionItemProps) {
  const headingId = `accordion-heading-${id}`
  const contentId = `accordion-content-${id}`

  const handleToggleItem = () => {
    onToggle?.(id)
  }

  const HeadingTag = `h${headingLevel}` as React.ElementType

  return (
    <div className={cn("border-b", className)}>
      <HeadingTag id={headingId} className="m-0">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          id={headingId}
          className={cn(
            "flex w-full items-center justify-between py-4 text-left",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            titleClassName,
          )}
          onClick={handleToggleItem}
        >
          <span className="font-medium">{title}</span>
          <ChevronDown
            className={cn("h-5 w-5 transition-transform duration-200", isOpen && "rotate-180")}
            aria-hidden="true"
          />
        </button>
      </HeadingTag>

      <div
        id={contentId}
        role="region"
        aria-labelledby={headingId}
        hidden={!isOpen}
        className={cn("overflow-hidden transition-all duration-200", isOpen ? "max-h-96" : "max-h-0", contentClassName)}
      >
        <div className="py-4">{children}</div>
      </div>
    </div>
  )
}

interface AccessibleAccordionProps {
  items: {
    id: string
    title: string
    content: React.ReactNode
  }[]
  allowMultiple?: boolean
  defaultOpenItems?: string[]
  className?: string
  itemClassName?: string
  titleClassName?: string
  contentClassName?: string
  headingLevel?: 2 | 3 | 4 | 5 | 6
}

export default function AccessibleAccordion({
  items,
  allowMultiple = false,
  defaultOpenItems = [],
  className,
  itemClassName,
  titleClassName,
  contentClassName,
  headingLevel = 3,
}: AccessibleAccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpenItems)

  const handleToggle = (id: string) => {
    if (allowMultiple) {
      // Toggle item in multi-select mode
      setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    } else {
      // Toggle item in single-select mode
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]))
    }
  }

  return (
    <div className={cn("divide-y divide-gray-200 dark:divide-gray-700", className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          isOpen={openItems.includes(item.id)}
          onToggle={handleToggle}
          headingLevel={headingLevel}
          className={itemClassName}
          titleClassName={titleClassName}
          contentClassName={contentClassName}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  )
}
