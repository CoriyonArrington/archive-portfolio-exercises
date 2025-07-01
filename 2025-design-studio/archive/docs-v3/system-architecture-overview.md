# 🧩 System Architecture Overview — Coriyon’s Studio

> This combined reference includes the full directory structure, database schema, and API route plan used in Coriyon’s Studio.

---

## 1. 🗂️ Updated Directory Structure

# 🗂️ Updated Directory Structure — Coriyon’s Studio (Finalized for SEO + UX + Admin)

## ✅ Overview

This finalized structure supports a high-performing, SEO-optimized, and CMS-powered site using **Next.js 14 (App Router)** with a **Supabase** backend. It cleanly separates public-facing content from admin routes, follows best practices for scalability, and aligns with your project goals.

---

## 📁 Final Directory Layout

```
/app
  /(main)
    /about
    /contact
    /services
    /work
    /page.tsx (Home)

  /(solutions)
    /ux-research-user-testing
    /ux-audits-optimization
    /mobile-app-ux-design
    /usability-testing
    /ux-strategy-for-startups
    /ai-fullstack-app-development

  /(community)
    /speaking
    /uxpa-mn
    /minneapolis-ux-design

  /(resources)
    /process
    /faq
    /blog (future)

  /(playground)
    /wellness-app-concept
    /ai-design-toolkit
    /interactive-quiz

  /(admin)
    /dashboard
      /pages
      /projects
      /services
      /testimonials
      /faqs
      /process-phases
      /community
      /playground
      /quizzes
      /questions
      /options
      /design-system-audit
      /upload
      /revalidate-cache
      /supabase-debug
      /api-debug
      /blog (future)

  /api
    /admin
      /pages
      /projects
      /services
      /testimonials
      /faqs
      /process-phases
      /blog (future)
      /quizzes
      /questions
      /options

/components
  /common
  /ui
  /forms
  /page-sections

/lib
  /actions
  /supabase
  /utils
  /validators


  /docs
    /collections
      system-architecture-overview.md
      technical-setup-guide.md
      developer-handbook.md
      deployment-qa-pack.md
      brand-marketing-guide.md
    /client-handbook
      client-services-guide.md
    /content-workflows
      content-calendar.md
      cms-contribution-guide.md
    /security
      security-permissions-guide.md
    /testing
      qa-strategy.md
    /visual-diagrams
      cms-model.mmd
      architecture-overview.png
      user-flow.mmd
      erd.svg


  /docs
    /collections
      system-architecture-overview.md
      technical-setup-guide.md
      developer-handbook.md
      deployment-qa-pack.md
      brand-marketing-guide.md
    /client-handbook
      client-services-guide.md
    /content-workflows
      content-calendar.md
      cms-contribution-guide.md
    /security
      security-permissions-guide.md
    /testing
      qa-strategy.md
    /onboarding
      developer-checklist.md
      glossary.md
    /cms
      model-versioning-log.md
    /playground
      playground-tool-specs.md
    /design-system
      design-tokens-sheet.md
    /visual-diagrams
      architecture-overview.png
      cms-model.mmd
      user-flow.mmd
      erd.svg

/hooks

/scripts
/reports

/public
  /images

/types
  types.ts

/styles
  globals.css
  tailwind.config.ts

/layout.tsx
/middleware.ts
```

---

## 🔍 Benefits

### 📈 SEO
- Flat, keyword-rich slugs for UX Solutions (`/ux-audits-optimization`, etc.)
- Local SEO keywords integrated in Community paths
- Future-proof paths for content marketing (`/blog`, `/resources`, `/faq`)

### 🧠 UX
- Clear separation of concerns across user journeys: explore (solutions), connect (community), learn (resources), tinker (playground)
- Lightweight top nav; rich, structured footer nav
- CMS-controlled pages allow faster updates and scaling

### 🛠️ Dev & Admin
- Full CRUD control via `/admin/dashboard` and `/api/admin/`
- Modular `pages` table allows unified page management
- Supabase auth + RLS protected routes with optional service role access
- Organized components and API folder system for maintainability


---

## 2. 📊 Updated Database Schema

# 📊 Updated Database Schema — Coriyon’s Studio

This schema powers a fully modular, CMS-enabled UX design studio with a Supabase backend and Next.js 14 App Router. All content types are editable via the admin dashboard, and all user-generated content is secure and extendable.

---

## 🧱 CMS Tables (Admin-Editable)

