import Image from "next/image"
import { getAllTestimonials, type TestimonialType } from "@/lib/data/testimonials"

export const dynamic = "force-dynamic"
export const revalidate = 0

// Add tag-based revalidation
export const generateMetadata = () => {
  return {
    title: "Client Testimonials",
    description: "What clients say about working with me",
    alternates: {
      canonical: "/testimonials",
    },
  }
}

export default async function TestimonialsPage() {
  // Get all testimonials
  const testimonials = await getAllTestimonials()

  // Filter for featured testimonials
  const featuredTestimonials = testimonials.filter((t) => t.featured === true)

  // Get one featured testimonial (or null if none are featured)
  const featuredTestimonial = featuredTestimonials.length > 0 ? featuredTestimonials[0] : null

  // Get remaining testimonials (excluding the featured one)
  const remainingTestimonials = testimonials.filter((t) =>
    featuredTestimonial ? t.id !== featuredTestimonial.id : true,
  )

  return (
    <main className="container px-0 pt-8 md:pt-12">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Client Testimonials</h1>

      <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-4xl line-clamp-2 overflow-hidden">
        Don't just take my word for it. Here's what healthcare leaders and product teams have to say about working with
        me.
      </p>

      {/* Featured testimonial */}
      {featuredTestimonial ? (
        <div className="bg-white dark:bg-black rounded-lg p-8 mb-16 shadow-md relative border-l-4 border-l-green-500 dark:border-l-green-400">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-6">
              <span className="text-green-500 dark:text-green-400 text-6xl leading-none">&ldquo;</span>
            </div>
            <div>
              <p className="text-2xl italic mb-6 dark:text-gray-200">{featuredTestimonial.quote}</p>
              <div className="flex items-center">
                {featuredTestimonial.image ? (
                  <Image
                    src={featuredTestimonial.image || "/placeholder.svg"}
                    alt={`Photo of ${featuredTestimonial.author || featuredTestimonial.name || "client"}`}
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-gray-700 dark:text-gray-200 font-semibold">
                      {getInitials(featuredTestimonial.author || featuredTestimonial.name || "")}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold dark:text-white">
                    {featuredTestimonial.author || featuredTestimonial.name}
                  </p>
                  {featuredTestimonial.title && (
                    <p className="text-gray-600 dark:text-gray-400">{featuredTestimonial.title}</p>
                  )}
                  {featuredTestimonial.project && (
                    <p className="text-green-500 text-sm">Project: {featuredTestimonial.project}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // If no featured testimonial exists, show a message or nothing
        <div className="mb-16">{/* You can leave this empty or add a message */}</div>
      )}

      {/* Grid of remaining testimonials */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {remainingTestimonials.map((testimonial: TestimonialType) => (
          <div
            key={testimonial.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 dark:bg-black"
          >
            <div className="mb-4">
              <span className="text-green-500 dark:text-green-400 text-4xl leading-none">&ldquo;</span>
            </div>
            <p className="italic mb-6 dark:text-gray-200">{testimonial.quote}</p>
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
                <p className="font-semibold dark:text-white">{testimonial.author || testimonial.name}</p>
                {testimonial.title && <p className="text-gray-600 dark:text-gray-400">{testimonial.title}</p>}
                {testimonial.project && <p className="text-green-500 text-sm">Project: {testimonial.project}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

// Helper function to get initials for avatar fallback
function getInitials(name: string): string {
  if (!name) return "??"

  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .substring(0, 2)
}
