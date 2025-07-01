"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { uploadImage } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Copy, Check, ImageIcon } from "lucide-react"

export function GeneralImageUploader() {
  const [uploading, setUploading] = useState(false)
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const { toast } = useToast()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      // Fix the implicit any[] type
      const newUrls: string[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const url = await uploadImage(file, "images", "general")
        if (url) {
          newUrls.push(url)
        }
      }

      setUploadedUrls((prev) => [...prev, ...newUrls])

      toast({
        title: "Upload successful",
        description: `Uploaded ${newUrls.length} image(s)`,
      })
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
      // Reset the file input
      const fileInput = document.getElementById("file-upload") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    }
  }

  const copyToClipboard = (url: string, index: number) => {
    navigator.clipboard.writeText(url)
    setCopiedIndex(index)
    toast({ title: "URL copied to clipboard" })

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedIndex(null)
    }, 2000)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          General Image Uploader
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground mb-2">
              Upload images to use anywhere on your site. After uploading, you can copy the URL to use in your content.
            </p>
            <div>
              <Button
                onClick={() => document.getElementById("file-upload")?.click()}
                disabled={uploading}
                className="w-full sm:w-auto"
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload Images"
                )}
              </Button>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleUpload}
              />
            </div>
          </div>

          {uploadedUrls.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Uploaded Images</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {uploadedUrls.map((url, index) => (
                  <div key={index} className="border rounded-md overflow-hidden bg-white dark:bg-gray-800">
                    <div className="relative h-40 bg-gray-100 dark:bg-gray-700">
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Uploaded ${index + 1}`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=160&width=320"
                        }}
                      />
                    </div>
                    <div className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 truncate">
                          <input
                            value={url}
                            readOnly
                            className="w-full p-2 text-xs border rounded font-mono bg-gray-50 dark:bg-gray-900"
                            onClick={(e) => (e.target as HTMLInputElement).select()}
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(url, index)}
                          className="flex-shrink-0"
                        >
                          {copiedIndex === index ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

