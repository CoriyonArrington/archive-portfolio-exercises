
import React from 'react';

interface FloatingStatCardProps {
  position: 'top-right' | 'bottom-left';
  title: string;
  value: string;
}

/**
 * FloatingStatCard - Displays floating statistics with animation
 * 
 * Shows a floating card with project statistics and metrics.
 * 
 * @param {string} position - The position of the card (top-right or bottom-left)
 * @param {string} title - The title of the statistic
 * @param {string} value - The value or metric to display
 * 
 * Accessibility features:
 * - Hidden from screen readers as it's decorative
 * - High contrast text for visual users
 */
const FloatingStatCard = ({ position, title, value }: FloatingStatCardProps) => {
  const positionClasses = {
    'top-right': 'absolute top-4 right-2',
    'bottom-left': 'absolute -bottom-16 left-2',
  };

  return (
    <div 
      className={`${positionClasses[position]} glass-card rounded-2xl p-5 animate-float shadow-lg dark:bg-gray-800/90 dark:border-gray-700`}
      aria-hidden="true"
    >
      <div className="flex items-center space-x-2">
        <div className="flex -space-x-1">
          <div className="h-8 w-8 rounded-full bg-green-500"></div>
          <div className="h-8 w-8 rounded-full bg-blue-500"></div>
        </div>
        <div>
          <p className="text-sm font-medium dark:text-white">{title}</p>
          <p className="text-xs text-highlight font-medium">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default FloatingStatCard;
