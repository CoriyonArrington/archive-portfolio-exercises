"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export function DownloadResumeButton({ className }: { className?: string }) {
  return (
    <Button
      variant="outline"
      className={`w-full flex items-center justify-center gap-2 ${className || ""}`}
      onClick={() =>
        window.open("https://drive.google.com/file/d/1iH2sulJLbcbR7Z1g9FJwBPUyLczjiqn8/view?usp=sharing", "_blank")
      }
    >
      View Resume
      <ExternalLink className="h-4 w-4" aria-hidden="true" />
    </Button>
  )
}
