# 📄 Project Requirements Document — Coriyon’s Studio

## 🧭 Project Overview

The 2025 Design Portfolio Website is a CMS-powered, SEO-optimized platform that serves as both a personal portfolio and a scalable business engine. It showcases UX/UI design work with a focus on health and wellness, education, and technology industries — while also providing interactive tools, documentation, and smooth admin workflows.

---

## ✅ Core Requirements

### 🔧 Functional Requirements

- **Portfolio Showcase**  
  - `/work`: Project index with case study previews  
  - `/work/[slug]`: Full case study pages  

- **UX Solutions Pages**  
  - `/services/[slug]`: Modular content on key offerings (e.g., UX Audits, Mobile UX, AI-powered apps)

- **About Section**  
  - Founder story, values, community impact (e.g., UXPA MN, speaking roles)

- **Contact System**  
  - Custom form → Supabase table → Admin view  
  - Optional automation via email/Slack  

- **Testimonials**  
  - Admin-controlled quotes, photos, roles for social proof  

- **Process Page**  
  - `/process`: Visual breakdown of the studio’s phased approach

- **Playground Tools**  
  - `/playground`: Interactive apps including:
    - Health Progress Tracker
    - Interactive Quiz
    - DBT Diary Card  
  - CMS control via `quizzes`, `questions`, `options`

- **Admin Dashboard**  
  - Full CRUD for:
    - Pages, Projects, Services, Testimonials
    - FAQs, Process Phases, Blog (future)
    - Quizzes, Questions, Options
  - Access via Supabase Auth + RLS

- **Developer Tools**  
  - `/dashboard/dev-tools` includes:
    - Revalidate Cache
    - Supabase Debug Viewer
    - API Route Debugger

- **Design System Audit Tool**  
  - UI to check tokens, spacing, and component status

- **PDF Generation**  
  - Server-side routes to export Resume or Case Studies

- **Responsive Design**  
  - Built with Tailwind CSS 4 and Next.js 14 App Router

---

### ⚙️ Non-Functional Requirements

- **Performance**  
  - Lazy loading, optimized image delivery, server components

- **Accessibility**  
  - WCAG AA compliant: Semantic HTML, ARIA, keyboard support

- **SEO Optimization**  
  - Custom slugs, OG tags, metadata fields, sitemap

- **Content Management**  
  - Modular CMS backed by Supabase with dynamic routing

- **Developer Experience**  
  - ESLint, Prettier, scripts, RSC-first architecture

- **Security**  
  - Supabase RLS, auth middleware, token-protected routes

- **Analytics (Future)**  
  - Integration with PostHog, Plausible, or Vercel Analytics

---

## 👥 User Personas

| Persona | Description |
|---------|-------------|
| **Potential Clients** | Founders, operators, or orgs looking for strategic UX design |
| **Hiring Managers** | Vetting experience for contract or freelance work |
| **Fellow Designers** | Reviewing portfolio or exploring the playground |
| **You (Site Owner)** | Managing brand, publishing updates, debugging |
| **Workshop Attendees / Community** | Exploring UX resources, talks, or speaking events |

---

## 🧩 Platform Features by Role

| Role | Capabilities |
|------|--------------|
| Client | Explore work, submit inquiry |
| Admin | Manage CMS, run developer tools |
| Collaborator | Contribute via CMS, content workflows |
| Dev | Clone repo, run local environment, extend tools |
| User | Interact with tools, read articles, learn from process |

---

## 🎯 Success Criteria

- Increased leads via `/contact`
- Portfolio viewed and shared consistently
- Admin workflows are fast and reliable
- Tools like the Quiz or Tracker see meaningful use
- Studio receives positive design/system feedback
- Future devs can onboard in < 1 hour