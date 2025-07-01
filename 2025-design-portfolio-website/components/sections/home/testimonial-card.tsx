"use client"

import type React from "react"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatar: string
  rating?: number
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role, avatar, rating = 5 }) => {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only render component after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkMode = mounted && (theme === "dark" || resolvedTheme === "dark")

  if (!mounted) {
    return null // Return null on server and during hydration
  }

  return (
    <div
      className={`rounded-lg p-6 ${
        isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
      }`}
    >
      <div className="flex mb-2">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p
        style={{
          color: isDarkMode ? "#f1f5f9" : "#1e293b",
        }}
        className="mb-4 italic"
      >
        "{quote}"
      </p>
      <div className="flex items-center">
        <img src={avatar || "/placeholder.svg"} alt={author} className="w-10 h-10 rounded-full mr-3" />
        <div>
          <p
            style={{
              color: isDarkMode ? "#f1f5f9" : "#1e293b",
              fontWeight: 600,
            }}
          >
            {author}
          </p>
          <p
            style={{
              color: isDarkMode ? "#cbd5e1" : "#64748b",
            }}
          >
            {role}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard

