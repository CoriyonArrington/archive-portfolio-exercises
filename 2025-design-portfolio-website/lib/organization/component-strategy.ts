/**
 * Component Consolidation Strategy
 *
 * This file outlines the approach for consolidating duplicate components
 * and standardizing component patterns across the application.
 */

export type ComponentGroup = {
    name: string
    description: string
    sourceComponents: string[]
    consolidatedComponent: string
    props: {
      name: string
      type: string
      description: string
      isRequired: boolean
      defaultValue?: string
    }[]
    subcomponents?: string[]
    variations?: string[]
  }
  
  /**
   * Component groups to be consolidated
   */
  export const componentGroups: ComponentGroup[] = [
    {
      name: "Testimonials",
      description: "Components related to displaying testimonials",
      sourceComponents: [
        "components/testimonials.tsx",
        "components/testimonials-section.tsx",
        "components/home/testimonials.tsx",
        "components/testimonial-grid.tsx",
        "components/testimonial-card.tsx",
      ],
      consolidatedComponent: "components/sections/testimonials/testimonials-grid.tsx",
      props: [
        {
          name: "testimonials",
          type: "Testimonial[]",
          description: "Array of testimonial data",
          isRequired: true,
        },
        {
          name: "variant",
          type: '"grid" | "carousel" | "featured" | "simple"',
          description: "Display variant of the testimonials",
          isRequired: false,
          defaultValue: '"grid"',
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes",
          isRequired: false,
        },
      ],
      subcomponents: [
        "components/sections/testimonials/testimonial-card.tsx",
        "components/sections/testimonials/featured-testimonial.tsx",
      ],
      variations: ["TestimonialsGrid", "TestimonialsCarousel", "FeaturedTestimonials", "SimpleTestimonials"],
    },
    {
      name: "ProjectDisplay",
      description: "Components for displaying projects and portfolio items",
      sourceComponents: [
        "components/project-grid.tsx",
        "components/projects/project-grid.tsx",
        "components/work/project-grid.tsx",
        "components/featured-projects.tsx",
      ],
      consolidatedComponent: "components/sections/work/project-grid.tsx",
      props: [
        {
          name: "projects",
          type: "Project[]",
          description: "Array of project data",
          isRequired: true,
        },
        {
          name: "layout",
          type: '"grid" | "list" | "featured" | "masonry"',
          description: "Layout style for the projects",
          isRequired: false,
          defaultValue: '"grid"',
        },
        {
          name: "filterOptions",
          type: "string[]",
          description: "Categories or tags to filter projects by",
          isRequired: false,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes",
          isRequired: false,
        },
      ],
      subcomponents: [
        "components/sections/work/project-card.tsx",
        "components/sections/work/project-detail.tsx",
        "components/sections/work/project-filter.tsx",
      ],
    },
    {
      name: "Navigation",
      description: "Components for site navigation",
      sourceComponents: [
        "components/main-nav.tsx",
        "components/mobile-nav.tsx",
        "components/nav.tsx",
        "components/header/nav-links.tsx",
      ],
      consolidatedComponent: "components/layout/navigation/index.tsx",
      props: [
        {
          name: "items",
          type: "NavItem[]",
          description: "Navigation items to display",
          isRequired: true,
        },
        {
          name: "variant",
          type: '"main" | "footer" | "mobile" | "sidebar"',
          description: "Navigation variant",
          isRequired: false,
          defaultValue: '"main"',
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes",
          isRequired: false,
        },
      ],
      subcomponents: [
        "components/layout/navigation/main-nav.tsx",
        "components/layout/navigation/mobile-nav.tsx",
        "components/layout/navigation/nav-item.tsx",
      ],
    },
    {
      name: "Section",
      description: "Layout section components used to structure page content",
      sourceComponents: ["components/section.tsx", "components/container.tsx", "components/page-section.tsx"],
      consolidatedComponent: "components/shared/section.tsx",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          description: "Section content",
          isRequired: true,
        },
        {
          name: "id",
          type: "string",
          description: "Section ID for navigation",
          isRequired: false,
        },
        {
          name: "variant",
          type: '"default" | "alt" | "wide" | "narrow" | "full"',
          description: "Section width variant",
          isRequired: false,
          defaultValue: '"default"',
        },
        {
          name: "background",
          type: '"transparent" | "light" | "dark" | "primary" | "accent"',
          description: "Section background style",
          isRequired: false,
          defaultValue: '"transparent"',
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes",
          isRequired: false,
        },
        {
          name: "containerClassName",
          type: "string",
          description: "Additional CSS classes for inner container",
          isRequired: false,
        },
      ],
    },
    {
      name: "AdminLayout",
      description: "Components for admin dashboard layout",
      sourceComponents: ["components/admin-layout.tsx", "components/admin-sidebar.tsx", "components/admin-header.tsx"],
      consolidatedComponent: "components/admin/layout.tsx",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          description: "Admin page content",
          isRequired: true,
        },
        {
          name: "title",
          type: "string",
          description: "Page title",
          isRequired: false,
        },
        {
          name: "showSidebar",
          type: "boolean",
          description: "Whether to show the sidebar",
          isRequired: false,
          defaultValue: "true",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes",
          isRequired: false,
        },
      ],
      subcomponents: ["components/admin/sidebar.tsx", "components/admin/header.tsx", "components/admin/footer.tsx"],
    },
  ]
  
  /**
   * Guidelines for component implementation
   */
  export const componentGuidelines = {
    naming: {
      files: "kebab-case.tsx",
      components: "PascalCase",
      props: "camelCase",
      types: "PascalCase",
    },
    structure: {
      exportType: "Named exports for all components except page components",
      propTypes: "Use TypeScript interfaces for prop definitions",
      stateManagement: "Prefer React hooks over class components",
      styling: "Use utility classes with Tailwind CSS",
      accessibility: "Ensure all components meet WCAG 2.1 AA standards",
      documentation: "Include JSDoc comments for all components",
    },
    patterns: {
      composition: "Prefer composition over inheritance",
      dataFetching: "Use React Server Components for data fetching where possible",
      clientComponents: 'Add "use client" directive only when necessary',
      errorHandling: "Implement proper error boundaries and fallbacks",
      loading: "Use Suspense and loading states for async operations",
    },
  }
  
  /**
   * Examples of consolidated component implementations
   */
  export const componentExamples = {
    testimonials: `
  import type { Testimonial } from '@/types';
  
  interface TestimonialsGridProps {
    testimonials: Testimonial[];
    variant?: 'grid' | 'carousel' | 'featured' | 'simple';
    className?: string;
  }
  
  export function TestimonialsGrid({
    testimonials,
    variant = 'grid',
    className,
  }: TestimonialsGridProps) {
    // Implementation details
  }
    `,
    navigation: `
  import type { NavItem } from '@/types';
  
  interface NavigationProps {
    items: NavItem[];
    variant?: 'main' | 'footer' | 'mobile' | 'sidebar';
    className?: string;
  }
  
  export function Navigation({
    items,
    variant = 'main',
    className,
  }: NavigationProps) {
    // Implementation details based on variant
  }
    `,
  }
  
  