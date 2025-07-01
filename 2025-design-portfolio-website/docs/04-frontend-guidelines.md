# Frontend Guidelines

## Code Style and Structure

### General Principles
- Use functional and declarative programming patterns; avoid classes
- Prefer iteration and modularization over code duplication
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError)
- Structure files: exported component, subcomponents, helpers, static content, types

### Component Organization
- **Page Components**: Located in `app/[route]/page.tsx`
- **Layout Components**: Located in `app/[route]/layout.tsx`
- **Shared Components**: Located in `components/shared/`
- **Feature-specific Components**: Located in `components/[feature]/`
- **UI Components**: Located in `components/ui/`

### Naming Conventions
- Use lowercase with dashes for directories (e.g., `components/auth-wizard`)
- Use PascalCase for component files and functions
- Favor named exports for components

### TypeScript Usage
- Use TypeScript for all code; prefer interfaces over types
- Avoid enums; use maps instead
- Use functional components with TypeScript interfaces
- Define types in separate files when shared across components

### Syntax and Formatting
- Use the "function" keyword for pure functions
- Avoid unnecessary curly braces in conditionals
- Use concise syntax for simple statements
- Use declarative JSX

## UI and Styling

### Design System
- Use HeroUI, Radix UI, and Tailwind CSS 4 for components and styling
- Follow the color palette defined in `tailwind.config.ts`
- Use the typography scale defined in the design system
- Maintain consistent spacing using the custom spacing scale

### Responsive Design
- Implement mobile-first approach
- Use Tailwind's responsive prefixes (sm, md, lg, xl, 2xl)
- Test on multiple device sizes
- Use the `useResponsive` hook for complex responsive logic

### Accessibility
- Use semantic HTML elements
- Include proper ARIA attributes
- Ensure keyboard navigation works
- Maintain color contrast ratios
- Use the `SkipToContent` component for screen readers

## Performance Optimization

### Server vs. Client Components
- Minimize 'use client' directives
- Favor React Server Components (RSC) when possible
- Use client components only when necessary (interactivity, browser APIs)

### Loading Strategies
- Wrap client components in Suspense with fallback
- Use dynamic loading for non-critical components
- Implement proper loading states

### Image Optimization
- Use WebP format when possible
- Include size data for images
- Implement lazy loading for below-the-fold images
- Use the `ResponsiveImage` or `LazyImage` components

### Key Conventions
- Use 'nuqs' for URL search parameter state management
- Optimize Web Vitals (LCP, CLS, FID)
- Limit 'use client' to components that need browser APIs
\`\`\`
