# Component Mapping Document

This document tracks the migration of components from their original locations to their new locations in the reorganized codebase structure.

## Phase 1: Foundation

### Hooks
| Original Location | New Location |
|-------------------|--------------|
| `hooks/use-media-query.ts` | `lib/hooks/use-media-query.ts` |
| `hooks/use-responsive.ts` | `lib/hooks/use-responsive.ts` |
| `hooks/use-toast.ts` | `lib/hooks/use-toast.ts` |
| `hooks/use-mobile-viewport.tsx` | `lib/hooks/use-mobile-viewport.ts` |

### Utils
| Original Location | New Location |
|-------------------|--------------|
| `lib/utils.ts` | `lib/utils/index.ts` |
| `lib/utils/fetch-helpers.ts` | `lib/utils/fetch-helpers.ts` |
| `lib/utils/focus-trap.ts` | `lib/utils/focus-trap.ts` |
| `lib/utils/format-string.ts` | `lib/utils/format-string.ts` |
| `lib/utils/process-array-data.ts` | `lib/utils/process-array-data.ts` |
| `lib/utils/supabase-helpers.ts` | `lib/utils/supabase-helpers.ts` |
| `lib/utils/accessibility.ts` | `lib/utils/accessibility.ts` |
| `lib/utils/color-contrast.ts` | `lib/utils/color-contrast.ts` |
| `lib/utils/responsive.ts` | `lib/utils/responsive.ts` |
| `lib/utils/dynamic-import.ts` | `lib/utils/dynamic-import.ts` |
| `lib/utils/project-helpers.ts` | `lib/utils/project-helpers.ts` |
| `lib/utils/image-debug.ts` | `lib/utils/image-debug.ts` |
| `lib/utils/date-utils.ts` | `lib/utils/date-utils.ts` |
| `lib/utils/string-utils.ts` | `lib/utils/string-utils.ts` |

### Supabase
| Original Location | New Location |
|-------------------|--------------|
| `lib/supabase.ts` | `lib/supabase/index.ts` |
| `lib/supabase-client.ts` | `lib/supabase/client.ts` |
| `lib/supabase-queries.ts` | `lib/supabase/queries.ts` |
| `lib/supabase/clients.ts` | `lib/supabase/clients.ts` |
| `lib/supabase/pages-client.ts` | `lib/supabase/pages-client.ts` |
| `lib/supabase/client-browser.ts` | `lib/supabase/client-browser.ts` |
| `lib/supabase/browser.ts` | `lib/supabase/browser.ts` |
| `lib/supabase/middleware.ts` | `lib/supabase/middleware.ts` |
| `lib/supabase/server.ts` | `lib/supabase/server.ts` |

### Types
| Original Location | New Location |
|-------------------|--------------|
| `types/supabase.ts` | `types/supabase.ts` |
| `types/testimonials.ts` | `types/testimonial-types.ts` |
| `types/global.d.ts` | `types/global.d.ts` |
| `types/faq.ts` | `types/faqs.ts` |
| `types/process-step.ts` | `types/process-steps.ts` |
| `types/process.ts` | `types/process.ts` |
| `types/project.ts` | `types/project-types.ts` |
| `types/service.ts` | `types/service-types.ts` |
| `types/testimonial.ts` | `types/testimonial-types.ts` |
| `types/quiz.ts` | `types/quiz.ts` |
| `types/database.types.ts` | `types/database.types.ts` |

## Phase 2: Layout Components

### Header
| Original Location | New Location |
|-------------------|--------------|
| `components/header/index.tsx` | `components/layout/header/index.tsx` |
| `components/header/nav-links.tsx` | `components/layout/header/nav-links.tsx` |
| `components/header/mobile-nav.tsx` | `components/layout/header/mobile-nav.tsx` |
| `components/main-nav.tsx` | `components/layout/navigation/main-nav.tsx` |
| `components/mobile-nav.tsx` | `components/layout/navigation/mobile-nav.tsx` |
| `components/nav.tsx` | `components/layout/navigation/nav.tsx` |

