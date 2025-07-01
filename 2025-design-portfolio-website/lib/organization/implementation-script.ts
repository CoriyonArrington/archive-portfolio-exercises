/**
 * Implementation Script for Codebase Reorganization
 *
 * This file provides step-by-step instructions for executing the reorganization plan.
 */

export const implementationSteps = [
    {
      step: 1,
      name: "Setup",
      instructions: [
        "Create a new branch: `git checkout -b refactor/codebase-reorganization-2025`",
        "Run the directory structure setup script: `bash scripts/setup-directory-structure.sh`",
        'Commit the directory structure: `git add . && git commit -m "Create new directory structure"`',
      ],
    },
    {
      step: 2,
      name: "Core Utilities Migration",
      instructions: [
        "Move core utility files to their new locations",
        "Update import statements in the moved files",
        "Create index files for exporting from directories",
        "Test that utility functions work correctly",
        'Commit changes: `git add . && git commit -m "Migrate core utilities"`',
      ],
    },
    {
      step: 3,
      name: "Layout Components Migration",
      instructions: [
        "Consolidate header components into components/layout/header/",
        "Consolidate footer components into components/layout/footer/",
        "Consolidate navigation components into components/layout/navigation/",
        "Update import statements in the moved components",
        "Test that layout components render correctly",
        'Commit changes: `git add . && git commit -m "Migrate layout components"`',
      ],
    },
    {
      step: 4,
      name: "Shared Components Migration",
      instructions: [
        "Move reusable UI components to components/shared/",
        "Update import statements in the moved components",
        "Test that shared components render correctly",
        'Commit changes: `git add . && git commit -m "Migrate shared components"`',
      ],
    },
    {
      step: 5,
      name: "Section Components Migration",
      instructions: [
        "Consolidate testimonial components into components/sections/testimonials/",
        "Consolidate project components into components/sections/work/",
        "Move home page sections to components/sections/home/",
        "Update import statements in the moved components",
        "Test that section components render correctly",
        'Commit changes: `git add . && git commit -m "Migrate section components"`',
      ],
    },
    {
      step: 6,
      name: "Admin Components Migration",
      instructions: [
        "Move admin-specific components to components/admin/",
        "Consolidate admin dashboard components",
        "Update import statements in the moved components",
        "Test that admin components render correctly",
        'Commit changes: `git add . && git commit -m "Migrate admin components"`',
      ],
    },
    {
      step: 7,
      name: "Page Migration",
      instructions: [
        "Move public-facing pages to app/(main)/",
        "Move admin pages to app/admin/",
        "Update import statements in the moved pages",
        "Test that pages render correctly with the new component imports",
        'Commit changes: `git add . && git commit -m "Migrate pages"`',
      ],
    },
    {
      step: 8,
      name: "API Routes Migration",
      instructions: [
        "Organize API routes by resource in app/api/",
        "Update import statements in the API routes",
        "Test that API endpoints work correctly",
        'Commit changes: `git add . && git commit -m "Migrate API routes"`',
      ],
    },
    {
      step: 9,
      name: "Testing and Refinement",
      instructions: [
        "Run comprehensive tests across all pages and components",
        "Fix any broken imports or rendering issues",
        "Optimize component props and interfaces",
        "Ensure consistent naming patterns across all files",
        'Commit changes: `git add . && git commit -m "Testing and refinement"`',
      ],
    },
    {
      step: 10,
      name: "Documentation",
      instructions: [
        "Update README.md with new directory structure",
        "Document component organization and conventions",
        "Create usage examples for consolidated components",
        'Commit changes: `git add . && git commit -m "Update documentation"`',
      ],
    },
    {
      step: 11,
      name: "Final Review and Merge",
      instructions: [
        "Conduct a final review of all changes",
        "Create a pull request for the refactoring branch",
        "Address any review comments",
        "Merge the pull request into the main branch",
      ],
    },
  ]
  
  export const fallbackPlan = {
    issue: "Breaking changes in component API",
    solution: "Create wrapper components that maintain the old API but use the new consolidated components internally",
    example: `
  // Old API compatibility wrapper
  import { TestimonialsGrid } from '@/components/sections/testimonials/testimonials-grid';
  import type { Testimonial } from '@/types';
  
  interface OldTestimonialsProps {
    data: Testimonial[];
    showTitle?: boolean;
    columns?: number;
  }
  
  export function Testimonials({ data, showTitle = true, columns = 3 }: OldTestimonialsProps) {
    // Map old props to new component props
    return (
      <TestimonialsGrid 
        testimonials={data}
        variant="grid"
        className={columns === 2 ? 'grid-cols-2' : columns === 4 ? 'grid-cols-4' : 'grid-cols-3'}
        hideHeading={!showTitle}
      />
    );
  }
  `,
  }
  
  export const migrationProgress = {
    trackingMethod: "Maintain a spreadsheet or project board with all files and their migration status",
    reportingMethod: "Regular updates on migration progress during team meetings",
    metrics: [
      "Number of files migrated",
      "Number of components consolidated",
      "Reduction in duplicate code",
      "Test coverage for migrated components",
    ],
  }
  
  export const postMigrationTasks = [
    "Set up linting rules to enforce new naming conventions",
    "Create component documentation with Storybook",
    "Train team members on the new directory structure and component patterns",
    "Update CI/CD pipeline configuration if necessary",
    "Monitor for any issues in production after deployment",
  ]
  
  