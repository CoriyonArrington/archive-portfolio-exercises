# App Directory Structure

This directory contains all the pages and API routes for the portfolio website. The structure follows Next.js App Router conventions with route groups for organization.

## Directory Structure
app/
├── (main)/                       # Public-facing pages (route group)
│   ├── page.tsx                  # Home page (/)
│   ├── about/                    # About page (/about)
│   ├── contact/                  # Contact page (/contact)
│   ├── work/                     # Work/portfolio pages (/work)
│   ├── services/                 # Services page (/services)
│   ├── process/                  # Process page (/process)
│   ├── testimonials/             # Testimonials page (/testimonials)
│   ├── faqs/                     # FAQs page (/faqs)
│   └── resume/                   # Resume page (/resume)
│
├── admin/                        # Admin section (real path, not a route group)
│   ├── page.tsx                  # Admin dashboard (/admin)
│   ├── login/                    # Admin login (/admin/login)
│   ├── projects/                 # Projects management (/admin/projects)
│   ├── testimonials/             # Testimonials management (/admin/testimonials)
│   ├── services/                 # Services management (/admin/services)
│   ├── process-steps/            # Process steps management (/admin/process-steps)
│   ├── faqs/                     # FAQs management (/admin/faqs)
│   └── images/                   # Image management (/admin/images)
│
├── api/                          # API routes
│   ├── projects/                 # Projects API
│   ├── testimonials/             # Testimonials API
│   ├── services/                 # Services API
│   ├── faqs/                     # FAQs API
│   ├── process/                  # Process API
│   ├── feedback/                 # Feedback API
│   ├── auth/                     # Authentication API
│   └── revalidate/               # Revalidation API
│
├── layout.tsx                    # Root layout
├── globals.css                   # Global CSS
└── not-found.tsx                 # 404 page

## Route Groups vs. Real Paths

- The `(main)` directory is a route group (denoted by parentheses) that doesn't affect the URL path. Pages inside this directory are accessible at their respective paths without the "main" prefix.
  
- The `admin` directory is a real path (not a route group), so pages inside this directory are accessible with the "/admin" prefix.

## API Routes

API routes are organized by resource and follow RESTful conventions:

- Collection routes: `/api/[resource]`
- Individual resource routes: `/api/[resource]/[id]`
- Specialized actions: `/api/[resource]/[action]`

## Layouts

- The root layout (`layout.tsx`) applies to all pages
- Section-specific layouts can be added in their respective directories

## Important Notes

1. Do not create route groups that resolve to the same path (e.g., don't create both `(main)/page.tsx` and `(admin)/page.tsx`)
2. Use route groups for organization only, not for URL structure
3. For distinct URL paths, use real directories (without parentheses)