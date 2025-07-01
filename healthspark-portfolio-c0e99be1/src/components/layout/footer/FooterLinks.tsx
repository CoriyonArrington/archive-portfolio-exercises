
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * FooterLinks Component
 * 
 * Displays categorized navigation links in the footer.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Clear section headings
 * - Proper hover states for links
 */
const FooterLinks = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      <div className="space-y-4">
        <h3 className="font-medium text-lg dark:text-white">Coriyon Arrington</h3>
        <p className="text-sm text-muted-foreground max-w-xs dark:text-gray-400">
          Senior product designer with a background in biomedical engineering, 
          passionate about healthcare innovation.
        </p>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium text-sm text-muted-foreground dark:text-gray-400">Explore</h3>
        <ul className="space-y-2">
          <li>
            <Link to="/work" className="text-sm hover:text-highlight transition-colors dark:text-gray-300 dark:hover:text-highlight">
              Work
            </Link>
          </li>
          <li>
            <Link to="/services" className="text-sm hover:text-highlight transition-colors dark:text-gray-300 dark:hover:text-highlight">
              Services
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-sm hover:text-highlight transition-colors dark:text-gray-300 dark:hover:text-highlight">
              About
            </Link>
          </li>
          <li>
            <Link to="/testimonials" className="text-sm hover:text-highlight transition-colors dark:text-gray-300 dark:hover:text-highlight">
              Testimonials
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-sm hover:text-highlight transition-colors dark:text-gray-300 dark:hover:text-highlight">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium text-sm text-muted-foreground dark:text-gray-400">Legal</h3>
        <ul className="space-y-2">
          <li>
            <Link to="/privacy" className="text-sm hover:text-highlight transition-colors dark:text-gray-300 dark:hover:text-highlight">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/terms" className="text-sm hover:text-highlight transition-colors dark:text-gray-300 dark:hover:text-highlight">
              Terms of Service
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium text-sm text-muted-foreground dark:text-gray-400">Connect</h3>
        <div className="flex space-x-4">
          <a 
            href="https://www.linkedin.com/in/coriyon/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-highlight transition-colors p-2 bg-gray-100 dark:bg-gray-800 rounded-full"
            aria-label="LinkedIn profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a 
            href="/resume-coriyon-arrington.pdf" 
            target="_blank"
            className="text-gray-600 dark:text-gray-400 hover:text-highlight transition-colors p-2 bg-gray-100 dark:bg-gray-800 rounded-full"
            aria-label="Download resume (PDF)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;
