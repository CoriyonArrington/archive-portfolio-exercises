
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui/section-heading';
import { Button } from '@/components/ui/button';
import { getFeaturedProjects } from '@/data/projects';
import { Link } from 'react-router-dom';
import ProjectCard from './featured-projects/ProjectCard';

/**
 * FeaturedProjects - Showcases selected case studies from the portfolio
 * 
 * This component displays featured projects with:
 * - Section heading with descriptive title
 * - Project cards with images, details, and outcomes
 * - Category and platform tags
 * - View all button to navigate to full work page
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - Alt text for all images
 * - Accessible tags and labels
 * - Keyboard navigable elements
 */
const FeaturedProjects = () => {
  // Get a limited number of featured projects from the data source
  const featuredProjects = getFeaturedProjects(3);

  return (
    <section 
      className="py-16 bg-gray-50 dark:bg-gray-900" 
      aria-labelledby="featured-projects-heading"
    >
      <div className="container">
        {/* Section heading with title and description */}
        <SectionHeading
          title="Featured case studies"
          description="Explore how I've helped healthcare companies solve complex problems and deliver meaningful user experiences."
        />
        
        {/* Project cards container */}
        <div className="space-y-12">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        {/* View all projects button */}
        <div className="mt-12 text-center">
          <Link 
            to="/work"
            className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight focus-visible:ring-offset-2 rounded-full"
          >
            <Button 
              size="lg" 
              variant='tertiary'
              className="rounded-full group h-12"
            >
              <span>View all case studies</span>
              <ArrowRight 
                className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" 
                aria-hidden="true"
              />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
