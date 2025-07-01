import type React from "react"
import { cn } from "@/lib/utils"

interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number
  height?: number
}

export function Placeholder({ width = 100, height = 100, className, ...props }: PlaceholderProps) {
  return (
    <div
      className={cn("flex items-center justify-center bg-muted text-muted-foreground rounded-md", className)}
      style={{ width: `${width}px`, height: `${height}px` }}
      {...props}
    >
      {width} × {height}
    </div>
  )
}
