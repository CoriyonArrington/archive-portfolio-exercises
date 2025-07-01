"use client"

import NextImage, { type ImageProps as NextImageProps } from "next/image"
import { useState } from "react"
import { fixSupabaseImageUrl } from "@/lib/utils"

interface ImageProps extends Omit<NextImageProps, "src"> {
  src: string
}

export function Image({ src, alt, ...props }: ImageProps) {
  const [error, setError] = useState(false)
  const fixedSrc = fixSupabaseImageUrl(src)

  if (error) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center ${props.className || ""}`}
        style={{ width: props.width, height: props.height }}
      >
        <span className="text-sm text-gray-500">Image not available</span>
      </div>
    )
  }

  return <NextImage src={fixedSrc} alt={alt} {...props} onError={() => setError(true)} unoptimized={true} />
}
