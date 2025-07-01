/**
 * TestimonialsCaseStudies Component
 *
 * This component displays a section linking to case studies related to the testimonials.
 *
 * Accessibility features:
 * - Semantic heading structure
 * - Proper section labeling with aria-labelledby
 * - Descriptive link text
 * - Decorative icons marked as aria-hidden
 */
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function TestimonialsCaseStudies() {
  return (
    <section className="mb-24 text-center" aria-labelledby="case-studies-heading">
      <h2 id="case-studies-heading" className="text-2xl md:text-3xl font-bold font-playfair mb-6">
        See the Work Behind the Testimonials
      </h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        Explore detailed case studies to understand how these results were achieved through thoughtful design and
        collaboration.
      </p>
      <Button asChild size="lg">
        <Link href="/work" aria-label="View detailed case studies of projects mentioned in testimonials">
          View Case Studies <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Link>
      </Button>
    </section>
  )
}

