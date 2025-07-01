
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/theme-context';

/**
 * Navbar Component
 * 
 * Provides navigation functionality across the application with responsive behavior
 * for both mobile and desktop views. Implements accessibility features as per WCAG 2.1.
 */
const Navbar = () => {
  // State to track if page has been scrolled
  const [isScrolled, setIsScrolled] = useState(false);
  // State to control mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Get current location for active link highlighting
  const location = useLocation();
  // Access theme context for dark/light mode toggle
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  /**
   * Effect hook to handle scroll events
   * Changes navbar appearance when page is scrolled
   */
  useEffect(() => {
    const handleScroll = () => {
      // Apply scrolled style when window is scrolled more than 20px
      setIsScrolled(window.scrollY > 20);
    };
    
    // Add scroll event listener when component mounts
    window.addEventListener('scroll', handleScroll);
    // Remove event listener when component unmounts to prevent memory leaks
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Toggles the mobile menu open/closed state
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
  
  /**
   * Helper function to determine if a link is active
   * @param {string} path - The path to check against current location
   * @returns {boolean} True if the path matches current location
   */
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4',
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-md' 
          : 'bg-transparent'
      )}
      role="banner"
    >
      <div className="container flex items-center justify-between">
        {/* Logo and site name */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-opacity hover:opacity-80"
          onClick={handleLogoClick}
          aria-label="Coriyon homepage"
        >
          <img src="/images/coriyon-arrington.png" alt="Coriyon Arrington" className="w-10 h-10 rounded-full object-cover border-2 border-highlight shadow-sm" />
          <span className="text-lg font-medium dark:text-white">Coriyon</span>
        </Link>
        
        {/* Desktop Navigation - Hidden on small screens */}
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
        
        <div className="flex items-center space-x-4">
          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun size={18} className="text-yellow-400 hover:text-yellow-500 transition-colors" aria-hidden="true" />
            ) : (
              <Moon size={18} className="text-gray-700 hover:text-gray-900 transition-colors" aria-hidden="true" />
            )}
          </button>
          
          {/* Call to action button - Hidden on mobile */}
          <Button
            variant="default"
            size="sm"
            className="bg-black dark:bg-white/90 hover:bg-black/90 dark:hover:bg-white/100 text-white dark:text-black rounded-full px-6 transition-all shadow-md hover:shadow-lg hidden md:flex"
            asChild
          >
            <Link to="/contact">Book a call</Link>
          </Button>
          
          {/* Mobile menu button - Only visible on small screens */}
          <button 
            className="md:hidden text-gray-800 dark:text-gray-200 hover:text-highlight dark:hover:text-highlight transition-colors focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation menu - Only visible when toggled */}
      {isMenuOpen && (
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
              onClick={() => setIsMenuOpen(false)}
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
              onClick={() => setIsMenuOpen(false)}
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
              onClick={() => setIsMenuOpen(false)}
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
              onClick={() => setIsMenuOpen(false)}
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
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Book a call</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
