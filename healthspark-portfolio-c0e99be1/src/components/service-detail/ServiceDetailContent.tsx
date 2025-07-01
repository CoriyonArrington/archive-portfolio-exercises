
import React from 'react';

interface DeliverableProps {
  deliverables: string[];
}

/**
 * ServiceDetailContent - Displays the detailed content for a service
 * 
 * This component shows the deliverables list for a service with
 * proper semantic structure and accessibility considerations.
 * 
 * Accessibility features:
 * - Semantic HTML structure with appropriate heading levels
 * - Descriptive list items with proper list semantics
 * - Consistent spacing and visual hierarchy
 */
const ServiceDetailContent = ({ deliverables }: DeliverableProps) => {
  return (
    <section 
      className="py-12 bg-gray-50 dark:bg-gray-800/50"
      aria-labelledby="service-deliverables-title"
    >
      <div className="container max-w-5xl mx-auto">
        <h2 
          id="service-deliverables-title"
          className="text-2xl font-bold mb-8 text-center dark:text-white"
        >
          What You'll Receive
        </h2>
        
        <ul 
          className="grid md:grid-cols-2 gap-6"
          aria-label="Service deliverables"
        >
          {deliverables.map((deliverable, index) => (
            <li 
              key={index}
              className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-3"
            >
              <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mt-1">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-green-600 dark:text-green-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <span className="text-gray-700 dark:text-gray-200">{deliverable}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ServiceDetailContent;
