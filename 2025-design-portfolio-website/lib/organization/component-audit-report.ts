/**
 * Component Audit Report
 *
 * This provides an analysis of the current component structure and recommendations
 */

export const componentAuditReport = {
    duplicateComponents: [
      {
        category: "Testimonials",
        components: [
          { path: "components/testimonials.tsx", usage: "General testimonials component" },
          { path: "components/testimonials-section.tsx", usage: "Testimonial section wrapper" },
          { path: "components/home/testimonials.tsx", usage: "Home page testimonials" },
          { path: "components/home/testimonial-section.tsx", usage: "Home page testimonial section" },
          { path: "components/home/testimonial-grid.tsx", usage: "Grid layout for testimonials" },
          { path: "components/home/featured-testimonials.tsx", usage: "Featured testimonials" },
          { path: "components/testimonials/testimonials-content.tsx", usage: "Testimonial content" },
          { path: "components/testimonials/testimonial-card.tsx", usage: "Individual testimonial card" },
          { path: "components/home/testimonial-card.tsx", usage: "Home page testimonial card" },
          { path: "components/testimonial-card.tsx", usage: "Another testimonial card variant" },
        ],
        recommendation: "Consolidate into a unified testimonial system with clear component hierarchy",
      },
      {
        category: "Layout",
        components: [
          { path: "components/footer.tsx", usage: "Site footer" },
          { path: "components/site-footer.tsx", usage: "Another site footer" },
          { path: "components/footer/index.tsx", usage: "Footer in dedicated directory" },
          { path: "components/layout/footer/index.tsx", usage: "Footer in layout directory" },
          { path: "components/header/index.tsx", usage: "Site header" },
          { path: "components/layout/header/index.tsx", usage: "Header in layout directory" },
        ],
        recommendation: "Standardize layout components in a single location",
      },
      {
        category: "Navigation",
        components: [
          { path: "components/main-nav.tsx", usage: "Main navigation" },
          { path: "components/mobile-nav.tsx", usage: "Mobile navigation" },
          { path: "components/nav.tsx", usage: "General navigation" },
          { path: "components/header/nav-links.tsx", usage: "Navigation links in header" },
          { path: "components/header/mobile-nav.tsx", usage: "Mobile navigation in header" },
          { path: "components/layout/header/nav-links.tsx", usage: "Navigation links in layout" },
          { path: "components/layout/header/mobile-nav.tsx", usage: "Mobile navigation in layout" },
        ],
        recommendation: "Create a unified navigation system with responsive behavior",
      },
      {
        category: "Projects",
        components: [
          { path: "components/project-grid.tsx", usage: "Project grid" },
          { path: "components/projects/project-grid.tsx", usage: "Project grid in projects directory" },
          { path: "components/work/project-grid.tsx", usage: "Project grid in work directory" },
          { path: "components/featured-projects.tsx", usage: "Featured projects" },
          { path: "components/home/featured-projects.tsx", usage: "Featured projects on home page" },
          { path: "components/projects/featured-projects.tsx", usage: "Featured projects in projects directory" },
          { path: "components/project-card.tsx", usage: "Project card" },
          { path: "components/home/project-card.tsx", usage: "Project card on home page" },
          { path: "components/projects/project-card.tsx", usage: "Project card in projects directory" },
        ],
        recommendation: "Standardize project components with consistent naming and structure",
      },
    ],
    inconsistentNaming: [
      {
        pattern: "Mixed case styles",
        examples: [
          "kebab-case: project-card.tsx, testimonial-section.tsx",
          "PascalCase: ComponentStatusList.tsx",
          "camelCase: testimonialCard.tsx",
        ],
        recommendation: "Standardize on kebab-case for file names and PascalCase for component names",
      },
      {
        pattern: "Inconsistent prefixing",
        examples: [
          "Some components use page context as prefix: home/testimonial-card.tsx",
          "Others use component type: ui/button.tsx",
          "Others use no prefix: card.tsx",
        ],
        recommendation: "Use consistent prefixing based on component purpose, not page location",
      },
    ],
    directoryStructureIssues: [
      {
        issue: "Scattered components",
        description: "Similar components are spread across multiple directories",
        example: "Testimonial components exist in /components, /components/home, and /components/testimonials",
        recommendation: "Group components by purpose, not by page location",
      },
      {
        issue: "Inconsistent nesting",
        description: "Some components are deeply nested, others are at the root level",
        example: "components/layout/header/mobile-nav.tsx vs components/mobile-nav.tsx",
        recommendation: "Create a consistent nesting structure based on component relationships",
      },
      {
        issue: "Mixed concerns",
        description: "UI components mixed with page sections and layout components",
        example: "UI components alongside page-specific components in the same directory",
        recommendation: "Separate UI components, page sections, and layout components",
      },
    ],
    adminToolsIssues: [
      {
        issue: "Fragmented admin functionality",
        description: "Admin tools are spread across multiple directories with inconsistent structure",
        example: "admin/component-audit, admin/design-system/audit, and tools/component-audit",
        recommendation: "Consolidate admin tools into a cohesive system with consistent UI and behavior",
      },
      {
        issue: "Inconsistent CRUD patterns",
        description: "Different admin sections use different patterns for create, read, update, delete operations",
        example: "Some use server actions, others use API routes, some mix both approaches",
        recommendation: "Standardize CRUD patterns across all admin functionality",
      },
    ],
  }
  
  