### Footer
| Original Location | New Location |
|-------------------|--------------|
| `components/footer/index.tsx` | `components/layout/footer/index.tsx` |
| `components/footer/footer-bottom.tsx` | `components/layout/footer/footer-bottom.tsx` |
| `components/footer/footer-contact.tsx` | `components/layout/footer/footer-contact.tsx` |
| `components/footer/footer-logo.tsx` | `components/layout/footer/footer-logo.tsx` |
| `components/footer/footer-social.tsx` | `components/layout/footer/footer-social.tsx` |
| `components/footer/footer-nav.tsx` | `components/layout/footer/footer-nav.tsx` |
| `components/site-footer.tsx` | `components/layout/footer/site-footer.tsx` |
| `components/footer.tsx` | `components/layout/footer/footer.tsx` |

### Other Layout Components
| Original Location | New Location |
|-------------------|--------------|
| `components/layout/skip-to-content.tsx` | `components/layout/skip-to-content.tsx` |
| `components/layout/page-footer-nav.tsx` | `components/layout/page-footer-nav.tsx` |
| `components/layout/page-footer-nav-wrapper.tsx` | `components/layout/page-footer-nav-wrapper.tsx` |
| `components/layout/footer/footer-wrapper.tsx` | `components/layout/footer/footer-wrapper.tsx` |

## Phase 3: Shared Components

### UI Components
| Original Location | New Location |
|-------------------|--------------|
| `components/ui/button.tsx` | `components/ui/button.tsx` |
| `components/ui/card.tsx` | `components/ui/card.tsx` |
| `components/ui/dropdown-menu.tsx` | `components/ui/dropdown-menu.tsx` |
| `components/ui/input.tsx` | `components/ui/input.tsx` |
| `components/ui/loading-fallbacks.tsx` | `components/ui/loading-fallbacks.tsx` |
| `components/ui/page-loader.tsx` | `components/ui/page-loader.tsx` |
| `components/ui/typography.tsx` | `components/ui/typography.tsx` |
| `components/ui/loading-projects.tsx` | `components/ui/loading-projects.tsx` |
| `components/ui/placeholder.tsx` | `components/ui/placeholder.tsx` |
| `components/ui/image.tsx` | `components/ui/image.tsx` |
| `components/ui/advanced-loader.tsx` | `components/ui/advanced-loader.tsx` |
| `components/ui/badge.tsx` | `components/ui/badge.tsx` |
| `components/ui/input-otp.tsx` | `components/ui/input-otp.tsx` |
| `components/ui/calendar.tsx` | `components/ui/calendar.tsx` |
| `components/ui/carousel.tsx` | `components/ui/carousel.tsx` |
| `components/ui/chart.tsx` | `components/ui/chart.tsx` |
| `components/ui/resizable.tsx` | `components/ui/resizable.tsx` |
| `components/ui/sidebar.tsx` | `components/ui/sidebar.tsx` |
| `components/ui/skeleton.tsx` | `components/ui/skeleton.tsx` |
| `components/ui/sonner.tsx` | `components/ui/sonner.tsx` |
| `components/ui/use-toast.ts` | `components/ui/use-toast.ts` |
| `components/ui/toaster.tsx` | `components/ui/toaster.tsx` |
| `components/ui/tooltip.tsx` | `components/ui/tooltip.tsx` |
| `components/ui/section-header.tsx` | `components/ui/section-header.tsx` |
| `components/ui/link.tsx` | `components/ui/link.tsx` |

