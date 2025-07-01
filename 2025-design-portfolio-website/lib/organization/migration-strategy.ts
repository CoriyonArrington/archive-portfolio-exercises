/**
 * Migration Strategy for Codebase Reorganization
 *
 * This file outlines the approach for migrating the existing codebase to the new structure
 * with minimal disruption and risk.
 */

export type FileMigration = {
    sourcePath: string
    destinationPath: string
    status: "pending" | "completed" | "failed"
    dependencies: string[]
    notes?: string
  }
  
  export type MigrationPhase = {
    name: string
    description: string
    order: number
    migrations: FileMigration[]
  }
  
  /**
   * Migration phases in order of execution
   */
  export const migrationPhases: MigrationPhase[] = [
    {
      name: "foundation",
      description: "Create the new directory structure and core utilities",
      order: 1,
      migrations: [
        // Directory structure is created by the setup script
        {
          sourcePath: "lib/utils.ts",
          destinationPath: "lib/utils/index.ts",
          status: "pending",
          dependencies: [],
          notes: "Core utility functions used throughout the application",
        },
        {
          sourcePath: "lib/supabase.ts",
          destinationPath: "lib/supabase/client.ts",
          status: "pending",
          dependencies: [],
          notes: "Supabase client configuration",
        },
        {
          sourcePath: "types/index.ts",
          destinationPath: "types/index.ts",
          status: "pending",
          dependencies: [],
          notes: "Core type definitions",
        },
      ],
    },
    {
      name: "layout-components",
      description: "Consolidate and migrate layout components (header, footer, navigation)",
      order: 2,
      migrations: [
        // Header components
        {
          sourcePath: "components/header.tsx",
          destinationPath: "components/layout/header/index.tsx",
          status: "pending",
          dependencies: ["foundation"],
          notes: "Main header component",
        },
        {
          sourcePath: "components/main-nav.tsx",
          destinationPath: "components/layout/navigation/main-nav.tsx",
          status: "pending",
          dependencies: ["foundation"],
          notes: "Main navigation component",
        },
        {
          sourcePath: "components/mobile-nav.tsx",
          destinationPath: "components/layout/navigation/mobile-nav.tsx",
          status: "pending",
          dependencies: ["foundation"],
          notes: "Mobile navigation component",
        },
        // Footer components
        {
          sourcePath: "components/footer.tsx",
          destinationPath: "components/layout/footer/index.tsx",
          status: "pending",
          dependencies: ["foundation"],
          notes: "Main footer component",
        },
      ],
    },
    {
      name: "shared-components",
      description: "Migrate shared components used across multiple pages",
      order: 3,
      migrations: [
        {
          sourcePath: "components/button.tsx",
          destinationPath: "components/shared/button.tsx",
          status: "pending",
          dependencies: ["foundation"],
          notes: "Custom button component",
        },
        {
          sourcePath: "components/card.tsx",
          destinationPath: "components/shared/card.tsx",
          status: "pending",
          dependencies: ["foundation"],
          notes: "Card component",
        },
        {
          sourcePath: "components/section.tsx",
          destinationPath: "components/shared/section.tsx",
          status: "pending",
          dependencies: ["foundation"],
          notes: "Section wrapper component",
        },
      ],
    },
    {
      name: "section-components",
      description: "Migrate and consolidate page section components",
      order: 4,
      migrations: [
        // Testimonial components
        {
          sourcePath: "components/testimonials.tsx",
          destinationPath: "components/sections/testimonials/testimonials-grid.tsx",
          status: "pending",
          dependencies: ["foundation", "shared-components"],
          notes: "Consolidated testimonials grid component",
        },
        // Project components
        {
          sourcePath: "components/project-grid.tsx",
          destinationPath: "components/sections/work/project-grid.tsx",
          status: "pending",
          dependencies: ["foundation", "shared-components"],
          notes: "Project grid component",
        },
        // Home page sections
        {
          sourcePath: "components/hero.tsx",
          destinationPath: "components/sections/home/hero.tsx",
          status: "pending",
          dependencies: ["foundation", "shared-components"],
          notes: "Hero section component",
        },
      ],
    },
    {
      name: "admin-components",
      description: "Migrate and consolidate admin components",
      order: 5,
      migrations: [
        {
          sourcePath: "components/admin-sidebar.tsx",
          destinationPath: "components/admin/sidebar.tsx",
          status: "pending",
          dependencies: ["foundation"],
          notes: "Admin sidebar navigation",
        },
        {
          sourcePath: "components/admin-header.tsx",
          destinationPath: "components/admin/header.tsx",
          status: "pending",
          dependencies: ["foundation"],
          notes: "Admin header component",
        },
        {
          sourcePath: "app/admin/component-audit/page.tsx",
          destinationPath: "app/admin/component-audit/page.tsx",
          status: "pending",
          dependencies: ["foundation", "admin-components"],
          notes: "Component audit page",
        },
      ],
    },
    {
      name: "pages",
      description: "Migrate page components to the new structure",
      order: 6,
      migrations: [
        {
          sourcePath: "app/page.tsx",
          destinationPath: "app/(main)/page.tsx",
          status: "pending",
          dependencies: ["foundation", "section-components", "layout-components"],
          notes: "Home page",
        },
        {
          sourcePath: "app/about/page.tsx",
          destinationPath: "app/(main)/about/page.tsx",
          status: "pending",
          dependencies: ["foundation", "section-components", "layout-components"],
          notes: "About page",
        },
        {
          sourcePath: "app/admin/page.tsx",
          destinationPath: "app/admin/page.tsx",
          status: "pending",
          dependencies: ["foundation", "admin-components"],
          notes: "Admin dashboard page",
        },
      ],
    },
    {
      name: "api-routes",
      description: "Migrate API routes to the new structure",
      order: 7,
      migrations: [
        {
          sourcePath: "app/api/projects/route.ts",
          destinationPath: "app/api/projects/route.ts",
          status: "pending",
          dependencies: ["foundation"],
          notes: "Projects API routes",
        },
        {
          sourcePath: "app/api/testimonials/route.ts",
          destinationPath: "app/api/testimonials/route.ts",
          status: "pending",
          dependencies: ["foundation"],
          notes: "Testimonials API routes",
        },
      ],
    },
  ]
  
  /**
   * Approach for handling import updates
   */
  export const importUpdateStrategy = {
    useTsConfigPaths: true,
    updateImportStatements: true,
    createTemporaryRedirects: true,
    testAfterEachPhase: true,
  }
  
  /**
   * Fallback strategy in case of issues
   */
  export const fallbackStrategy = {
    createBackups: true,
    rollbackOnError: true,
    incrementalCommits: true,
    testingStrategy: "component-by-component",
  }
  
  /**
   * Timeline for the migration
   */
  export const migrationTimeline = {
    estimatedDuration: "2 weeks",
    phases: [
      { name: "foundation", duration: "1 day" },
      { name: "layout-components", duration: "2 days" },
      { name: "shared-components", duration: "2 days" },
      { name: "section-components", duration: "3 days" },
      { name: "admin-components", duration: "2 days" },
      { name: "pages", duration: "2 days" },
      { name: "api-routes", duration: "1 day" },
      { name: "testing-refinement", duration: "3 days" },
    ],
  }
  
  