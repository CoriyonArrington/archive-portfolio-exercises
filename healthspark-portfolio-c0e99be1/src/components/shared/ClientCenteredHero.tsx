
import React from 'react';

interface ClientCenteredHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

/**
 * ClientCenteredHero - A hero section focused on client value propositions
 * 
 * This component serves as a page header that emphasizes client benefits and outcomes
 * rather than designer credentials. It includes an eyebrow text, main heading, and 
 * descriptive text that focuses on value delivery.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - Responsive text sizing
 * - High contrast for readability
 */
const ClientCenteredHero = ({ eyebrow, title, description, children }: ClientCenteredHeroProps) => {
  return (
    <section className="relative pt-32 pb-10 overflow-hidden dark:bg-gray-900">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto text-center">
          <div className="space-y-6 animate-fade-in">
            <span className="inline-block text-sm font-medium px-3 py-1 bg-highlight/10 text-highlight dark:bg-highlight/20 dark:text-highlight/90 rounded-full">
              {eyebrow}
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight dark:text-white">
              {title}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto dark:text-gray-300">
              {description}
            </p>
            
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientCenteredHero;
