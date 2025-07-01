
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

/**
 * DesktopNav Component
 * 
 * Horizontal navigation menu for desktop viewports.
 * Displays links to main pages with active state indication.
 * 
 * Accessibility features:
 * - Semantic navigation element
 * - Proper ARIA attributes for current page
 * - High contrast visual indicators
 */
const DesktopNav = () => {
  const location = useLocation();
  
  /**
   * Helper function to determine if a link is active
   * @param {string} path - The path to check against current location
   * @returns {boolean} True if the path matches current location
   */
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="hidden md:flex items-center space-x-10" aria-label="Main navigation">
      <Link 
        to="/work" 
        className={cn(
          "text-sm font-medium transition-colors hover:text-highlight dark:text-gray-200 dark:hover:text-highlight",
          isActive('/work') && "text-highlight dark:text-highlight font-semibold"
        )}
        aria-current={isActive('/work') ? 'page' : undefined}
      >
        Work
      </Link>
      <Link 
        to="/services" 
        className={cn(
          "text-sm font-medium transition-colors hover:text-highlight dark:text-gray-200 dark:hover:text-highlight",
          isActive('/services') && "text-highlight dark:text-highlight font-semibold"
        )}
        aria-current={isActive('/services') ? 'page' : undefined}
      >
        Services
      </Link>
      <Link 
        to="/about" 
        className={cn(
          "text-sm font-medium transition-colors hover:text-highlight dark:text-gray-200 dark:hover:text-highlight",
          isActive('/about') && "text-highlight dark:text-highlight font-semibold"
        )}
        aria-current={isActive('/about') ? 'page' : undefined}
      >
        About
      </Link>
      <Link 
        to="/testimonials" 
        className={cn(
          "text-sm font-medium transition-colors hover:text-highlight dark:text-gray-200 dark:hover:text-highlight",
          isActive('/testimonials') && "text-highlight dark:text-highlight font-semibold"
        )}
        aria-current={isActive('/testimonials') ? 'page' : undefined}
      >
        Testimonials
      </Link>
    </nav>
  );
};

export default DesktopNav;
