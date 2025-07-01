
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Project } from '@/types/project';
import { Link } from 'react-router-dom';
import { ArrowRight, BellPlus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import ProjectTags from './ProjectTags';
import ProjectOutcome from './ProjectOutcome';
import NotificationModal from './NotificationModal';

interface ProjectCardProps {
  project: Project;
  viewMode: 'grid' | 'list';
}

/**
 * ProjectCard - Displays a project in either grid or list view
 * 
 * Responsive component that shows project information differently based on viewport size.
 * On mobile devices, only the button is clickable for better touch target accessibility.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - Accessible card patterns
 * - Mobile-optimized touch targets
 */
const ProjectCard = ({ project, viewMode }: ProjectCardProps) => {
  const { id, title, description, image, tags, platforms, deviceTypes, outcome, featured = false } = project;
  const isMobile = useIsMobile();
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);

  // For non-featured projects, we'll show a notification button instead of "View case study"
  const isComingSoon = !featured;
  
  // Wrap content in Link component only for featured projects on desktop
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (isMobile || isComingSoon) {
      return <div className="h-full">{children}</div>;
    }
    
    return (
      <Link to={`/case-study/${id}`} className="block h-full group">
        {children}
      </Link>
    );
  };
  
  // Grid view card
  if (viewMode === 'grid') {
    return (
      <CardWrapper>
        <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-smooth border border-gray-100 dark:border-gray-700 h-full flex flex-col hover:shadow-card transition-all duration-300 hover:-translate-y-1">
          {/* Image on top for vertical layout */}
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10"></div>
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Coming Soon tag */}
            {isComingSoon && (
              <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full z-20">
                Coming Soon
              </div>
            )}
          </div>
          
          <div className="p-6 flex-grow flex flex-col">
            <ProjectTags tags={tags} platforms={platforms} deviceTypes={deviceTypes} />
            
            <h3 className="text-xl font-bold mb-2 dark:text-white">{title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{description}</p>

            {outcome && <ProjectOutcome value={outcome.value} description={outcome.description} />}

            <div className="mt-auto">
              {isComingSoon ? (
                // Get Notified button for coming soon projects
                <Button 
                  variant="outline" 
                  className="w-fit rounded-full h-10 dark:border-gray-700 dark:text-white"
                  onClick={() => setNotificationModalOpen(true)}
                >
                  <BellPlus className="mr-2 h-4 w-4" />
                  <span>Get notified</span>
                </Button>
              ) : isMobile ? (
                // View case study link button for mobile
                <Button 
                  variant="outline" 
                  className="w-fit rounded-full h-10 dark:border-gray-700 dark:text-white"
                  asChild
                >
                  <Link to={`/case-study/${id}`}>
                    <span>View case study</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform" />
                  </Link>
                </Button>
              ) : (
                // View case study static button for desktop (card is clickable)
                <div className="group/button">
                  <Button 
                    variant="outline" 
                    className="w-fit rounded-full h-10 pointer-events-none dark:border-gray-700 dark:text-white"
                  >
                    <span>View case study</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Notification Modal */}
        <NotificationModal
          open={notificationModalOpen}
          onOpenChange={setNotificationModalOpen}
          projectId={id}
          projectTitle={title}
        />
      </CardWrapper>
    );
  }

  // List view card
  return (
    <CardWrapper>
      <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-smooth border border-gray-100 dark:border-gray-700 hover:shadow-card transition-all duration-300 hover:-translate-y-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative h-full min-h-[200px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 z-10"></div>
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Coming Soon tag */}
            {isComingSoon && (
              <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full z-20">
                Coming Soon
              </div>
            )}
          </div>

          <div className="p-6 md:col-span-2 flex flex-col">
            <ProjectTags tags={tags} platforms={platforms} deviceTypes={deviceTypes} />

            <h3 className="text-xl font-bold mb-2 dark:text-white">{title}</h3>
            <p className="text-muted-foreground mb-4">{description}</p>

            {outcome && <ProjectOutcome value={outcome.value} description={outcome.description} />}

            <div className="mt-auto">
              {isComingSoon ? (
                // Get Notified button for coming soon projects
                <Button 
                  variant="outline" 
                  className="w-fit rounded-full h-10 dark:border-gray-700 dark:text-white"
                  onClick={() => setNotificationModalOpen(true)}
                >
                  <BellPlus className="mr-2 h-4 w-4" />
                  <span>Get notified</span>
                </Button>
              ) : isMobile ? (
                // View case study link button for mobile
                <Button 
                  variant="outline" 
                  className="w-fit rounded-full h-10 dark:border-gray-700 dark:text-white"
                  asChild
                >
                  <Link to={`/case-study/${id}`}>
                    <span>View case study</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform" />
                  </Link>
                </Button>
              ) : (
                // View case study static button for desktop (card is clickable)
                <div className="group/button">
                  <Button 
                    variant="outline" 
                    className="w-fit rounded-full h-10 pointer-events-none dark:border-gray-700 dark:text-white"
                  >
                    <span>View case study</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Notification Modal */}
        <NotificationModal
          open={notificationModalOpen}
          onOpenChange={setNotificationModalOpen}
          projectId={id}
          projectTitle={title}
        />
      </div>
    </CardWrapper>
  );
};

export default ProjectCard;
