import { TimelineItem } from "./timeline-item"
import type { TimelineItemProps } from "./types"

interface TimelineProps {
  items: TimelineItemProps[]
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-12">
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          year={item.year}
          role={item.role}
          company={item.company}
          description={item.description}
          achievements={item.achievements}
          // Don't pass the image prop at all
        />
      ))}
    </div>
  )
}
