
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Project } from '@/types/project';

interface CaseStudyNavigationProps {
  prevProject: Project | null;
  nextProject: Project | null;
}

/**
 * CaseStudyNavigation - Navigation between case studies
 * 
 * Provides links to previous and next case studies to facilitate
 * easy navigation between related projects.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Descriptive link text
 * - Clear visual indicators
 * - Focus states
 */
const CaseStudyNavigation = ({ prevProject, nextProject }: CaseStudyNavigationProps) => {
  return (
    <section 
      className="py-16 bg-gray-50 dark:bg-gray-900"
      aria-label="Case study navigation"
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prevProject ? (
            <Link 
              to={`/case-study/${prevProject.id}`} 
              className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={`Previous case study: ${prevProject.title}`}
            >
              <div className="flex items-center">
                <ArrowLeft className="mr-4" aria-hidden="true" />
                <div>
                  <span className="text-sm text-muted-foreground">Previous case study</span>
                  <p className="font-medium text-xl dark:text-white">{prevProject.title}</p>
                </div>
              </div>
            </Link>
          ) : (
            <div></div> // Empty div for spacing when there's no previous project
          )}

          {nextProject ? (
            <Link 
              to={`/case-study/${nextProject.id}`}
              className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={`Next case study: ${nextProject.title}`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="text-right">
                  <span className="text-sm text-muted-foreground">Next case study</span>
                  <p className="font-medium text-xl dark:text-white">{nextProject.title}</p>
                </div>
                <ArrowRight aria-hidden="true" />
              </div>
            </Link>
          ) : (
            <div></div> // Empty div for spacing when there's no next project
          )}
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/work">
            <Button 
              variant="tertiary" 
              size="lg" 
              className="dark:text-white dark:border-gray-700"
            >
              View all case studies
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyNavigation;
