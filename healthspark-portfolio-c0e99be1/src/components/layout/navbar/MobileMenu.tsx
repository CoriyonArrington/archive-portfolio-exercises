
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileMenu Component
 * 
 * Mobile navigation drawer that displays when the menu button is clicked.
 * Provides navigation links and a call-to-action button.
 * 
 * Accessibility features:
 * - Proper ARIA roles and attributes
 * - Clearly labeled navigation links
 * - Visual indicators for active page
 */
const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const location = useLocation();
  
  /**
   * Helper function to determine if a link is active
   * @param {string} path - The path to check against current location
   * @returns {boolean} True if the path matches current location
   */
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      id="mobile-menu"
      className="md:hidden py-6 px-6 bg-white dark:bg-gray-900 absolute top-full left-0 right-0 shadow-lg animate-slide-down"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <nav className="flex flex-col space-y-6">
        <Link 
          to="/work" 
          className={cn(
            "text-sm font-medium py-2 transition-colors hover:text-highlight dark:text-gray-200",
            isActive('/work') && "text-highlight dark:text-highlight font-semibold"
          )}
          onClick={onClose}
          aria-current={isActive('/work') ? 'page' : undefined}
        >
          Work
        </Link>
        <Link 
          to="/services" 
          className={cn(
            "text-sm font-medium py-2 transition-colors hover:text-highlight dark:text-gray-200",
            isActive('/services') && "text-highlight dark:text-highlight font-semibold"
          )}
          onClick={onClose}
          aria-current={isActive('/services') ? 'page' : undefined}
        >
          Services
        </Link>
        <Link 
          to="/about" 
          className={cn(
            "text-sm font-medium py-2 transition-colors hover:text-highlight dark:text-gray-200",
            isActive('/about') && "text-highlight dark:text-highlight font-semibold"
          )}
          onClick={onClose}
          aria-current={isActive('/about') ? 'page' : undefined}
        >
          About
        </Link>
        <Link 
          to="/testimonials" 
          className={cn(
            "text-sm font-medium py-2 transition-colors hover:text-highlight dark:text-gray-200",
            isActive('/testimonials') && "text-highlight dark:text-highlight font-semibold"
          )}
          onClick={onClose}
          aria-current={isActive('/testimonials') ? 'page' : undefined}
        >
          Testimonials
        </Link>
        
        <Button
          variant="default"
          size="sm"
          className="bg-black dark:bg-white hover:bg-black/90 dark:hover:bg-white/90 text-white dark:text-black rounded-full px-6 w-full transition-all shadow-md hover:shadow-lg"
          asChild
        >
          <Link to="/contact" onClick={onClose}>Book a call</Link>
        </Button>
      </nav>
    </div>
  );
};

export default MobileMenu;
