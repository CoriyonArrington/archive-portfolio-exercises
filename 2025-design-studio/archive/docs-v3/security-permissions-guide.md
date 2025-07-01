# 🔐 Security & Permissions Guide — Coriyon’s Studio

This guide outlines how data is secured, access is controlled, and sensitive operations are protected across the Coriyon’s Studio system. It includes authentication, database security, environment practices, and role-based controls.

---

## 🧾 Authentication System

### Provider
- **Supabase Auth** using email/password or magic link
- JWTs issued to client; decoded server-side to enforce permissions

### Roles
- `authenticated`: Default user after login
- `service_role`: Used for secure server-only operations
- `admin`: Studio-managed account with full access to CMS

---

## 🛡️ Database Security

### Row-Level Security (RLS)
- Enabled on **all user-facing tables**
- Policies defined in Supabase for:
  - `projects`, `services`, `pages`, `testimonials`, `faqs`, `process_phases`
  - `quizzes`, `questions`, `options`
  - `contact_submissions`, `feedback`

### Example RLS
```sql
-- Only allow reading public pages
SELECT * FROM pages WHERE published = true;

-- Only allow updates by admin
UPDATE ON projects WHERE auth.role() = 'admin';
```

---

## 🔐 API Route Protection

### Middleware
- `middleware.ts` validates Supabase session for all `/admin` and `/api/admin` routes

### Route-Level Checks
- Admin dashboard routes are wrapped in `requireAdmin()` server actions
- Revalidation + debug tools require token match (`REVALIDATION_SECRET`, `DEBUG_API_KEY`)

---

## 🧳 Environment & Secrets

### Secure Variables
- `SUPABASE_SERVICE_ROLE_KEY` used only in server actions
- `REVALIDATION_SECRET` and `PDF_API_SECRET` scoped to API-only usage
- `.env.local` never committed to repo

### Access Control
- Admin dashboard only rendered for verified admin session
- Upload/delete routes checked for Supabase token and role
- Preview environments disable destructive actions (optional flag)

---

## 📥 Form & Content Submission

- Contact & Feedback forms rate-limited via Supabase policies
- Honeypot or hidden timestamp fields optional for bot spam
- All entries stored securely in `contact_submissions` or `feedback` tables

---

## 🔄 Revalidation & Cache

- Revalidation endpoint (`/api/admin/revalidate`) requires token match
- CMS saves trigger optional Vercel Deploy Hook

---

Let me know if you'd like to generate a table of RLS policies or YAML-style permission schema.