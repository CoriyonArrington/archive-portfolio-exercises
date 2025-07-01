"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type React from "react"

// Define our own props interface based on next-themes documentation
interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string | undefined
  defaultTheme?: string | undefined
  enableSystem?: boolean | undefined
  disableTransitionOnChange?: boolean | undefined
  forcedTheme?: string | undefined
  storageKey?: string | undefined
  themes?: string[] | undefined
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
