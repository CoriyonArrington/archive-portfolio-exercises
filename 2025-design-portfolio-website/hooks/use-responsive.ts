"use client"

/**
 * useResponsive Hook
 *
 * This hook provides responsive design utilities based on the current viewport size.
 * It uses the useMediaQuery hook to determine the current breakpoint.
 *
 * Features:
 * - Breakpoint detection (mobile, tablet, desktop)
 * - Responsive value selection based on current breakpoint
 * - Window resize event handling with debouncing
 */
import { useMemo } from "react"
import { useMediaQuery } from "./use-media-query"

type Breakpoint = "mobile" | "tablet" | "desktop" | "wide"

interface ResponsiveOptions {
  mobileMaxWidth?: string
  tabletMaxWidth?: string
  desktopMaxWidth?: string
}

export function useResponsive(options: ResponsiveOptions = {}) {
  const { mobileMaxWidth = "767px", tabletMaxWidth = "1023px", desktopMaxWidth = "1279px" } = options

  const isMobile = useMediaQuery(`(max-width: ${mobileMaxWidth})`)
  const isTablet = useMediaQuery(
    `(min-width: ${Number.parseInt(mobileMaxWidth) + 1}px) and (max-width: ${tabletMaxWidth})`,
  )
  const isDesktop = useMediaQuery(
    `(min-width: ${Number.parseInt(tabletMaxWidth) + 1}px) and (max-width: ${desktopMaxWidth})`,
  )
  const isWide = useMediaQuery(`(min-width: ${Number.parseInt(desktopMaxWidth) + 1}px)`)

  // Determine current breakpoint
  const currentBreakpoint = useMemo<Breakpoint>(() => {
    if (isMobile) return "mobile"
    if (isTablet) return "tablet"
    if (isDesktop) return "desktop"
    return "wide"
  }, [isMobile, isTablet, isDesktop])

  // Get responsive value based on breakpoint
  function getResponsiveValue<T>(values: {
    mobile?: T
    tablet?: T
    desktop?: T
    wide?: T
    default: T
  }): T {
    if (currentBreakpoint === "mobile" && values.mobile !== undefined) {
      return values.mobile
    }

    if (currentBreakpoint === "tablet" && values.tablet !== undefined) {
      return values.tablet
    }

    if (currentBreakpoint === "desktop" && values.desktop !== undefined) {
      return values.desktop
    }

    if (currentBreakpoint === "wide" && values.wide !== undefined) {
      return values.wide
    }

    return values.default
  }

  return {
    isMobile,
    isTablet,
    isDesktop,
    isWide,
    currentBreakpoint,
    getResponsiveValue,
  }
}
