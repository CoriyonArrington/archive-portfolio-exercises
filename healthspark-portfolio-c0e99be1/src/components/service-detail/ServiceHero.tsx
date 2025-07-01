
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Service } from '@/types/service';

interface ServiceHeroProps {
  service: Service;
  deliverables: string[];
}

/**
 * ServiceHero - Hero section for service detail pages
 * 
 * Displays service title, icon, and key deliverables with
 * a call-to-action button.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - ARIA attributes
 * - Proper link descriptions
 */
const ServiceHero = ({ service, deliverables }: ServiceHeroProps) => {
  return (
    <div className="container">
      <Link 
        to="/services" 
        className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white mb-8 transition-colors"
        aria-label="Back to all services"
      >
        <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
        Back to all services
      </Link>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">{service.title}</h1>
          <ul className="space-y-4" aria-label="Service deliverables">
            {deliverables.map((deliverable, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="bg-primary/10 dark:bg-primary/20 p-1 rounded-full mt-1" aria-hidden="true">
                  <Check className="w-4 h-4 text-primary dark:text-primary-foreground" />
                </div>
                <span className="dark:text-gray-300">{deliverable}</span>
              </li>
            ))}
          </ul>
          
          <Button 
            asChild 
            className="mt-8 rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <Link to="/contact">Get started</Link>
          </Button>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl flex items-center justify-center shadow-md">
          <div 
            className="text-6xl animate-float"
            aria-hidden="true"
          >
            {service.icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceHero;
