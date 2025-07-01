# Coriyon’s Studio 

A CMS‑driven UX design portfolio and interactive tool hub built with Next.js 14 (App Router), Tailwind CSS, and Supabase.

---

## 🛠 Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
# or yarn install && yarn dev
# or pnpm install && pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and begin editing `app/page.tsx` or any file under `app/`. Pages default to server-rendered; use `"use client"` for client-only components.

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
REVALIDATION_SECRET=your-revalidation-secret
DEBUG_API_KEY=your-debug-api-key
```

- Only `NEXT_PUBLIC_*` variables are available client-side.
- All others are server-only.

---

## 🚀 Features

- Works across the entire [Next.js](https://nextjs.org) stack: App Router, Pages Router, Middleware, Server Components, Client Components
- Cookie-based Supabase Auth with `supabase-ssr`
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Accessible components via [shadcn/ui](https://ui.shadcn.com/)
- Vercel Analytics for performance and usage insights

---

## 📦 Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Serve production build locally
- `npm run lint` — Run ESLint
- `npm run test` — Run Vitest unit & integration tests
- `npm run generate-types` — Sync Supabase types
- `npm run generate-schema` — Export database schema

---

## 📣 Deployment

The easiest way to deploy is via Vercel. \


This integration auto-sets up a Supabase project and environment variables.

---

## 📖 Documentation

In-repo docs are available under `/docs` and support folders:

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

The easiest way to deploy is via[ ](https://vercel.com/new?filter=next.js)[Vercel](https://vercel.com/new?filter=next.js).\
See[ ](https://nextjs.org/docs/app/building-your-application/deploying)[Next.js Deploy Docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.\
Ensure your environment variables are set in the Vercel dashboard before deploying.

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)

