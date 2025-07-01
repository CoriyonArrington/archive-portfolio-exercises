"use client"

import type React from "react"
/**
 * ImageCard component
 *
 * A card with an image, title, and optional content
 * Used for projects, services, etc.
 */
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageCardProps {
  src: string
  alt: string
  title: string
  children?: React.ReactNode
  aspectRatio?: "square" | "video" | "portrait"
  className?: string
  imageClassName?: string
  titleClassName?: string
  contentClassName?: string
  onClick?: () => void
}

export function ImageCard({
  src,
  alt,
  title,
  children,
  aspectRatio = "video",
  className = "",
  imageClassName = "",
  titleClassName = "",
  contentClassName = "",
  onClick,
}: ImageCardProps) {
  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
  }

  return (
    <div
      className={cn(
        "card overflow-hidden flex flex-col transition-all duration-300",
        "hover:shadow-md focus-within:shadow-md",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      role={onClick ? "button" : undefined}
    >
      <div className={cn("relative overflow-hidden", aspectRatioClasses[aspectRatio])}>
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className={cn("object-cover transition-transform duration-300 hover:scale-105", imageClassName)}
        />
      </div>
      <div className={cn("flex-1 p-6 flex flex-col", contentClassName)}>
        <h3 className={cn("text-xl font-bold mb-2", titleClassName)}>{title}</h3>
        {children}
      </div>
    </div>
  )
}
