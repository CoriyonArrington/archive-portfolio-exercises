
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { SectionHeading } from '@/components/ui/section-heading';
import ProjectCard from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/button';
import { projectsData } from '@/data/projects';
import { ArrowRight } from 'lucide-react';

type ViewMode = 'list' | 'grid';
type FilterType = string | null;

const Projects = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);

  // Get all unique platforms and device types for filter buttons
  const platforms = Array.from(new Set(projectsData.flatMap(project => project.platforms)));
  const deviceTypes = Array.from(new Set(projectsData.flatMap(project => project.deviceTypes)));

  const filteredProjects = projectsData.filter(project => {
    if (!activeFilter) return true;
    return project.platforms.includes(activeFilter) || project.deviceTypes.includes(activeFilter);
  });

  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container">
          <span className="inline-block text-sm font-medium px-3 py-1 bg-gray-100 rounded-full mb-6">
            My Featured Work
          </span>
          <SectionHeading
            title="Case Studies"
            description="Explore my complete portfolio of healthcare UX/UI design projects"
            align="left"
          />

          {/* View toggle and filter controls */}
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <div className="flex gap-2">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'outline'} 
                onClick={() => setViewMode('grid')}
                size="sm"
              >
                Grid View
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'} 
                onClick={() => setViewMode('list')}
                size="sm"
              >
                List View
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={activeFilter === null ? 'default' : 'outline'} 
                onClick={() => setActiveFilter(null)}
                size="sm"
              >
                All
              </Button>
              
              {/* Platform filters */}
              {platforms.map(platform => (
                <Button 
                  key={`platform-${platform}`}
                  variant={activeFilter === platform ? 'default' : 'outline'} 
                  onClick={() => setActiveFilter(platform)}
                  size="sm"
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
                >
                  {deviceType}
                </Button>
              ))}
            </div>
          </div>

          {/* Projects grid or list */}
          <div className={`${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
            : 'space-y-8'}`}>
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                viewMode={viewMode}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No projects match the selected filter.</p>
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
    </Layout>
  );
};

export default Projects;
