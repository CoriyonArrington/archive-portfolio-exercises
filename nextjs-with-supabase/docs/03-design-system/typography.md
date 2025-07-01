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