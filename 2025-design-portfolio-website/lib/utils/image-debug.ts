/**
 * Utility functions for debugging image issues
 */

export function logImageLoad(src: string, success: boolean, component: string) {
  if (process.env.NODE_ENV === "development") {
    if (success) {
      console.log(`✅ [${component}] Image loaded successfully:`, src)
    } else {
      console.error(`❌ [${component}] Image failed to load:`, src)
    }
  }
}

export function getImageDimensions(url: string): Promise<{ width: number; height: number } | null> {
  return new Promise((resolve) => {
    const img = new Image()

    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      })
    }

    img.onerror = () => {
      console.error(`Failed to load image for dimension check: ${url}`)
      resolve(null)
    }

    img.src = url
  })
}

export function validateImageUrl(url: string | undefined | null): string {
  if (!url) return "/placeholder.svg?height=600&width=800"

  // Check if URL is valid
  try {
    new URL(url)
    return url
  } catch (e) {
    console.error(`Invalid image URL: ${url}`)
    return "/placeholder.svg?height=600&width=800"
  }
}
