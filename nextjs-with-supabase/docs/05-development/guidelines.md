
# 🎨 Frontend Guidelines

This guide outlines best practices for writing, structuring, and maintaining clean, scalable frontend code for this Next.js/Supabase project.

---

## 🧠 Code Style and Structure

### General Principles
- Follow standard TypeScript and React best practices.
- Use **functional components** exclusively.
- Favor **composition** over inheritance or complex prop drilling (consider Zustand or Context for deep state).
- Use descriptive variable and function names (e.g., `isLoading`, `handleSubmit`, `UserProfileCard`).
- Keep components focused on a single responsibility where possible.

### File & Folder Structure
- **App Router:** Adhere to Next.js App Router conventions (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, route groups `(...)`).
- **Components (`/components`):**
    - `/ui`: Shadcn/UI components (often managed by CLI).
    - `/common`: Highly reusable components (e.g., Header, Footer, Logo).
    - `/forms`: Reusable form elements or specific form components.
    - `/layout`: Components defining page structure (e.g., wrappers, sidebars).
    - `/page-sections`: Larger, potentially page-specific section blocks.
    - `/[feature]`: Group components related to a specific feature (e.g., `/admin`, `/auth`).
- **Naming:**
    - **Directories:** `kebab-case`.
    - **Components:** `PascalCase.tsx`.
    - **Hooks:** `useCamelCase.ts`.
    - **Utilities:** `camelCase.ts` or `kebab-case.ts`.
- **Exports:** Prefer **named exports** over default exports for clarity and consistency.

---

## 🏷️ Naming Conventions

Consistency in naming helps maintain clarity across the codebase and database.

### Database Tables
- **Convention:** Use **plural nouns** for table names. This is a standard practice as tables represent a collection of entities.
- **Examples:** `projects`, `services`, `solution_pages`, `testimonials`, `faqs`, `pages`, `users`.

### Page Routes & File Paths
- **Convention:**
    - **Index Pages:** Use the plural form of the concept for the URL path, mapping to `page.tsx` within the relevant group.
        - Example: `/solutions` maps to `app/(solutions)/page.tsx`.
        - Example: `/projects` maps to `app/(main)/projects/page.tsx`.
    - **Detail Pages:** Use the singular form of the concept in the route group, followed by a dynamic segment (usually `[slug]` or `[id]`), mapping to `page.tsx` within that dynamic segment folder.
        - Example: `/solutions/[some-slug]` maps to `app/(solutions)/[slug]/page.tsx`.
        - Example: `/projects/[some-slug]` maps to `app/(main)/projects/[slug]/page.tsx`.
- **Reconciliation:** Note that detail page routes (`/[singular]/[slug]`) fetch data for *one* item from the corresponding *plural-named* database table (e.g., `/solutions/slug-1` fetches from the `solution_pages` table).

---

## 🧾 TypeScript Usage

- **Strict Mode:** Ensure `tsconfig.json` has strict checks enabled.
- **Typing:**
    - Use **interfaces** for defining the shape of objects and component props.
    - Use **types** for union types, intersections, or utility types.
    - Define reusable types in `/types` or close to their usage if highly specific.
    - Leverage Supabase-generated types (`types/supabase.ts`) for database interactions.
- **Avoid `any`:** Use specific types, `unknown`, or generics instead.

---

## 🎨 UI & Styling (Tailwind + Shadcn/UI)

- **Utility-First:** Leverage Tailwind CSS classes directly in JSX.
- **Shadcn/UI:** Use components from `/components/ui` as the foundation for UI elements. Customize them via Tailwind classes or by modifying the component files directly if needed.
- **Consistency:** Adhere to the theme defined in `tailwind.config.ts` (colors, spacing, fonts, etc.) and `globals.css`.
- **Class Merging:** Use the `cn` utility (from `/lib/utils`) provided by Shadcn/UI when conditionally applying Tailwind classes.
- **Responsive Design:**
    - Use Tailwind's mobile-first breakpoints (`sm:`, `md:`, `lg:`, etc.).
    - Test layouts across common screen sizes.

---

## ✨ React Server Components (RSC) vs. Client Components

