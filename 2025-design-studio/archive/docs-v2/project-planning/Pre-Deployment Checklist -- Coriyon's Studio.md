# 🚀 Pre-Deployment Checklist — Coriyon’s Studio

This checklist ensures that the application is fully tested, optimized, and secured before going live. It covers all functional areas of the system from CMS to playground tools, backend, API, and SEO.

---

## ✅ Content & CMS

- [ ] All pages populated via `/dashboard/pages`
- [ ] All project case studies reviewed and proofread
- [ ] All services updated and matched to offerings
- [ ] Testimonials have correct author names and quotes
- [ ] Process phases accurately reflect your methodology
- [ ] FAQs answered and categorized clearly
- [ ] Blog (if launched) seeded with at least one post

---

## 🎮 Playground Tools

- [ ] Interactive Quiz fully functional with questions + options
- [ ] Health Progress Tracker data entry works
- [ ] DBT Diary Card renders and submits entries correctly
- [ ] Playground section has helpful tooltips and guidance

---

## 🔐 Admin & API

- [ ] Supabase Auth + RLS tested for all secure tables
- [ ] CRUD functionality tested on all admin tables
- [ ] Dev tools (debug, revalidate, upload) behave as expected
- [ ] PDFs generate and download correctly (case studies + resume)
- [ ] All API endpoints return expected responses (200, 400, 500)

---

## 🌍 SEO & Metadata

- [ ] Page titles and descriptions reviewed
- [ ] Canonical URLs and Open Graph tags applied
- [ ] Sitemap and robots.txt are generated
- [ ] Slugs are consistent, clean, and descriptive
- [ ] No duplicate content or conflicting metadata

---

## 💻 Performance & UX

- [ ] Mobile layout reviewed on at least 3 screen sizes
- [ ] Accessibility tested (contrast, keyboard nav, ARIA labels)
- [ ] Lazy loading implemented for images and long pages
- [ ] Core Web Vitals tested (LCP, FID, CLS)
- [ ] Scroll behavior, links, and hover states work intuitively

---

## ⚙️ Final Engineering

- [ ] TypeScript clean (no implicit any / red squiggles)
- [ ] ESLint + Prettier pass in all files
- [ ] Vercel project linked and production domain set
- [ ] All ENV variables loaded in `.env.production`
- [ ] Supabase table policies reviewed + backups exported

---

Let me know if you'd like this turned into a PDF, Notion card deck, or printable release poster.
