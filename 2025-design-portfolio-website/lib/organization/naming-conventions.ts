/**
 * Naming Conventions
 *
 * This provides guidelines for consistent naming across the codebase
 */

export const namingConventions = {
    files: {
      components: "kebab-case.tsx (e.g., project-card.tsx)",
      pages: "kebab-case.tsx (e.g., about-us.tsx)",
      layouts: "kebab-case.tsx (e.g., admin-layout.tsx)",
      utilities: "kebab-case.ts (e.g., date-utils.ts)",
      types: "kebab-case.ts (e.g., project-types.ts)",
      hooks: "use-kebab-case.ts (e.g., use-projects.ts)",
      actions: "kebab-case-actions.ts (e.g., project-actions.ts)",
    },
    components: {
      regular: "PascalCase (e.g., ProjectCard)",
      pages: "PascalCase + Page (e.g., AboutPage)",
      layouts: "PascalCase + Layout (e.g., AdminLayout)",
      providers: "PascalCase + Provider (e.g., ThemeProvider)",
      hooks: "useCamelCase (e.g., useProjects)",
      actions: "camelCase (e.g., createProject)",
    },
    directories: {
      components: "Grouped by purpose (ui, layout, sections, admin)",
      pages: "Grouped by section (main, admin)",
      api: "Grouped by resource (projects, testimonials)",
      lib: "Grouped by functionality (data, utils, supabase)",
    },
    props: {
      regular: "camelCase (e.g., projectData)",
      boolean: "is/has/should prefix (e.g., isLoading, hasError)",\
      event handlers: "on + Event (e.g., onClick, onSubmit)",
      renderProps: "render + Name (e.g., renderItem)",
    },
    css: {
      classes: "kebab-case (e.g., project-card)",
      variables: "kebab-case (e.g., --primary-color)",
      tailwind: "Follow Tailwind conventions",
    }
  }
  
  