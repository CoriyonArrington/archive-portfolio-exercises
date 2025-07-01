
import React from 'react';
import { SectionHeading } from '@/components/ui/section-heading';

/**
 * DesignPhase - Details about the design phase of the process
 * 
 * Describes the steps involved in crafting solutions,
 * including ideation, information architecture, wireframing, and visual design.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - Descriptive text and alt attributes
 * - Color contrast compliance
 */
const DesignPhase = () => {
  const designSteps = [
    {
      step: 1,
      title: "Ideation",
      description: "Through sketching and collaborative workshops, I generate multiple solution concepts that address the identified problems."
    },
    {
      step: 2,
      title: "Information architecture",
      description: "I create user flows and sitemaps to establish a logical structure that supports user goals and tasks."
    },
    {
      step: 3,
      title: "Wireframing & prototyping",
      description: "I create low and mid-fidelity wireframes to rapidly explore layout options and interaction patterns."
    },
    {
      step: 4,
      title: "Visual design",
      description: "I develop high-fidelity designs that bring the solution to life with attention to visual hierarchy, accessibility, and brand consistency."
    }
  ];
  
  return (
    <section 
      className="mb-24"
      aria-labelledby="design-phase-title"
    >
      <SectionHeading 
        id="design-phase-title"
        title="Design Phase"
        align="left"
        className="mb-10"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <img 
              src="https://via.placeholder.com/400x300?text=Wireframe" 
              alt="Example wireframe showing the basic layout structure" 
              className="w-full h-auto rounded-xl shadow-sm"
            />
            <img 
              src="https://via.placeholder.com/400x300?text=UI+Design" 
              alt="High-fidelity UI design with color and typography" 
              className="w-full h-auto rounded-xl shadow-sm"
            />
            <img 
              src="https://via.placeholder.com/400x300?text=Prototype" 
              alt="Interactive prototype demonstrating user flows" 
              className="w-full h-auto rounded-xl shadow-sm"
            />
            <img 
              src="https://via.placeholder.com/400x300?text=Component+Library" 
              alt="Design system component library with reusable elements" 
              className="w-full h-auto rounded-xl shadow-sm"
            />
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
            <h4 className="font-medium mb-2 dark:text-white">Design evolution</h4>
            <p className="text-sm text-muted-foreground dark:text-gray-300">
              From initial sketch to final high-fidelity design, the solution evolves through 
              multiple iterations based on user feedback and stakeholder input.
            </p>
          </div>
        </div>
        
        <div className="order-1 lg:order-2 space-y-6">
          <h3 className="text-2xl font-semibold dark:text-white">Crafting the solution</h3>
          <p className="text-muted-foreground dark:text-gray-300">
            Using insights from the discovery phase, I ideate, prototype, and refine solutions 
            that address user needs while achieving business goals.
          </p>
          
          <div className="space-y-4">
            {designSteps.map((step) => (
              <div key={step.step} className="flex items-start space-x-4">
                <div 
                  className="h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 mt-1"
                  aria-hidden="true"
                >
                  <span className="text-sm font-medium dark:text-white">{step.step}</span>
                </div>
                <div>
                  <h4 className="font-medium dark:text-white">{step.title}</h4>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignPhase;
