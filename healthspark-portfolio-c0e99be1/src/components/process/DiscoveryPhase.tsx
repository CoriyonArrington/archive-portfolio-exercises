
import React from 'react';
import { SectionHeading } from '@/components/ui/section-heading';

/**
 * DiscoveryPhase - Details about the discovery phase of the design process
 * 
 * Describes the steps involved in understanding the problem space,
 * including stakeholder interviews, user research, market analysis, and synthesis.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - Descriptive text
 * - Appropriate image alt text
 */
const DiscoveryPhase = () => {
  const discoverySteps = [
    {
      step: 1,
      title: "Stakeholder interviews",
      description: "I interview key stakeholders to understand business goals, technical constraints, and success metrics."
    },
    {
      step: 2,
      title: "User research",
      description: "Through interviews, surveys, and contextual inquiry, I gain insights into user behaviors, needs, and frustrations."
    },
    {
      step: 3,
      title: "Market analysis",
      description: "I analyze competitor products and industry trends to identify opportunities and avoid common pitfalls."
    },
    {
      step: 4,
      title: "Synthesis",
      description: "I synthesize research findings into actionable insights that will guide the design process."
    }
  ];
  
  return (
    <section 
      className="mb-24"
      aria-labelledby="discovery-phase-title"
    >
      <SectionHeading 
        id="discovery-phase-title"
        title="Discovery Phase"
        align="left"
        className="mb-10"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold dark:text-white">Understanding the problem</h3>
          <p className="text-muted-foreground dark:text-gray-300">
            Every great solution starts with a deep understanding of the problem. 
            During this phase, I immerse myself in the user's world to uncover their 
            needs, pain points, and motivations.
          </p>
          
          <div className="space-y-4">
            {discoverySteps.map((step) => (
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
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-smooth">
          <div className="aspect-video rounded-xl overflow-hidden mb-6">
            <img 
              src="https://via.placeholder.com/800x450?text=Discovery+Phase" 
              alt="Visual representation of the discovery phase process showing examples of research activities" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
              <h4 className="font-medium mb-2 dark:text-white">Stakeholder interview insights</h4>
              <div className="text-sm text-muted-foreground dark:text-gray-300">
                <p className="italic mb-2">
                  "One persona we aren't doing well for yet... marketers. They don't want these 
                  tactical features. They need aggregated data to act on."
                </p>
                <p className="text-xs dark:text-gray-400">— Olivia Alexander, VP Product Management</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <h4 className="font-medium mb-2 dark:text-white">Research outputs</h4>
                <ul className="text-sm text-muted-foreground dark:text-gray-300 space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight" aria-hidden="true"></span>
                    <span>9 Stakeholder interviews</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight" aria-hidden="true"></span>
                    <span>User personas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight" aria-hidden="true"></span>
                    <span>Jobs-to-be-done</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <h4 className="font-medium mb-2 dark:text-white">Key insights</h4>
                <ul className="text-sm text-muted-foreground dark:text-gray-300 space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight" aria-hidden="true"></span>
                    <span>Data accessibility issues</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight" aria-hidden="true"></span>
                    <span>Integration pain points</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight" aria-hidden="true"></span>
                    <span>Unmet stakeholder needs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoveryPhase;
