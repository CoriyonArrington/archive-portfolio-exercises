import type React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  action?: {
    label: string
    href: string
  }
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ eyebrow, title, description, action }) => {
  return (
    <div className="w-full flex flex-col mb-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          {eyebrow && (
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">{eyebrow}</p>
          )}
          <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
          {description && <p className="mt-2 text-lg text-muted-foreground max-w-2xl">{description}</p>}
        </div>

        {/* Hide the button on mobile - it will be shown at the bottom */}
        {action && (
          <div className="hidden md:block mt-4 md:mt-0 md:ml-4">
            <Button variant="link" className="group" asChild>
              <Link href={action.href}>
                {action.label}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Show the button at the bottom on mobile */}
      {action && (
        <div className="md:hidden mt-6 self-end">
          <Button variant="link" className="group" asChild>
            <Link href={action.href}>
              {action.label}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

export default SectionHeader
