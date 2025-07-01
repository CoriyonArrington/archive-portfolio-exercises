
import React from 'react';

/**
 * ProfileImage - Displays the profile image
 * 
 * Shows a profile image with appropriate styling and shadow effects.
 * 
 * Accessibility features:
 * - Descriptive alt text
 * - Semantic HTML
 * - Proper image loading
 */
const ProfileImage = () => {
  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="relative rounded-2xl overflow-hidden shadow-card">
          <img 
            src="/images/about-me-image.jpg" 
            alt="Coriyon Arrington, a professional product designer, smiling at the camera" 
            className="w-full h-auto object-cover"
            loading="eager" // Important image, load immediately
            width="800"
            height="600"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
