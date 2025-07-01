# 👩‍💻 Developer Onboarding Checklist — Coriyon’s Studio

This checklist helps new developers set up and contribute to the Coriyon’s Studio project quickly and confidently.

---

## ✅ Environment Setup

- [ ] Clone the GitHub repo and install dependencies
- [ ] Copy `.env.example` → `.env.local` and configure variables
- [ ] Test local Supabase connection or staging instance
- [ ] Run `npm run dev` and access at `http://localhost:3000`

---

## 🧠 Knowledge & Tools

- [ ] Review `/docs/system-architecture-overview.md`
- [ ] Understand CMS models (`pages`, `projects`, etc.)
- [ ] Familiarize with API routes under `/api/admin`
- [ ] Review design system (`/components/ui/`, `tailwind.config.ts`)

---

## ⚙️ Dev Workflow

- [ ] Use feature branches and submit PRs to `main` or `dev`
- [ ] Run `eslint` and `prettier` before committing
- [ ] Add tests where possible (unit, E2E planned)
- [ ] Use `scripts/` for common tasks (migrations, revalidate, debug)

---

## 🔐 Auth & Permissions

- [ ] Access provided via Supabase Auth
- [ ] Admin dashboard protected by role-based access
- [ ] Use tokens for secure revalidation or debug actions

---

## 📬 Who to Contact

- **Coriyon** (Founder): Project vision, UX strategy
- **Slack/Email**: For invites or staging access