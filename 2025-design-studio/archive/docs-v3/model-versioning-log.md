# 📘 CMS Model Versioning Log — Coriyon’s Studio

Track all schema and relationship changes over time to prevent regressions and help collaborators understand the evolution of the data model.

---

## 🧾 Version History

### v1.0 — Initial Schema
- Tables: `pages`, `projects`, `services`, `testimonials`, `faqs`, `process_phases`
- Basic relationships via slugs and type filtering
- Playground tables: `quizzes`, `questions`, `options`

---

### v1.1 — Content Scalability
- Added `blog` table for future posts
- Introduced `created_at`, `updated_at`, `user_id` to all tables
- Added `contact_submissions` and `feedback` tables

---

### v1.2 — CMS Dashboard Mapping
- Defined `/dashboard` routes for all content entities
- Updated type distinctions in `pages` (`main`, `solution`, `community`, `resource`)
- Linked process and FAQs more deeply with UX flow

---

## 🔍 Notes
- All changes reflected in ERD and `/docs/system-architecture-overview.md`
- Any new version should include migration script or Supabase SQL dump