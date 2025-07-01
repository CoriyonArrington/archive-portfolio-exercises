"use client"

import { useState, useEffect } from "react"

interface ImageDebuggerProps {
  src: string
  alt?: string
}

export default function ImageDebugger({ src, alt = "Image" }: ImageDebuggerProps) {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null)

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setStatus("success")
      setDimensions({ width: img.width, height: img.height })
    }
    img.onerror = () => {
      setStatus("error")
    }
    img.src = src
  }, [src])

  return (
    <div className="p-4 border rounded-md">
      <h3 className="font-bold mb-2">Image Debug Info</h3>
      <p>
        <strong>Source:</strong> {src}
      </p>
      <p>
        <strong>Alt:</strong> {alt}
      </p>
      <p>
        <strong>Status:</strong> {status}
      </p>
      {dimensions && (
        <p>
          <strong>Dimensions:</strong> {dimensions.width}x{dimensions.height}
        </p>
      )}
      {status === "error" && (
        <p className="text-red-500 mt-2">Error loading image. Check if the path is correct and the image exists.</p>
      )}
    </div>
  )
}
