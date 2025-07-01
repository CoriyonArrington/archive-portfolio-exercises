
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationCTAProps {
  navLinks: Array<{ path: string; label: string }>;
}

/**
 * NavigationCTA Component
 * 
 * Displays previous and next navigation buttons in the footer.
 * Conditionally shows/hides buttons based on current page.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Clear visual indication of navigation purpose
 * - Descriptive text for screen readers
 */
const NavigationCTA = ({ navLinks }: NavigationCTAProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Find the current index in the navigation links
  const currentIndex = navLinks.findIndex(link => link.path === currentPath);
  
  // Calculate previous and next link indices with special conditions
  // For homepage, no previous link
  // For contact page, no next link
  const showPrevious = currentPath !== '/';
  const showNext = currentPath !== '/contact';
  
  // Calculate previous and next link indices
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : 0;
  const nextIndex = currentIndex < navLinks.length - 1 ? currentIndex + 1 : navLinks.length - 1;
  
  // Check if we should hide the navigation CTA
  const hideNavigationCTA = 
    currentPath.startsWith('/case-study/') || 
    (currentPath.startsWith('/services/') && currentPath !== '/services');
    
  if (hideNavigationCTA) return null;
  
  return (
    <div className="container mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {showPrevious && (
          <Link 
            to={navLinks[prevIndex].path}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl flex items-center shadow-md hover:shadow-lg transition-all group border border-gray-100 dark:border-gray-700"
            aria-label={`Go to previous section: ${navLinks[prevIndex].label}`}
          >
            <div className="flex items-center space-x-4">
              <ArrowLeft className="text-gray-500 dark:text-gray-400 group-hover:text-highlight dark:group-hover:text-highlight transition-colors" aria-hidden="true" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Previous</p>
                <h3 className="font-medium text-xl dark:text-white group-hover:text-highlight dark:group-hover:text-highlight transition-colors">{navLinks[prevIndex].label}</h3>
              </div>
            </div>
          </Link>
        )}
        
        {showNext && (
          <Link 
            to={navLinks[nextIndex].path}
            className={`bg-white dark:bg-gray-800 p-8 rounded-2xl flex items-center justify-between shadow-md hover:shadow-lg transition-all group border border-gray-100 dark:border-gray-700 ${!showPrevious ? 'md:col-span-2' : ''}`}
            aria-label={`Go to next section: ${navLinks[nextIndex].label}`}
          >
            <div className="flex flex-col items-start">
              <p className="text-sm text-gray-500 dark:text-gray-400">Next</p>
              <h3 className="font-medium text-xl dark:text-white group-hover:text-highlight dark:group-hover:text-highlight transition-colors">{navLinks[nextIndex].label}</h3>
            </div>
            <ArrowRight className="text-gray-500 dark:text-gray-400 group-hover:text-highlight dark:group-hover:text-highlight transition-colors" aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavigationCTA;
