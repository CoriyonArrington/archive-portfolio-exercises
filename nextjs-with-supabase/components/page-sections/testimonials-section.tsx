// components/page-sections/testimonials-section.tsx (Consistent Padding)
import React from 'react';
import { TestimonialCard } from '@/components/common/testimonial-card';
import type { Testimonial, TestimonialsSectionProps } from '@/types/testimonials';
import { H2, P } from '@/components/typography';
import { cn } from '@/lib/utils';

interface SharedTestimonialsProps extends TestimonialsSectionProps { className?: string; }

export default function TestimonialsSection({ headline, body, testimonials, className }: SharedTestimonialsProps) {
  const currentTestimonials = testimonials ?? [];
  if (currentTestimonials.length === 0) { return null; }

  return (
    <section
      id="testimonials"
      // --- UPDATED: Removed negative margin ---
      className={cn(
        "bg-muted py-16 md:py-24 mb-16 md:mb-24", // Just BG, PY, MB
        className
       )}
     >
      {/* Inner container applies consistent padding */}
      {/* --- UPDATED: Standardized Padding --- */}
      <div className="container mx-auto text-center px-4 md:px-8"> {/* Example padding */}
        <H2 className="mb-4">{headline ?? 'What Clients Say'}</H2>
        {body && <P className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 md:mb-12">{body}</P>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentTestimonials.map((testimonial) => ( <TestimonialCard key={testimonial.id} {...testimonial} name={testimonial.name ?? 'Anonymous'} role={testimonial.role ?? 'Contributor'} quote={testimonial.quote ?? ''}/> ))}
        </div>
      </div>
    </section>
  );
}