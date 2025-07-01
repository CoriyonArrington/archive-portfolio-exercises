import Image from "next/image"
import { Star } from "lucide-react"

// This appears to be a duplicate component that might be causing confusion
// It should be consolidated with the components/testimonials/testimonial-card.tsx component

export default function Testimonials() {
  // This component might be unused or causing conflicts with the other testimonial components
  console.warn("Using potentially deprecated testimonials component from app/components/testimonials.tsx")

  const testimonials = [
    {
      id: 1,
      quote:
        "Working with this designer transformed our healthcare app from a complex system to an intuitive tool that our users love.",
      author: "Sarah Johnson",
      title: "VP of Product, Healthcare Startup",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      quote:
        "The redesign of our patient portal resulted in a 40% increase in user engagement and significantly reduced support tickets.",
      author: "Michael Chen",
      title: "CTO, MedTech Solutions",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      quote:
        "Their approach to research and user testing was thorough and insightful. The resulting designs addressed pain points we hadn't even identified yet.",
      author: "Dr. Emily Rodriguez",
      title: "Chief Medical Officer, HealthConnect",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <blockquote className="mb-6">
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </blockquote>
              <div className="flex items-center">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={`Portrait of ${testimonial.author}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
