"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { getImageDimensions } from "@/lib/utils/image-debug"

export default function ImageDebugPage() {
  const [projectId, setProjectId] = useState("")
  const [thumbnailUrl, setThumbnailUrl] = useState("")
  const [imageInfo, setImageInfo] = useState<{ width?: number; height?: number; error?: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFixing, setIsFixing] = useState(false)
  const { toast } = useToast()

  const checkImage = async () => {
    if (!thumbnailUrl) return

    setImageInfo(null)

    try {
      const dimensions = await getImageDimensions(thumbnailUrl)

      if (dimensions) {
        setImageInfo({
          width: dimensions.width,
          height: dimensions.height,
        })
        toast({
          title: "Image check successful",
          description: `Dimensions: ${dimensions.width}x${dimensions.height}`,
        })
      } else {
        setImageInfo({ error: "Failed to load image" })
        toast({
          title: "Image check failed",
          description: "Could not load the image",
          variant: "destructive",
        })
      }
    } catch (error) {
      setImageInfo({ error: error instanceof Error ? error.message : "Unknown error" })
      toast({
        title: "Error checking image",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      })
    }
  }

  const fixThumbnail = async () => {
    if (!projectId || !thumbnailUrl) {
      toast({
        title: "Missing information",
        description: "Please provide both project ID and thumbnail URL",
        variant: "destructive",
      })
      return
    }

    setIsFixing(true)

    try {
      const response = await fetch(
        `/admin/fix-thumbnails?projectId=${projectId}&thumbnailUrl=${encodeURIComponent(thumbnailUrl)}`,
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Request failed with status ${response.status}`)
      }

      const data = await response.json()

      toast({
        title: "Thumbnail fixed",
        description: `Updated thumbnail for ${data.project.title}`,
      })

      // Force reload after a short delay
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error) {
      toast({
        title: "Error fixing thumbnail",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsFixing(false)
    }
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Image Debugging Tools</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Check Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image-url">Image URL</Label>
                <Input
                  id="image-url"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <Button onClick={checkImage}>Check Image</Button>

              {imageInfo && (
                <div className="mt-4 p-4 border rounded-md">
                  {imageInfo.error ? (
                    <p className="text-red-500">Error: {imageInfo.error}</p>
                  ) : (
                    <>
                      <p>Width: {imageInfo.width}px</p>
                      <p>Height: {imageInfo.height}px</p>
                    </>
                  )}
                </div>
              )}

              {thumbnailUrl && (
                <div className="mt-4">
                  <p className="mb-2 font-medium">Image Preview:</p>
                  <div className="relative aspect-video w-full rounded-md overflow-hidden bg-muted">
                    <Image
                      src={thumbnailUrl || "/placeholder.svg"}
                      alt="Image preview"
                      fill
                      className="object-cover"
                      onError={() => {
                        setImageInfo({ error: "Failed to load image" })
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fix Project Thumbnail</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-id">Project ID</Label>
                <Input
                  id="project-id"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  placeholder="project-id"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail-url">Thumbnail URL</Label>
                <Input
                  id="thumbnail-url"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <Button onClick={fixThumbnail} disabled={isFixing}>
                {isFixing ? "Fixing..." : "Fix Thumbnail"}
              </Button>

              <div className="mt-4 p-4 border rounded-md bg-muted">
                <p className="text-sm">
                  This tool will update the thumbnail_url field for the specified project and force revalidation of all
                  related pages.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Specific Fix for "Increasing patient engagement"</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Click the button below to fix the thumbnail for the "Increasing patient engagement" project:
          </p>

          <Button
            onClick={() => {
              setProjectId("your-project-id-here") // You'll need to replace this with the actual ID
              setThumbnailUrl(
                "https://cezymahmqxazoloshntq.supabase.co/storage/v1/object/public/images/general/tt1c2yt8iq_1742502496207.jpeg",
              )
              setTimeout(() => {
                fixThumbnail()
              }, 100)
            }}
          >
            Fix "Increasing patient engagement" Thumbnail
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
