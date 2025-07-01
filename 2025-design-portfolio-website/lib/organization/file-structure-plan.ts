/**
 * Proposed File Structure Reorganization
 *
 * This is a blueprint for reorganizing the codebase to improve maintainability
 */

export const proposedFileStructure = {
    app: {
      // Route groups for better organization
      "(main)": {
        // Public-facing pages
        page: "Home page",
        about: "About page",
        contact: "Contact page",
        work: "Projects/portfolio page",
        services: "Services page",
        process: "Process page",
        testimonials: "Testimonials page",
      },
      "(admin)": {
        // Admin section with consistent structure
        layout: "Admin layout with sidebar",
        page: "Admin dashboard",
        projects: "Project management",
        testimonials: "Testimonial management",
        services: "Services management",
        process: "Process management",
        faqs: "FAQ management",
        "component-audit": "Component audit tool",
        images: "Image management",
      },
      api: {
        // Organized API routes
        projects: "Project API endpoints",
        testimonials: "Testimonial API endpoints",
        services: "Service API endpoints",
        process: "Process API endpoints",
        faqs: "FAQ API endpoints",
        revalidate: "Cache revalidation endpoints",
      },
      layout: "Root layout",
    },
    components: {
      // Reorganized component structure
      ui: "Base UI components (from shadcn/ui)",
      layout: {
        header: "Header components",
        footer: "Footer components",
        navigation: "Navigation components",
      },
      shared: "Reusable components across multiple pages",
      sections: {
        // Page sections organized by purpose
        home: "Home page sections",
        about: "About page sections",
        work: "Work/portfolio sections",
        services: "Services page sections",
        process: "Process page sections",
        testimonials: "Testimonial sections",
        contact: "Contact page sections",
      },
      admin: "Admin-specific components",
      forms: "Form components and form-related utilities",
    },
    lib: {
      // Organized library code
      data: "Data fetching and manipulation",
      utils: "Utility functions",
      supabase: "Supabase client and helpers",
      hooks: "Custom React hooks",
      actions: "Server actions",
    },
    types: "TypeScript type definitions",
    styles: "Global styles",
    public: "Public assets",
  }
  
  export const consolidationPlan = {
    testimonials: [
      "components/testimonials.tsx",
      "components/testimonials-section.tsx",
      "components/home/testimonials.tsx",
      "components/home/testimonial-section.tsx",
      "components/home/testimonial-grid.tsx",
      "components/home/featured-testimonials.tsx",
      "components/testimonials/testimonials-content.tsx",
    ],
    footer: [
      "components/footer.tsx",
      "components/site-footer.tsx",
      "components/footer/index.tsx",
      "components/layout/footer/index.tsx",
    ],
    header: ["components/header/index.tsx", "components/layout/header/index.tsx"],
    navigation: [
      "components/main-nav.tsx",
      "components/mobile-nav.tsx",
      "components/nav.tsx",
      "components/header/nav-links.tsx",
      "components/header/mobile-nav.tsx",
      "components/layout/header/nav-links.tsx",
      "components/layout/header/mobile-nav.tsx",
    ],
    projects: [
      "components/project-grid.tsx",
      "components/projects/project-grid.tsx",
      "components/work/project-grid.tsx",
      "components/featured-projects.tsx",
      "components/home/featured-projects.tsx",
      "components/projects/featured-projects.tsx",
    ],
    adminTools: [
      "app/admin/component-audit/page.tsx",
      "app/admin/design-system/audit/page.tsx",
      "tools/component-audit.tsx",
    ],
  }
  
  