
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import ServiceCard from '@/components/services/ServiceCard';
import { servicesData } from '@/data/services';
import ClientCenteredHero from '@/components/shared/ClientCenteredHero';
import CTASection from '@/components/shared/CTASection';
import ClientProblemsSection from '@/components/services/ClientProblemsSection';

/**
 * Services - Page for displaying solution offerings
 * 
 * This component displays available services as solutions to client problems,
 * emphasizing outcomes rather than activities.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Clear heading hierarchy
 * - Responsive design for all device sizes
 */
const Services = () => {
  // Scroll to top when page loads for better user experience
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Healthcare UX Solutions - Design Services | Coriyon Arrington";
  }, []);

  return (
    <Layout>
      <ClientCenteredHero
        eyebrow="Solutions"
        title="Transforming Healthcare Experiences"
        description="I provide specialized design solutions that address the unique challenges healthcare organizations face in creating intuitive, effective digital experiences."
      />

      {/* Common Client Problems Section */}
      <ClientProblemsSection />

      {/* Services grid section */}
      <section 
        className="py-16 dark:bg-gray-900"
        aria-labelledby="services-heading"
      >
        <div className="container">
          <h2 id="services-heading" className="text-3xl font-bold mb-12 dark:text-white text-center">
            Tailored Solutions for Healthcare Organizations
          </h2>
          
          {/* Services grid */}
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            role="list"
            aria-label="Services offered"
          >
            {servicesData.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service}
              />
            ))}
          </div>
        </div>
      </section>
      
      <CTASection
        title="Not sure which solution is right for you?"
        description="Let's discuss your specific challenges and determine the best approach for your organization's needs and goals."
        buttonText="Schedule a consultation"
        buttonLink="/contact"
      />
    </Layout>
  );
};

export default Services;
