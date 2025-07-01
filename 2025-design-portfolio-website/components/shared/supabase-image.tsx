"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { getPublicImageUrl } from "@/lib/supabase-client"

interface SupabaseImageProps {
  bucket: string
  path: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export default function SupabaseImage({
  bucket = "images",
  path,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: SupabaseImageProps) {
  const [imageUrl, setImageUrl] = useState<string>("/placeholder.svg")
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    if (!path) {
      setImageUrl("/placeholder.svg")
      return
    }

    try {
      const url = getPublicImageUrl(bucket, path)
      setImageUrl(url)
      console.log("Image URL set:", url)
    } catch (err) {
      console.error("Error getting image URL:", err)
      setImageUrl("/placeholder.svg")
      setError(true)
    }
  }, [bucket, path])

  return (
    <>
      {error ? (
        <div className={`bg-gray-200 flex items-center justify-center ${className}`} style={{ width, height }}>
          <span className="text-sm text-gray-500">Image not available</span>
        </div>
      ) : (
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority={priority}
          onError={() => {
            console.error(`Failed to load image: ${imageUrl}`)
            setImageUrl("/placeholder.svg")
            setError(true)
          }}
          unoptimized={true}
        />
      )}
    </>
  )
}
