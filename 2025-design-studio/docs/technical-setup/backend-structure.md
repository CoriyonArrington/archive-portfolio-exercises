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
