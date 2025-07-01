# 🧰 Tech Stack — Coriyon’s Studio

This is the complete, up-to-date breakdown of tools and technologies used across the full stack of the Coriyon’s Studio design portfolio website. The system leverages modern frontend frameworks, a Supabase backend, and a lightweight developer experience optimized for speed, maintainability, and CMS flexibility.

---

## 🖼️ Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Components**: 
  - ShadCN/UI (Radix UI + Tailwind + utility-first patterns)
  - Lucide React (Icon set)
- **Styling**: Tailwind CSS 4 (with JIT + custom tokens)
- **Forms**: React Hook Form
- **State Management**: React Server Components + minimal Client State
- **Data Fetching**: Server Components + API Routes
- **Image Optimization**: Next.js `Image` component
- **Animations**: Framer Motion + Tailwind CSS utilities

---

## 🔧 Backend

- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (with Row-Level Security policies)
- **Storage**: Supabase Storage (for uploads, image handling)
- **API**: Next.js API Routes (under `/api/admin`)
- **PDF Generation**: Custom route + dynamic document rendering
- **Cache Revalidation**: On-demand ISR via API
- **Deployment**: Vercel (GitHub integration + Vercel Deploy Hooks)

---

## 🛠️ Development Tools

- **Package Manager**: npm
- **Version Control**: Git (GitHub)
- **Linting**: ESLint
- **Formatting**: Prettier
- **Testing**: Manual + Functional Testing (Jest/planned)
- **CLI Scripts**: `/scripts/` for migrations, setup, and seeds
- **Admin Dashboard**: Modular CMS via custom routes
- **Debugging Tools**: Supabase Debug, API Route Debug, Cache Tool

---

## 🌐 External Services

- **Deployment Platform**: Vercel
- **PDF Generation**: Node-based rendering in Next.js
- **Analytics**: (Planned — e.g., Plausible, PostHog, or Vercel Analytics)
- **CI/CD Hooks**: GitHub + Vercel Deploy Hooks
