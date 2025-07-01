/**
 * Component Consolidation Examples
 *
 * This provides examples of how to consolidate specific component categories
 */

export const testimonialConsolidation = {
    before: [
      "components/testimonials.tsx",
      "components/testimonials-section.tsx",
      "components/home/testimonials.tsx",
      "components/home/testimonial-section.tsx",
      "components/home/testimonial-grid.tsx",
      "components/home/featured-testimonials.tsx",
      "components/testimonials/testimonials-content.tsx",
      "components/testimonials/testimonial-card.tsx",
      "components/home/testimonial-card.tsx",
      "components/testimonial-card.tsx",
    ],
    after: [
      "components/sections/testimonials/testimonial-card.tsx",
      "components/sections/testimonials/testimonial-grid.tsx",
      "components/sections/testimonials/testimonial-section.tsx",
      "components/sections/testimonials/featured-testimonials.tsx",
      "components/sections/home/testimonial-feature.tsx",
    ],
    benefits: [
      "Clear component hierarchy",
      "Consistent props and styling",
      "Easier maintenance",
      "Better reusability",
      "Reduced code duplication",
    ],
  }
  
  export const layoutConsolidation = {
    before: [
      "components/footer.tsx",
      "components/site-footer.tsx",
      "components/footer/index.tsx",
      "components/layout/footer/index.tsx",
      "components/header/index.tsx",
      "components/layout/header/index.tsx",
      "components/main-nav.tsx",
      "components/mobile-nav.tsx",
      "components/nav.tsx",
    ],
    after: [
      "components/layout/footer/footer.tsx",
      "components/layout/header/header.tsx",
      "components/layout/navigation/main-nav.tsx",
      "components/layout/navigation/mobile-nav.tsx",
    ],
    benefits: [
      "Consistent layout components",
      "Clear separation of concerns",
      "Easier maintenance",
      "Better reusability",
      "Reduced code duplication",
    ],
  }
  
  export const projectConsolidation = {
    before: [
      "components/project-grid.tsx",
      "components/projects/project-grid.tsx",
      "components/work/project-grid.tsx",
      "components/featured-projects.tsx",
      "components/home/featured-projects.tsx",
      "components/projects/featured-projects.tsx",
      "components/project-card.tsx",
      "components/home/project-card.tsx",
      "components/projects/project-card.tsx",
    ],
    after: [
      "components/sections/work/project-card.tsx",
      "components/sections/work/project-grid.tsx",
      "components/sections/work/project-detail.tsx",
      "components/sections/home/featured-projects.tsx",
    ],
    benefits: [
      "Consistent project components",
      "Clear separation of concerns",
      "Easier maintenance",
      "Better reusability",
      "Reduced code duplication",
    ],
  }
  
  export const adminConsolidation = {
    before: [
      "app/admin/component-audit/page.tsx",
      "app/admin/design-system/audit/page.tsx",
      "tools/component-audit.tsx",
      "components/admin/audit-dashboard.tsx",
      "components/admin/component-status-list.tsx",
      "components/admin/implementation-checklist.tsx",
    ],
    after: [
      "app/admin/component-audit/page.tsx",
      "components/admin/component-audit/audit-dashboard.tsx",
      "components/admin/component-audit/component-status-list.tsx",
      "components/admin/component-audit/implementation-checklist.tsx",
      "components/admin/shared/admin-header.tsx",
      "components/admin/shared/admin-layout.tsx",
    ],
    benefits: [
      "Consistent admin components",
      "Clear separation of concerns",
      "Easier maintenance",
      "Better reusability",
      "Reduced code duplication",
    ],
  }
  
  