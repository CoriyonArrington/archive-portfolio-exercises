
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Logo Component
 * 
 * Displays the site logo and name, linking to the homepage.
 * Includes smooth scroll behavior when clicked on the homepage.
 * 
 * Accessibility features:
 * - Descriptive aria-label
 * - Proper alt text for image
 * - Appropriate focus styles
 */
const Logo = () => {
  const location = useLocation();
  
  /**
   * Handles the logo click event
   * If on homepage, scrolls to top smoothly instead of reloading page
   */
  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-2 transition-opacity hover:opacity-80"
      onClick={handleLogoClick}
      aria-label="Coriyon homepage"
    >
      <img 
        src="/images/coriyon-arrington.png" 
        alt="Coriyon Arrington" 
        className="w-10 h-10 rounded-full object-cover border-2 border-highlight shadow-sm" 
      />
      <span className="text-lg font-medium dark:text-white">Coriyon</span>
    </Link>
  );
};

export default Logo;
