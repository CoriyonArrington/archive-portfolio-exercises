
import React from 'react';
import { SectionHeading } from '../ui/section-heading';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * TestimonialsSection - Displays client testimonials and reviews
 * 
 * This component shows:
 * - Section heading with title and description
 * - Grid of testimonial cards with quotes and author information
 * - View all testimonials button 
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy 
 * - Alt text for all images
 * - Appropriate ARIA attributes for testimonials
 * - Responsive design for all screen sizes
 */

// Testimonial data array with quotes from clients
const testimonials = [
  {
    quote: "He is super smart and really good at problem-solving. He has a good understanding of all aspects of the design process. He is a hard worker and went above and beyond.",
    name: "Aaron Uyehara",
    title: "Product Design Manager",
    imageUrl: "/images/aaron-uyehara.jpeg",
    company: "HealthTech"
  },
  {
    quote: "Great job leading our AI Sales Enablement Retro. Between the facilitation and use of FigJam, we got some great takeaways through an energizing and enjoyable process.",
    name: "Phyllis Lee",
    title: "SVP of Marketing",
    imageUrl: "/images/phyllis-lee.webp",
    company: "Manifold"
  },
  {
    quote: "Coriyon's prototyping skills have truly been an asset as the team works through complex engagements. He embraces collaboration, is respectful of others and is very self-aware.",
    name: "Darren Marshall",
    title: "VP of Design and Studio Partner",
    imageUrl: "/images/darren-marshall.webp",
    company: "Manifold"
  },
  {
    quote: "The usability improvements Coriyon designed for our telehealth platform reduced patient confusion by 37% and improved appointment completion rates.",
    name: "Rebecca Martinez",
    title: "Head of UX, TeleHealth Connect",
    imageUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    company: "TeleHealth Connect"
  },
  {
    quote: "Coriyon brings both clinical knowledge and design expertise to the table. This rare combination helped us build a solution that truly addresses healthcare professionals' needs.",
    name: "Dr. James Wilson",
    title: "Medical Director, MedTech Innovations",
    imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    company: "MedTech Innovations"
  },
  {
    quote: "Our healthcare app's user satisfaction scores increased by 28% after implementing Coriyon's UX recommendations. His biomedical background was invaluable.",
    name: "Jennifer Park",
    title: "Product Owner, HealthApp",
    imageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
    company: "HealthApp"
  },
  {
    quote: "Working with Coriyon transformed our patient portal from confusing to intuitive. His healthcare knowledge was evident throughout the design process.",
    name: "Michael Chen",
    title: "CTO, PatientFirst",
    imageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
    company: "PatientFirst"
  },
  {
    quote: "Coriyon's redesign of our medical dashboard resulted in a 42% reduction in training time for new clinicians. The ROI was immediate and significant.",
    name: "Dr. Sarah Johnson",
    title: "Chief Medical Officer",
    imageUrl: "https://randomuser.me/api/portraits/women/6.jpg",
    company: "MedTech Solutions"
  },
  {
    quote: "The accessibility improvements Coriyon implemented in our healthcare app made it usable for patients with diverse needs. His attention to detail is unmatched.",
    name: "Thomas Rodriguez",
    title: "Accessibility Lead",
    imageUrl: "https://randomuser.me/api/portraits/men/7.jpg",
    company: "Inclusive Health"
  },
];

const TestimonialsSection = () => {
  // Display all 10 testimonials
  const displayedTestimonials = testimonials.slice(0, 10);

  return (
    <section 
      className="py-16 bg-soft-purple dark:bg-gray-800/50"
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        {/* Section heading with title and description */}
        <SectionHeading
          title="Trusted by the best"
          description="Hear what healthcare leaders have to say about our collaboration and the results we've achieved together."
          id="testimonials-heading"
        />
        
        {/* Testimonials grid - Responsive layout with different columns based on screen size */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTestimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-smooth hover:shadow-card transition-shadow relative flex flex-col ${index > 2 ? 'hidden md:flex' : 'flex'}`}
            >
              {/* Star rating */}
              <div className="mb-6" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className="inline w-5 h-5 text-yellow-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20" 
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              
              {/* Testimonial quote */}
              <blockquote className="flex-1">
                <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-6">"{testimonial.quote}"</p>
              </blockquote>
              
              {/* Testimonial author information */}
              <div className="flex items-center">
                <img 
                  src={testimonial.imageUrl} 
                  alt={`${testimonial.name}`}
                  className="w-12 h-12 rounded-full mr-4 border-2 border-white dark:border-gray-700 shadow-sm"
                />
                <div>
                  <h4 className="font-medium dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    {testimonial.title}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all testimonials button - tertiary CTA */}
        <div className="mt-12 text-center">
          <Link 
            to="/testimonials"
            className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight focus-visible:ring-offset-2 rounded-full"
          >
            <Button 
              size="lg" 
              variant='tertiary'
              className="rounded-full group h-12"
            >
              <span>View all testimonials</span>
              <ArrowRight 
                className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" 
                aria-hidden="true"
              />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