### `pages`
| Column     | Type      | Notes                             |
|------------|-----------|-----------------------------------|
| id         | UUID      | Primary key                       |
| title      | TEXT      | Page title                        |
| slug       | TEXT      | URL slug                          |
| type       | TEXT      | main, solution, resource, etc.    |
| content    | JSONB     | Flexible page builder structure   |
| created_at | TIMESTAMP | Auto-generated                    |
| updated_at | TIMESTAMP | Auto-updated                      |
| user_id    | UUID      | Author/editor                     |

### `projects`
| Column     | Type      | Notes                             |
|------------|-----------|-----------------------------------|
| id         | UUID      | Primary key                       |
| title      | TEXT      | Project name                      |
| slug       | TEXT      | Used for dynamic route            |
| description| TEXT      | Short case summary                |
| content    | JSONB     | Long-form content or modules      |
| created_at | TIMESTAMP |                                   |
| updated_at | TIMESTAMP |                                   |

### `services`
| Column     | Type      | Notes                             |
|------------|-----------|-----------------------------------|
| id         | UUID      | Primary key                       |
| title      | TEXT      | Service name                      |
| slug       | TEXT      | SEO slug                          |
| description| TEXT      | Short description                 |
| content    | JSONB     | Long-form details or structure    |
| created_at | TIMESTAMP |                                   |
| updated_at | TIMESTAMP |                                   |

### `testimonials`
| Column     | Type      | Notes                             |
|------------|-----------|-----------------------------------|
| id         | UUID      | Primary key                       |
| author     | TEXT      | Person’s name                     |
| role       | TEXT      | Their role or title               |
| quote      | TEXT      | Testimonial content               |
| image_url  | TEXT      | Optional portrait or logo         |
| created_at | TIMESTAMP |                                   |
| updated_at | TIMESTAMP |                                   |

### `faqs`
| Column     | Type      | Notes                             |
|------------|-----------|-----------------------------------|
| id         | UUID      | Primary key                       |
| question   | TEXT      | The FAQ question                  |
| answer     | TEXT      | The corresponding answer          |
| created_at | TIMESTAMP |                                   |
| updated_at | TIMESTAMP |                                   |

### `process_phases`
| Column     | Type      | Notes                             |
|------------|-----------|-----------------------------------|
| id         | UUID      | Primary key                       |
| phase      | TEXT      | Phase title                       |
| description| TEXT      | What happens during this phase    |
| created_at | TIMESTAMP |                                   |
| updated_at | TIMESTAMP |                                   |

### `blog` (future)
| Column     | Type      | Notes                             |
|------------|-----------|-----------------------------------|
| id         | UUID      | Primary key                       |
| title      | TEXT      | Blog post title                   |
| slug       | TEXT      | Path-based slug                   |
| content    | JSONB     | Markdown or rich content          |
| author_id  | UUID      | Supabase user ID                  |
| created_at | TIMESTAMP |                                   |
| updated_at | TIMESTAMP |                                   |

---

## 💬 Feedback & Submissions

### `feedback`
| Column           | Type      | Notes                         |
|------------------|-----------|-------------------------------|
| id               | UUID      | Primary key                   |
| message          | TEXT      | Qualitative feedback          |
| source_url       | TEXT      | Where feedback was left       |
| user_agent       | TEXT      | Device/browser metadata       |
| clarity_score    | INT       | Scale 0–10                    |
| usefulness_score | INT       | Scale 0–10                    |
| overall_score    | INT       | Calculated or submitted       |
| user_id          | UUID      | Optional                      |
| created_at       | TIMESTAMP |                               |
| updated_at       | TIMESTAMP |                               |

### `contact_submissions`
| Column     | Type      | Notes                             |
|------------|-----------|-----------------------------------|
| id         | UUID      | Primary key                       |
| name       | TEXT      | Sender’s name                     |
| email      | TEXT      | Sender’s email                    |
| subject    | TEXT      | Optional subject                  |
| message    | TEXT      | Body of message                   |
| created_at | TIMESTAMP |                                   |

---

## 🧪 Interactive Quiz (Playground Tool)

### `quizzes`
| Column     | Type      | Notes                             |
|------------|-----------|-----------------------------------|
| id         | UUID      | Primary key                       |
| title      | TEXT      | Quiz name                         |
| slug       | TEXT      | Slug for linking                  |
| description| TEXT      | What the quiz is about            |
| user_id    | UUID      | Author/editor                     |
| created_at | TIMESTAMP |                                   |
| updated_at | TIMESTAMP |                                   |

