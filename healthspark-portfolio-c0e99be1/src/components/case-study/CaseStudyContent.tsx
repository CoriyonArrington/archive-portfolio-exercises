
import React from 'react';

interface CaseStudyContentProps {
  content: {
    challenge: string;
    approach: string;
    solution: string;
    results: string;
  };
  outcome?: {
    value: string;
    description: string;
  };
}

/**
 * CaseStudyContent - Main content section for case studies
 * 
 * Displays the challenge, approach, solution, and results of the case study
 * in a structured, readable format.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - Sufficient color contrast
 * - Clear content organization
 */
const CaseStudyContent = ({ content, outcome }: CaseStudyContentProps) => {
  const sections = [
    { id: "challenge", title: "The Challenge", content: content.challenge },
    { id: "approach", title: "Our Approach", content: content.approach },
    { id: "solution", title: "The Solution", content: content.solution },
    { id: "results", title: "Results & Impact", content: content.results }
  ];

  return (
    <section className="py-16 dark:bg-gray-900">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {sections.map((section) => (
            <div key={section.id} className="md:col-span-3">
              <h2 
                id={section.id}
                className="text-3xl font-bold mb-6 dark:text-white"
              >
                {section.title}
              </h2>
              <p className={`text-lg text-muted-foreground ${section.id !== "results" ? "mb-12" : ""} dark:text-gray-300`}>
                {section.content}
              </p>
              
              {section.id === "results" && outcome && (
                <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">{outcome.value}</div>
                  <div className="text-lg text-gray-700 dark:text-gray-300">{outcome.description}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudyContent;
