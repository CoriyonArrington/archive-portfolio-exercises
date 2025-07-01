
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Linkedin, Instagram, FileText, ArrowLeft, ArrowRight } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/work', label: 'Work' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/testimonials', label: 'Testimonials' },
  { path: '/contact', label: 'Contact' },
];

const Footer = () => {
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
  
  return (
    <footer className="py-20 border-t border-gray-100 dark:border-gray-800 dark:bg-gray-900">
      {/* Navigation CTA Section - conditionally rendered */}
      {!hideNavigationCTA && (
        <div className="container mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {showPrevious && (
              <Link 
                to={navLinks[prevIndex].path}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl flex items-center shadow-md hover:shadow-lg transition-all group border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center space-x-4">
                  <ArrowLeft className="text-gray-500 dark:text-gray-400 group-hover:text-highlight dark:group-hover:text-highlight transition-colors" />
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
              >
                <div className="flex flex-col items-start">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Next</p>
                  <h3 className="font-medium text-xl dark:text-white group-hover:text-highlight dark:group-hover:text-highlight transition-colors">{navLinks[nextIndex].label}</h3>
                </div>
                <ArrowRight className="text-gray-500 dark:text-gray-400 group-hover:text-highlight dark:group-hover:text-highlight transition-colors" />
              </Link>
            )}
          </div>
        </div>
      )}
      
      <div className="container">
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
              >
                <Linkedin size={16} />
              </a>
              <a 
                href="/resume-coriyon-arrington.pdf" 
                target="_blank"
                className="text-gray-600 dark:text-gray-400 hover:text-highlight transition-colors p-2 bg-gray-100 dark:bg-gray-800 rounded-full"
              >
                <FileText size={16} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            © {new Date().getFullYear()} Coriyon Arrington. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0 dark:text-gray-400">
            Designed and developed with love 💚
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
