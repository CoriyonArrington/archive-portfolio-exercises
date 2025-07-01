"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { listImages, deleteImage } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"
import { Loader2, RefreshCw, Trash2 } from "lucide-react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

interface ImageGalleryProps {
  onSelect?: (url: string) => void
  bucket?: string
  folder?: string
  selectable?: boolean
}

export function ImageGallery({ onSelect, bucket = "images", folder, selectable = true }: ImageGalleryProps) {
  const [images, setImages] = useState<{ name: string; url: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const { toast } = useToast()

  const loadImages = useCallback(async () => {
    setLoading(true)
    try {
      console.log("Loading images from storage...")
      const imageList = await listImages(bucket, folder)
      console.log(`Loaded ${imageList.length} images:`, imageList)
      setImages(imageList)
    } catch (error) {
      console.error("Error loading images:", error)
      toast({
        title: "Error loading images",
        description: "There was an error loading your images",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [bucket, folder, toast])

  useEffect(() => {
    loadImages()
  }, [loadImages])

  const handleDelete = async (imageUrl: string) => {
    setDeleting(imageUrl)
    try {
      console.log(`Deleting image: ${imageUrl}`)
      const success = await deleteImage(imageUrl, bucket)

      if (success) {
        toast({
          title: "Image deleted",
          description: "The image has been deleted successfully",
        })
        // Remove from state
        setImages(images.filter((img) => img.url !== imageUrl))
      } else {
        throw new Error("Delete failed")
      }
    } catch (err) {
      console.error("Delete failed:", err)
      toast({
        title: "Delete failed",
        description: "There was an error deleting the image",
        variant: "destructive",
      })
    } finally {
      setDeleting(null)
    }
  }

  const handleSelectImage = (url: string) => {
    console.log(`Selected image: ${url}`)
    if (selectable && onSelect) {
      onSelect(url)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Image Gallery</h3>
        <Button variant="outline" size="sm" onClick={loadImages} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-md" />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-8 border rounded-md bg-muted/50">
          <p className="text-muted-foreground">No images found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.url}
              className={`group relative aspect-square border rounded-md overflow-hidden ${selectable ? "cursor-pointer" : ""}`}
              onClick={() => handleSelectImage(image.url)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && selectable) {
                  e.preventDefault()
                  handleSelectImage(image.url)
                }
              }}
              tabIndex={selectable ? 0 : -1}
              role={selectable ? "button" : undefined}
              aria-label={selectable ? `Select image ${image.name}` : undefined}
            >
              <Image src={image.url || "/placeholder.svg"} alt={image.name} fill className="object-cover" />

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                {selectable && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSelectImage(image.url)
                    }}
                  >
                    Select
                  </Button>
                )}

                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(image.url)
                  }}
                  disabled={deleting === image.url}
                >
                  {deleting === image.url ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

