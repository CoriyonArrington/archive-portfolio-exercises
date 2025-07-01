
import React from 'react';
import NavigationCTA from './NavigationCTA';
import FooterLinks from './FooterLinks';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/work', label: 'Work' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/testimonials', label: 'Testimonials' },
  { path: '/contact', label: 'Contact' },
];

/**
 * Footer Component
 * 
 * Main site footer with navigation links, social links, and copyright information.
 * Includes previous/next navigation buttons for easy site exploration.
 * 
 * Accessibility features:
 * - Semantic HTML with appropriate landmarks
 * - Proper heading hierarchy
 * - Clear link text and purpose
 * - Proper color contrast
 */
const Footer = () => {
  return (
    <footer className="py-20 border-t border-gray-100 dark:border-gray-800 dark:bg-gray-900">
      {/* Navigation CTA Section - conditionally rendered */}
      <NavigationCTA navLinks={navLinks} />
      
      <div className="container">
        {/* Footer links section */}
        <FooterLinks />
        
        {/* Copyright section */}
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
