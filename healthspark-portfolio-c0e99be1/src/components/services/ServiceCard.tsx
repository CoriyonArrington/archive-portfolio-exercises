
import React from 'react';
import { Service } from '@/types/service';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface ServiceCardProps {
  service: Service;
}

/**
 * ServiceCard - Displays a service card with icon, title, and description
 * 
 * Responsive component that shows service information differently based on viewport size.
 * On mobile devices, only the button is clickable for better touch target accessibility.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Clear visual hierarchy
 * - Mobile-optimized touch targets
 */
const ServiceCard = ({ service }: ServiceCardProps) => {
  const { id, title, description, icon } = service;
  const isMobile = useIsMobile();
  
  // Wrap content in Link component only on desktop
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (isMobile) {
      return <div className="h-full">{children}</div>;
    }
    
    return (
      <Link to={`/services/${id}`} className="block h-full">
        {children}
      </Link>
    );
  };
  
  return (
    <CardWrapper>
      <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl dark:shadow-none dark:border-gray-700 border border-gray-100 group h-full flex flex-col p-8 hover:-translate-y-1 transition-all duration-300">
        <div className="mb-6 text-4xl text-highlight">{icon}</div>
        
        <h3 className="text-xl font-bold mb-4 dark:text-white">{title}</h3>
        <p className="text-muted-foreground mb-6 dark:text-gray-300">{description}</p>
        
        <div className="mt-auto">
          {isMobile ? (
            <Button 
              variant="outline" 
              className="w-fit rounded-full border-gray-200 dark:border-gray-700 dark:text-white"
              asChild
            >
              <Link to={`/services/${id}`}>
                <span>Learn more</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform" />
              </Link>
            </Button>
          ) : (
            <div className="group/button">
              <Button 
                variant="outline" 
                className="w-fit group rounded-full h-10 pointer-events-none border-gray-200 dark:border-gray-700 dark:text-white"
              >
                <span className="group-hover/button:text-highlight transition-colors">Learn more</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1 group-hover/button:text-highlight" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </CardWrapper>
  );
};

export default ServiceCard;