- **Default to Server Components:** Write components as Server Components unless client-side interactivity (`useState`, `useEffect`, event handlers) or browser APIs are required.
- **`"use client"` Directive:** Use sparingly at the top of files needing client-side capabilities. Push client logic down to leaf components where possible.
- **Data Fetching:** Prefer data fetching within Server Components for simplicity and performance. Client Components can fetch data via Server Actions or API routes if needed.
- **Passing Props:** Only serializable props can be passed from Server to Client Components. Functions can be passed *only* if they are Server Actions.

---

## 📄 Metadata (SEO & Social Sharing)

This project utilizes the **Next.js Metadata API** for managing page titles, descriptions, social media card information (Open Graph), and other `<head>` elements.

### Configuration-Based Defaults
- Default site-wide metadata values (site name, default description, default OG image, base URL) are defined in `/config/site.ts` via the `siteConfig` and `baseMetadata` exports.
- These defaults are applied in the root layout (`app/layout.tsx`) using the `metadata: Metadata` export.
- The `metadataBase` property is set in the root layout to ensure relative image paths work correctly.
- The `title.template` property (`%s | Site Name`) is used in the root layout to automatically append the site name to titles defined in child pages.

### Implementation Pattern
- **Static Pages:** For pages with fixed metadata (e.g., `/about`, `/contact`, most admin list/new pages), export a static `metadata` object directly from the `page.tsx` file:
  ```typescript
  // Example in app/about/page.tsx
  import type { Metadata } from 'next';
  import { siteConfig } from '@/config/site';

  export const metadata: Metadata = {
    title: 'About Us', // Overrides default, template appends site name
    description: 'Learn more about our team.' || siteConfig.description,
    // Add other specific tags like openGraph if needed
  };
  ```
- **Dynamic Pages:** For pages whose metadata depends on route parameters (e.g., `/projects/[slug]`, `/admin/faqs/[id]/edit`), export an `async function generateMetadata({ params })` from the `page.tsx` file. This function can fetch data (e.g., from Supabase) using the `params` to generate the title, description, Open Graph image, etc., dynamically.
  ```typescript
  // Example in app/projects/[slug]/page.tsx (Conceptual)
  import type { Metadata, ResolvingMetadata } from 'next';
  // ... other imports

  export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const slug = params.slug;
    // Fetch project data based on slug...
    const project = await fetchProjectBySlug(slug);

    if (!project) {
      return { title: 'Project Not Found' };
    }

    // Resolve parent images if needed
    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: project.title,
      description: project.summary,
      openGraph: {
        images: [project.ogImage || siteConfig.ogImage, ...previousImages],
        // ... other OG tags
      },
    };
  }
  ```
- **Indexing Control:** For pages that should not be indexed by search engines (e.g., admin, auth, test, protected pages), include the `robots` property in the metadata export:
  ```typescript
  export const metadata: Metadata = {
    // ... title, description ...
    robots: { index: false, follow: false },
  };
  ```

---

## ⚡ Performance Optimization

- **Server Components:** Reduce client-side JavaScript bundle size.
- **Code Splitting:** Automatic with the App Router.
- **Dynamic Imports:** Use `next/dynamic` for heavy client components or libraries not needed on initial load.
- **Loading States:** Implement meaningful loading UIs (e.g., skeletons) using `loading.tsx` or `<Suspense>`.
- **Image Optimization:** Use `next/image` consistently. Provide `width`, `height`, and potentially `sizes` props. Use static imports for local images where possible.
- **Memoization:** Use `React.memo`, `useCallback`, `useMemo` judiciously in Client Components if performance profiling reveals bottlenecks.

---

## ♿ Accessibility (A11y)

- **Semantic HTML:** Use appropriate HTML5 elements (`<nav>`, `<main>`, `<article>`, `<aside>`, `<button>`, etc.).
- **Shadcn/UI:** Leverage the built-in accessibility features provided by Radix UI primitives.
- **Forms:** Use `<label>` correctly associated with inputs. Provide clear error messages.
- **Keyboard Navigation:** Ensure all interactive elements are focusable and usable via keyboard. Maintain logical focus order.
- **ARIA Attributes:** Add ARIA roles and properties where needed for dynamic widgets or to enhance semantics, but prefer native HTML elements when possible.
- **Color Contrast:** Ensure sufficient contrast between text and background, especially for interactive elements and states.

---

*Refer to official Next.js, React, Tailwind CSS, and Shadcn/UI documentation for more detailed guidance.*
