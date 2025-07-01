
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';
import ThemeToggle from './ThemeToggle';

/**
 * Navbar Component
 * 
 * Main navigation header that appears on all pages.
 * Provides responsive navigation for both desktop and mobile views.
 * 
 * Accessibility features:
 * - Skip link for keyboard users to bypass navigation
 * - Semantic HTML with proper ARIA roles
 * - Mobile menu toggle with appropriate ARIA attributes
 * - Visual indication of current page
 * - Keyboard navigable links and buttons
 */
const Navbar = () => {
  // State to track if page has been scrolled
  const [isScrolled, setIsScrolled] = useState(false);
  // State to control mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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
        <Logo />
        
        {/* Desktop Navigation */}
        <DesktopNav />
        
        <div className="flex items-center space-x-4">
          {/* Theme toggle button */}
          <ThemeToggle />
          
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

      {/* Mobile navigation menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default Navbar;
