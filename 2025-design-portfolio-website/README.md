# Design Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Project Structure

The codebase follows a modular, component-based architecture organized into logical directories:

### Core Directories

- `/app`: Next.js App Router pages and routes
  - Route-specific components and layouts
  - API routes under `/app/api`
  - Server actions under `/app/actions`

- `/components`: Reusable UI components organized by purpose
  - `/admin`: Admin dashboard components
  - `/layout`: Layout components (header, footer, etc.)
  - `/providers`: Context providers
  - `/sections`: Page section components
  - `/shared`: Shared utility components
  - `/ui`: UI primitives and design system components

- `/lib`: Utility functions, hooks, and configuration
  - `/utils`: General utility functions
  - `/hooks`: Custom React hooks
  - `/data`: Data fetching and manipulation
  - `/types`: TypeScript type definitions

- `/public`: Static assets (images, fonts, etc.)

### Component Organization

Components are organized following a four-tier hierarchy:

1. **Foundation Components**: Basic UI primitives in `/components/ui`
   - Buttons, inputs, cards, etc.
   - Consistent styling and behavior

2. **Layout Components**: Page structure in `/components/layout`
   - Header, footer, page layout
   - Navigation components

3. **Shared Components**: Reusable across pages in `/components/shared`
   - Mode toggle, feedback forms, etc.
   - Authentication components

4. **Section Components**: Page-specific sections in `/components/sections`
   - Hero sections, feature showcases
   - Organized by page or feature

### Naming Conventions

- **Files**: Kebab-case for all files (`hero-section.tsx`)
- **Components**: PascalCase for component names (`HeroSection`)
- **Directories**: Lowercase with dashes for multi-word directories (`feature-flags`)

### Import Patterns

- Use `@/` alias for imports from the project root
- Group imports by:
  1. External libraries
  2. Internal components
  3. Utilities and hooks
  4. Types
  5. Styles

## Development Guidelines

### Code Style

- Use TypeScript for all code
- Prefer functional components with hooks
- Use named exports for components
- Follow the file structure: exports, subcomponents, helpers, static content, types

### Performance Optimization

- Minimize client-side JavaScript with React Server Components
- Use dynamic imports for non-critical components
- Optimize images with Next.js Image component
- Implement proper caching strategies

### Styling

- Use Tailwind CSS for styling
- Follow a mobile-first approach
- Use CSS variables for theming
- Maintain consistent spacing and typography

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

