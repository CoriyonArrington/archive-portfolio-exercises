
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Service } from '@/types/service';

interface ServiceNavigationProps {
  prevService: Service | null;
  nextService: Service | null;
}

/**
 * ServiceNavigation - Navigation between services
 * 
 * Provides links to previous and next services to facilitate
 * easy navigation between related services.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Descriptive link text
 * - Clear visual indicators
 * - Focus states
 */
const ServiceNavigation = ({ prevService, nextService }: ServiceNavigationProps) => {
  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {prevService && (
            <Link 
              to={`/services/${prevService.id}`}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl flex items-center shadow-md hover:shadow-xl transition-all group border border-gray-100 dark:border-gray-700"
              aria-label={`Previous service: ${prevService.title}`}
            >
              <div className="flex items-center space-x-4">
                <ArrowLeft 
                  className="text-gray-500 dark:text-gray-400 group-hover:text-highlight dark:group-hover:text-highlight transition-colors" 
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Previous Service</p>
                  <h3 className="font-medium text-xl dark:text-white group-hover:text-highlight dark:group-hover:text-highlight transition-colors">
                    {prevService.title}
                  </h3>
                </div>
              </div>
            </Link>
          )}
          
          {nextService && (
            <Link 
              to={`/services/${nextService.id}`}
              className={`bg-white dark:bg-gray-900 p-8 rounded-2xl flex items-center justify-between shadow-md hover:shadow-xl transition-all group border border-gray-100 dark:border-gray-700 ${!prevService ? 'md:col-span-2' : ''}`}
              aria-label={`Next service: ${nextService.title}`}
            >
              <div className="flex flex-col items-start">
                <p className="text-sm text-gray-500 dark:text-gray-400">Next Service</p>
                <h3 className="font-medium text-xl dark:text-white group-hover:text-highlight dark:group-hover:text-highlight transition-colors">
                  {nextService.title}
                </h3>
              </div>
              <ArrowRight 
                className="text-gray-500 dark:text-gray-400 group-hover:text-highlight dark:group-hover:text-highlight transition-colors" 
                aria-hidden="true"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceNavigation;
