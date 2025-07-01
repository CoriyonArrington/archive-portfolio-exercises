import type React from "react"
import { cn } from "@/lib/utils"

interface BrowserMockupProps {
  children: React.ReactNode
  className?: string
}

export function BrowserMockup({ children, className }: BrowserMockupProps) {
  return (
    <div className={cn("rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md", className)}>
      {/* Browser chrome */}
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 flex items-center border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
        <div className="mx-auto w-4/5 max-w-md">
          <div className="bg-white dark:bg-gray-700 h-6 rounded-md flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 px-2 truncate">
            {/* URL bar */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-900">{children}</div>
    </div>
  )
}

export default BrowserMockup
