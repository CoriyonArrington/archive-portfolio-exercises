import Image from "next/image"
import { cn } from "@/lib/utils"
import type { TestimonialType } from "@/types/testimonial"

interface TestimonialCardProps {
  testimonial: TestimonialType
  className?: string
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <div className={cn("rounded-lg border bg-card dark:bg-gray-800 p-6 shadow-sm dark:border-gray-700", className)}>
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <blockquote className="text-lg font-medium italic text-card-foreground dark:text-gray-200">
            "{testimonial.quote}"
          </blockquote>
        </div>
        <div className="flex items-center gap-4">
          {testimonial.image && (
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              <Image
                src={testimonial.image || "/placeholder.svg"}
                alt={`${testimonial.author}'s avatar`}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
          )}
          <div>
            <p className="font-semibold dark:text-white">{testimonial.author}</p>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              {testimonial.title}, {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
