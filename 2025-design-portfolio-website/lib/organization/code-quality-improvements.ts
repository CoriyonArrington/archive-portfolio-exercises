"use client"

/**
 * Code Quality Improvements
 *
 * This provides recommendations for improving code quality
 */

export const codeQualityImprovements = {
  typeDefinitions: {
    title: "Improve Type Definitions",
    description: "Create comprehensive type definitions for all data structures",
    benefits: ["Better type safety", "Improved developer experience", "Fewer runtime errors", "Better code completion"],
    implementation: `
// BEFORE: Minimal or missing type definitions
interface Project {
  id: string;
  title: string;
  description: string;
}

// AFTER: Comprehensive type definitions
interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  images: Array<{
    url: string;
    width: number;
    height: number;
    alt: string;
  }>;
  tags: string[];
  client: string;
  duration: string;
  services: string[];
}
`,
  },
  errorHandling: {
    title: "Consistent Error Handling",
    description: "Implement consistent error handling across the application",
    benefits: ["Better user experience", "Easier debugging", "More robust application", "Fewer unhandled exceptions"],
    implementation: `
// BEFORE: Inconsistent error handling
async function getProjects() {
  const { data } = await supabase.from('projects').select('*')
  return data
}

// AFTER: Consistent error handling
async function getProjects() {
  const { data, error } = await supabase.from('projects').select('*')
  
  if (error) {
    console.error('Error fetching projects:', error)
    throw new Error('Failed to fetch projects')
  }
  
  return data
}

// In components:
import { ErrorBoundary } from "@/components/shared/error-boundary"
import { ProjectsErrorFallback } from "@/components/sections/work/projects-error-fallback"

export default function ProjectsPage() {
  return (
    <ErrorBoundary fallback={<ProjectsErrorFallback />}>
      <Suspense fallback={<ProjectListSkeleton />}>
        <ProjectList />
      </Suspense>
    </ErrorBoundary>
  )
}
`,
  },
  componentProps: {
    title: "Consistent Component Props",
    description: "Standardize component props across similar components",
    benefits: ["Better developer experience", "Easier maintenance", "More consistent UI", "Reduced cognitive load"],
    implementation: `
// BEFORE: Inconsistent props
function ProjectCard({ project, showClient }) { ... }
function WorkCard({ data, displayClient, size }) { ... }
function PortfolioItem({ item, variant, showMeta }) { ... }

// AFTER: Consistent props
interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'featured' | 'compact';
  showMeta?: boolean;
}

function ProjectCard({ project, variant = 'default', showMeta = true }: ProjectCardProps) { ... }
`,
  },
  accessibilityImprovements: {
    title: "Accessibility Improvements",
    description: "Enhance accessibility across all components",
    benefits: [
      "Better user experience for all users",
      "Compliance with accessibility standards",
      "Improved SEO",
      "Broader audience reach",
    ],
    implementation: `
// BEFORE: Missing accessibility attributes
<button onClick={handleClick}>
  <img src="/icons/close.svg" />
</button>

// AFTER: Proper accessibility
<button 
  onClick={handleClick}
  aria-label="Close dialog"
  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
>
  <span className="sr-only">Close</span>
  <img src="/icons/close.svg" alt="" role="presentation" />
</button>
`,
  },
}

