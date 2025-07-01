
import React from 'react';
import { SectionHeading } from '../ui/section-heading';

const testimonials = [
  {
    quote: "Emma's design approach combines strategic thinking with user empathy. Her work on our patient portal directly contributed to a 43% increase in user engagement.",
    name: "Sarah Johnson",
    title: "VP of Product, HealthTech Inc.",
    imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    company: "HealthTech"
  },
  {
    quote: "Working with Emma transformed our approach to user research. Her methods uncovered crucial insights that shaped our product roadmap for the better.",
    name: "Michael Chen",
    title: "CTO, MedLife Solutions",
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    company: "MedLife"
  },
  {
    quote: "Emma's deep understanding of healthcare workflows and user needs resulted in a clinical interface that our physicians actually enjoy using.",
    name: "Dr. Taylor Williams",
    title: "Chief Medical Officer, CareOS",
    imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    company: "CareOS"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24">
      <div className="container">
        <SectionHeading
          title="Trusted by the best"
          description="Hear what healthcare leaders have to say about our collaboration and the results we've achieved together."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-smooth hover:shadow-card transition-shadow relative flex flex-col"
            >
              <div className="mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="inline w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              
              <blockquote className="flex-1">
                <p className="text-lg text-gray-700 italic mb-6">"{testimonial.quote}"</p>
              </blockquote>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.imageUrl} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4 border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
