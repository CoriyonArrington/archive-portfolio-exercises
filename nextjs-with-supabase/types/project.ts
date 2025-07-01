// types/project.ts (Updated)
import type { Database, Json } from './supabase';

// Type for the nested tag object when fetched via join
type ProjectTag = { tag: string };

// Alias the generated DB type for a single project row
// And add the expected structure for joined tags
// *** ADDED image_url and image_alt ***
export type Project = Database['public']['Tables']['projects']['Row'] & {
  project_tags: ProjectTag[]; // Expect an array of tag objects
  // Add these fields based on expected DB schema for ProjectImage
  image_url?: string | null;
  image_alt?: string | null;
};

// Define structure for the content JSONB field (example)
export type ProjectContent = {
  overview?: string;
  challenge?: string;
  solution?: string;
  // Add other fields as needed
};

// Props for the ProjectsSection component
// Made text props optional, added optional href
export interface ProjectsSectionProps {
  headline?: string | null;
  body?: string | null;
  cta?: string | null;
  projects: Project[]; // Array of fetched projects (including tags)
  href?: string; // Optional href for the main CTA button
}

// Props specifically for the ProjectCard component
// Added optional className
export interface ProjectCardProps {
    project: Project; // Pass the whole project object
    className?: string; // Allow passing additional classes
}