### Shared Components
| Original Location | New Location |
|-------------------|--------------|
| `components/shared/skip-to-content.tsx` | `components/shared/skip-to-content.tsx` |
| `components/shared/tag-list.tsx` | `components/shared/tag-list.tsx` |
| `components/shared/image-card.tsx` | `components/shared/image-card.tsx` |
| `components/shared/section-heading.tsx` | `components/shared/section-heading.tsx` |
| `components/shared/page-header.tsx` | `components/shared/page-header.tsx` |
| `components/shared/cta-section.tsx` | `components/shared/cta-section.tsx` |
| `components/shared/accessible-tabs.tsx` | `components/shared/accessible-tabs.tsx` |
| `components/shared/accessible-accordion.tsx` | `components/shared/accessible-accordion.tsx` |
| `components/shared/responsive-image.tsx` | `components/shared/responsive-image.tsx` |
| `components/shared/form-field.tsx` | `components/shared/form-field.tsx` |
| `components/shared/keyboard-nav.tsx` | `components/shared/keyboard-nav.tsx` |
| `components/shared/skip-navigation.tsx` | `components/shared/skip-navigation.tsx` |
| `components/shared/screen-reader-announce.tsx` | `components/shared/screen-reader-announce.tsx` |
| `components/shared/accessible-modal.tsx` | `components/shared/accessible-modal.tsx` |
| `components/shared/accessible-toast.tsx` | `components/shared/accessible-toast.tsx` |
| `components/shared/lazy-image.tsx` | `components/shared/lazy-image.tsx` |
| `components/shared/lazy-image-wrapper.tsx` | `components/shared/lazy-image-wrapper.tsx` |
| `components/shared/image-with-fallback.tsx` | `components/shared/image-with-fallback.tsx` |
| `components/shared/supabase-image.tsx` | `components/shared/supabase-image.tsx` |
| `components/shared/faq-section.tsx` | `components/shared/faq-section.tsx` |
| `components/shared/theme-toggle.tsx` | `components/shared/theme-toggle.tsx` |

### Provider Components
| Original Location | New Location |
|-------------------|--------------|
| `components/providers/toast-provider.tsx` | `components/providers/toast-provider.tsx` |
| `components/providers/search-params-provider.tsx` | `components/providers/search-params-provider.tsx` |
| `components/providers/loader-provider.tsx` | `components/providers/loader-provider.tsx` |
| `components/theme-provider.tsx` | `components/providers/theme-provider.tsx` |

## Phase 4: Section Components

### Home Sections
| Original Location | New Location |
|-------------------|--------------|
| `components/home/floating-stat-card.tsx` | `components/sections/home/floating-stat-card.tsx` |
| `components/home/hero-showcase-wrapper.tsx` | `components/sections/home/hero-showcase-wrapper.tsx` |
| `components/home/home-cta.tsx` | `components/sections/home/home-cta.tsx` |
| `components/home/home-hero.tsx` | `components/sections/home/home-hero.tsx` |
| `components/home/client-problems.tsx` | `components/sections/home/client-problems.tsx` |
| `components/home/hero-showcase.tsx` | `components/sections/home/hero-showcase.tsx` |
| `components/home/challenges-section.tsx` | `components/sections/home/challenges-section.tsx` |
| `components/home/testimonial-card.tsx` | `components/sections/home/testimonial-card.tsx` |
| `components/home/process-overview.tsx` | `components/sections/home/process-overview.tsx` |
| `components/home/calendly-section.tsx` | `components/sections/home/calendly-section.tsx` |
| `components/home/hero-section.tsx` | `components/sections/home/hero-section.tsx` |
| `components/home/hero-testimonial.tsx` | `components/sections/home/hero-testimonial.tsx` |
| `components/home/hero-testimonials.tsx` | `components/sections/home/hero-testimonials.tsx` |
| `components/home/hero-testimonial-section.tsx` | `components/sections/home/hero-testimonial-section.tsx` |
| `components/home/service-overview.tsx` | `components/sections/home/service-overview.tsx` |
| `components/home/testimonial-section.tsx` | `components/sections/home/testimonial-section.tsx` |
| `components/home/featured-testimonials-server.tsx` | `components/sections/home/featured-testimonials-server.tsx` |
| `components/home/featured-testimonials-wrapper.tsx` | `components/sections/home/featured-testimonials-wrapper.tsx` |
| `components/home/testimonial-preview.tsx` | `components/sections/home/testimonial-preview.tsx` |
| `components/home/testimonial-avatars.tsx` | `components/sections/home/testimonial-avatars.tsx` |
| `components/home/success-stories.tsx` | `components/sections/home/success-stories.tsx` |
| `components/home/testimonial-grid.tsx` | `components/sections/home/testimonial-grid.tsx` |
| `components/home/featured-testimonials.tsx` | `components/sections/home/featured-testimonials.tsx` |
| `components/home/featured-projects.tsx` | `components/sections/home/featured-projects.tsx` |
| `components/home/testimonials.tsx` | `components/sections/home/testimonials.tsx` |

