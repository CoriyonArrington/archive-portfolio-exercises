
import React from 'react';

interface CaseStudyApproachProps {
  content: {
    challenge: string;
    approach: string;
    solution: string;
  };
}

/**
 * CaseStudyApproach - Displays the approach and solution sections of a case study
 * 
 * Presents the challenge, approach, and solution in a clear, structured format
 * with proper semantic hierarchy and accessibility considerations.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - Clear section organization
 */
const CaseStudyApproach = ({ content }: CaseStudyApproachProps) => {
  return (
    <section className="py-16" aria-label="Project approach and solution">
      <div className="container max-w-3xl mx-auto">
        {/* Challenge section */}
        <div className="mb-16" aria-labelledby="challenge-section-title">
          <h2 
            id="challenge-section-title" 
            className="text-2xl md:text-3xl font-bold mb-6 dark:text-white"
          >
            Challenge
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
            {content.challenge}
          </p>
        </div>
        
        {/* Approach section */}
        <div className="mb-16" aria-labelledby="approach-section-title">
          <h2 
            id="approach-section-title"
            className="text-2xl md:text-3xl font-bold mb-6 dark:text-white"
          >
            Approach
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
            {content.approach}
          </p>
        </div>
        
        {/* Solution section */}
        <div className="mb-16" aria-labelledby="solution-section-title">
          <h2 
            id="solution-section-title"
            className="text-2xl md:text-3xl font-bold mb-6 dark:text-white"
          >
            Solution
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
            {content.solution}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyApproach;
