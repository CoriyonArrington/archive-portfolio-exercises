"use client"

/**
 * Lazy Image Wrapper Component
 *
 * This component provides a wrapper for lazy-loading images with proper
 * accessibility attributes and loading states.
 *
 * Features:
 * - Intersection Observer for lazy loading
 * - Loading placeholder
 * - Error handling
 * - Proper alt text management
 * - Aspect ratio preservation
 */
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import ResponsiveImage from "./responsive-image"

interface LazyImageWrapperProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  imgClassName?: string
  priority?: boolean
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
  objectPosition?: string
  quality?: number
  sizes?: string
  onLoad?: () => void
  onError?: () => void
}

export default function LazyImageWrapper({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  priority = false,
  objectFit = "cover",
  objectPosition = "center",
  quality = 85,
  sizes,
  onLoad,
  onError,
}: LazyImageWrapperProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Set up Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return // Skip if priority is true

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: "200px", // Start loading when image is 200px from viewport
        threshold: 0.01,
      },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  // Handle image error using useEffect
  useEffect(() => {
    // We'll use a hidden image element to detect errors
    if (isVisible && !hasError) {
      const img = new window.Image() // Use window.Image to access the browser's Image constructor
      img.src = src

      img.onload = () => {
        // No action needed here, the ResponsiveImage will handle loading
      }

      img.onerror = () => {
        setHasError(true)
        onError?.()
      }

      return () => {
        img.onload = null
        img.onerror = null
      }
    }
  }, [isVisible, hasError, src, onError])

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse" aria-hidden="true" />
      )}

      {/* Error placeholder */}
      {hasError && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800"
          role="img"
          aria-label={alt || "Image failed to load"}
        >
          <span className="text-sm text-gray-500 dark:text-gray-400">Image failed to load</span>
        </div>
      )}

      {/* Actual image */}
      {isVisible && !hasError && (
        <ResponsiveImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={imgClassName}
          objectFit={objectFit}
          objectPosition={objectPosition}
          quality={quality}
          sizes={sizes}
          onLoad={handleLoad}
          // We don't pass onError since ResponsiveImage doesn't accept it
        />
      )}
    </div>
  )
}
