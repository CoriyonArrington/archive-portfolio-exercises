# 🧪 Testing & QA Strategy — Coriyon’s Studio

This document outlines the quality assurance strategy for Coriyon’s Studio across content, UX, accessibility, and functionality. It includes manual testing workflows and future automation plans.

---

## 🛠 Current QA Scope

### ✅ Manual QA (Every Deployment)
- **Pages & Routing**
  - Test navigation and route changes
  - Confirm all dynamic slugs render correctly
- **Forms**
  - Test submission of contact form, feedback form, and quiz entries
  - Validate field-level error handling and success states
- **Playground Tools**
  - Interactive Quiz: CRUD via admin + frontend quiz-taking experience
  - DBT Diary Card: Entry submission and listing
  - Health Tracker: Data input and chart rendering

---

## 🧩 UX + UI QA

### What to Test
- Mobile responsiveness (sm, md, lg, xl breakpoints)
- Component spacing, alignment, and layout integrity
- Font and color usage match design tokens
- Clear visual feedback (hover, focus, selected)
- Toasts, alerts, and modals trigger and dismiss properly

---

## ♿ Accessibility QA

- Keyboard navigation through all interactive elements
- Alt text for all images and icons
- Semantic HTML tags for structure (`<main>`, `<nav>`, `<section>`)
- ARIA attributes for forms, modals, dialogs
- Color contrast: Minimum 4.5:1 ratio for text

---

## 📈 SEO QA

- Page titles and meta descriptions exist and are accurate
- Canonical URLs match config
- OG image renders on Twitter / LinkedIn preview tools
- No duplicate or missing H1 tags

---

## 🧪 Functional QA

- Test API endpoints directly using Insomnia or Postman
- Test Supabase debug and revalidation routes
- Check image upload/delete actions from dashboard
- Confirm content updates reflect on the frontend after saving in CMS

---

## 🚧 Planned Automation

### Tools to Integrate
- **Jest** or **Vitest** — Unit and logic testing
- **Playwright** — E2E UI testing and Lighthouse snapshots
- **axe-core** — Accessibility checks in dev/test builds
- **Vercel Preview Comments** — Automated preview review via GitHub PRs

---

Let me know if you’d like help scaffolding a test framework or setting up CI for preview testing.