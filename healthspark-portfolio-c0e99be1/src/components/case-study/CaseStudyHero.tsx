
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Project } from '@/types/project';

interface CaseStudyHeroProps {
  project: Project;
}

/**
 * CaseStudyHero - Hero section for case study details
 * 
 * Displays the project title, description, tags, platforms, device types,
 * and outcome metrics in a visually appealing hero layout.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - ARIA attributes
 * - Descriptive alt text
 */
const CaseStudyHero = ({ project }: CaseStudyHeroProps) => {
  return (
    <section 
      className="pt-32 pb-16 bg-gray-50 dark:bg-gray-900"
      aria-labelledby="case-study-title"
    >
      <div className="container">
        <div className="flex items-center mb-8">
          <Link 
            to="/work" 
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            aria-label="Back to all projects"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to all projects</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                >
                  {tag.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                </span>
              ))}
              {project.platforms.map((platform, index) => (
                <span 
                  key={`platform-${index}`} 
                  className="px-3 py-1 text-xs font-medium bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full"
                >
                  {platform}
                </span>
              ))}
              {project.deviceTypes.map((deviceType, index) => (
                <span 
                  key={`device-${index}`} 
                  className="px-3 py-1 text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full"
                >
                  {deviceType}
                </span>
              ))}
            </div>

            <h1 
              id="case-study-title" 
              className="text-4xl md:text-5xl font-bold mb-6 dark:text-white"
            >
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 dark:text-gray-300">{project.description}</p>

            {project.outcome && (
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm inline-block">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {project.outcome.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {project.outcome.description}
                </div>
              </div>
            )}
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg row-start-1 lg:col-start-2">
            <img 
              src={project.image} 
              alt={`Visual representation of ${project.title} project`} 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyHero;
