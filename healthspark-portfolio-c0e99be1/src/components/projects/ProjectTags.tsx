
import React from 'react';

interface ProjectTagsProps {
  tags: string[];
  platforms: string[];
  deviceTypes: string[];
}

/**
 * ProjectTags - Displays project category tags
 * 
 * Shows tags for project categories, platforms, and device types.
 * 
 * @param {string[]} tags - Array of project category tags
 * @param {string[]} platforms - Array of platform tags
 * @param {string[]} deviceTypes - Array of device type tags
 * 
 * Accessibility features:
 * - Proper labeling for screen readers
 * - High contrast text for readability
 */
const ProjectTags = ({ tags, platforms, deviceTypes }: ProjectTagsProps) => {
  // Convert tags to title case
  const formatTag = (tag: string) => {
    return tag.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag, index) => (
        <span key={index} className="px-3 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
          {formatTag(tag)}
        </span>
      ))}
      {platforms.map((platform, index) => (
        <span key={`platform-${index}`} className="px-3 py-1 text-xs font-medium bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
          {formatTag(platform)}
        </span>
      ))}
      {deviceTypes.map((deviceType, index) => (
        <span key={`device-${index}`} className="px-3 py-1 text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
          {formatTag(deviceType)}
        </span>
      ))}
    </div>
  );
};

export default ProjectTags;
