# 📘 Developer Handbook — Coriyon’s Studio

> This handbook compiles the most important technical conventions and frontend systems powering Coriyon’s Studio. It serves as a go-to reference for developers building or maintaining the design portfolio and CMS infrastructure.

---

## 1. 🎨 Frontend Guidelines

# 🎨 Frontend Guidelines — Coriyon’s Studio

This guide outlines best practices for writing, structuring, and maintaining clean, scalable frontend code in the Coriyon’s Studio project. It reflects the latest toolset (ShadCN, Tailwind CSS 4, Server Components, etc.) and coding conventions used throughout the studio’s design system.

---

## 🧠 Code Style and Structure

### General Principles
- Use **functional and declarative programming patterns**; avoid classes
- Favor **modularization** and composition over duplication
- Use descriptive, boolean-friendly variable names (`isLoading`, `hasError`, `canSubmit`)
- Organize files by **exported component**, **subcomponents**, **helpers**, and **static types**

### Component Organization
- `app/[route]/page.tsx` – Page entry point (RSC)
- `app/[route]/layout.tsx` – Layout wrapper
- `components/ui/` – ShadCN + Radix-based UI primitives
- `components/common/` – Shared elements (headers, footers)
- `components/forms/` – Form-specific components
- `components/page-sections/` – Section-specific layout blocks
- `components/[feature]/` – Feature-specific components (e.g., playground, quiz)

### Naming Conventions
- Use **kebab-case** for directories (`components/design-system-audit`)
- Use **PascalCase** for component files and exported component names
- Favor **named exports** over default exports

---

## 🧾 TypeScript Usage

- All files must use **TypeScript**
- Prefer **interfaces** over types for props
- Avoid `enum`; use `const` objects + union types
- Use shared types in `types/` or `lib/validators` when reusable

---

## 🎨 UI & Styling

### Design System
- Use **ShadCN/UI** for accessible, design-consistent base components
- Built on **Radix UI** and Tailwind CSS 4
- Follow **tailwind.config.ts** for:
  - Color palette
  - Typography scale
  - Custom spacing tokens

### Responsive Design
- Use **mobile-first Tailwind breakpoints** (`sm`, `md`, `lg`, etc.)
- Use `min-w`, `max-w`, and `aspect-ratio` utilities
- Test layouts across breakpoints
- Use `useMediaQuery` or server-rendered variants where necessary

### Accessibility
- Use semantic HTML elements (`<nav>`, `<main>`, `<section>`)
- Add `aria-*` attributes for form and interactive components
- Ensure full **keyboard navigation**
- Maintain **color contrast** for all interactive elements

---

## ⚙️ Performance Optimization

### Server vs Client
- Use **React Server Components** by default
- Limit `use client` to components with browser APIs or interactivity

### Lazy & Dynamic Loading
- Use `Suspense` boundaries for client components
- Dynamically import heavy or non-critical features
- Use loading skeletons and fallback states

### Image Optimization
- Use **Next.js Image** with lazy loading and `sizes` attribute
- Prefer **WebP** or **AVIF** formats when supported
- Use `ResponsiveImage` or `LazyImage` components for full control

---

## ✅ Key Conventions & Utilities

- Use `nuqs` or `URLSearchParams` for search state
- Use `zod` schemas in `/lib/validators` for client/server validation
- Follow Web Vitals best practices (LCP, CLS, FID)
- Prefer composition over prop drilling

Let me know if you'd like a printable or poster version of this for dev onboarding!


---

## 2. 🧱 Design System

# 🎨 Design System — Coriyon’s Studio

This document outlines the visual and component design rules used across Coriyon’s Studio. It includes standards for UI components, spacing, colors, typography, accessibility, and usage best practices.

---

## 🧩 Component Status

### ✅ Standardized Components
- **Button** – All variants implemented (`@/components/ui/button.tsx`)
- **Typography** – Complete text styles (`@/components/ui/typography.tsx`)
- **Card** – Used in UI & layout sections (`@/components/ui/card.tsx`)
- **ImageCard** – Responsive content block (`@/components/common/image-card.tsx`)
- **FormField** – With validation states (`@/components/forms/form-field.tsx`)
- **Accordion, Tooltip, Dialog** – Radix-based and styled via ShadCN

### 🛠️ Components Needing Review
- **Tabs** – Basic styling complete, needs accessibility pass
- **Table** – Needs keyboard navigation and responsive cleanup
- **Navigation** – Mobile drawer needs animation polish

---

## 🌈 Color System

Defined in `tailwind.config.ts` using custom tokens:

- **Primary**: Green-based palette (`primary.50 → primary.900`)
- **Secondary**: Accent HSL-based (`--color-secondary`)
- **Neutral**: `background`, `foreground`, `muted`, `accent`, etc.
- **UI States**: `success`, `warning`, `error`, `info`

---

## ✍️ Typography

### Fonts
- **Sans**: Nunito Sans (`--font-nunito-sans`)
- **Heading**: Montserrat (`--font-montserrat`)

### Type Scale
- Headings: `h1–h6`, mobile-first scale
- Body: `sm`, `base`, `lg`, `xl`
- Display: For hero and promo sections

---

## 📐 Spacing System

Custom spacing tokens defined in `tailwind.config.ts`:

- Scaled increments: `0.5`, `1`, `1.5`, ... `4.5`, `5.5`, `6`, etc.
- Section padding: `py-12`, `pt-24`, `pb-32` for consistency
- Layout wrappers: `max-w-screen-lg`, `px-4`, `lg:px-8`

---

## 🌀 Animation Tokens

- **Accordion transitions**
- **Fade and movement**: fade-in, fade-up, slide-right
- **Pulse / ping**: used for callouts
- **Custom delays**: for sequenced reveal

---

## 🪞 Shadows & Borders

- Shadow tokens: `shadow-sm → shadow-2xl`
- Border radius: `rounded`, `rounded-lg`, `rounded-2xl`
- Use Tailwind presets for all shadows and outlines

---

## 🧱 Component Guidelines

### Buttons
- `variant="default"`, `secondary`, `ghost`, `link`, `destructive`
- Support loading state and disabled styling
- Icons can be added before or after text

### Forms
- Inputs: Text, textarea, checkbox, radio, switch
- Styled using Radix primitives + Tailwind tokens
- Valid states: `error`, `success`, `disabled`

### Layout
- `Card`, `Grid`, `Section`, `Container`
- Section wrappers use consistent spacing and breakpoints

### Navigation
- `MainNav`, `MobileNav`, `Footer`
- Breadcrumbs for nested views
- Responsive drawer for small screens

### Feedback Components
- `Toast` for quick alerts
- `Alert` for persistent messages
- `Dialog` and `Tooltip` via Radix
- Confirmations with actions handled via modal or toast

---

## 📏 Usage Guidelines

### Component Composition
- Composition > inheritance
- Components should be atomic and reusable
- Use `props` to configure, `children` for slot content

### Accessibility
- Semantic HTML required
- ARIA attributes applied for dynamic components
- Focus traps, tab loops, and readable contrast

### Responsive Design
- Mobile-first by default
- Use Tailwind’s responsive variants (`sm`, `md`, `lg`, `xl`, `2xl`)
- Fluid typography and flexible layout tokens

Let me know if you want a token sheet, accessibility audit checklist, or poster-ready component reference.


---

## 3. 🧰 Tech Stack

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