### About Sections
| Original Location | New Location |
|-------------------|--------------|
| `components/about/about-cta.tsx` | `components/sections/about/about-cta.tsx` |
| `components/about/about-hero.tsx` | `components/sections/about/about-hero.tsx` |
| `components/about/about-nav.tsx` | `components/sections/about/about-nav.tsx` |
| `components/about/about-page-content.tsx` | `components/sections/about/about-page-content.tsx` |
| `components/about/about-sidebar-nav.tsx` | `components/sections/about/about-sidebar-nav.tsx` |
| `components/about/about-story.tsx` | `components/sections/about/about-story.tsx` |
| `components/about/beyond-design.tsx` | `components/sections/about/beyond-design.tsx` |
| `components/about/education.tsx` | `components/sections/about/education.tsx` |
| `components/about/download-resume-button.tsx` | `components/sections/about/download-resume-button.tsx` |
| `components/about/about-sidebar.tsx` | `components/sections/about/about-sidebar.tsx` |
| `components/about/work-experience.tsx` | `components/sections/about/work-experience.tsx` |

### Work Sections
| Original Location | New Location |
|-------------------|--------------|
| `components/work/case-study-nav.tsx` | `components/sections/work/case-study-nav.tsx` |
| `components/work/project-detail-content.tsx` | `components/sections/work/project-detail-content.tsx` |
| `components/work/project-detail-skeleton.tsx` | `components/sections/work/project-detail-skeleton.tsx` |
| `components/work/projects-loading.tsx` | `components/sections/work/projects-loading.tsx` |
| `components/work/related-projects.tsx` | `components/sections/work/related-projects.tsx` |
| `components/work/work-cta.tsx` | `components/sections/work/work-cta.tsx` |
| `components/work/projects-grid.tsx` | `components/sections/work/projects-grid.tsx` |
| `components/work/project-grid.tsx` | `components/sections/work/project-grid.tsx` |

### Services Sections
| Original Location | New Location |
|-------------------|--------------|
| `components/services/engagement-models.tsx` | `components/sections/services/engagement-models.tsx` |
| `components/services/services-cta.tsx` | `components/sections/services/services-cta.tsx` |
| `components/services/services-faq.tsx` | `components/sections/services/services-faq.tsx` |
| `components/services/service-offerings.tsx` | `components/sections/services/service-offerings.tsx` |
| `components/services/service-solutions.tsx` | `components/sections/services/service-solutions.tsx` |

### Process Sections
| Original Location | New Location |
|-------------------|--------------|
| `components/process/notification-button.tsx` | `components/sections/process/notification-button.tsx` |
| `components/process/client-journey-overview.tsx` | `components/sections/process/client-journey-overview.tsx` |
| `components/process/process-cta.tsx` | `components/sections/process/process-cta.tsx` |
| `components/process/process-overview.tsx` | `components/sections/process/process-overview.tsx` |
| `components/process/process-hero.tsx` | `components/sections/process/process-hero.tsx` |
| `components/process/process-steps.tsx` | `components/sections/process/process-steps.tsx` |
| `components/process/process-case-studies.tsx` | `components/sections/process/process-case-studies.tsx` |
| `components/process/process-faq.tsx` | `components/sections/process/process-faq.tsx` |

