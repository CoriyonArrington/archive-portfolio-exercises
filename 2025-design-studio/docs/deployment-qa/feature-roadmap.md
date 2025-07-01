# Coriyon’s Studio

**A CMS‑driven UX design portfolio built with Next.js 14, Tailwind CSS, and Supabase.**

---

## 🗺️ Feature Roadmap — Current Status

### 🚀 Phase 1: MVP Launch
**Goal**: Showcase core portfolio, services, and design approach

- ✅ **Home, Work, Services, About, Contact pages** (all dynamic via CMS)
- ✅ **CMS schema**: `pages`, `projects`, `services`, `testimonials`, `faqs`, `process_phases`, plus `contact_submissions`
- ✅ **Contact form** writing to `contact_submissions` with success/failure states
- ✅ **Responsive design & SEO**: Tailwind mobile‑first layouts; dynamic metadata (titles, descriptions, slugs, OG)
- ✅ **API routes (placeholders)**:
  - `/api/admin/revalidate` – on‑demand ISR
  - `/api/admin/debug/supabase` – Supabase debug stub
  - `/api/admin/debug/api` – API debug stub
- 🔨 **In progress**: Admin Dashboard UI for full CRUD on all content types

---

### 🧪 Phase 2: Playground Tools
**Goal**: Add interactive tools for user engagement

- 🔲 `/playground` hub page (folder exists; UI pending)
- 🔲 **Interactive Quiz** (CMS tables: `quizzes`, `questions`, `options`)
- 🔲 **Health Progress Tracker**
- 🔲 **DBT Diary Card**

---

### 📡 Phase 3: Platform Tools & Developer Experience
**Goal**: Enable robust admin and dev workflows

- ✅ **Revalidate Cache Tool** (`/api/admin/revalidate`)
- ✅ **Supabase Debug Tool** (`/api/admin/debug/supabase`)
- ✅ **API Debug Tool** (`/api/admin/debug/api`)
- ✅ **Role‑based Auth & RLS policies** (configured in Supabase + middleware)
- 🔲 **PDF generation** for case studies & resume (`/api/generate-pdf`)

---

### 📚 Phase 4: Resource Hub & Content Strategy
**Goal**: Scale reach with educational content

- 🔲 **Blog route** (`/blog` listing + post pages)
- 🔲 **Expand FAQ & Process pages** with advanced layouts and visuals
- ✅ **Metadata fields, slugs, OG tags** (via `config/site.ts`)
- 🔲 **Analytics integration** (e.g., Plausible, Vercel)

---

### 🛠️ Phase 5: Design System & Consistency Auditing
**Goal**: Improve component consistency, accessibility, and tooling

- 🔲 **Design System Audit Tool** in Admin
- 🔲 **Component inventory & tracking**
- 🔲 **Accessibility review tooling**
- 🔲 **UX heuristics scoring**

---

## ▶️ Next Steps
1. **Phase 1**: Build Admin Dashboard UI for CRUD.
2. **Phase 2**: Scaffold `/playground` and implement Quiz tool.
3. **Phase 3**: Add PDF export routes.
4. **Phase 4**: Create Blog pages and wire up analytics.
5. **Phase 5**: Define requirements and begin Design System Audit feature.

---

## 🛠 Getting Started

### Prerequisites
- Node.js ≥18
- npm
- Supabase project with Auth & database

### Installation
```bash
git clone git@github.com:coriyonarrington/2025-design-studio.git
cd 2025-design-studio
npm install
```

Copy `.env.example` → `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
REVALIDATION_SECRET=secret
PDF_API_SECRET=secret
DEBUG_API_KEY=secret
```

### Running Locally
```bash
npm run dev
# http://localhost:3000
```

### Useful Scripts
- `npm run build` – production build
- `npm run start` – serve production locally
- `npm run lint` – ESLint
- `npm run test` – Vitest unit & integration
- `npm run generate-types` – Supabase type sync


## 🚀 Deployment
- Hosted on Vercel with GitHub integration
- Set production env vars in Vercel Dashboard
- Use `/api/admin/revalidate` for on‑demand ISR


## 📚 Documentation
See `/docs` and subfolders for detailed guides:
- **System Architecture Overview**
- **Technical Setup Guide**
- **Developer Handbook**
- **Deployment & QA Pack**
- **Brand & Marketing Guide**
- **Client Services Guide**
- **CMS Contribution Guide**
- **Content Calendar**
- **Security & Permissions Guide**
- **Testing & QA Strategy**
- **Glossary**

*Let me know if any further adjustments are needed!*

