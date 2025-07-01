# Backend Structure

## Database Schema

### Main Tables
- **projects**: Portfolio projects and case studies
- **testimonials**: Client testimonials and feedback
- **services**: Service offerings and descriptions
- **faqs**: Frequently asked questions
- **process_steps**: Design process methodology
- **profiles**: Admin user profiles

### Key Relationships
- Projects can have multiple images
- Testimonials can be associated with projects
- FAQs can be categorized
- Process steps have a defined order

## API Structure

### REST Endpoints
- `/api/projects`: Manage portfolio projects
- `/api/testimonials`: Manage testimonials
- `/api/services`: Manage service offerings
- `/api/faqs`: Manage frequently asked questions
- `/api/process`: Manage process steps
- `/api/feedback`: Handle user feedback
- `/api/generate-pdf`: Generate downloadable PDFs
- `/api/revalidate`: Trigger content revalidation

### Server Actions
- `app/actions/service-actions.ts`: Manage services
- `app/actions/faq-actions.ts`: Manage FAQs
- `app/actions/process-step-actions.ts`: Manage process steps
- `app/actions/contact.ts`: Handle contact form submissions
- `app/actions/generate-pdf.ts`: Generate PDFs
- `app/actions/revalidation.ts`: Handle cache revalidation

## Authentication and Authorization

### Admin Access
- Supabase authentication for admin users
- Role-based access control
- Protected admin routes
- Secure API endpoints

### Public Access
- Read-only access to public content
- Rate limiting on contact form submissions
- CSRF protection on forms

## Data Fetching Strategy

### Server Components
- Direct database queries using Supabase client
- Data fetching at the page level
- Passing data down to components

### Client Components
- API routes for client-side data fetching
- Optimistic updates for form submissions
- Error handling and retry logic

## Caching and Revalidation

### Static Generation
- Static generation for content-heavy pages
- Incremental Static Regeneration (ISR) for dynamic content
- On-demand revalidation via API routes

### Cache Control
- Cache headers for static assets
- Stale-while-revalidate strategy
- Cache invalidation on content updates
\`\`\`
