# Directory Structure

The portfolio website follows a well-organized directory structure that adheres to Next.js App Router conventions and best practices for component organization.

\`\`\`
2025-design-portfolio-website/
├── app/
│   ├── (main)/                       # Public-facing pages (route group)
│   │   ├── page.tsx                  # Home page (/)
│   │   ├── about/
│   │   │   ├── page.tsx              # About page (/about)
│   │   │   └── components/           # About page components
│   │   ├── contact/
│   │   │   ├── page.tsx              # Contact page (/contact)
│   │   │   └── ContactPageClient.tsx # Client component for contact page
│   │   ├── work/
│   │   │   ├── page.tsx              # Work/portfolio page (/work)
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Individual project page (/work/[slug])
│   │   ├── services/
│   │   │   ├── page.tsx              # Services page (/services)
│   │   │   └── services-page-client.tsx
│   │   ├── process/
│   │   │   ├── page.tsx              # Process page (/process)
│   │   │   └── components/
│   │   ├── testimonials/
│   │   │   └── page.tsx              # Testimonials page (/testimonials)
│   │   ├── faqs/
│   │   │   └── page.tsx              # FAQs page (/faqs)
│   │   ├── resume/
│   │   │   └── page.tsx              # Resume page (/resume)
│   │   └── playground/
│   │       └── page.tsx              # Playground page (/playground)
│   │
│   ├── admin/                        # Admin section (real path, not a route group)
│   │   ├── page.tsx                  # Admin dashboard (/admin)
│   │   ├── login/
│   │   │   └── page.tsx              # Admin login (/admin/login)
│   │   ├── projects/
│   │   │   ├── page.tsx              # Projects management (/admin/projects)
│   │   │   ├── new/
│   │   │   │   └── page.tsx          # New project form (/admin/projects/new)
│   │   │   └── [id]/
│   │   │       ├── edit/
│   │   │       │   └── page.tsx      # Edit project (/admin/projects/[id]/edit)
│   │   │       └── delete/
│   │   │           └── page.tsx      # Delete project (/admin/projects/[id]/delete)
│   │   ├── testimonials/
│   │   │   ├── page.tsx              # Testimonials management (/admin/testimonials)
│   │   │   ├── new/
│   │   │   │   └── page.tsx          # New testimonial (/admin/testimonials/new)
│   │   │   └── [id]/
│   │   │       ├── edit/
│   │   │       │   └── page.tsx      # Edit testimonial (/admin/testimonials/[id]/edit)
│   │   │       └── delete/
│   │   │           └── page.tsx      # Delete testimonial (/admin/testimonials/[id]/delete)
│   │   ├── services/
│   │   │   ├── page.tsx              # Services management (/admin/services)
│   │   │   ├── new/
│   │   │   │   └── page.tsx          # New service (/admin/services/new)
│   │   │   └── [id]/
│   │   │       ├── edit/
│   │   │       │   └── page.tsx      # Edit service (/admin/services/[id]/edit)
│   │   │       └── delete/
│   │   │           └── page.tsx      # Delete service (/admin/services/[id]/delete)
│   │   ├── process-steps/
│   │   │   ├── page.tsx              # Process steps management (/admin/process-steps)
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   │           └── page.tsx      # Edit process step (/admin/process-steps/[id]/edit)
│   │   ├── faqs/
│   │   │   ├── page.tsx              # FAQs management (/admin/faqs)
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   │           └── page.tsx      # Edit FAQ (/admin/faqs/[id]/edit)
│   │   ├── images/
│   │   │   └── page.tsx              # Image management (/admin/images)
│   │   ├── design-system/
│   │   │   ├── checklist/
│   │   │   │   └── page.tsx          # Design system checklist (/admin/design-system/checklist)
│   │   │   └── audit/
│   │   │       └── page.tsx          # Design system audit (/admin/design-system/audit)
│   │   └── revalidate/
│   │       └── page.tsx              # Cache revalidation (/admin/revalidate)
│   │
│   ├── api/                          # API routes
│   │   ├── projects/
│   │   │   ├── route.ts              # Projects API (/api/projects)
│   │   │   └── [id]/
│   │   │       └── route.ts          # Single project API (/api/projects/[id])
│   │   ├── testimonials/
│   │   │   ├── route.ts              # Testimonials API (/api/testimonials)
│   │   │   ├── [id]/
│   │   │   │   └── route.ts          # Single testimonial API (/api/testimonials/[id])
│   │   │   ├── count/
│   │   │   │   └── route.ts          # Testimonial count API (/api/testimonials/count)
│   │   │   └── featured/
│   │   │       └── route.ts          # Featured testimonials API (/api/testimonials/featured)
│   │   ├── services/
│   │   │   ├── route.ts              # Services API (/api/services)
│   │   │   └── [id]/
│   │   │       └── route.ts          # Single service API (/api/services/[id])
│   │   ├── faqs/
│   │   │   ├── route.ts              # FAQs API (/api/faqs)
│   │   │   └── [id]/
│   │   │       └── route.ts          # Single FAQ API (/api/faqs/[id])
│   │   ├── process/
│   │   │   ├── route.ts              # Process steps API (/api/process)
│   │   │   └── [id]/
│   │   │       └── route.ts          # Single process step API (/api/process/[id])
│   │   ├── process-steps/
│   │   │   ├── route.ts              # Process steps API (/api/process-steps)
│   │   │   └── [id]/
│   │   │       └── route.ts          # Single process step API (/api/process-steps/[id])
│   │   ├── feedback/
│   │   │   └── route.ts              # Feedback submission API (/api/feedback)
│   │   ├── auth/
│   │   │   └── signout/
│   │   │       └── route.ts          # Sign out API (/api/auth/signout)
│   │   ├── admin/
│   │   │   └── logout/
│   │   │       └── route.ts          # Admin logout API (/api/admin/logout)
│   │   ├── revalidate/
│   │   │   └── route.ts              # Revalidation API (/api/revalidate)
│   │   ├── generate-pdf/
│   │   │   └── [slug]/
│   │   │       └── route.ts          # PDF generation API (/api/generate-pdf/[slug])
│   │   ├── download-resume/
│   │   │   └── route.ts              # Resume download API (/api/download-resume)
│   │   └── run-audit/
│   │       └── route.ts              # Run audit API (/api/run-audit)
│   │
│   ├── layout.tsx                    # Root layout
│   ├── globals.css                   # Global CSS
│   ├── not-found.tsx                 # 404 page
│   ├── icon.tsx                      # Favicon
│   ├── apple-icon.tsx                # Apple icon
│   └── opengraph-image.tsx           # OpenGraph image
│
├── components/
│   ├── ui/                           # Base UI components
│   ├── layout/                       # Layout components
│   ├── sections/                     # Page sections organized by purpose
│   │   ├── home/                     # Home page sections
│   │   ├── about/                    # About page sections
│   │   ├── work/                     # Work/portfolio sections
│   │   ├── services/                 # Services page sections
│   │   ├── process/                  # Process page sections
│   │   ├── contact/                  # Contact page sections
│   │   ├── testimonials/             # Testimonials page sections
│   │   └── common/                   # Common sections used across pages
│   ├── admin/                        # Admin-specific components
│   ├── shared/                       # Shared components used across multiple pages
│   ├── providers/                    # Context providers
│   ├── projects/                     # Project-specific components
│   ├── quiz/                         # Quiz components
│   └── timeline/                     # Timeline components
│
├── lib/                              # Utility libraries
│   ├── data/                         # Data fetching and manipulation
│   ├── utils/                        # Utility functions
│   ├── supabase/                     # Supabase client and helpers
│   ├── hooks/                        # Custom React hooks
│   └── organization/                 # Codebase organization utilities
│
├── types/                            # TypeScript type definitions
├── public/                           # Public assets
├── scripts/                          # Utility scripts
├── db/                               # Database scripts
└── sql/                              # SQL scripts
\`\`\`

## Key Organizational Principles

1. **Route Groups**: Public-facing pages are organized in a route group `(main)` to keep the URL structure clean
2. **Feature-First Organization**: Components are organized by feature/page first, then by type
3. **Centralized Data Access**: All data fetching is centralized in the `lib/data` directory
4. **Utility Organization**: Utilities are organized by purpose in the `lib` directory
5. **Type Safety**: TypeScript types are centralized in the `types` directory
6. **Admin Separation**: Admin functionality is kept separate from public-facing pages
7. **API Organization**: API routes follow a RESTful structure

## Component Organization Strategy

Components are organized in a hierarchical structure:

1. **Page Components**: Top-level components that represent entire pages
2. **Section Components**: Components that represent major sections of a page
3. **Feature Components**: Components specific to a particular feature
4. **Shared Components**: Reusable components used across multiple features
5. **UI Components**: Low-level UI components that form the building blocks of the UI

This organization makes it easy to locate components and understand their purpose in the application.
\`\`\`
