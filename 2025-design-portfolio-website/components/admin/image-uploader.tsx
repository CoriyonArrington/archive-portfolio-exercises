"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { uploadImage } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Upload, X } from "lucide-react"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"

interface ImageUploaderProps {
  onUploadComplete?: (uploadedUrl: string) => void
  bucket?: string
  folder?: string
  accept?: string
  maxSizeMB?: number
}

export function ImageUploader({
  onUploadComplete,
  bucket = "images",
  folder,
  accept = "image/jpeg, image/png, image/webp",
  maxSizeMB = 5,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const maxSizeBytes = maxSizeMB * 1024 * 1024

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (!selectedFile) {
      return
    }

    // Validate file size
    if (selectedFile.size > maxSizeBytes) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${maxSizeMB}MB`,
        variant: "destructive",
      })
      return
    }

    // Create preview
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
    setFile(selectedFile)

    // Clean up preview URL when component unmounts
    return () => URL.revokeObjectURL(objectUrl)
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadProgress(10) // Start progress

    try {
      console.log("Starting image upload for file:", file.name)

      // Progress simulation
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 500)

      const uploadedUrl = await uploadImage(file, bucket, folder)
      clearInterval(progressInterval)

      if (!uploadedUrl) {
        throw new Error("Upload failed - no URL returned")
      }

      console.log("Upload completed, URL:", uploadedUrl)
      setUploadProgress(100)

      toast({
        title: "Upload successful",
        description: "Your image has been uploaded",
      })

      if (onUploadComplete) {
        console.log("Calling onUploadComplete with URL:", uploadedUrl)
        onUploadComplete(uploadedUrl)
      } else {
        console.warn("No onUploadComplete callback provided")
      }

      // Reset state
      setTimeout(() => {
        setPreview(null)
        setFile(null)
        setUploadProgress(0)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      }, 1000)
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "There was an error uploading your image",
        variant: "destructive",
      })
      setUploadProgress(0)
    } finally {
      setIsUploading(false)
    }
  }

  const handleCancel = () => {
    setPreview(null)
    setFile(null)
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="image-upload">Upload Image</Label>
        <Input
          id="image-upload"
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <p className="text-xs text-muted-foreground">Accepted formats: JPEG, PNG, WebP. Maximum size: {maxSizeMB}MB</p>
      </div>

      {preview && (
        <div className="relative aspect-video w-full max-w-md border rounded-md overflow-hidden">
          <Image src={preview || "/placeholder.svg"} alt="Upload preview" fill className="object-contain" />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full"
            onClick={handleCancel}
            disabled={isUploading}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Cancel</span>
          </Button>
        </div>
      )}

      {uploadProgress > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      <div className="flex gap-2">
        <Button onClick={handleUpload} disabled={!file || isUploading}>
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
