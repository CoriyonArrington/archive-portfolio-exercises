import type React from "react"

interface Testimonial {
  id: number
  quote: string
  author: string
  title: string
  image: string
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-24" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 id="testimonials-heading" className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          What people are saying
        </h2>
        <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.author}
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <p>{testimonial.title}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-base text-gray-700">&ldquo;{testimonial.quote}&rdquo;</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection

