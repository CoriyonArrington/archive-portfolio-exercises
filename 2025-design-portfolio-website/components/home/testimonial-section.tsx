import { TestimonialPreview } from "./testimonial-preview"

export function TestimonialSection() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">What Our Customers Say</h2>
        <p className="text-gray-700 mb-8">
          Don't just take our word for it. See what our satisfied customers have to say about their experience.
        </p>
        <TestimonialPreview />
      </div>
    </section>
  )
}
