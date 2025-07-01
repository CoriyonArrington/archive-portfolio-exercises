
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import CTASection from '@/components/shared/CTASection';
import PageHeroSection from '@/components/shared/PageHeroSection';
import ProcessOverview from '@/components/process/ProcessOverview';
import DiscoveryPhase from '@/components/process/DiscoveryPhase';
import DesignPhase from '@/components/process/DesignPhase';
import DeliveryPhase from '@/components/process/DeliveryPhase';

/**
 * Process - Design Process Page
 * 
 * Showcases the design methodology broken down into discovery,
 * design, and delivery phases with detailed explanations and visuals.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - ARIA landmarks
 * - Descriptive alt text
 */
const Process = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <PageHeroSection
        tagline="Design Process"
        title="How I approach design challenges"
        description="My process is not a rigid framework but a flexible approach that adapts to the unique needs of each project and ensures we never lose sight of the goals."
      />
      <div className="py-16 dark:bg-gray-900">
        <div className="container">
          <ProcessOverview />
          <DiscoveryPhase />
          <DesignPhase />
          <DeliveryPhase />
          
          <CTASection
            title="Let's create something amazing together"
            description="Looking for a designer who understands both healthcare and technology? Let's discuss your next project."
            buttonText="Start a conversation"
            buttonLink="/contact"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Process;
