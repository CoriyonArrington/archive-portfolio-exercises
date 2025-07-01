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
