import type React from "react"
import TestimonialCard from "./testimonial-card"

interface Testimonial {
  id: number
  name: string
  title: string
  company: string
  image: string
  testimonial: string
  featured: boolean
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials
            .filter((testimonial) => testimonial.featured === true)
            .slice(0, 9)
            .map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
