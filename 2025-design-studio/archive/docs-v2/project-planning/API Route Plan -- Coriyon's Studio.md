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
