
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Project } from '@/types/project';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
}

/**
 * ProjectCard - Displays a featured project card
 * 
 * Shows a project card with image, details, outcome, and CTA button.
 * 
 * @param {Project} project - The project object with details to display
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper labeling for screen readers
 * - Focus management for keyboard users
 */
const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link 
      key={project.id} 
      to={`/case-study/${project.id}`}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight focus-visible:ring-offset-2"
      aria-labelledby={`project-${project.id}`}
    >
      {/* Project card with hover and focus effects */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-smooth border border-gray-100 dark:border-gray-700 group hover:shadow-card transition-all duration-300 hover:-translate-y-1">
        <div className="lg:grid grid-cols-2 gap-8 lg:gap-0">
          {/* Project image - Alternating layout depending on project ID */}
          <div className={`relative overflow-hidden ${
            project.id === 'physician-workflow' 
              ? 'order-2 lg:order-1' 
              : ''
          }`}>
            {/* Gradient overlay for better text contrast */}
            <div className={`absolute inset-0 ${
              project.id === 'physician-workflow'
                ? 'bg-gradient-to-l from-white/20 dark:from-gray-800/20 to-transparent z-10 lg:from-transparent lg:via-transparent'
                : 'bg-gradient-to-r from-white/20 dark:from-gray-800/20 to-transparent z-10 lg:from-transparent lg:via-transparent'
            }`}></div>
            
            {/* Project image with responsive behavior */}
            <img 
              src={project.image} 
              alt={`Screenshot of ${project.title} project`} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Project details - Alternating layout depending on project ID */}
          <div className={`p-8 lg:p-12 flex flex-col justify-center ${
            project.id === 'physician-workflow' ? 'order-1 lg:order-2' : ''
          }`}>
            <div className="space-y-6">
              {/* Project tags - Categories, platforms, and device types */}
              <div className="flex flex-wrap gap-2" aria-label="Project categories">
                {/* Category tags */}
                {project.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                    aria-label={`Category: ${tag}`}
                  >
                    {tag.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                  </span>
                ))}
                
                {/* Platform tags */}
                {project.platforms.map((platform, index) => (
                  <span 
                    key={`platform-${index}`} 
                    className="px-3 py-1 text-xs font-medium bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full"
                    aria-label={`Platform: ${platform}`}
                  >
                    {platform}
                  </span>
                ))}
                
                {/* Device type tags */}
                {project.deviceTypes.map((deviceType, index) => (
                  <span 
                    key={`device-${index}`} 
                    className="px-3 py-1 text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full"
                    aria-label={`Device: ${deviceType}`}
                  >
                    {deviceType}
                  </span>
                ))}
              </div>
              
              {/* Project title */}
              <h3 
                id={`project-${project.id}`}
                className="text-2xl md:text-3xl font-bold dark:text-white"
              >
                {project.title}
              </h3>
              
              {/* Project description */}
              <p className="text-muted-foreground dark:text-gray-300">
                {project.description}
              </p>

              {/* Project outcome highlight if available */}
              {project.outcome && (
                <div 
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl"
                  aria-label="Project outcome"
                >
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {project.outcome.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {project.outcome.description}
                  </div>
                </div>
              )}
              
              {/* View project button */}
              <div className="group/button">
                <Button 
                  variant="outline" 
                  className="w-fit group rounded-full h-10 pointer-events-none dark:text-white dark:border-gray-700"
                  aria-hidden="true" // Since the entire card is clickable
                >
                  <span>See what we did</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
