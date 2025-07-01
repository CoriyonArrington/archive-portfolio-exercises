// types/testimonials.ts

/** One testimonial record */
export interface Testimonial {
    id: string
    name: string | null
    role: string | null
    quote: string | null
    imageUrl?: string
  }
  
  /** Props for the TestimonialsSection component */
  export interface TestimonialsSectionProps {
    headline: string
    testimonials: Testimonial[]
  }
  