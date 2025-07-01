"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChevronDown } from "lucide-react"

// Theme toggle component
// Allows users to switch between light, dark, and system themes
interface ModeToggleProps {
  showLabel?: boolean
}

export function ModeToggle({ showLabel = true }: ModeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [firstVisit, setFirstVisit] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)

    // Check if this is the user's first visit
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore")
    if (!hasVisitedBefore) {
      setFirstVisit(true)
      localStorage.setItem("hasVisitedBefore", "true")

      // Auto-hide the tooltip after 5 seconds
      const timer = setTimeout(() => {
        setFirstVisit(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="text-foreground" aria-label="Toggle theme">
        <Sun className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip open={firstVisit}>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="relative text-foreground transition-colors flex items-center gap-1 h-10 px-3"
                  aria-label="Toggle theme"
                >
                  {theme === "light" && <Sun className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />}
                  {theme === "dark" && <Moon className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />}
                  {theme === "system" && <Monitor className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />}
                  {!theme && (
                    <>
                      <Sun
                        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                        aria-hidden="true"
                      />
                      <Moon
                        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                        aria-hidden="true"
                      />
                    </>
                  )}
                  {showLabel && (
                    <span className="hidden md:inline ml-2 text-sm font-medium">
                      {theme === "light" && "Light"}
                      {theme === "dark" && "Dark"}
                      {theme === "system" && "System"}
                      {!theme && "Theme"}
                    </span>
                  )}
                  <ChevronDown className="h-3 w-3 ml-1 opacity-70" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")} className={theme === "light" ? "bg-accent" : ""}>
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className={theme === "dark" ? "bg-accent" : ""}>
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className={theme === "system" ? "bg-accent" : ""}>
                  <Monitor className="h-4 w-4 mr-2" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-primary text-primary-foreground">
          <p>Change the theme to light or dark mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