### Contact Sections
| Original Location | New Location |
|-------------------|--------------|
| `components/contact/contact-availability.tsx` | `components/sections/contact/contact-availability.tsx` |
| `components/contact/contact-form.tsx` | `components/sections/contact/contact-form.tsx` |
| `components/contact/contact-info.tsx` | `components/sections/contact/contact-info.tsx` |

### Testimonial Sections
| Original Location | New Location |
|-------------------|--------------|
| `components/testimonials/client-logos.tsx` | `components/sections/testimonials/client-logos.tsx` |
| `components/testimonials/testimonials-case-studies.tsx` | `components/sections/testimonials/testimonials-case-studies.tsx` |
| `components/testimonials/testimonials-cta.tsx` | `components/sections/testimonials/testimonials-cta.tsx` |
| `components/testimonials/testimonials-skeleton.tsx` | `components/sections/testimonials/testimonials-skeleton.tsx` |
| `components/testimonials/testimonial-list.tsx` | `components/sections/testimonials/testimonial-list.tsx` |
| `components/testimonials/testimonial-card.tsx` | `components/sections/testimonials/testimonial-card.tsx` |
| `components/testimonials/testimonials-content.tsx` | `components/sections/testimonials/testimonials-content.tsx` |
| `components/testimonial-card.tsx` | `components/sections/testimonials/testimonial-card.tsx` |

### Project Sections
| Original Location | New Location |
|-------------------|--------------|
| `components/projects/download-case-study.tsx` | `components/sections/projects/download-case-study.tsx` |
| `components/projects/project-footer-nav.tsx` | `components/sections/projects/project-footer-nav.tsx` |
| `components/projects/project-gallery.tsx` | `components/sections/projects/project-gallery.tsx` |
| `components/projects/project-nav.tsx` | `components/sections/projects/project-nav.tsx` |
| `components/projects/notification-modal.tsx` | `components/sections/projects/notification-modal.tsx` |
|  | `components/sections/projects/notification-modal.tsx` |
| `components/projects/project-process-section.tsx` | `components/sections/projects/project-process-section.tsx` |
| `components/projects/project-card.tsx` | `components/sections/projects/project-card.tsx` |
| `components/projects/project-grid.tsx` | `components/sections/projects/project-grid.tsx` |
| `components/projects/featured-projects.tsx` | `components/sections/projects/featured-projects.tsx` |

### Common Sections
| Original Location | New Location |
|-------------------|--------------|
| `components/section-header.tsx` | `components/sections/common/section-header.tsx` |
| `components/browser-mockup.tsx` | `components/sections/common/browser-mockup.tsx` |
| `components/project-card.tsx` | `components/sections/common/project-card.tsx` |
| `components/project-grid.tsx` | `components/sections/common/project-grid.tsx` |
| `components/project-nav.tsx` | `components/sections/common/project-nav.tsx` |
| `components/featured-projects.tsx` | `components/sections/common/featured-projects.tsx` |
| `components/testimonials.tsx` | `components/sections/common/testimonials.tsx` |
| `components/testimonials-section.tsx` | `components/sections/common/testimonials-section.tsx` |
| `components/client-problems.tsx` | `components/sections/common/client-problems.tsx` |
| `components/hero-showcase-wrapper.tsx` | `components/sections/common/hero-showcase-wrapper.tsx` |

## Phase 5: Admin Components (To Be Migrated)

### Project Admin Components
| Original Location | New Location |
|-------------------|--------------|
| `components/admin/project-form.tsx` | `components/admin/projects/project-form.tsx` |
| `components/admin/project-list.tsx` | `components/admin/projects/project-list.tsx` |
| `components/admin/project-form-wrapper.tsx` | `components/admin/projects/project-form-wrapper.tsx` |
| `components/admin/project-image-editor.tsx` | `components/admin/projects/project-image-editor.tsx` |
| `components/admin/client-project-form.tsx` | `components/admin/projects/client-project-form.tsx` |

