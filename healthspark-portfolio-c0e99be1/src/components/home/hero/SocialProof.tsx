
import React from 'react';

/**
 * SocialProof - Displays testimonial avatars and rating
 * 
 * Shows a group of testimonial avatars and star ratings to build trust.
 * 
 * Accessibility features:
 * - Proper aria-labels for screen readers
 * - Hidden decorative images from screen readers
 */
const SocialProof = () => {
  return (
    <div className="flex items-center space-x-3" aria-label="Trusted by healthcare leaders">
      {/* Avatar group with testimonial users */}
      <div className="flex -space-x-3" aria-hidden="true">
        <img 
          src="https://randomuser.me/api/portraits/women/1.jpg" 
          alt="" 
          className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 shadow-sm" 
        />
        <img 
          src="https://randomuser.me/api/portraits/men/1.jpg" 
          alt="" 
          className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 shadow-sm" 
        />
        <img 
          src="https://randomuser.me/api/portraits/women/2.jpg" 
          alt="" 
          className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 shadow-sm" 
        />
        <img 
          src="https://randomuser.me/api/portraits/men/2.jpg" 
          alt="" 
          className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 shadow-sm" 
        />
        <img 
          src="https://randomuser.me/api/portraits/women/3.jpg" 
          alt="" 
          className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 shadow-sm" 
        />
      </div>
      
      {/* Star rating and trust text */}
      <div className="text-sm">
        <div className="flex items-center" aria-label="5 out of 5 stars">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i} 
              className="w-4 h-4 text-yellow-400" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          ))}
        </div>
        <p className="text-muted-foreground dark:text-gray-400">Trusted by healthcare leaders</p>
      </div>
    </div>
  );
};

export default SocialProof;
