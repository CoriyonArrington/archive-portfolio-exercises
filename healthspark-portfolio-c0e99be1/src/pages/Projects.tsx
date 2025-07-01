
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import ProjectCard from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/button';
import { projectsData } from '@/data/projects';
import ClientCenteredHero from '@/components/shared/ClientCenteredHero';
import CTASection from '@/components/shared/CTASection';
import { LayoutGrid, List, Filter, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Type definitions for view mode and filter types
 */
type ViewMode = 'list' | 'grid';
type FilterType = string | null;

/**
 * Projects - Page showcasing successful client outcomes
 * 
 * This component displays client success stories with measurable outcomes and impact.
 * Users can toggle between views and filter by industry, platform, or device type.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - ARIA labels for interactive elements
 * - Responsive design for all device sizes
 * - Keyboard navigation for filter controls
 */
const Projects = () => {
  // Scroll to top when page loads for better user experience
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set page title for SEO and accessibility
    document.title = "Client Success Stories - Healthcare UX Design Solutions | Coriyon Arrington";
  }, []);
  
  // State for view mode and active filter
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);

  // Extract unique platforms and device types for filter options
  const platforms = Array.from(new Set(projectsData.flatMap(project => project.platforms)));
  const deviceTypes = Array.from(new Set(projectsData.flatMap(project => project.deviceTypes)));

  // Filter projects based on active filter
  const filteredProjects = projectsData.filter(project => {
    if (!activeFilter) return true;
    return project.platforms.includes(activeFilter) || project.deviceTypes.includes(activeFilter);
  });

  // Combine all filter options
  const allFilters = [
    { name: 'All Results', value: null },
    ...platforms.map(platform => ({ name: platform, value: platform })),
    ...deviceTypes.map(deviceType => ({ name: deviceType, value: deviceType }))
  ];

  // Get current filter name for display
  const getCurrentFilterName = () => {
    if (!activeFilter) return "All Results";
    const foundFilter = allFilters.find(filter => filter.value === activeFilter);
    return foundFilter ? foundFilter.name : "All Results";
  };

  return (
    <Layout>
      <ClientCenteredHero
        eyebrow="Client Success Stories"
        title="Real Results For Healthcare Organizations"
        description="Browse successful projects where we've helped healthcare organizations improve user experiences, boost engagement, and achieve measurable outcomes. Each case demonstrates how strategic UX design directly impacts business goals."
      />

      <div className="py-12 dark:bg-gray-900">
        <div className="container">
          {/* View toggle and filter controls */}
          <div 
            className="flex flex-wrap justify-between items-center mb-8 gap-4" 
            role="toolbar" 
            aria-label="Filter client results by platform or device type"
          >
            {/* View mode toggle buttons */}
            <div className="flex gap-2" role="group" aria-label="View mode options">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'outline'} 
                onClick={() => setViewMode('grid')}
                size="sm"
                className="gap-2"
                aria-pressed={viewMode === 'grid'}
                aria-label="Grid view"
              >
                <LayoutGrid className="h-4 w-4 hover:opacity-80 transition-opacity" aria-hidden="true" />
                <span className="sr-only md:not-sr-only">Grid View</span>
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'} 
                onClick={() => setViewMode('list')}
                size="sm"
                className="gap-2"
                aria-pressed={viewMode === 'list'}
                aria-label="List view"
              >
                <List className="h-4 w-4 hover:opacity-80 transition-opacity" aria-hidden="true" />
                <span className="sr-only md:not-sr-only">List View</span>
              </Button>
            </div>
            
            {/* Desktop filters - hidden on mobile */}
            <div 
              className="hidden md:flex flex-wrap gap-2"
              role="group" 
              aria-label="Filter by platform or device type"
            >
              <Button 
                variant={activeFilter === null ? 'default' : 'outline'} 
                onClick={() => setActiveFilter(null)}
                size="sm"
                aria-pressed={activeFilter === null}
              >
                All Results
              </Button>
              
              {/* Platform filters */}
              {platforms.map(platform => (
                <Button 
                  key={`platform-${platform}`}
                  variant={activeFilter === platform ? 'default' : 'outline'} 
                  onClick={() => setActiveFilter(platform)}
                  size="sm"
                  aria-pressed={activeFilter === platform}
                >
                  {platform}
                </Button>
              ))}
              
              {/* Device type filters */}
              {deviceTypes.map(deviceType => (
                <Button 
                  key={`device-${deviceType}`}
                  variant={activeFilter === deviceType ? 'default' : 'outline'} 
                  onClick={() => setActiveFilter(deviceType)}
                  size="sm"
                  aria-pressed={activeFilter === deviceType}
                >
                  {deviceType}
                </Button>
              ))}
            </div>

            {/* Mobile filter dropdown - only visible on mobile */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    aria-label={`Filter results: Currently showing ${getCurrentFilterName()}`}
                  >
                    <Filter className="h-4 w-4 hover:opacity-80 transition-opacity" aria-hidden="true" />
                    <span>Filter: {getCurrentFilterName()}</span>
                    <ChevronDown className="h-4 w-4 hover:opacity-80 transition-opacity" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {allFilters.map((filter, index) => (
                    <DropdownMenuItem 
                      key={index}
                      className={activeFilter === filter.value ? "bg-accent" : ""}
                      onClick={() => setActiveFilter(filter.value)}
                      aria-selected={activeFilter === filter.value}
                    >
                      {filter.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Projects grid or list */}
          <div 
            className={`${viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
              : 'space-y-8'}`}
            aria-live="polite"
          >
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                viewMode={viewMode}
              />
            ))}
          </div>

          {/* No results message */}
          {filteredProjects.length === 0 && (
            <div 
              className="text-center py-16 dark:text-white"
              role="status"
              aria-live="polite"
            >
              <p className="text-lg text-muted-foreground">No success stories match the selected filter.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setActiveFilter(null)}
              >
                Clear Filter
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <CTASection
        title="Ready to achieve similar results for your healthcare product?"
        description="Let's discuss how strategic UX design can address your specific challenges and deliver measurable outcomes for your organization."
        buttonText="Schedule a consultation"
        buttonLink="/contact"
      />
    </Layout>
  );
};

export default Projects;
