
import React from 'react';

interface CaseStudyResultsProps {
  content: {
    results: string;
  };
  outcome?: {
    value: string;
    description: string;
  };
  businessImpact: string;
}

/**
 * CaseStudyResults - Displays the results and business impact of a case study
 * 
 * Shows measurable outcomes and business value of the project with visual treatment
 * to highlight key metrics and ROI.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - Clear content organization
 */
const CaseStudyResults = ({ content, outcome, businessImpact }: CaseStudyResultsProps) => {
  return (
    <section 
      className="py-16 bg-gray-50 dark:bg-gray-800/50"
      aria-labelledby="results-section-title"
    >
      <div className="container max-w-3xl mx-auto">
        <h2 
          id="results-section-title"
          className="text-2xl md:text-3xl font-bold mb-6 dark:text-white"
        >
          Results & Business Impact
        </h2>
        
        <div className="mb-10">
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
            {content.results}
          </p>
        </div>
        
        {outcome && (
          <div 
            className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-sm flex flex-col md:flex-row gap-6 items-center mb-10"
            aria-labelledby="outcome-title"
          >
            <div className="text-center md:text-left flex-1">
              <h3 id="outcome-title" className="text-lg font-medium mb-2 dark:text-white">Key Outcome</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{outcome.description}</p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/30 px-6 py-4 rounded-xl text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
                {outcome.value}
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">Improvement</div>
            </div>
          </div>
        )}
        
        <div 
          className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl shadow-sm border border-blue-100 dark:border-blue-900/30"
          aria-labelledby="business-impact-title"
        >
          <h3 
            id="business-impact-title" 
            className="text-lg font-medium mb-4 text-blue-700 dark:text-blue-300"
          >
            Business Impact
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            {businessImpact}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyResults;
