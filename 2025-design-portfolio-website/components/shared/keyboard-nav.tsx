"use client"

import type React from "react"

/**
 * Keyboard Navigation Component
 *
 * This component provides keyboard navigation for a list of items.
 *
 * Features:
 * - Arrow key navigation
 * - Home/End key support
 * - Type-ahead search
 * - Focus management
 * - ARIA attributes for accessibility
 */
import { useState, useRef, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

interface KeyboardNavProps {
  items: {
    id: string
    label: string
    disabled?: boolean
  }[]
  onSelect?: (selectedItemId: string, selectedItemIndex: number) => void
  onHighlight?: (highlightedItemId: string, highlightedItemIndex: number) => void
  orientation?: "vertical" | "horizontal"
  loop?: boolean
  className?: string
  itemClassName?: string
  activeItemClassName?: string
  disabledItemClassName?: string
  initialFocus?: boolean
  initialSelectedIndex?: number
  ariaLabel?: string
  role?: "listbox" | "menu" | "tablist" | "grid" | "tree"
}

export default function KeyboardNav({
  items,
  onSelect,
  onHighlight,
  orientation = "vertical",
  loop = true,
  className,
  itemClassName,
  activeItemClassName,
  disabledItemClassName,
  initialFocus = false,
  initialSelectedIndex = -1,
  ariaLabel = "Keyboard navigable list",
  role = "listbox",
}: KeyboardNavProps) {
  const [activeIndex, setActiveIndex] = useState(initialSelectedIndex)
  const [typeaheadText, setTypeaheadText] = useState("")
  const [typeaheadTimeout, setTypeaheadTimeout] = useState<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  // Reset typeahead after a delay
  const resetTypeahead = useCallback(() => {
    if (typeaheadTimeout) {
      clearTimeout(typeaheadTimeout)
    }
    const timeout = setTimeout(() => {
      setTypeaheadText("")
    }, 1000)
    setTypeaheadTimeout(timeout)
  }, [typeaheadTimeout])

  // Handle typeahead search
  const handleTypeahead = useCallback(
    (char: string) => {
      const newTypeaheadText = typeaheadText + char.toLowerCase()
      setTypeaheadText(newTypeaheadText)

      // Find the first item that starts with the typeahead text
      const foundIndex = items.findIndex(
        (item) => !item.disabled && item.label.toLowerCase().startsWith(newTypeaheadText),
      )

      if (foundIndex !== -1) {
        setActiveIndex(foundIndex)
        onHighlight?.(items[foundIndex].id, foundIndex)
      }

      resetTypeahead()
    },
    [items, onHighlight, resetTypeahead, typeaheadText],
  )

  // Navigate to a specific item
  const navigateToItem = useCallback(
    (newIndex: number) => {
      // Find the next non-disabled item
      let targetIndex = newIndex
      const itemCount = items.length

      // If we're at the end and not looping, stop
      if (targetIndex >= itemCount && !loop) {
        targetIndex = itemCount - 1
      }
      // If we're at the beginning and not looping, stop
      else if (targetIndex < 0 && !loop) {
        targetIndex = 0
      }
      // Apply looping if enabled
      else if (loop) {
        targetIndex = ((targetIndex % itemCount) + itemCount) % itemCount
      }

      // Skip disabled items
      let iterations = 0
      while (iterations < itemCount && items[targetIndex]?.disabled) {
        targetIndex = loop ? (targetIndex + 1) % itemCount : Math.min(targetIndex + 1, itemCount - 1)
        iterations++
      }

      // If we've gone through all items and they're all disabled, don't change
      if (iterations >= itemCount) {
        return
      }

      setActiveIndex(targetIndex)
      onHighlight?.(items[targetIndex].id, targetIndex)
      itemRefs.current[targetIndex]?.focus()
    },
    [items, loop, onHighlight],
  )

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          if (orientation === "vertical") {
            e.preventDefault()
            navigateToItem(activeIndex + 1)
          }
          break
        case "ArrowUp":
          if (orientation === "vertical") {
            e.preventDefault()
            navigateToItem(activeIndex - 1)
          }
          break
        case "ArrowRight":
          if (orientation === "horizontal") {
            e.preventDefault()
            navigateToItem(activeIndex + 1)
          }
          break
        case "ArrowLeft":
          if (orientation === "horizontal") {
            e.preventDefault()
            navigateToItem(activeIndex - 1)
          }
          break
        case "Home":
          e.preventDefault()
          navigateToItem(0)
          break
        case "End":
          e.preventDefault()
          navigateToItem(items.length - 1)
          break
        case "Enter":
        case " ":
          if (activeIndex !== -1 && !items[activeIndex].disabled) {
            e.preventDefault()
            onSelect?.(items[activeIndex].id, activeIndex)
          }
          break
        default:
          // Handle typeahead for printable characters
          if (e.key.length === 1 && e.key.match(/\S/)) {
            handleTypeahead(e.key)
          }
      }
    },
    [activeIndex, handleTypeahead, items, navigateToItem, onSelect, orientation],
  )

  // Set up initial focus
  useEffect(() => {
    if (initialFocus && containerRef.current) {
      containerRef.current.focus()
    }
  }, [initialFocus])

  // Update refs when items change
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length)
  }, [items])

  // Clean up typeahead timeout
  useEffect(() => {
    return () => {
      if (typeaheadTimeout) {
        clearTimeout(typeaheadTimeout)
      }
    }
  }, [typeaheadTimeout])

  return (
    <div
      ref={containerRef}
      className={cn("outline-none", orientation === "vertical" ? "flex flex-col" : "flex flex-row", className)}
      role={role}
      aria-label={ariaLabel}
      tabIndex={activeIndex === -1 ? 0 : -1}
      onKeyDown={handleKeyDown}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          ref={(el) => {
            itemRefs.current[index] = el
          }}
          role={role === "listbox" ? "option" : role === "menu" ? "menuitem" : "button"}
          aria-selected={role === "listbox" && activeIndex === index}
          aria-disabled={!!item.disabled}
          tabIndex={activeIndex === index ? 0 : -1}
          className={cn(
            "outline-none",
            itemClassName,
            activeIndex === index && activeItemClassName,
            item.disabled && disabledItemClassName,
          )}
          onClick={() => {
            if (!item.disabled) {
              setActiveIndex(index)
              onSelect?.(item.id, index)
            }
          }}
          onFocus={() => {
            if (!item.disabled) {
              setActiveIndex(index)
              onHighlight?.(item.id, index)
            }
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  )
}
