"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { PageLoader } from "@/components/ui/page-loader"
import { usePathname, useSearchParams } from "next/navigation"

interface LoaderContextType {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
}

const LoaderContext = createContext<LoaderContextType>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
})

export const useLoader = () => useContext(LoaderContext)

interface LoaderProviderProps {
  children: ReactNode
  initialLoad?: boolean
}

export function LoaderProvider({ children, initialLoad = true }: LoaderProviderProps) {
  const [isLoading, setIsLoading] = useState(initialLoad)
  const [shouldShowLoader, setShouldShowLoader] = useState(initialLoad)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Handle initial page load
  useEffect(() => {
    if (initialLoad) {
      // Hide loader after initial load
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [initialLoad])

  // Reset loading state on route change
  useEffect(() => {
    // This will only run on subsequent navigation, not on initial load
    if (!initialLoad) {
      setIsLoading(true)
      setShouldShowLoader(true)

      // Short delay for loader to be visible
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [pathname, searchParams, initialLoad])

  // Control when to show/hide the loader component
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShouldShowLoader(false)
      }, 500) // Match this with the CSS transition duration

      return () => clearTimeout(timer)
    } else {
      setShouldShowLoader(true)
    }
  }, [isLoading])

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)

  return (
    <LoaderContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {shouldShowLoader && <PageLoader />}
      {children}
    </LoaderContext.Provider>
  )
}
