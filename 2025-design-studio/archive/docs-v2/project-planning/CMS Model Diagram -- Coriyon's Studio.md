# 🧱 CMS Model Diagram — Coriyon’s Studio

This document outlines how content types relate within the CMS. These models power the admin dashboard and public-facing pages, managed through a modular `pages` table and related content entities.

---

## 🌐 Primary Content Model: `pages`

The `pages` table is the root of the CMS content system and links with specialized collections via type or slug-based dynamic routing.

### Fields
- `id` (UUID)
- `title` (TEXT)
- `slug` (TEXT)
- `type` (TEXT — "main", "solution", "community", "resource", etc.)
- `content` (JSONB)
- `user_id`, `created_at`, `updated_at`

---

## 🔁 Related Collections by Type

### ➤ Main Pages
Examples: Home, About, Services, Contact  
- Standalone, stored in `pages`

### ➤ UX Solutions
Examples: Mobile App UX, UX Audits  
- Type = "solution"  
- Fully CMS-controlled under `/services/:slug`

### ➤ Community
Examples: Speaking, UXPA MN  
- Type = "community"  
- Used for credibility & social proof content

### ➤ Resources
Examples: FAQ, Process, Blog  
- Type = "resource"  
- Stored in `pages`, with dynamic subcontent stored in:
  - `faqs`
  - `process_phases`
  - `blog` (future)

---

## 📦 CMS-Controlled Collections

These tables support repeatable, structured content:

| Table           | Description                              |
|------------------|------------------------------------------|
| `projects`       | Portfolio case studies                   |
| `services`       | UX services offered                      |
| `testimonials`   | Social proof (quote, name, role)         |
| `faqs`           | Answers to common client questions       |
| `process_phases` | Steps in the UX design process           |
| `blog` (future)  | Thought leadership & marketing           |

---

## 🧠 Admin Dashboard Mapping

Each collection maps directly to a dashboard route:

| Route                     | Table/Entity         |
|---------------------------|----------------------|
| `/dashboard/pages`        | `pages`              |
| `/dashboard/projects`     | `projects`           |
| `/dashboard/services`     | `services`           |
| `/dashboard/testimonials` | `testimonials`       |
| `/dashboard/faqs`         | `faqs`               |
| `/dashboard/process-phases` | `process_phases`   |
| `/dashboard/blog` (future)  | `blog`             |

---

## 💡 Notes

- All content types support metadata: `user_id`, `created_at`, `updated_at`
- Most dynamic routes pull from `pages` or match via `slug`
- Extensible with playground tools and internal references if needed

Let me know if you want a visual version of this using Mermaid.js or diagram image format!
