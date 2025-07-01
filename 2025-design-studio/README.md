# Coriyon’s Studio&#x20;

A CMS‑driven UX design portfolio and interactive tool hub built with Next.js 14 (App Router), Tailwind CSS, and Supabase.

---

This project was bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🛠 Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
# or yarn
# or pnpm install && pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app will auto‑reload as you edit files.

You can start editing by modifying `app/page.tsx` or any of the route files under `app/`. Pages are server‑rendered by default; if you need browser APIs or interactivity, annotate components with `"use client"`.

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
REVALIDATION_SECRET=your-revalidation-secret
PDF_API_SECRET=your-pdf-secret
DEBUG_API_KEY=your-debug-api-key
```

- Only `NEXT_PUBLIC_*` vars are exposed client‑side.
- `SUPABASE_SERVICE_ROLE_KEY`, `PDF_API_SECRET`, and `DEBUG_API_KEY` are server‑only.

---

## 🚀 Features & Roadmap

### 🚀 Phase 1: MVP Launch

- Dynamic Home, Work, Services, About, Contact pages
- CMS schema and CRUD API stubs under `/api/admin`
- Contact form capturing to `contact_submissions`
- Responsive, SEO‑friendly, dynamic metadata (titles, descriptions, OG tags)
- **In progress**: Admin Dashboard UI for full CRUD

### 🧪 Phase 2: Playground Tools

- `/playground` hub (UI pending)
- Interactive Quiz, Health Tracker, DBT Diary Card

### 📡 Phase 3: Dev Experience

- On‑demand ISR: `/api/admin/revalidate`
- Debug stubs: `/api/admin/debug/supabase` & `/api/admin/debug/api`
- RLS & Auth policies
- **Pending**: PDF export routes

### 📚 Phase 4: Content Hub

- **Pending**: Blog routes, advanced FAQ & Process layouts, analytics

### 🛠️ Phase 5: Design System Tools

- **Pending**: Design System Audit Tool, inventory, accessibility checks

---

## 📦 Scripts

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run start` — Serve production build locally
- `npm run lint` — Run ESLint
- `npm run test` — Run Vitest unit + integration tests
- `npm run generate-types` — Sync Supabase types
- `npm run generate-schema` — Export DB schema

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) — learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) — interactive Next.js tutorial.
- [Next.js GitHub](https://github.com/vercel/next.js) — feedback & contributions welcome!

---

## 📣 Deployment

The easiest way to deploy is via [Vercel](https://vercel.com/new?filter=next.js).\
See [Next.js Deploy Docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.

Ensure your environment variables are set in the Vercel dashboard before deploying.

---

## 📖 Documentation

In‑repo docs under `/docs` and related folders:

- System Architecture Overview
- Technical Setup Guide
- Developer Handbook
- Deployment & QA Pack
- Brand & Marketing Guide
- Client & CMS Guides
- Content Calendar & Workflows
- Security & Permissions Guide
- Testing & QA Strategy
- Glossary

---

*Happy hacking! Let me know what to build next.*