### `questions`
| Column     | Type      | Notes                             |
|------------|-----------|-----------------------------------|
| id         | UUID      | Primary key                       |
| quiz_id    | UUID      | FK → quizzes.id                   |
| text       | TEXT      | The question itself               |
| order      | INT       | Display order                     |
| created_at | TIMESTAMP |                                   |
| updated_at | TIMESTAMP |                                   |

### `options`
| Column     | Type      | Notes                             |
|------------|-----------|-----------------------------------|
| id         | UUID      | Primary key                       |
| question_id| UUID      | FK → questions.id                 |
| text       | TEXT      | Label or content                  |
| is_correct | BOOLEAN   | True if correct answer            |
| created_at | TIMESTAMP |                                   |
| updated_at | TIMESTAMP |                                   |

---

## 📌 Notes on Metadata and Security

- All key tables include: `created_at`, `updated_at`, and `user_id` fields
- All sensitive routes are protected with Supabase Auth and Row-Level Security (RLS)

Let me know when you're ready to generate:
- 🧠 ERD visual of this structure
- 🧪 Playground schemas for DBT Diary Card or Health Tracker
- ⚙️ Admin API endpoints based on this schema


---

## 3. 📡 API Route Plan

# 📡 API Route Plan — Coriyon’s Studio

This plan outlines all RESTful API endpoints used to manage CMS content, playground tools, feedback, and developer utilities via the admin dashboard. Routes follow the Next.js App Router conventions under `/api/admin`.

---

## 🔐 Auth Middleware
All admin routes are protected via Supabase Auth middleware using service role or RLS rules depending on access level.

---

## ✅ RESTful Pattern
Each resource follows this format:

| Method | Path                        | Description             |
|--------|-----------------------------|-------------------------|
| GET    | `/api/admin/[resource]`     | List all items          |
| GET    | `/api/admin/[resource]/:id` | Get item by ID          |
| POST   | `/api/admin/[resource]`     | Create new item         |
| PATCH  | `/api/admin/[resource]/:id` | Update item             |
| DELETE | `/api/admin/[resource]/:id` | Delete item             |

---

## 🧱 CMS Entities

### Pages
- `/api/admin/pages`
- `/api/admin/pages/:id`

### Projects
- `/api/admin/projects`
- `/api/admin/projects/:id`

### Services
- `/api/admin/services`
- `/api/admin/services/:id`

### Testimonials
- `/api/admin/testimonials`
- `/api/admin/testimonials/:id`

### FAQs
- `/api/admin/faqs`
- `/api/admin/faqs/:id`

### Process Phases
- `/api/admin/process-phases`
- `/api/admin/process-phases/:id`

### Blog (Future)
- `/api/admin/blog`
- `/api/admin/blog/:id`

---

## 💬 Feedback & Contact

### Feedback (Read only or export)
- `GET /api/admin/feedback`
- `GET /api/admin/feedback/:id`
- `DELETE /api/admin/feedback/:id`

### Contact Submissions (Read only)
- `GET /api/admin/contact-submissions`
- `GET /api/admin/contact-submissions/:id`

---

## 🧪 Playground: Interactive Quiz

### Quizzes
- `/api/admin/quizzes`
- `/api/admin/quizzes/:id`

### Questions
- `/api/admin/questions`
- `/api/admin/questions/:id`

### Options
- `/api/admin/options`
- `/api/admin/options/:id`

---

## 🧠 Developer Tools

### Revalidate Cache
- `POST /api/admin/revalidate`
  - Body: `{ "type": "pages" | "projects" | "services" }`

### Supabase Debug
- `GET /api/admin/debug/supabase`
  - Return live table info, sample query results

### API Debug
- `GET /api/admin/debug/api`
  - Ping internal routes or test response payloads

---

## 🔐 Notes

- All routes use Supabase Auth with RLS policies enabled
- Protected by `authMiddleware` in `middleware.ts` for session enforcement
- Body validation handled by `zod` or shared schemas

Let me know if you’d like to:
- Scaffold handler templates
- Auto-generate TypeScript types from this
- Add v1/v2 versions to support versioning

---

## 🗂️ Updated /docs Directory Structure

/docs
  /collections
    system-architecture-overview.md
    technical-setup-guide.md
    developer-handbook.md
    deployment-qa-pack.md
    brand-marketing-guide.md

  /client-handbook
    client-services-guide.md

  /content-workflows
    content-calendar.md
    cms-contribution-guide.md

  /security
    security-permissions-guide.md

  /testing
    qa-strategy.md

  /visual-diagrams
    cms-model.mmd
    architecture-overview.png
    user-flow.mmd
    erd.svg
