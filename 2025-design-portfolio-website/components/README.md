# Components Directory

This directory contains all React components used throughout the application, organized in a hierarchical structure to promote reusability, maintainability, and clarity.

## Component Hierarchy

Our components follow a four-tier hierarchy:

1. **Foundation Components** (`/ui`)
   - Basic UI primitives with consistent styling
   - Reusable across the entire application
   - Examples: Button, Input, Card, Dialog

2. **Layout Components** (`/layout`)
   - Page structure components
   - Control the overall layout of pages
   - Examples: Header, Footer, Sidebar, Navigation

3. **Shared Components** (`/shared`)
   - Reusable feature components
   - Used across multiple pages
   - Examples: AuthForm, Feedback, ModeToggle

4. **Section Components** (`/sections`)
   - Page-specific sections
   - Organized by page or feature
   - Examples: HeroSection, FeatureShowcase

## Directory Structure
components/
├── ui/              # Base UI components
├── layout/          # Layout components
├── sections/        # Page sections organized by purpose
│   ├── home/
│   ├── about/
│   ├── work/
│   └── services/
├── admin/           # Admin-specific components
├── shared/          # Shared components used across multiple pages
└── providers/       # Context providers


## Best Practices

### Component Creation

- Use functional components with hooks
- Keep components focused on a single responsibility
- Extract complex logic to custom hooks in `/hooks`
- Use TypeScript interfaces for props

### Naming Conventions

- Use PascalCase for component names: `Button`, `CardHeader`
- Use kebab-case for file names: `button.tsx`, `card-header.tsx`
- Name files after the component they export: `Button` → `button.tsx`

### File Structure

Within component files, follow this order:
1. Imports
2. Types/Interfaces
3. Component definition
4. Helper functions
5. Exports

### State Management

- Use local state for UI-specific state
- Use context for shared state across components
- Keep state as close as possible to where it's used

### Styling

- Use Tailwind CSS for styling
- Follow a mobile-first approach
- Use CSS variables for theming
- Maintain consistent spacing and typography

## Usage Examples

### Importing Components

```tsx
// Import from specific directories
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { HeroSection } from '@/components/sections/home/hero-section';

// Or use the index exports
import { Button, Card } from '@/components/ui';