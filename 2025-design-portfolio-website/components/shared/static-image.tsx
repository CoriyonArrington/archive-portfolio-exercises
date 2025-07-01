import Image from "next/image"
import type { ImageProps } from "next/image"

interface StaticImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
}

// This component is specifically designed for server components
// It doesn't use any client-side event handlers
export default function StaticImage({ src, alt, fallbackSrc = "/placeholder.svg", ...rest }: StaticImageProps) {
  // Use a default src if none provided
  const imageSrc = src || fallbackSrc

  return (
    <div className="relative w-full h-full">
      <Image
        {...rest}
        src={imageSrc || "/placeholder.svg"}
        alt={alt}
        unoptimized // Skip optimization to avoid potential issues
      />
    </div>
  )
}
