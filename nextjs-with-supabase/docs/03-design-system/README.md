# Design System Documentation (Updated 2025-04-29)

**Version:** 1.1 (Draft)
**Primary Technologies:** Tailwind CSS, Shadcn/UI, React, Next.js

---

## Core Principles

* **Utility-First:** Leverage **Tailwind CSS** for direct styling in markup.
* **Component-Based:** Utilize **React** and **Shadcn/UI** for reusable components.
* **Accessibility:** Strive to meet **WCAG AA** standards. (See dedicated Accessibility section).
* **Responsive Design:** Employ a **mobile-first** approach.
* **Consistency:** Maintain visual and functional harmony through **defined tokens and guidelines**.
* **Inside-Out Spacing:** Apply spacing primarily via **element margins** for component reusability.
    * _Decision:_ Adopted "Inside-Out Spacing" to make components self-contained. Margins define external space, padding defines internal space.

---

## Color System

* **Source:** `tailwind.config.ts` & `globals.css` (for CSS variables).
* **Methodology:** Uses **HSL CSS variables** (e.g., `hsl(var(--primary))`) aligned with Shadcn/UI for **theming**.
    * _Decision:_ Standardized on HSL variables for theme integration.
* **Palettes:** Defined via CSS variables:
    * `--primary`, `--primary-foreground`
    * `--secondary`, `--secondary-foreground`
    * `--destructive`, `--destructive-foreground`
    * `--background`, `--foreground`, `--border`, `--input`, `--ring`
    * `--card`, `--card-foreground`
    * `--popover`, `--popover-foreground`
    * `--muted`, `--muted-foreground`
    * `--accent`, `--accent-foreground`

---

## Typography

* **Source:** Font families defined in `tailwind.config.ts` using CSS variables. Fonts loaded via `next/font/local` in `app/layout.tsx`.
* **Font Families:**
    * **Sans Serif (Body):** Nunito Sans (`font-sans`, uses `var(--font-nunito-sans)`)
    * **Heading:** Montserrat (`font-heading`, uses `var(--font-montserrat)`)
    * _Decision:_ Migrated fonts from the previous system for brand consistency.

