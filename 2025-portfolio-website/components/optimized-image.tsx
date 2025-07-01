"use client"

import Image, { type ImageProps } from "next/image"
import { useState } from "react"

interface OptimizedImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  fallback?: string
}

export function OptimizedImage({ fallback = "/placeholder.svg", ...props }: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <div className={`relative ${props.className || ""} ${isLoading ? "bg-muted animate-pulse" : ""}`}>
      <Image
        {...props}
        src={error ? fallback : props.src}
        className={`${props.className || ""} ${isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500"}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true)
          setIsLoading(false)
        }}
      />
    </div>
  )
}
