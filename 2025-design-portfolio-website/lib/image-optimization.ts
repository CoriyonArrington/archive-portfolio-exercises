// Image optimization utility functions

/**
 * Generates a simple blur data URL for image placeholders
 * @returns A tiny, blurred image as a data URL
 */
export function getBlurDataURL(): string {
  return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAJJXIDTjwAAAABJRU5ErkJggg=="
}

/**
 * Returns optimized image props for Next.js Image component
 * @param src Image source URL
 * @param width Image width
 * @param height Image height
 * @param priority Whether the image should be prioritized
 * @returns Props object for Next.js Image component
 */
export function getImageProps(src: string, width: number, height: number, priority = false) {
  return {
    src,
    width,
    height,
    loading: priority ? ("eager" as const) : ("lazy" as const),
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    style: { objectFit: "cover" as const },
    placeholder: "blur" as const,
    blurDataURL: getBlurDataURL(),
    priority,
  }
}

/**
 * Optimizes image URL to use WebP format if possible
 * @param url Original image URL
 * @returns Optimized image URL
 */
export function optimizeImageUrl(url: string): string {
  // If it's a placeholder, return as is
  if (url.includes("placeholder.svg")) {
    return url
  }

  // If it's already a WebP, return as is
  if (url.endsWith(".webp")) {
    return url
  }

  // If it's a Supabase URL, try to add WebP format parameter
  if (url.includes("supabase.co")) {
    // Add format=webp parameter if not already present
    const hasParams = url.includes("?")
    return `${url}${hasParams ? "&" : "?"}format=webp`
  }

  return url
}