* **Type Scale:**
    Provides consistent sizing, weight, and spacing for text elements across the application, leveraging Tailwind CSS utility classes and custom typography components found in `components/typography/`. Responsive sizes adapt for different screen widths.

    ---

    ### Headings

    * **Component:** `<H1>`
    * **Font Family:** Montserrat (`font-heading`)
    * **Weight:** ExtraBold (`font-extrabold` - 800) or Bold (`font-bold` - 700)
    * **Size:** `text-4xl` (36px) / `md:text-5xl` (48px) / `lg:text-6xl` (60px)
    * **Line Height:** Tight (`leading-tight`)
    * **Spacing:** `tracking-tight`, `scroll-m-20` (Scroll margin top)
    * **Margin:** Default `mb-4` or `mb-6` likely applied by component styles.
    * **Usage:** Primary page title, should generally appear only once per page.

    * **Component:** `<H2>`
    * **Font Family:** Montserrat (`font-heading`)
    * **Weight:** Bold (`font-bold` - 700) or SemiBold (`font-semibold` - 600)
    * **Size:** `text-3xl` (30px) / `md:text-4xl` (36px)
    * **Line Height:** Tight (`leading-tight` or `leading-snug`)
    * **Spacing:** `tracking-tight`, `scroll-m-20`
    * **Margin:** Default `mb-4` likely applied by component styles.
    * **Usage:** Major section headings.

    * **Component:** `<H3>`
    * **Font Family:** Montserrat (`font-heading`)
    * **Weight:** SemiBold (`font-semibold` - 600)
    * **Size:** `text-2xl` (24px) / `md:text-3xl` (30px)
    * **Line Height:** Snug (`leading-snug`)
    * **Spacing:** `tracking-tight`, `scroll-m-20`
    * **Margin:** Default `mb-3` or `mb-4` likely applied by component styles.
    * **Usage:** Sub-section headings.

    * **Component:** `<H4>`
    * **Font Family:** Montserrat (`font-heading`)
    * **Weight:** Medium (`font-medium` - 500) or SemiBold (`font-semibold` - 600)
    * **Size:** `text-xl` (20px) / `md:text-2xl` (24px)
    * **Line Height:** Normal (`leading-normal`)
    * **Spacing:** `tracking-tight`, `scroll-m-20`
    * **Margin:** Default `mb-2` or `mb-3` likely applied by component styles.
    * **Usage:** Card titles, minor headings.

    *(Note: H5/H6 can be defined similarly if needed, often reusing H4 styles or `text-lg`/`text-base` sizes)*

    ---

    ### Body Text

    * **Component:** `<P>` (Paragraph)
    * **Font Family:** Nunito Sans (`font-sans`)
    * **Weight:** Regular (`font-normal` - 400)
    * **Size:** `text-base` (16px)
    * **Line Height:** Relaxed (`leading-relaxed` - 1.625) or Normal (`leading-normal` - 1.5)
    * **Margin:** Default `mb-4` or similar likely applied by component styles.
    * **Usage:** Standard body copy.

    * **Component:** `<Lead>` (Lead Paragraph)
    * **Font Family:** Nunito Sans (`font-sans`)
    * **Weight:** Regular (`font-normal` - 400)
    * **Size:** `text-xl` (20px) or `text-lg` (18px)
    * **Line Height:** Relaxed (`leading-relaxed`)
    * **Style:** Often uses `text-muted-foreground` for less emphasis.
    * **Margin:** Default `mb-6` likely applied by component styles.
    * **Usage:** Introductory paragraphs, standfirsts.

    * **Component:** `<Small>` *(or use utility class `text-sm`)*
    * **Font Family:** Nunito Sans (`font-sans`)
    * **Weight:** Regular (`font-normal` - 400)
    * **Size:** `text-sm` (14px)
    * **Line Height:** Normal (`leading-normal`)
    * **Usage:** Captions, footnotes, less important text.

    * **Component:** `<Blockquote>`
    * **Font Family:** Nunito Sans (`font-sans`)
    * **Weight:** Regular (`font-normal` - 400)
    * **Size:** `text-base` (16px)
    * **Style:** Often `italic`, `border-l-4`, `pl-4`, `text-muted-foreground`.
    * **Margin:** Default `my-6` likely applied by component styles.
    * **Usage:** Quoted text.

    * **Component:** `<Code>` (Inline Code)
    * **Font Family:** Mono (`font-mono` - Ensure fallback in Tailwind config)
    * **Weight:** Regular (`font-normal` - 400)
    * **Size:** Relative (`text-sm` equivalent, often slightly smaller than surrounding text)
    * **Style:** `bg-muted`, `px-1.5`, `py-1`, `rounded`.
    * **Usage:** Inline code snippets, variable names.

    * **Component:** *(Not created yet, use `<pre>` with styling or create `<CodeBlock>`)* (Code Block)
    * **Font Family:** Mono (`font-mono`)
    * **Weight:** Regular (`font-normal` - 400)
    * **Size:** `text-sm` (14px)
    * **Style:** Background, padding, overflow handling (`overflow-x-auto`). Often wrapped in `<pre>`.
    * **Usage:** Multi-line code examples.

    ---

    ### Links

    * **Component:** `<InlineLink>`
    * **Font Family:** Inherits (Nunito Sans)
    * **Weight:** Medium (`font-medium` - 500) or inherits.
    * **Style:** Typically `text-primary`, `underline`, `hover:underline-offset-4`, potentially `focus-visible` styles.
    * **Usage:** Links embedded within text content.

    * **Standalone Links:** Use the `<Button asChild><Link>...</Link>` pattern. Styling is determined by the `Button` component's variants and sizes.

    ---

    ### Lists

    * **Component:** `<List>` (specify `variant="unordered"` or `variant="ordered"`)
    * **Font Family:** Inherits (Nunito Sans)
    * **Weight:** Inherits (Regular - 400)
    * **Size:** Inherits (`text-base`)
    * **Style:** `list-disc` or `list-decimal`, `list-inside` or `list-outside`.
    * **Spacing:** `my-4` or `my-6` margin for the list, `ml-6` (for indentation), `[&>li]:mt-2` (spacing between items).
    * **Usage:** Ordered or unordered lists.

    ---

    ### Usage Guidelines

    * Use the semantic typography components (`<H1>`, `<P>`, etc.) whenever possible for accessibility and consistency.
    * Apply Tailwind utility classes directly for minor overrides or specific one-off styling needs.
    * Ensure sufficient color contrast between text and background (Refer to Color section).
    * Maintain a clear visual hierarchy using the defined scale.
    
## Spacing

* **Source:** `tailwind.config.ts` (`theme.extend.spacing`).
* **Methodology:** **Inside-Out Spacing**
    * **External:** Use **`margin`** utilities (`m-*`, `mb-*`, etc.) on elements. Prefer `mb-*` for vertical rhythm.
    * **Internal:** Use **`padding`** utilities (`p-*`, `pt-*`, etc.).
    * **Grid/Flex:** Use **`gap-*`** utilities for direct children.
    * **Space Between:** `space-x-*` / `space-y-*` acceptable for simple stacks (applies margin).
    * _Decision:_ Defined clear usage for margin, padding, gap, space utilities.
