
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import CTASection from '@/components/shared/CTASection';
import ClientCenteredHero from '@/components/shared/ClientCenteredHero';
import ProfileImage from '@/components/about/ProfileImage';
import Background from '@/components/about/Background';
import WhatsUnique from '@/components/about/WhatsUnique';
import DesignJourney from '@/components/about/DesignJourney';
import DesignPhilosophy from '@/components/about/DesignPhilosophy';
import ClientValueSection from '@/components/about/ClientValueSection';

/**
 * About - Page focusing on value proposition for clients
 * 
 * This component assembles smaller components to create a complete About page
 * that emphasizes client value, unique approaches, and the benefits of working together.
 * 
 * Page structure:
 * 1. Client-centered hero section with value proposition
 * 2. Profile image
 * 3. Client value section (new)
 * 4. What sets me apart section (unique approach)
 * 5. Background section (relevant to client needs)
 * 6. Design journey timeline
 * 7. Design philosophy
 * 8. Call-to-action section
 * 
 * Accessibility features:
 * - Semantic HTML structure with appropriate landmark regions
 * - Proper heading hierarchy (h1 -> h2 -> h3)
 * - Descriptive alt text for images
 * - Keyboard navigable interactive elements
 * - High contrast text for readability
 * - Responsive layout for all device sizes
 */
const About = () => {
  useEffect(() => {
    // Scroll to top on page load for better user experience
    window.scrollTo(0, 0);
    
    // Set page title for accessibility and SEO
    document.title = "How We Work Together - Healthcare UX Design Solutions | Coriyon Arrington";
  }, []);

  return (
    <Layout>
      {/* Client-Centered Hero Section */}
      <ClientCenteredHero
        eyebrow="Working Together"
        title="How We Transform Healthcare Experiences"
        description="I partner with healthcare organizations to simplify complex systems and create intuitive experiences that improve outcomes for patients and providers alike."
      />
      
      <div className="py-8 dark:bg-gray-900">
        <div className="container">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center mb-24">
            <ProfileImage />
          </div>
          
          {/* Client Value Section (new) */}
          <ClientValueSection />
          
          {/* What Sets Me Apart Section */}
          <WhatsUnique />
          
          {/* Background Section - redesigned to focus on relevance to clients */}
          <Background />
          
          {/* Design Journey Timeline */}
          <DesignJourney />
          
          {/* Design Philosophy Section */}
          <DesignPhilosophy />
        </div>
      </div>
      
      {/* Call to Action Section */}
      <CTASection 
        title="Ready to transform your healthcare experience?"
        description="Let's discuss your challenges and explore how human-centered design can help your organization achieve better outcomes."
        buttonText="Start a conversation"
        buttonLink="/contact"
      />
    </Layout>
  );
};

export default About;
