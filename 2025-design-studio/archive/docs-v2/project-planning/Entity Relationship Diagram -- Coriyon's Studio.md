# 🔗 Entity Relationship Diagram (ERD) — Coriyon’s Studio

This ERD illustrates how all tables in the Coriyon’s Studio system relate to one another. It includes core CMS content types, playground tools, user-submitted feedback, and future blog support. The relationships are designed for scalability with Supabase as the backend and enforced via foreign keys where applicable.

---

## 🧱 Core CMS Entities

- `pages`: Modular content structure
- `projects`, `services`, `testimonials`: Content blocks linked visually or editorially
- `faqs`, `process_phases`, `blog`: Structured repeatable sections

## 🧪 Playground Tools

- `quizzes` → `questions` → `options`: One-to-many relationships
- Future: `dbt_diary_entries`, `health_progress_logs`

## 💬 Submissions & Feedback

- `feedback`: User-submitted feedback with scores
- `contact_submissions`: Contact form entries

## 🔐 Metadata & Security

- `user_id`, `created_at`, `updated_at` on all major content
- Supabase RLS rules in place for protected access
- Foreign key relationships (e.g., `questions.quiz_id` → `quizzes.id`)

---

## 📈 Visual ERD Diagram

See the diagram below (or linked PNG) for a full overview of how tables are connected.

