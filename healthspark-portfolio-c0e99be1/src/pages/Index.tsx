
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ClientValueProposition from '@/components/home/ClientValueProposition';
import WorkingProcessSection from '@/components/home/WorkingProcessSection';

/**
 * Index - Main homepage component focused on client value
 * 
 * This component serves as the landing page for the site, emphasizing client
 * outcomes and the value of working together, including:
 * - Hero section with main value proposition
 * - Client value proposition section highlighting benefits
 * - Working process section showing collaboration experience
 * - Featured projects section showcasing real outcomes
 * - Testimonials from clients validating the approach
 * 
 * Accessibility features:
 * - Proper document structure with semantic HTML
 * - Skip link to main content for keyboard users
 * - Clear section headings for screen readers
 * - Appropriate ARIA attributes for interactive elements
 */
const Index = () => {
  useEffect(() => {
    // Set page title for accessibility and SEO
    document.title = "Healthcare UX Design Solutions - Improving Health Experiences | Coriyon Arrington";
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
        <HeroSection />
        <ClientValueProposition />
        <WorkingProcessSection />
        <FeaturedProjects />
        <TestimonialsSection />
      </div>
    </Layout>
  );
};

export default Index;
