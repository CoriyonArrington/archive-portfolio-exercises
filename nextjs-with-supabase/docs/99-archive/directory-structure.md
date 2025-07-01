# 🗂️ Updated Directory Structure — Coriyon’s Studio (Finalized for SEO + UX + Admin)

## ✅ Overview

This finalized structure supports a high-performing, SEO-optimized, and CMS-powered site using **Next.js 14 (App Router)** with a **Supabase** backend. It cleanly separates public-facing content from admin routes, follows best practices for scalability, and aligns with your project goals.

---

## 📁 Final Directory Layout

```
├── .gitignore                        # Files/folders excluded from Git version control
├── app/                              # Root of all routed pages & APIs (Next.js App Router)
│   ├── favicon.ico                   # App-level favicon used in <head>
│   ├── global.css                    # Global CSS (e.g., Tailwind base imports)
│   ├── layout.tsx                    # Root layout wrapper for all pages
│   ├── page.tsx                      # App root (optional homepage or redirect)
│   ├── (admin)/                      # Internal CMS dashboard (protected)
│   │   └── dashboard/                # Admin content areas and tools
│   │       ├── api-debug/            # Debug internal API responses
│   │       ├── blog/                 # Blog post manager
│   │       ├── community/            # Admin content for community pages
│   │       ├── design-system-audit/  # Design system health checker
│   │       ├── faqs/                 # FAQ management
│   │       ├── options/              # Quiz answer choices
│   │       ├── pages/                # Static page CMS
│   │       ├── playground/           # Admin controls for playground tools
│   │       ├── process-phases/       # UX methodology steps
│   │       ├── projects/             # Portfolio/case study management
│   │       ├── questions/            # Quiz questions
│   │       ├── quizzes/              # Quiz manager
│   │       ├── revalidate-cache/     # ISR cache invalidation route
│   │       ├── services/             # UX services CMS
│   │       ├── supabase-debug/       # Debug database or auth
│   │       ├── testimonials/         # Client social proof
│   │       └── upload/               # File/media uploader
│   ├── (community)/                  # Public-facing community proof
│   │   ├── minneapolis-ux-design/    # Local project support
│   │   ├── speaking/                 # Public speaking events
│   │   └── uxpa-mn/                  # UXPA MN involvement
│   ├── (main)/                       # Main marketing site pages
│   │   ├── about/                    # About the studio
│   │   ├── contact/                  # Contact form and info
│   │   ├── layout.tsx                # Layout wrapper for root page
│   │   ├── metadata.ts               # Metadata defaults for main site
│   │   ├── page.tsx                  # Entry point: homepage
│   │   ├── services/                 # List of UX services
│   │   │   └── [slug]/               # Dynamic route for each service
│   │   ├── work/                     # Portfolio/case study list
│   │   │   └── [slug]/               # Dynamic route for each project
│   │   └── head.tsx                  # Optional <head> override
│   ├── (playground)/                 # Public interactive learning tools
│   │   ├── dbt-diary-card/           # Daily DBT tracker
│   │   ├── health-progress-tracker/  # Goal tracking and insights
│   │   └── interactive-quiz/         # UX learning quiz
│   ├── (resources)/                  # Self-serve learning & SEO content
│   │   ├── blog/                     # Articles & insights
│   │   │   └── [slug]/               # Dynamic blog post route
│   │   ├── faq/                      # Common questions
│   │   └── process/                  # Overview of the design process
│   ├── (solutions)/                  # Problem-based UX solution pages
│   │   ├── ai-app-development/       # AI-powered product delivery
│   │   ├── mobile-app-ux-design/     # Mobile-first UX
│   │   ├── usability-testing/        # Improve usability via testing
│   │   ├── ux-audits-optimization/   # Expert UX evaluations
│   │   ├── ux-research-user-testing/ # Research & discovery work
│   │   └── ux-strategy-for-startups/ # UX tailored for early-stage
│   ├── auth/                         # Auth pages (sign-in, forgot password, etc.)
│   ├── components/                   # Route-specific components within /app
│   ├── layout/                       # App-level layouts
│   ├── playground/                   # Dev playground or embedded editors
│   ├── studio/                       # Internal docs, tools, or sandbox features
│   └── api/                          # Custom backend endpoints
│       └── admin/                    # Admin-specific API handlers
│           ├── blog/                 # Blog post CRUD routes
│           ├── community/            # API endpoints for community data
│           ├── faqs/                 # FAQs API endpoints
│           ├── options/              # Answer choices for quizzes
│           ├── pages/                # CMS pages API
│           ├── playground/           # Playground content API
│           ├── process-phases/       # UX phases API
│           ├── projects/             # Case study API
│           ├── questions/            # Quiz question API
│           ├── quizzes/              # Quiz entity API
│           ├── services/             # UX services API
│           └── testimonials/         # Testimonials API
├── components/                       # UI building blocks
│   ├── admin/                        # CMS widgets & admin UI
│   ├── common/                       # Header, footer, nav, shell
│   ├── forms/                        # Form fields & validators
│   ├── layout/                       # Shared layouts
│   ├── page-sections/               # Large page blocks (Hero, CTA)
│   └── playground/                  # Reusable components for interactive tools
├── config/                           # ESLint, Tailwind, environment config
├── database/                         # Supabase schema & seeders
│   ├── schemas/                      # DB table definitions
│   └── seed/                         # Initial data loading scripts
├── docs/                             # Markdown documentation system
│   ├── cms/                          # Supabase schema versioning history
│   │   └── model-versioning-log.md   # Tracks DB schema changes over time
│   ├── client-handbook/             # Client-facing guides
│   │   └── client-services-guide.md  # Summaries of offered UX services
│   ├── collections/                 # Project-wide standards & system design
│   │   ├── brand-marketing-guide.md  # SEO/branding references
│   │   ├── deployment-qa-pack.md     # QA checklists & flows
│   │   ├── developer-handbook.md     # Frontend stack/coding best practices
│   │   ├── system-architecture-overview.md # Full DB schema + route map
│   │   └── technical-setup-guide.md  # Environment + config instructions
│   ├── content-workflows/           # Content planning & publishing docs
│   │   ├── content-calendar.md       # Editorial schedule & topics
│   │   └── cms-contribution-guide.md # How to update or add content to CMS
│   ├── design-system/               # Design tokens & theming
│   │   └── design-tokens-sheet.md    # Colors, typography, spacing
│   ├── onboarding/                  # Internal team onboarding
│   │   ├── developer-checklist.md    # Steps for new devs
│   │   └── glossary.md               # Terminology used across project
│   ├── playground/                  # Tool specs for public interactive features
│   │   └── playground-tool-specs.md  # Detailed blueprint of playground tools
│   ├── security/                    # Supabase roles, RLS, permissions
│   │   └── security-permissions-guide.md # Setting up RLS & secure routes
│   ├── testing/                     # QA & validation documentation
│   │   └── qa-strategy.md           # Manual QA plan & future automation
│   ├── visual-diagrams/            # System diagrams (ERD, user flow)
│   │   ├── architecture-overview.png    # High-level infra screenshot
│   │   ├── cms-model.mmd                # Mermaid diagram for CMS data model
│   │   ├── erd.svg                      # Entity relationship diagram
│   │   └── user-flow.mmd                # Sequence of user interactions
│   ├── navigation/                 # Site-wide route structure files
│   │   ├── ROUTES.md                # Route overview index
│   │   ├── ROUTES.json              # Route metadata (title, description)
│   │   └── ROUTES.mmd               # Mermaid visual sitemap
│   ├── full-directory-overview.md   # High-level summary of key folders
│   └── full-directory-structure.md  # Source-of-truth directory breakdown
├── hooks/                           # Custom reusable React hooks
├── lib/                             # Backend utilities & core logic
│   ├── actions/                     # CMS CRUD server actions
│   ├── supabase/                    # Supabase client setup
│   ├── utils/                       # Common helpers
│   └── validators/                  # Form + API validation schemas
├── middleware.ts                    # Route protection middleware (auth)
├── next.config.ts                   # Next.js config (redirects, headers, webpack)
├── package-lock.json                # Auto-generated dependency lock file
├── package.json                     # Project metadata & dependencies
├── playground-tools/                # Code powering interactive tools
│   ├── dbt-diary-card/              # React logic & client code for DBT
│   ├── health-progress-tracker/     # Charting + DB logic for progress
│   └── interactive-quiz/            # Self-contained quiz engine
├── postcss.config.mjs               # PostCSS plugins (tailwindcss, autoprefixer)
├── public/                          # Public static assets (images, favicon)
├── reports/                         # Exported results & diagnostics
├── scripts/                         # Internal CLI tools
│   ├── generate-routes-index.mjs    # Updates ROUTES.md + sitemap
│   └── post-create.sh               # Sets up all folders & boilerplates
├── styles/                          # Tailwind CSS setup & global styles
├── tests/                           # Unit & integration test files
├── types/                           # TypeScript global types & interfaces
├── eslint.config.mjs                # ESLint configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript config
└── vercel.json                      # Deployment config for Vercel
```

---

## 🔍 Benefits

### 📈 SEO
- Flat, keyword-rich slugs for UX Solutions (`/ux-audits-optimization`, etc.)
- Local SEO keywords integrated in Community paths
- Future-proof paths for content marketing (`/blog`, `/resources`, `/faq`)

### 🧠 UX
- Clear separation of concerns across user journeys: explore (solutions), connect (community), learn (resources), tinker (playground)
- Lightweight top nav; rich, structured footer nav
- CMS-controlled pages allow faster updates and scaling

### 🛠️ Dev & Admin
- Full CRUD control via `/admin/dashboard` and `/api/admin/`
- Modular `pages` table allows unified page management
- Supabase auth + RLS protected routes with optional service role access
- Organized components and API folder system for maintainability