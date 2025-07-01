
import React from 'react';

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
}

/**
 * ProcessSteps - Displays the workflow steps for a service
 * 
 * Shows numbered steps with titles and descriptions to explain the
 * collaboration process for the service.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - Numbered steps for clear sequence
 * - Consistent design patterns
 */
const ProcessSteps = ({ steps }: ProcessStepsProps) => {
  return (
    <section 
      className="py-16 border-t border-gray-200 dark:border-gray-800"
      aria-labelledby="process-steps-title"
    >
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 
          id="process-steps-title" 
          className="text-3xl font-bold mb-4 dark:text-white"
        >
          How we'll work together
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          My collaborative process ensures we create solutions that meet your business goals and delight your users.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <div 
            key={step.step} 
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <div 
              className="bg-primary/10 dark:bg-primary/20 w-12 h-12 flex items-center justify-center rounded-full mb-4"
              aria-hidden="true"
            >
              <span className="text-primary dark:text-primary-foreground font-bold">{step.step}</span>
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-white">{step.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcessSteps;
