
import React from 'react';
import { SectionHeading } from '@/components/ui/section-heading';

interface PageHeroSectionProps {
  tagline: string;
  title: string;
  description: string;
}

const PageHeroSection = ({ tagline, title, description }: PageHeroSectionProps) => {
  return (
    <section className="relative pt-32 pb-2 overflow-hidden dark:bg-gray-900">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 gap-10 lg:items-center">
            <div className="space-y-8 animate-fade-in lg:place-items-center">
              <span className="inline-block text-sm font-medium px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                {tagline}
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight lg:text-center dark:text-white">
                {title}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg lg:text-center dark:text-gray-300">
                {description}
              </p>
            </div>
          </div>
        </div>
      </section>
  );
};

export default PageHeroSection;
