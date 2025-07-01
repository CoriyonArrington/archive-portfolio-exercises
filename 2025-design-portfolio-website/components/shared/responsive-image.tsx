"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

export interface ResponsiveImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
  objectPosition?: string
  quality?: number
  sizes?: string
  onLoad?: () => void
  // Note: onError is missing from this interface
}

export default function ResponsiveImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  objectFit = "cover",
  objectPosition = "center",
  quality = 85,
  sizes,
  onLoad,
}: ResponsiveImageProps) {
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={quality}
      sizes={sizes}
      className={cn(
        "transition-opacity duration-300",
        {
          "object-contain": objectFit === "contain",
          "object-cover": objectFit === "cover",
          "object-fill": objectFit === "fill",
          "object-none": objectFit === "none",
          "object-scale-down": objectFit === "scale-down",
        },
        className,
      )}
      style={{
        objectPosition,
      }}
      onLoad={onLoad}
      // The Next.js Image component doesn't have an onError prop
      // We need to handle errors differently
    />
  )
}
