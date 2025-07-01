
import React from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { GraduationCap, Briefcase } from 'lucide-react';

/**
 * Background - Education and work experience section
 * 
 * Displays the education and work experience in a responsive grid layout.
 * 
 * Accessibility features:
 * - Semantic HTML with appropriate headings hierarchy
 * - ARIA attributes for better screen reader experience
 * - High contrast text for readability
 * - Responsive layout for all device sizes
 */
const Background = () => {
  return (
    <div className="mb-24">
      <SectionHeading 
        title="My background"
        align="left"
        className="mb-10"
      />
      
      <div 
        className="grid grid-cols-1 md:grid-cols-2 gap-16"
        aria-label="Education and work experience"
      >
        {/* Education Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold dark:text-white">Education & Training</h3>
          <div 
            className="space-y-8"
            aria-label="Education history"
          >
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 hover:opacity-80 transition-opacity" aria-hidden="true" />
                </div>
              </div>
              <div>
                <h4 className="font-medium dark:text-white">MSc. Biomedical Engineering</h4>
                <p className="text-sm text-muted-foreground dark:text-gray-400">Stanford University · 2015-2017</p>
                <p className="mt-2 dark:text-gray-300">
                  Specialized in human-computer interaction for healthcare applications.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 hover:opacity-80 transition-opacity" aria-hidden="true" />
                </div>
              </div>
              <div>
                <h4 className="font-medium dark:text-white">BSc. Human-Computer Interaction</h4>
                <p className="text-sm text-muted-foreground dark:text-gray-400">Carnegie Mellon University · 2011-2015</p>
                <p className="mt-2 dark:text-gray-300">
                  Graduated with honors, focus on accessibility and inclusive design.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Work Experience Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold dark:text-white">Work Experience</h3>
          <div 
            className="space-y-8"
            aria-label="Work history"
          >
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 hover:opacity-80 transition-opacity" aria-hidden="true" />
                </div>
              </div>
              <div>
                <h4 className="font-medium dark:text-white">Senior Product Designer</h4>
                <p className="text-sm text-muted-foreground dark:text-gray-400">HealthTech Inc. · 2020-Present</p>
                <p className="mt-2 dark:text-gray-300">
                  Leading design for patient engagement platform. Increased user retention by 43%.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 hover:opacity-80 transition-opacity" aria-hidden="true" />
                </div>
              </div>
              <div>
                <h4 className="font-medium dark:text-white">Product Designer</h4>
                <p className="text-sm text-muted-foreground dark:text-gray-400">MedLife Solutions · 2017-2020</p>
                <p className="mt-2 dark:text-gray-300">
                  Designed telehealth experiences for elderly patients. Improved usability scores by 68%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Background;
