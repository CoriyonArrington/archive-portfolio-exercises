// components/ui/section.tsx - Updated for New Project
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // Assuming utils is in lib

// Define style variants for section padding and background
const sectionVariants = cva(
  "w-full", // Takes full width within its parent container
  {
    variants: {
      background: {
        none: "bg-transparent",
        muted: "bg-muted", // Ensure these colors are defined in your tailwind/globals
        accent: "bg-accent", // Ensure these colors are defined in your tailwind/globals
      },
      padding: {
        sm: "py-8",
        md: "py-16",
        lg: "py-24",
      },
    },
    defaultVariants: {
      background: "none",
      padding: "md",
    },
  }
);

export interface SectionProps
  extends React.HTMLAttributes<HTMLDivElement>, // Use HTMLDivElement for <section> attributes
    VariantProps<typeof sectionVariants> {
  /** Optional HTML id for anchor linking */
  id?: string;
  /** Section heading text */
  title?: string;
  /** Section subtitle or description text */
  subtitle?: string;
  /** Content of the section */
  children: React.ReactNode;
  /** Use <section> tag semantically */
  as?: "section" | "div"; // Allow overriding tag, default to section
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  (
    {
      id,
      title,
      subtitle,
      background,
      padding,
      className,
      children,
      as: Tag = "section", // Default to <section>
      ...props
    },
    ref
  ) => {
    return (
      <Tag // Use dynamic tag based on 'as' prop
        id={id}
        ref={ref}
        className={cn(sectionVariants({ background, padding, className }))}
        {...props}
      >
        {/* REMOVED the inner container div - content now sits directly in the section */}
        {/* Optional: Add title/subtitle container if specific centering/max-width needed *within* the section */}
        {(title || subtitle) && (
          <div className="mb-8"> {/* Add margin below title block */}
            {title && <h2 className="text-3xl font-bold mb-2">{title}</h2>} {/* Reduced margin */}
            {subtitle && (
              <p className="text-lg text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </Tag>
    );
  }
);
Section.displayName = "Section";

export { Section, sectionVariants };