
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/theme-context';
/**
 * ThemeToggle Component
 * 
 * Button that toggles between light and dark theme.
 * Displays appropriate icon based on current theme.
 * 
 * Accessibility features:
 * - Clear button purpose via aria-label
 * - Visual icon indication of current state
 * - Proper focus states for keyboard navigation
 */
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun size={18} className="text-yellow-400 hover:text-yellow-500 transition-colors" aria-hidden="true" />
      ) : (
        <Moon size={18} className="text-gray-700 hover:text-gray-900 transition-colors" aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle;