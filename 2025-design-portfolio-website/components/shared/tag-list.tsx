/**
 * TagList component
 *
 * Displays a list of tags/badges
 * Used for project categories, skills, etc.
 */
import { Badge } from "@/components/ui/badge"

interface TagListProps {
  tags: string[]
  variant?: "default" | "secondary" | "outline"
  className?: string
}

export function TagList({ tags, variant = "default", className = "" }: TagListProps) {
  // Helper function to clean tag strings
  const formatTag = (tag: string): string => {
    return typeof tag === "string" ? tag.replace(/^\[+|\]+|"+/g, "").trim() : String(tag)
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag, index) => (
        <Badge key={index} variant={variant}>
          {formatTag(tag)}
        </Badge>
      ))}
    </div>
  )
}
