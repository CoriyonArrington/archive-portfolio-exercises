"use client"

import type React from "react"

/**
 * Accessible Tabs Component
 *
 * This component provides an accessible tabs implementation.
 *
 * Accessibility features:
 * - Proper ARIA roles and attributes
 * - Keyboard navigation
 * - Focus management
 * - Proper tab panel association
 */
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TabProps {
  id: string
  label: string
  children: React.ReactNode
  isActive?: boolean
  onClick?: () => void
  className?: string
  labelClassName?: string
}

export function Tab({ id, label, children, isActive = false, onClick, className, labelClassName }: TabProps) {
  const panelId = `panel-${id}`

  return (
    <>
      <button
        id={`tab-${id}`}
        role="tab"
        aria-selected={isActive}
        aria-controls={panelId}
        tabIndex={isActive ? 0 : -1}
        onClick={onClick}
        className={cn(
          "px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          isActive
            ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300",
          labelClassName,
        )}
      >
        {label}
      </button>
      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`tab-${id}`}
        hidden={!isActive}
        tabIndex={0}
        className={cn("focus:outline-none p-4", className)}
      >
        {children}
      </div>
    </>
  )
}

interface AccessibleTabsProps {
  tabs: {
    id: string
    label: string
    content: React.ReactNode
  }[]
  defaultTabId?: string
  orientation?: "horizontal" | "vertical"
  className?: string
  tabListClassName?: string
  tabPanelClassName?: string
  onChange?: (selectedTabId: string) => void
}

export default function AccessibleTabs({
  tabs,
  defaultTabId,
  orientation = "horizontal",
  className,
  tabListClassName,
  tabPanelClassName,
  onChange,
}: AccessibleTabsProps) {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id || "")
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId)
    onChange?.(tabId)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const tabsCount = tabs.length
    let nextIndex = index

    switch (e.key) {
      case "ArrowRight":
        if (orientation === "horizontal") {
          nextIndex = (index + 1) % tabsCount
          e.preventDefault()
        }
        break
      case "ArrowLeft":
        if (orientation === "horizontal") {
          nextIndex = (index - 1 + tabsCount) % tabsCount
          e.preventDefault()
        }
        break
      case "ArrowDown":
        if (orientation === "vertical") {
          nextIndex = (index + 1) % tabsCount
          e.preventDefault()
        }
        break
      case "ArrowUp":
        if (orientation === "vertical") {
          nextIndex = (index - 1 + tabsCount) % tabsCount
          e.preventDefault()
        }
        break
      case "Home":
        nextIndex = 0
        e.preventDefault()
        break
      case "End":
        nextIndex = tabsCount - 1
        e.preventDefault()
        break
      default:
        return
    }

    // Focus and activate the next tab
    if (tabRefs.current[nextIndex]) {
      tabRefs.current[nextIndex]?.focus()
      handleTabChange(tabs[nextIndex].id)
    }
  }

  // Set up tab refs
  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, tabs.length)
  }, [tabs.length])

  return (
    <div className={cn("w-full", className)}>
      <div
        role="tablist"
        aria-orientation={orientation}
        className={cn(
          orientation === "horizontal"
            ? "flex border-b border-gray-200 dark:border-gray-700"
            : "flex flex-col border-r border-gray-200 dark:border-gray-700",
          tabListClassName,
        )}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={activeTabId === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTabId === tab.id ? 0 : -1}
            ref={(el) => {
              if (tabRefs.current) {
                tabRefs.current[index] = el
              }
            }}
            onClick={() => handleTabChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              "px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              activeTabId === tab.id
                ? orientation === "horizontal"
                  ? "border-b-2 border-blue-500 -mb-px text-blue-600 dark:text-blue-400"
                  : "border-r-2 border-blue-500 -mr-px text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={tabPanelClassName}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTabId !== tab.id}
            tabIndex={0}
            className={cn("focus:outline-none p-4", activeTabId === tab.id ? "block" : "hidden")}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}
