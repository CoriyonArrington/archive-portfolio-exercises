import { Button } from "@/components/ui/button"
import { ArrowRight, Quote } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getTestimonials } from "@/lib/data"

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-6">Client Testimonials</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Don't just take my word for it. Here's what healthcare leaders and product teams have to say about working
          with me.
        </p>
      </section>

      {/* Featured Testimonial */}
      {testimonials.length > 0 && (
        <section className="mb-24 bg-muted p-8 md:p-12 rounded-lg">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3">
              <div className="relative w-32 h-32 mx-auto">
                <Image
                  src={testimonials[0].image || "/placeholder.svg"}
                  alt={testimonials[0].author}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <Quote className="h-12 w-12 text-primary/20 mb-4" />
              <blockquote className="text-2xl font-medium italic mb-6">{testimonials[0].quote}</blockquote>
              <div>
                <p className="font-bold">{testimonials[0].author}</p>
                <p className="text-muted-foreground">{testimonials[0].title}</p>
                <p className="text-primary text-sm mt-2">Project: {testimonials[0].project}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Testimonials */}
      <section className="mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.slice(1).map((testimonial) => (
            <div key={testimonial.id} className="border rounded-lg p-6">
              <Quote className="h-8 w-8 text-primary/20 mb-4" />
              <blockquote className="text-lg italic mb-6">{testimonial.quote}</blockquote>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.author}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  <p className="text-primary text-xs mt-1">Project: {testimonial.project}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Client Logos */}
      <section className="mb-24">
        <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-12 text-center">Trusted By</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex items-center justify-center p-4">
              <Image
                src="/placeholder-logo.svg"
                alt={`Client logo ${index + 1}`}
                width={120}
                height={60}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies Link */}
      <section className="mb-24 text-center">
        <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-6">See the Work Behind the Testimonials</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Explore detailed case studies to understand how these results were achieved through thoughtful design and
          collaboration.
        </p>
        <Button asChild size="lg">
          <Link href="/work">
            View Case Studies <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>

      {/* CTA Section */}
      <section className="text-center max-w-3xl mx-auto bg-muted p-8 rounded-lg">
        <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-6">Ready to Be the Next Success Story?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Let's collaborate to create healthcare experiences that delight users and drive business results.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">
            Start a Conversation <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  )
}

