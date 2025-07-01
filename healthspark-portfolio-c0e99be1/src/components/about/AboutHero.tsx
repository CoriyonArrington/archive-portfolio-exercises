
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText } from 'lucide-react';
import PageHeroSection from '@/components/shared/PageHeroSection';

/**
 * AboutHero - Hero section for the About page
 * 
 * This component displays the hero section with profile information,
 * LinkedIn and resume download links.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Properly labeled buttons with descriptive text
 * - Keyboard navigable interactive elements
 * - Clear visual hierarchy
 */
const AboutHero = () => {
  return (
    <>
      <PageHeroSection
        tagline="About Me"
        title="Senior Product Designer"
        description="I'm Coriyon Arrington, a senior product designer with a biomedical engineering background. 
            I specialize in creating intuitive healthcare experiences that improve lives."
      />
      <div 
        className="container flex flex-col justify-center mt-6 sm:flex-row gap-4 dark:bg-gray-900"
        aria-label="Connect or download resume"
      >
        <a 
          href="https://www.linkedin.com/in/coriyon/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Connect on LinkedIn (opens in new tab)"
        >
          <Button 
            size="lg" 
            className="bg-black text-white dark:bg-white dark:text-black w-full rounded-full px-8"
          >
            <span>Connect on LinkedIn</span>
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 hover:opacity-80 transition-opacity" />
          </Button>
        </a>
        <a 
          href="/resume-coriyon-arrington.pdf" 
          download="coriyon-arrington-resume.pdf"
          aria-label="Download resume as PDF"
        >
          <Button 
            size="lg" 
            variant="outline" 
            className="group w-full rounded-full"
          >
            <span>Download Resume</span>
            <FileText size={20} className="text-gray-600 dark:text-gray-400 hover:opacity-80 transition-opacity" />
          </Button>
        </a>
      </div>
    </>
  );
};

export default AboutHero;