* **Spacing Scale:**
    * Custom scale based on **4px (0.25rem)** unit.
    * Range: `1` (4px) to `30` (120px), includes half-steps (e.g., `1.5` = 6px).
    * _Decision:_ Adopted detailed scale (4px-120px) for flexibility.

---

## Breakpoints

* **Source:** `tailwind.config.ts` (`theme.screens`).
* **Methodology:** Standard breakpoints for **mobile-first responsive design** using modifiers (`md:`, `lg:`, etc.).
* **Defined Breakpoints:**
    * `sm`: **640px**
    * `md`: **768px**
    * `lg`: **1024px**
    * `xl`: **1280px**
    * `2xl`: **1536px**
* **Container Override:** `.container` max-width is `1400px` at `2xl`.
    * _Decision:_ Added standard breakpoints for consistency.

---

## Border Radius

* **Source:** `tailwind.config.ts` (`theme.extend.borderRadius`).
* **Methodology:** Uses **CSS variable `--radius`**, aligns with Shadcn/UI.
    * `lg`: `var(--radius)`
    * `md`: `calc(var(--radius) - 2px)`
    * `sm`: `calc(var(--radius) - 4px)`

---

## Shadows

* **Source:** `tailwind.config.ts` (`theme.extend.boxShadow`).
* **Scale:** Consistent scale (sm, DEFAULT, md, lg, xl, 2xl) migrated from the previous system.
    * _Decision:_ Migrated definitions for visual consistency.

---

## Animations & Transitions

* **Source:** `tailwind.config.ts` (`theme.extend.keyframes`, `theme.extend.animation`).
* **Defaults:** Includes standard **Shadcn/UI animations** (e.g., accordion).
* **Custom:** Additional animations (float, fade-in, pulse) available (migrated).
* **Usage:** Apply **judiciously**. Respect **`prefers-reduced-motion`**.
    * _Decision:_ Start with defaults, add custom animations selectively.

---

## Iconography

* **Principles:** Clarity, Simplicity, Consistency.
* **Icon Library:**
    * * * **Usage Guidelines:**
    * **Pair with text** when possible.
    * Provide **`accessibilityLabel`** for standalone icons.
    * Define standard **sizes** (e.g., 16px, 20px).
    * Use **`currentColor`** or semantic tokens for color.
* **Adding Icons:**
    * ---

## Component Library (Based on Shadcn/UI)

* **Location:** `components/ui/`, `components/common/`, `components/shared/`.
* **Foundation:** Built on **Shadcn/UI primitives**. Refer to Shadcn/UI docs.
* **Component Status:**
    * * **Key Components (Examples):** Button, Card, Input/FormField, Layouts, Feedback elements.
* **Component Usage & Patterns:**
    * **Principles:** Composition over inheritance, focused props/children.
    * **Do's and Don'ts:**
        * * **Common Patterns:**
        * ---

## Content Style Guide

* **Voice & Tone Principles:** Clear, Concise, Practical, Helpful, Consistent, Human.
    * * **Grammar & Mechanics:**
    * **Capitalization:** * **Punctuation:** * **Terminology / Vocabulary:**
    * * **Inclusive Language:**
    * Write for a **diverse, global audience**. Avoid idioms/slang.
    * Use **people-first** language (disability).
    * Use **gender-neutral** language by default.
    * Avoid **biased/harmful** terms.

---

## Accessibility (A11y)

* **Goal:** **WCAG 2.1 AA** minimum. Design for people.
* **Core Principles:**
    * Use **Semantic HTML**.
    * Ensure full **Keyboard Navigation** & visible focus states.
    * Provide **Screen Reader Support** (text alternatives, ARIA).
    * Meet **Color Contrast** minimums (4.5:1 / 3:1). Don't rely on color alone.
    * Allow **User Control** (zoom, reduced motion). Avoid unexpected shifts.
    * Maintain **Simplicity & Consistency**.
* **Guidelines by Disability Type:**
    * * **Tooling & Testing:**
    * **Tools:** * **Methods:** Combine **automated** and **manual** testing (keyboard, screen reader).
    * **Users:** Test with **diverse users**, including those with disabilities.
* **Component-Specific Notes:**
    * ---

## Contribution & Governance

* **Philosophy:** A **shared resource**; contributions welcome.
* **Contribution Types:** Minor (fixes, docs) vs. Major (new components, breaking changes).
* **Process:**
    * **Minor:** Direct **Pull Request** with clear description. * **Major:** Start with **Contribution Proposal** (GitHub Discussion/Issue). * **Review:** Required for all contributions (quality, consistency, A11y). * **Getting Help:**
    * * **Versioning & Releases:**
    * * ---

## Future Considerations

* Dark Mode Theming
* Refinement of Type Scale & Responsive Typography
* Formalized Component Status Tracking (Storybook?)
* Design System Audit Tool Implementation