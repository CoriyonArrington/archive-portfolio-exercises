import Image from "next/image"
import type { TestimonialType } from "@/lib/testimonials"

interface TestimonialCardProps {
  testimonial: TestimonialType
  featured?: boolean
}

export default function TestimonialCard({ testimonial, featured = false }: TestimonialCardProps) {
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return "??"
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div
      className={`${featured ? "bg-black" : "bg-white dark:bg-black"} rounded-lg p-6 ${!featured && "border border-gray-200 dark:border-gray-800"}`}
    >
      <div className="mb-4">
        <span className="text-green-500 text-4xl leading-none">&ldquo;</span>
      </div>

      <p className={`italic mb-6 ${featured ? "text-white" : "text-gray-700 dark:text-white"}`}>{testimonial.quote}</p>

      <div className="flex items-center">
        {testimonial.image ? (
          <Image
            src={testimonial.image || "/placeholder.svg"}
            alt={`Photo of ${testimonial.author || testimonial.name || "client"}`}
            width={48}
            height={48}
            className="rounded-full mr-4"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mr-4 flex items-center justify-center">
            <span className="text-gray-700 dark:text-gray-200 font-semibold">
              {getInitials(testimonial.author || testimonial.name || "")}
            </span>
          </div>
        )}
        <div>
          <p className={`font-semibold ${featured ? "text-white" : "text-gray-900 dark:text-white"}`}>
            {testimonial.author || testimonial.name}
          </p>
          {testimonial.title && (
            <p className={`${featured ? "text-gray-300" : "text-gray-600 dark:text-gray-300"}`}>{testimonial.title}</p>
          )}
          {testimonial.project && <p className="text-green-500 text-sm">Project: {testimonial.project}</p>}
        </div>
      </div>
    </div>
  )
}
