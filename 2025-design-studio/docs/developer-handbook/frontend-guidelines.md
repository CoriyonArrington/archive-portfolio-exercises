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
