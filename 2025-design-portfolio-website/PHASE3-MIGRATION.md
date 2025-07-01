# Phase 3 Migration Guide: Shared Components

This guide provides detailed information about Phase 3 of the codebase reorganization project for the 2025 Design Portfolio Website, focusing on shared components.

## Overview

Phase 3 focuses on migrating and consolidating shared components to create a more maintainable and consistent component library. This includes UI components, shared utility components, section components, and provider components.

## Component Categories

### UI Components (`components/ui/`)

Basic UI elements that form the foundation of the design system:

- Buttons, cards, inputs, and other form elements
- Loading states and placeholders
- Typography components
- Image components

### Shared Components (`components/shared/`)

Reusable components that are used across multiple pages:

- Accessibility components (skip-to-content)
- Common UI patterns (tag-list, image-card)
- Section components (section-heading, page-header)
- Interactive components (accessible-tabs, accessible-accordion)

### Section Components (`components/sections/`)

Page-specific sections organized by page:

- Home page sections
- About page sections
- Work page sections
- Services page sections

### Provider Components (`components/providers/`)

Context providers and other wrapper components:

- Theme providers
- Toast providers
- Loader providers
- Feedback providers

## Migration Process

The migration process for Phase 3 consists of the following steps:

1. **Identify Components**: Scan the codebase to identify all shared components
2. **Create Directory Structure**: Ensure all necessary directories exist
3. **Migrate Components**: Move components to their appropriate locations
4. **Consolidate Similar Components**: Combine similar components (like testimonials and projects)
5. **Create Index Files**: Create barrel export files for simplified imports
6. **Update Imports**: Update import statements throughout the codebase

## Consolidation Strategy

### Testimonial Components

Multiple testimonial components are consolidated into a unified system:

- `TestimonialCard`: Base component for displaying a single testimonial
- `TestimonialGrid`: Component for displaying multiple testimonials in a grid
- `TestimonialCarousel`: Component for displaying testimonials in a carousel

### Project Components

Project components are consolidated into a unified system:

- `ProjectCard`: Base component for displaying a single project
- `ProjectGrid`: Component for displaying multiple projects in a grid
- `ProjectGallery`: Component for displaying project images in a gallery

## Import Strategy

After migration, components can be imported using the barrel exports:

```typescript
// Old imports
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// New imports
import { Button, Card } from '@/components/ui'

