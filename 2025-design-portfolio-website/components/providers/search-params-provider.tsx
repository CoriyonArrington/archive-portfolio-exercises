"use client"

import { Suspense, type ReactNode } from "react"
import { useSearchParams } from "next/navigation"

interface SearchParamsContextProps {
  children: ReactNode
  fallback?: ReactNode
}

function SearchParamsContent({ children }: { children: ReactNode }) {
  // This component will trigger the client-side rendering
  useSearchParams()
  return <>{children}</>
}

export function SearchParamsProvider({ children, fallback = null }: SearchParamsContextProps) {
  return (
    <Suspense fallback={fallback}>
      <SearchParamsContent>{children}</SearchParamsContent>
    </Suspense>
  )
}
