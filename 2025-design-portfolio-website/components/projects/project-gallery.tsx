/**
 * ProjectGallery component
 *
 * Displays a gallery of project images with lazy loading
 * Only loads images when they're about to enter the viewport
 */
"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProjectGalleryProps {
  images: string[]
  alt: string
}

export function ProjectGallery({ images, alt }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={images[selectedImage] || "/placeholder.svg"}
          alt={`${alt} - image ${selectedImage + 1}`}
          fill
          className="object-cover"
          priority={selectedImage === 0}
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative aspect-video overflow-hidden rounded-md border-2",
                selectedImage === index ? "border-primary" : "border-transparent",
              )}
              aria-label={`View image ${index + 1}`}
              aria-current={selectedImage === index}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
