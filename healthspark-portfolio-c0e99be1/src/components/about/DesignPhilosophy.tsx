
import React from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * DesignPrinciple - Individual design principle component
 * 
 * Displays a design principle with title and description.
 * 
 * @param {string} title - The principle title
 * @param {string} description - The principle description
 */
interface DesignPrincipleProps {
  title: string;
  description: string;
}

const DesignPrinciple = ({ title, description }: DesignPrincipleProps) => {
  return (
    <div>
      <h4 className="font-medium mb-2 dark:text-white">{title}</h4>
      <p className="text-muted-foreground dark:text-gray-300">
        {description}
      </p>
    </div>
  );
};

/**
 * DesignPhilosophy - Design philosophy section
 * 
 * Displays the design principles and philosophy in a visually appealing layout.
 * 
 * Accessibility features:
 * - Semantic HTML with proper heading hierarchy
 * - High contrast text for readability
 * - Descriptive link text
 * - Keyboard accessible interactive elements
 * - Responsive layout for all device sizes
 */
const DesignPhilosophy = () => {
  // Design principles data
  const designPrinciples = [
    {
      title: "Human-centered",
      description: "I believe in deeply understanding the people we're designing for, their needs, environments, and limitations."
    },
    {
      title: "Business-minded",
      description: "Great design serves both users and business goals. I work to find solutions that create value for both."
    },
    {
      title: "Evidence-based",
      description: "My engineering background means I let data, research, and testing guide decisions rather than assumptions."
    }
  ];

  return (
    <div className="mb-24">
      <SectionHeading 
        title="My design philosophy"
        align="left"
        className="mb-10"
      />
      
      <div 
        className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-12"
        aria-labelledby="design-philosophy-heading"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Design Principles Column */}
          <div>
            <h3 
              id="design-philosophy-heading"
              className="text-2xl font-semibold mb-6 dark:text-white"
            >
              Design principles
            </h3>
            <div className="space-y-8">
              {designPrinciples.map((principle, index) => (
                <DesignPrinciple 
                  key={index}
                  title={principle.title}
                  description={principle.description}
                />
              ))}
            </div>
          </div>
          
          {/* Healthcare Design Column */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 dark:text-white">
              Why I love healthcare design
            </h3>
            <p className="text-muted-foreground dark:text-gray-300 mb-6">
              Healthcare design presents unique challenges at the intersection of 
              technology, human emotion, and complex systems. My biomedical engineering 
              background gives me unique insight into these challenges.
            </p>
            <p className="text-muted-foreground dark:text-gray-300">
              I'm passionate about designing solutions that not only look good but 
              measurably improve healthcare outcomes and experiences for both 
              patients and providers.
            </p>
            
            <div className="mt-8">
              <Link to="/process" aria-label="Read more about my design process">
                <Button
                  variant="outline"
                  className="group rounded-full"
                >
                  <span>Read more about my process</span>
                  <ArrowRight 
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 hover:opacity-80 transition-opacity" 
                    aria-hidden="true"
                  />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPhilosophy;
