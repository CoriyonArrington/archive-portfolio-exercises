
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SocialProof from './SocialProof';

/**
 * HeroContent - Main content section of the hero
 * 
 * Displays the main heading, description, CTA button, and social proof.
 * 
 * Accessibility features:
 * - Semantic HTML with proper heading hierarchy
 * - Accessible hover and focus states
 * - Properly labeled buttons with descriptive text
 */
const HeroContent = () => {
  return (
    <div className="space-y-8 animate-fade-in md:justify-items-center lg:place-items-center">
      {/* Professional badge */}
      <span className="inline-block text-sm font-medium px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full shadow-sm">
        Senior Product Designer
      </span>
      
      {/* Main heading with accessible highlight */}
      <h1 
        id="hero-heading"
        className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight lg:text-center dark:text-white"
      >
        Design experiences customers <span className="text-highlight italic" aria-hidden="true">love.</span>
      </h1>
      
      {/* Descriptive subheading */}
      <p className="text-lg md:text-xl text-muted-foreground max-w-lg lg:text-center dark:text-gray-300">
        Whether you're a startup looking to create a mobile app or an enterprise launching a web app, let's design experiences your customers will love. 
      </p>
      
      {/* Primary call-to-action button with accessible hover state */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          size="lg" 
          variant="default" 
          className="bg-black dark:bg-white hover:bg-black/90 dark:hover:bg-white/10 text-white dark:text-white rounded-full border-gray-300 dark:border-gray-700 shadow-sm hover:shadow-md transition-all focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:ring-highlight"
          asChild
        >
          <Link to="/work">
            Explore my work
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Button>
      </div>
      
      {/* Social proof section */}
      <SocialProof />
    </div>
  );
};

export default HeroContent;
