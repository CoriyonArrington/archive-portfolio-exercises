// components/page-sections/testimonials-section.tsx
import React from "react";
import { TestimonialCard } from "@/components/common/testimonial-card";
import { Testimonial, TestimonialsSectionProps } from "@/types/testimonials";

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  headline,
  testimonials,
}) => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">{headline}</h2>
        <div className="flex justify-center gap-8">
          {testimonials.map((testimonial: Testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name ?? ""}
              role={testimonial.role ?? ""}
              quote={testimonial.quote ?? ""}
              imageUrl={testimonial.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
