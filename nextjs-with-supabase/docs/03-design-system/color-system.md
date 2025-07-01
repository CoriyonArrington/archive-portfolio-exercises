## Color System

* **Source:** CSS HSL variables defined in `app/globals.css` (light/dark themes) and mapped to Tailwind classes in `tailwind.config.ts`.
* **Methodology:** Uses **HSL CSS variables** (e.g., `hsl(var(--primary))`) aligned with Shadcn/UI conventions. This allows for easy theming by overriding the variables, typically within `:root` for the light theme and `.dark` for the dark theme selectors in `globals.css`.
    * _Decision:_ Standardized on HSL variables for theme integration and compatibility with Shadcn/UI.

* **Color Palette & Usage:**
    The following roles define the semantic use of colors throughout the application. Use the corresponding Tailwind utility classes to apply them. Always ensure sufficient contrast between text and background colors (WCAG AA).

    *(Note: HSL values below are in the format: Hue Saturation% Lightness%)*

    ---

    ### Base & Background

    * **Role:** Background & Foreground
    * **Variables:** `--background`, `--foreground`
    * **Tailwind Classes:** `bg-background`, `text-foreground`
    * **Usage:**
        * `bg-background`: Default background for pages.
        * `text-foreground`: Default text color.
    * **Values:**
        * Light: `hsl(0 0% 100%)` (BG), `hsl(0 0% 3.9%)` (FG)
        * Dark: `hsl(0 0% 3.9%)` (BG), `hsl(0 0% 98%)` (FG)

    ---

    ### Components & Containers

    * **Role:** Card
    * **Variables:** `--card`, `--card-foreground`
    * **Tailwind Classes:** `bg-card`, `text-card-foreground`
    * **Usage:** Background and text for card-like containers.
    * **Values:**
        * Light: `hsl(0 0% 100%)` (BG), `hsl(0 0% 3.9%)` (FG)
        * Dark: `hsl(0 0% 3.9%)` (BG), `hsl(0 0% 98%)` (FG)

    * **Role:** Popover
    * **Variables:** `--popover`, `--popover-foreground`
    * **Tailwind Classes:** `bg-popover`, `text-popover-foreground`
    * **Usage:** Background and text for popovers, dropdowns.
    * **Values:**
        * Light: `hsl(0 0% 100%)` (BG), `hsl(0 0% 3.9%)` (FG)
        * Dark: `hsl(0 0% 3.9%)` (BG), `hsl(0 0% 98%)` (FG)

    ---

    ### Primary Action & Brand

    * **Role:** Primary
    * **Variables:** `--primary`, `--primary-foreground`
    * **Tailwind Classes:** `bg-primary`, `text-primary`, `border-primary`, `ring-primary`, `hover:bg-primary/90`
    * **Usage:** Main brand color for primary buttons, active elements, highlights. Foreground is high-contrast text/icons for primary backgrounds.
    * **Values:**
        * Light: `hsl(0 0% 9%)` (BG), `hsl(0 0% 98%)` (FG)
        * Dark: `hsl(0 0% 98%)` (BG), `hsl(0 0% 9%)` (FG)

    ---

    ### Secondary Action & Standout

    * **Role:** Secondary
    * **Variables:** `--secondary`, `--secondary-foreground`
    * **Tailwind Classes:** `bg-secondary`, `text-secondary`, `border-secondary`, `hover:bg-secondary/80`
    * **Usage:** Secondary buttons, active filters, alternative background sections. Foreground is high-contrast text/icons for secondary backgrounds.
    * **Values:**
        * Light: `hsl(0 0% 96.1%)` (BG), `hsl(0 0% 9%)` (FG)
        * Dark: `hsl(0 0% 14.9%)` (BG), `hsl(0 0% 98%)` (FG)

    ---

    ### Accent & Subtle Highlight

    * **Role:** Accent
    * **Variables:** `--accent`, `--accent-foreground`
    * **Tailwind Classes:** `bg-accent`, `text-accent-foreground`, `hover:bg-accent/90`
    * **Usage:** Subtle backgrounds for hovered/selected items (dropdowns, lists). Foreground is high-contrast text/icons for accent backgrounds.
    * **Values:**
        * Light: `hsl(0 0% 96.1%)` (BG), `hsl(0 0% 9%)` (FG)
        * Dark: `hsl(0 0% 14.9%)` (BG), `hsl(0 0% 98%)` (FG)

    ---

    ### Muted & Tertiary Content

    * **Role:** Muted
    * **Variables:** `--muted`, `--muted-foreground`
    * **Tailwind Classes:** `bg-muted`, `text-muted-foreground`, `border-muted`
    * **Usage:** Subtle backgrounds (code blocks, disabled elements), secondary/less important text (placeholders, descriptions). `muted-foreground` provides lower contrast than `foreground`.
    * **Values:**
        * Light: `hsl(0 0% 96.1%)` (BG), `hsl(0 0% 45.1%)` (FG)
        * Dark: `hsl(0 0% 14.9%)` (BG), `hsl(0 0% 63.9%)` (FG)

    ---

    ### Destructive Action

    * **Role:** Destructive
    * **Variables:** `--destructive`, `--destructive-foreground`
    * **Tailwind Classes:** `bg-destructive`, `text-destructive`, `border-destructive`, `ring-destructive`, `hover:bg-destructive/90`
    * **Usage:** Destructive action buttons (delete), error states. Foreground is high-contrast text/icons for destructive backgrounds.
    * **Values:**
        * Light: `hsl(0 84.2% 60.2%)` (BG), `hsl(0 0% 98%)` (FG)
        * Dark: `hsl(0 62.8% 30.6%)` (BG), `hsl(0 0% 98%)` (FG)

    ---

    ### Success State

    * **Role:** Success *(Custom Addition)*
    * **Variables:** `--success`, `--success-foreground`
    * **Tailwind Classes:** `bg-success`, `text-success`, `border-success`, `ring-success`, `hover:bg-success/90`
    * **Usage:** Positive feedback messages, success states. Foreground is high-contrast text/icons for success backgrounds.
    * **Values:**
        * **_(MISSING)_** Please define `--success` and `--success-foreground` in `:root` and `.dark` scopes in `app/globals.css`.
        * _Example Light: `hsl(142.1 76.2% 36.3%)` (BG), `hsl(355.7 100% 97.3%)` (FG)_
        * _Example Dark: `hsl(142.1 70.6% 45.3%)` (BG), `hsl(355.7 100% 97.3%)` (FG)_

    ---

    ### Borders & Rings

    * **Role:** Border
    * **Variable:** `--border`
    * **Tailwind Class:** `border` (implicitly uses `--border` color)
    * **Usage:** Default border color for cards, dividers, etc.
    * **Values:** Light: `hsl(0 0% 89.8%)`, Dark: `hsl(0 0% 14.9%)`

    * **Role:** Input Border
    * **Variable:** `--input`
    * **Tailwind Class:** `border-input`
    * **Usage:** Border color specifically for form inputs.
    * **Values:** Light: `hsl(0 0% 89.8%)`, Dark: `hsl(0 0% 14.9%)`

    * **Role:** Focus Ring
    * **Variable:** `--ring`
    * **Tailwind Class:** `ring-ring`, `focus-visible:ring-ring`
    * **Usage:** Color for focus indicator outlines.
    * **Values:** Light: `hsl(0 0% 3.9%)`, Dark: `hsl(0 0% 83.1%)`

    ---
    *(Note: Chart colors `--chart-1` through `--chart-5` are also defined but their usage context isn't specified here.)*