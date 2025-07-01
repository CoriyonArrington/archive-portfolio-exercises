
import React from 'react';

interface OutcomeProps {
  value: string;
  description: string;
}

/**
 * ProjectOutcome - Displays project outcome metrics
 * 
 * Shows the outcome value and description in a styled card.
 * 
 * @param {string} value - The outcome metric value
 * @param {string} description - Description of the outcome
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - High contrast text for readability
 */
const ProjectOutcome = ({ value, description }: OutcomeProps) => {
  return (
    <div className="mb-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
      <div className="text-2xl font-bold text-green-600 dark:text-green-400">{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-300">{description}</div>
    </div>
  );
};

export default ProjectOutcome;
