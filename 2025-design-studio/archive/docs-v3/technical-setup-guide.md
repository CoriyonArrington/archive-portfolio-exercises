# 🛠️ Technical Setup Guide — Coriyon’s Studio

> This guide combines the core configuration and infrastructure documentation required to run, deploy, and maintain Coriyon’s Studio.

---

## 1. 🔐 Environment Variables

# 🔐 Environment Variables — Coriyon’s Studio

Environment variables provide a secure and configurable way to manage sensitive credentials, service URLs, and runtime secrets for your app.

---

## ✅ Required Variables

### Supabase
- `NEXT_PUBLIC_SUPABASE_URL` – Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` – Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` – Full access key (used only server-side)

### Deployment
- `VERCEL_URL` – Set automatically by Vercel
- `VERCEL_DEPLOY_HOOK_URL` – Optional: trigger deployments from CMS actions

### Application
- `NEXT_PUBLIC_SITE_URL` – Public-facing site URL (used for canonical, OG, etc.)
- `REVALIDATION_SECRET` – Secure token for `/api/admin/revalidate`

### PDF + Debug Tools
- `PDF_API_SECRET` – Internal use for PDF generation routes
- `DEBUG_API_KEY` – Optional: protect API debug routes

---

## 🧪 Development Setup

Create a `.env.local` file in the root of your project with these variables defined:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=public-anon-key
SUPABASE_SERVICE_ROLE_KEY=super-secret-role-key
NEXT_PUBLIC_SITE_URL=https://localhost:3000
REVALIDATION_SECRET=my-secret-token
PDF_API_SECRET=another-secret
DEBUG_API_KEY=dev-only-key
```

---

## 🔍 Environment Variable Validation

The application uses `lib/env-validation.ts` to validate critical environment variables at build time. Missing or undefined keys will throw a hard error during development or deployment.

---

## ⚙️ Usage in Components

- **Server Components**: Use `process.env.VARIABLE_NAME`
- **Client Components**: Only access `NEXT_PUBLIC_*` variables via `process.env.NEXT_PUBLIC_VARIABLE_NAME`

---

## 🔒 Security Considerations

- Never expose private keys in public code or frontend bundles
- Use `SUPABASE_SERVICE_ROLE_KEY` only in secure contexts (server-only)
- Use `REVALIDATION_SECRET` and `PDF_API_SECRET` in server routes only
- Rotate secrets on a regular basis
- Avoid hardcoding any values; rely on environment files instead

Let me know if you'd like an `.env.example` scaffold or secrets management workflow.


---

## 2. 🧠 Backend Structure

# 🧠 Backend Structure — Coriyon’s Studio

This document outlines the backend architecture of the Coriyon’s Studio system including database schema, Supabase integration, API routes, authentication, and revalidation strategy.

---

## 🗃️ Database Schema

### CMS Tables
- `pages`: Modular structure for all public-facing routes
- `projects`: Portfolio projects and case studies
- `testimonials`: Client testimonials and social proof
- `services`: UX and digital services
- `faqs`: Common client questions
- `process_phases`: Phased breakdown of UX design methodology
- `blog` (future): Content and thought leadership posts

### Feedback & Contact
- `feedback`: User-scored clarity, usefulness, and comments
- `contact_submissions`: Form responses from `/contact`

### Playground Tools
- `quizzes`: Interactive quiz tools
- `questions`: Quiz questions linked to quizzes
- `options`: Answer options for quiz questions

---

## 🔌 API Structure

### REST Endpoints (under `/api/admin`)
- `/pages`, `/projects`, `/services`, `/testimonials`
- `/faqs`, `/process-phases`, `/blog` (future)
- `/quizzes`, `/questions`, `/options`
- `/feedback`, `/contact-submissions` (read/export)

### Developer Tools
- `/api/admin/revalidate`: Trigger on-demand cache invalidation
- `/api/admin/debug/supabase`: Test DB queries
- `/api/admin/debug/api`: Debug response status/format
- `/api/admin/upload`: Upload/remove media files
- `/api/generate-pdf`: Generate dynamic PDFs (resume, case study)

---

## ⚙️ Server Actions

- `/lib/actions/service-actions.ts`
- `/lib/actions/faq-actions.ts`
- `/lib/actions/process-step-actions.ts`
- `/lib/actions/contact.ts`
- `/lib/actions/generate-pdf.ts`
- `/lib/actions/revalidate.ts`
- `/lib/actions/project-actions.ts`

---

## 🔐 Authentication & Authorization

### Admin Access
- Supabase Auth with secure JWT
- Row-Level Security for fine-grained permissions
- Role-based access for admins via protected dashboards
- Session validation in `middleware.ts`

### Public Access
- Public content read-only
- Anonymous feedback allowed
- Rate limiting for form submissions
- CSRF protection for sensitive actions

---

## 🔄 Data Fetching Strategy

### Server Components
- Use `supabase-js` client in async RSCs
- Direct DB queries in `page.tsx` via loader functions

### Client Components
- Use `fetch` or `useSWR` to hit `/api/admin`
- Optimistic UI updates for forms
- Error/retry logic handled via Toast or UI fallback

---

## 🚀 Caching & Revalidation

### Static Generation
- Static generation (SSG) for all CMS-driven routes
- Incremental Static Regeneration (ISR) for projects, services, etc.
- On-demand cache invalidation via API (`/revalidate`)

### Cache Control
- Cache headers applied to static assets
- Stale-while-revalidate for fallback UI
- Smart invalidation upon DB update

Let me know if you'd like this structured as a backend onboarding PDF or architecture map.


---

## 3. ⚙️ Site Configuration

# ⚙️ Site Configuration — Coriyon’s Studio

The site configuration is managed in `config/site.ts` and used throughout the app to manage metadata, navigation, and core branding. This file supports dynamic rendering, SEO enhancements, and CMS templating.

---

## 🌐 Site Metadata

- **Name**: `"Coriyon's Studio"`
- **Description**: `"A UX design studio helping people feel better through thoughtful digital experiences."`
- **URL**: Pulled from `NEXT_PUBLIC_SITE_URL` environment variable
- **OG Image**: Default Open Graph image used for social previews
- **Keywords**: `["UX Design", "Health Tech", "Portfolio", "Coriyon Arrington", "Accessibility", "Interactive Tools"]`

---

## 🧭 Navigation Structure

### Main Navigation (Header)
- Home (`/`)
- Work (`/work`)
- Services (`/services`)
- About (`/about`)
- Contact (`/contact`)

### Footer Navigation (Grouped by Category)

#### UX Solutions
- UX Research & Testing (`/ux-research-user-testing`)
- UX Audits & Optimization (`/ux-audits-optimization`)
- Mobile App UX (`/mobile-app-ux-design`)
- AI-Powered Full-Stack Apps (`/ai-fullstack-app-development`)

#### Community
- Speaking (`/speaking`)
- UXPA MN (`/uxpa-mn`)
- Minneapolis UX Design (`/minneapolis-ux-design`)

#### Explore
- Playground (`/playground`)
- FAQs (`/faq`)
- Blog (`/blog`)

#### Resources
- Process (`/process`)

---

## 🖼️ Branding & Assets

- **Logo**: `public/images/logo.svg`
- **Favicon**: `public/favicon.ico`
- **Default OG Image**: `public/og-image.jpg`
- **Fonts**: Nunito Sans (body), Montserrat (headings)

---

## 🔑 SEO & Social Sharing

- Dynamically injects `title`, `description`, and `canonical` tags
- Custom meta per page type (solution, case study, etc.)
- OG tags (`og:title`, `og:image`, etc.) from `site.ts` defaults or CMS
- Twitter card support: `summary_large_image`

---

Let me know if you'd like this exported into a JSON schema, admin UI config panel, or editable CMS version.