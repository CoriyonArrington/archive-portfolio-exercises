# Design System

## Component Status

### Standardized Components
- **Button**: All variants implemented (`@/components/ui/button.tsx`)
- **Typography**: Complete implementation (`@/components/ui/typography.tsx`)
- **ImageCard**: Responsive behavior needs testing (`@/components/shared/image-card.tsx`)
- **FormField**: Validation states implemented (`@/components/shared/form-field.tsx`)

### Components Needing Review
- **Card**: Missing hover states (`@/components/ui/card.tsx`)

## Color System
The color system is defined in `tailwind.config.ts` and includes:

- **Primary Colors**: Green-based palette (primary.50 through primary.900)
- **Secondary Colors**: Defined through HSL variables
- **Neutral Colors**: Background, foreground, muted, accent, etc.

## Typography
- **Font Families**:
  - Sans: Nunito Sans (`var(--font-nunito-sans)`)
  - Heading: Montserrat (`var(--font-montserrat)`)

- **Type Scale**:
  - Headings: h1 through h6 with responsive sizing
  - Body: Small, base, large, and xl variants
  - Display: For hero sections and large headlines

## Spacing
Custom spacing scale defined in `tailwind.config.ts` with increments like 4.5, 5.5, etc.

## Animations
Custom animations defined for:
- Accordion transitions
- Floating elements
- Fade-in effects
- Pulse animations
- Movement animations

## Shadows
Consistent shadow definitions from sm to 2xl

## Component Guidelines

### Buttons
- Primary: Used for main actions
- Secondary: Used for secondary actions
- Ghost: Used for tertiary actions
- Link: Used for navigation actions
- Destructive: Used for destructive actions

### Forms
- Input: Text input field
- Textarea: Multi-line text input
- Select: Dropdown selection
- Checkbox: Boolean selection
- Radio: Single selection from multiple options
- Switch: Toggle between two states

### Layout
- Card: Container for related content
- Section: Page section with consistent spacing
- Grid: Responsive grid layout
- Container: Content container with max-width

### Navigation
- MainNav: Main navigation component
- MobileNav: Mobile navigation component
- Footer: Footer component
- Breadcrumbs: Breadcrumb navigation

### Feedback
- Toast: Temporary notification
- Alert: Persistent notification
- Dialog: Modal dialog
- Tooltip: Contextual information

## Usage Guidelines

### Component Composition
- Use composition over inheritance
- Keep components focused on a single responsibility
- Use props for configuration
- Use children for content

### Accessibility
- Use semantic HTML elements
- Include proper ARIA attributes
- Ensure keyboard navigation works
- Maintain color contrast ratios

### Responsive Design
- Use mobile-first approach
- Test on multiple device sizes
- Use responsive variants for different screen sizes
\`\`\`
