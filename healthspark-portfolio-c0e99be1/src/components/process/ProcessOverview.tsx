
import React from 'react';

/**
 * ProcessOverview - Displays an overview of the design process phases
 * 
 * Shows the three main phases (Discovery, Design, Delivery) with brief descriptions
 * and estimated timelines in an attractive card layout.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Consistent heading hierarchy
 * - Descriptive text content
 * - Color contrast compliance
 */
const ProcessOverview = () => {
  const processPhases = [
    {
      title: "Discovery",
      description: "I start by deeply understanding the problem space through research, stakeholder interviews, and competitive analysis.",
      timeline: "1-2 Weeks"
    },
    {
      title: "Design",
      description: "Based on research insights, I create user flows, wireframes, and high-fidelity designs that solve the identified problems.",
      timeline: "2-4 Weeks"
    },
    {
      title: "Delivery",
      description: "I validate solutions through testing, refine based on feedback, and prepare designs for handoff to engineering.",
      timeline: "1-2 Weeks"
    }
  ];
  
  return (
    <section 
      className="mb-24"
      aria-labelledby="process-overview-title"
    >
      <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {processPhases.map((phase, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-700 p-8 rounded-2xl border border-gray-100 dark:border-gray-600 shadow-smooth hover:shadow-card transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4 dark:text-white">{phase.title}</h3>
              <p className="text-muted-foreground dark:text-gray-300 mb-6">
                {phase.description}
              </p>
              <div className="text-sm font-medium text-highlight">
                {phase.timeline}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessOverview;