### Testimonial Admin Components
| Original Location | New Location |
|-------------------|--------------|
| `components/admin/testimonial-form.tsx` | `components/admin/testimonials/testimonial-form.tsx` |
| `components/admin/testimonial-list.tsx` | `components/admin/testimonials/testimonial-list.tsx` |

### Service Admin Components
| Original Location | New Location |
|-------------------|--------------|
| `components/admin/service-form.tsx` | `components/admin/services/service-form.tsx` |
| `components/admin/services-list.tsx` | `components/admin/services/services-list.tsx` |
| `components/admin/delete-service-button.tsx` | `components/admin/services/delete-service-button.tsx` |

### Process Admin Components
| Original Location | New Location |
|-------------------|--------------|
| `components/admin/process-form.tsx` | `components/admin/process/process-form.tsx` |
| `components/admin/process-step-form.tsx` | `components/admin/process/process-step-form.tsx` |
| `components/admin/process-steps-list.tsx` | `components/admin/process/process-steps-list.tsx` |
| `components/admin/delete-process-step-button.tsx` | `components/admin/process/delete-process-step-button.tsx` |

### FAQ Admin Components
| Original Location | New Location |
|-------------------|--------------|
| `components/admin/faq-form.tsx` | `components/admin/faqs/faq-form.tsx` |
| `components/admin/faqs-list.tsx` | `components/admin/faqs/faqs-list.tsx` |
| `components/admin/delete-faq-button.tsx` | `components/admin/faqs/delete-faq-button.tsx` |

### Image Admin Components
| Original Location | New Location |
|-------------------|--------------|
| `components/admin/image-uploader.tsx` | `components/admin/images/image-uploader.tsx` |
| `components/admin/image-gallery.tsx` | `components/admin/images/image-gallery.tsx` |
| `components/admin/general-image-uploader.tsx` | `components/admin/images/general-image-uploader.tsx` |

### Auth Admin Components
| Original Location | New Location |
|-------------------|--------------|
| `components/admin/login-form.tsx` | `components/admin/auth/login-form.tsx` |
| `components/admin/simple-login-form.tsx` | `components/admin/auth/simple-login-form.tsx` |
| `components/admin/logout-button.tsx` | `components/admin/auth/logout-button.tsx` |

### Layout Admin Components
| Original Location | New Location |
|-------------------|--------------|
| `components/admin/sidebar.tsx` | `components/admin/layout/sidebar.tsx` |
| `components/admin/layout/admin-sidebar.tsx` | `components/admin/layout/admin-sidebar.tsx` |

### Dashboard Admin Components
| Original Location | New Location |
|-------------------|--------------|
| `components/admin/audit-dashboard.tsx` | `components/admin/dashboard/audit-dashboard.tsx` |
| `components/admin/audit-dashboard-api-update.tsx` | `components/admin/dashboard/audit-dashboard-api-update.tsx` |
| `components/admin/health-score.tsx` | `components/admin/dashboard/health-score.tsx` |
| `components/admin/component-status-list.tsx` | `components/admin/dashboard/component-status-list.tsx` |
| `components/admin/implementation-checklist.tsx` | `components/admin/dashboard/implementation-checklist.tsx` |

### Common Admin Components
| Original Location | New Location |
|-------------------|--------------|
| `components/admin/data-table.tsx` | `components/admin/common/data-table.tsx` |
| `components/admin/form/form-field.tsx` | `components/admin/common/form-field.tsx` |
| `components/admin/form/form-button.tsx` | `components/admin/common/form-button.tsx` |
| `components/admin/audit-skeleton.tsx` | `components/admin/common/audit-skeleton.tsx` |
| `components/admin/unused-components-list.tsx` | `components/admin/common/unused-components-list.tsx` |
| `components/admin/unused-dependencies-list.tsx` | `components/admin/common/unused-dependencies-list.tsx` |
| `components/admin/code-duplication-list.tsx` | `components/admin/common/code-duplication-list.tsx` |
| `components/admin/supabase-debug-client.tsx` | `components/admin/common/supabase-debug-client.tsx` |

