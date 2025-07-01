
import React from 'react';
import { SectionHeading } from '@/components/ui/section-heading';

/**
 * DeliveryPhase - Details about the delivery phase of the design process
 * 
 * Describes the steps involved in validating and refining solutions,
 * including usability testing, iteration, documentation, and implementation support.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - Descriptive text and alt attributes
 * - Color contrast compliance
 */
const DeliveryPhase = () => {
  const deliverySteps = [
    {
      step: 1,
      title: "Usability testing",
      description: "I conduct usability tests with real users to identify pain points and areas for improvement."
    },
    {
      step: 2,
      title: "Iteration",
      description: "Based on testing insights, I refine the design to address usability issues and improve the overall experience."
    },
    {
      step: 3,
      title: "Documentation",
      description: "I create comprehensive documentation to ensure smooth handoff to engineering and other stakeholders."
    },
    {
      step: 4,
      title: "Implementation support",
      description: "I collaborate closely with engineers during implementation to ensure the design is executed as intended."
    }
  ];
  
  return (
    <section 
      className="mb-24"
      aria-labelledby="delivery-phase-title"
    >
      <SectionHeading 
        id="delivery-phase-title"
        title="Delivery Phase"
        align="left"
        className="mb-10"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold dark:text-white">Validating and refining</h3>
          <p className="text-muted-foreground dark:text-gray-300">
            The best designs are validated with real users. I test prototypes, gather feedback, 
            and make data-driven refinements to ensure the solution meets user needs.
          </p>
          
          <div className="space-y-4">
            {deliverySteps.map((step) => (
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
              src="https://via.placeholder.com/800x450?text=Usability+Testing" 
              alt="Usability testing session with participant and facilitator" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
              <h4 className="font-medium mb-2 dark:text-white">Testing insights</h4>
              <div className="text-sm text-muted-foreground dark:text-gray-300">
                <p>
                  In a recent project, usability testing revealed that users struggled with the data 
                  visualization component. We redesigned it with clearer labels and interactive tooltips, 
                  which improved task completion rates from 65% to 94%.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <h4 className="font-medium mb-2 dark:text-white">Metrics</h4>
                <ul className="text-sm text-muted-foreground dark:text-gray-300 space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight" aria-hidden="true"></span>
                    <span>Task success rate: 94%</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight" aria-hidden="true"></span>
                    <span>Time on task: -32%</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight" aria-hidden="true"></span>
                    <span>SUS score: 87/100</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <h4 className="font-medium mb-2 dark:text-white">Deliverables</h4>
                <ul className="text-sm text-muted-foreground dark:text-gray-300 space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight" aria-hidden="true"></span>
                    <span>High-fidelity designs</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight" aria-hidden="true"></span>
                    <span>Interactive prototype</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight" aria-hidden="true"></span>
                    <span>Design specifications</span>
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

export default DeliveryPhase;
