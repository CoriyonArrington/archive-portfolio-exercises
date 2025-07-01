
import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Layout Component
 * 
 * Main layout wrapper that includes the navigation bar and footer.
 * Handles scroll-to-top behavior when navigating between pages.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Main content region properly identified
 * - Consistent navigation across all pages
 */
const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top whenever the pathname changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Skip link for keyboard users */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-50 bg-white dark:bg-gray-800 p-2 m-3 text-primary"
      >
        Skip to main content
      </a>
      
      <Navbar />
      <main id="main-content" className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
