
import React from 'react';
import HealthProgressTracker from '@/health-progress-tracker';
import BrowserMockup from '@/browser-mockup';
import { Toaster } from '@/components/ui/toaster';
import FloatingStatCard from './FloatingStatCard';

/**
 * HeroShowcase - Visual showcase of work sample
 * 
 * Displays a browser mockup with a health tracker app and floating stat cards.
 * 
 * Accessibility features:
 * - Appropriate aria-hidden for decorative elements
 * - Semantic HTML structure
 */
const HeroShowcase = () => {
  return (
    <div className="relative animate-fade-in">
      {/* Browser mockup wrapping our health progress tracker */}
      <div className="container mx-auto px-4">
        <BrowserMockup>
          <HealthProgressTracker />
        </BrowserMockup>
        {/* Toast notifications will appear here */}
        <Toaster />
      </div>
      
      {/* Floating stat cards */}
      <FloatingStatCard 
        position="bottom-left"
        title="Patient engagement up"
        value="+4% user retention"
      />

      <FloatingStatCard 
        position="top-right"
        title="Patient satisfaction up"
        value="+70% user satisfaction"
      />
    </div>
  );
};

export default HeroShowcase;
