
import React from 'react';
import HeroContent from './hero/HeroContent';
import HeroShowcase from './hero/HeroShowcase';

/**
 * HeroSection - Main landing section for the homepage
 * 
 * This component displays a welcoming hero section with:
 * - Professional title and headline
 * - Brief description of services
 * - Call-to-action button
 * - Social proof elements (testimonial avatars and rating)
 * - Featured work showcase image with floating stat cards
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - Alt text for all images
 * - Sufficient color contrast
 * - Visible focus states for interactive elements
 */
const HeroSection = () => {
  return (
    // Main hero section with responsive spacing
    <section 
      className="relative pt-32 pb-32 overflow-hidden dark:bg-gray-900"
      aria-labelledby="hero-heading"
    >
      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-16 items-center">
          {/* Hero content - Left column on larger screens */}
          <HeroContent />
          
          {/* Featured work showcase - Right column on larger screens */}
          <HeroShowcase />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
