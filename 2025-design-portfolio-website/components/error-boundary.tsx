"use client"

import { useEffect } from "react"

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to the console
    console.error("Error boundary caught error:", error)
  }, [error])

  return (
    <div className="p-8 bg-red-50 border border-red-200 rounded-lg">
      <h2 className="text-xl font-bold text-red-800 mb-4">Something went wrong!</h2>
      <p className="text-red-700 mb-4">{error.message}</p>
      <button onClick={reset} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
        Try again
      </button>
    </div>
  )
}
