
import { cn } from "@/lib/utils";
import React from "react";

/**
 * SectionHeading - Reusable component for section titles and descriptions
 * 
 * This component creates a semantic heading section with optional description.
 * It supports different alignment options and additional content via children prop.
 * 
 * Accessibility features:
 * - Semantic heading element (h2)
 * - Optional ID for anchor links and ARIA references
 * - Proper text contrast ratios in both light and dark modes
 * - Responsive typography for different screen sizes
 * 
 * @param {string} title - The main heading text
 * @param {string} description - Optional subheading or description text
 * @param {string} className - Optional additional CSS classes for styling
 * @param {"left" | "center" | "right"} align - Text alignment (defaults to center)
 * @param {string} id - Optional ID for the heading (for accessibility and anchor links)
 * @param {React.ReactNode} children - Optional additional content
 */
interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center" | "right";
  id?: string;
  children?: React.ReactNode;
}

export const SectionHeading = ({
  title,
  description,
  className,
  align = "center",
  id,
  children,
}: SectionHeadingProps) => {
  // Generate a unique ID if none provided (for accessibility)
  const headingId = id || `heading-${title.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div
      className={cn(
        "space-y-4 mb-12", // Base spacing
        align === "left" && "text-left",
        align === "center" && "text-center mx-auto",
        align === "right" && "text-right mx-auto",
        className
      )}
      // Use aria-labelledby to associate this section with its heading
      aria-labelledby={headingId}
    >
      <h2 
        id={headingId}
        className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white"
      >
        {title}
      </h2>
      
      {description && (
        <p 
          className="text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto"
          // Add ID for potential ARIA references
          id={`${headingId}-description`}
        >
          {description}
        </p>
      )}
      
      {children}
    </div>
  );
};
