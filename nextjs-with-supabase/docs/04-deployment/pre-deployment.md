# 🚀 Pre-Deployment Checklist

This checklist helps ensure the application is tested, optimized, and configured correctly before deploying to production (e.g., via Vercel).

---

## ✅ Content & Functionality

- [ ] **Core Pages:** Verify all main pages (`/`, `/about`, `/contact`, `/projects`, `/services`, etc.) load correctly without errors.
- [ ] **CMS Content (If applicable):**
    - [ ] Content in `/app/admin/` CRUD interfaces is displaying correctly.
    - [ ] Public pages are reflecting the latest CMS content.
    - [ ] Test content creation, update, and deletion flows via the admin UI.
- [ ] **Forms:**
    - [ ] Contact form submits correctly (check `../05-reference/known-issues.md` regarding RLS workaround if applicable).
    - [ ] Feedback form (if used) submits correctly.
    - [ ] Authentication forms (Sign In, Sign Up, Forgot/Reset Password) work as expected.
- [ ] **Authentication & Authorization:**
    - [ ] Users can sign up, sign in, and sign out.
    - [ ] Password reset flow functions correctly (including email sending/receiving).
    - [ ] Protected routes (`/app/protected/`, `/app/admin/`) correctly redirect unauthenticated users.
    - [ ] [TODO: Add checks for role-based access if implemented (e.g., only admins can access `/app/admin/`)].
- [ ] **[TODO: Add checks for other specific features, e.g., interactive tools, search functionality]**

---

## 🔐 Security

- [ ] Review Supabase Row Level Security (RLS) policies for key tables.
- [ ] Ensure sensitive keys (`SUPABASE_SERVICE_ROLE_KEY`) are *not* exposed client-side.
- [ ] Check middleware (`middleware.ts`) for correct route protection logic.
- [ ] [TODO: Review any rate limiting implemented on forms or APIs].

---

## 🌍 SEO & Metadata

- [ ] Verify page titles and meta descriptions are appropriate for key pages.
- [ ] Check Open Graph (`og:`) and Twitter card tags using browser dev tools or online validators.
- [ ] Ensure `robots.txt` and `sitemap.xml` (if generated) are correct.
- [ ] Check for console errors related to metadata generation.

---

## 💻 Performance & UX

- [ ] Test core user flows on desktop and mobile viewports.
- [ ] Check image optimization (Next.js `<Image>` usage, appropriate formats/sizes).
- [ ] Verify lazy loading is applied where appropriate.
- [ ] Run Lighthouse checks or use Vercel Analytics/Speed Insights to assess Core Web Vitals.
- [ ] Check for console errors or warnings during interaction.
- [ ] Test basic accessibility (keyboard navigation, focus indicators, color contrast on interactive elements).

---

## ⚙️ Final Engineering & Build Checks

- [ ] Run `npm run lint` and fix any errors/warnings.
- [ ] Run `npm run build` locally to ensure the production build completes without errors.
- [ ] Check TypeScript (`tsc --noEmit`) for any type errors.
- [ ] Ensure all necessary environment variables are set in the Vercel project settings (or relevant deployment environment).
- [ ] Review `../05-reference/known-issues.md` for any outstanding critical issues.
- [ ] Merge latest changes from the main branch (e.g., `main` or `master`) into the deployment branch.
- [ ] [TODO: Consider adding checks for database migrations if using Supabase CLI migrations].

---

*Customize this checklist further based on your project's specific features and requirements.*