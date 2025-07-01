# Project Directory Structure

```
.//
├── .DS_Store
├── .env.example
├── .env.local
├── .github/
│   ├── README.md
│   └── workflows/
│       ├── ci.yml
│       └── generate-roadmap.yml
├── .gitignore
├── README.md
├── ROADMAP.md -> reports/roadmap/roadmap-2025-05-06-225718.md
├── app/
│   ├── (auth-pages)/
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── sign-in/
│   │   │   └── page.tsx
│   │   ├── sign-up/
│   │   │   └── page.tsx
│   │   └── smtp-message.tsx
│   ├── (community)/
│   │   ├── minneapolis-ux-design/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   └── page.tsx
│   │   ├── speaking/
│   │   │   └── page.tsx
│   │   └── uxpa-mn/
│   │       └── page.tsx
│   ├── (main)/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── projects/
│   │   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── solutions/
│   │       ├── [slug]/
│   │       └── page.tsx
│   ├── (playground)/
│   │   ├── dbt-diary-card/
│   │   │   ├── components/
│   │   │   ├── entries/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── skills/
│   │   ├── health-progress-tracker/
│   │   │   ├── components/
│   │   │   └── page.tsx
│   │   └── interactive-quiz/
│   │       ├── components/
│   │       └── page.tsx
│   ├── (resources)/
│   │   ├── blog/
│   │   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   ├── faq/
│   │   │   └── page.tsx
│   │   ├── feedback/
│   │   │   └── page.tsx
│   │   └── process/
│   │       └── page.tsx
│   ├── actions.ts
│   ├── admin/
│   │   ├── component-audit/
│   │   │   ├── data/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── design-system/
│   │   │   └── page.tsx
│   │   ├── faqs/
│   │   │   ├── [id]/
│   │   │   ├── new/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── pages/
│   │   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   ├── [id]/
│   │   │   ├── new/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   ├── [id]/
│   │   │   ├── new/
│   │   │   └── page.tsx
│   │   └── testimonials/
│   │       ├── [id]/
│   │       ├── new/
│   │       └── page.tsx
│   ├── api/
│   │   └── run-audit/
│   │       └── route.ts
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── opengraph-image.png
│   ├── page.tsx.backup
│   ├── protected/
│   │   ├── page.tsx
│   │   └── reset-password/
│   │       └── page.tsx
│   ├── supabase-test/
│   │   ├── faq-client-component.tsx
│   │   ├── page.tsx
│   │   ├── sign-out-demo-client.tsx
│   │   └── toast-demo-client.tsx
│   └── twitter-image.png
├── components/
│   ├── .DS_Store
│   ├── admin/
│   │   ├── audit-dashboard.tsx
│   │   ├── code-duplication-list.tsx
│   │   ├── component-status-list.tsx
│   │   ├── faq-form.tsx
│   │   ├── faq-table.tsx
│   │   ├── health-score.tsx
│   │   ├── implementation-checklist.tsx
│   │   ├── page-content-form.tsx
│   │   ├── page-table.tsx
│   │   ├── project-form.tsx
│   │   ├── project-table.tsx
│   │   ├── service-form.tsx
│   │   ├── service-table.tsx
│   │   ├── testimonial-form.tsx
│   │   ├── testimonial-table.tsx
│   │   └── unused-components-list.tsx
│   ├── common/
│   │   ├── blog-card.tsx
│   │   ├── design-process.tsx
│   │   ├── faq-filter.tsx
│   │   ├── faq-item.tsx
│   │   ├── featured-image.tsx
│   │   ├── icon.tsx
│   │   ├── markdown-renderer.tsx
│   │   ├── project-card.tsx
│   │   ├── project-image.tsx
│   │   ├── service-card.tsx
│   │   └── testimonial-card.tsx
│   ├── community/
│   │   └── speaking-card.tsx
│   ├── deploy-button.tsx
│   ├── env-var-warning.tsx
│   ├── form-message.tsx
│   ├── forms/
│   │   ├── contact-form.tsx
│   │   └── feedback-form.tsx
│   ├── header-auth.tsx
│   ├── layout/
│   │   ├── content-section.tsx
│   │   ├── footer.tsx
│   │   ├── navigation.tsx
│   │   └── site-header.tsx
│   ├── next-logo.tsx
│   ├── page-sections/
│   │   ├── about-section.tsx
│   │   ├── blog-section.tsx
│   │   ├── cta-section.tsx
│   │   ├── faq-section.tsx
│   │   ├── hero-section.tsx
│   │   ├── process-section.tsx
│   │   ├── projects-section.tsx
│   │   ├── services-section.tsx
│   │   ├── solutions-section.tsx
│   │   ├── testimonials-section.tsx
│   │   └── why-ux-section.tsx
│   ├── submit-button.tsx
│   ├── supabase-logo.tsx
│   ├── theme-switcher.tsx
│   ├── tutorial/
│   │   ├── code-block.tsx
│   │   ├── connect-supabase-steps.tsx
│   │   ├── fetch-data-steps.tsx
│   │   ├── sign-up-user-steps.tsx
│   │   └── tutorial-step.tsx
│   ├── typography/
│   │   ├── Code.tsx
│   │   ├── H1.tsx
│   │   ├── H2.tsx
│   │   ├── H3.tsx
│   │   ├── H4.tsx
│   │   ├── InlineLink.tsx
│   │   ├── Lead.tsx
│   │   ├── List.tsx
│   │   ├── P.tsx
│   │   ├── blockquote.tsx
│   │   └── index.ts
│   └── ui/
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── date-picker.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── section.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── skeleton.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       └── toaster.tsx
├── components.json
├── config/
│   └── site.ts
├── database/
│   └── schemas/
│       ├── schema-2025-04-26-164511.sql
│       ├── schema-2025-04-26-164809.sql
│       ├── schema-2025-04-26-164911.sql
│       ├── schema-2025-05-06-221955.sql
│       ├── schema-2025-05-06-224242.sql
│       ├── schema-2025-05-06-224606.sql
│       └── schema-2025-05-06-230827.sql
├── docs/
│   ├── .DS_Store
│   ├── 01-setup/
│   │   ├── README.md
│   │   └── environment.md
│   ├── 02-architecture/
│   │   ├── README.md
│   │   ├── data-flow.md
│   │   └── tech-stack.md
│   ├── 03-design-system/
│   │   ├── README.md
│   │   ├── color-system.md
│   │   ├── spacing.md
│   │   └── typography.md
│   ├── 04-deployment/
│   │   ├── README.md
│   │   └── pre-deployment.md
│   ├── 05-development/
│   │   ├── README.md
│   │   ├── guidelines.md
│   │   └── testing.md
│   ├── 06-reference/
│   │   ├── README.md
│   │   └── known-issues.md
│   ├── 07-other/
│   │   ├── addressing-responsiveness-issues.md
│   │   ├── diary-entry-edit-form-debugging-summary-refactor-plan.md
│   │   ├── responsiveness-audit-process.md
│   │   └── server-actions.md
│   ├── 99-archive/
│   │   ├── .DS_Store
│   │   ├── database-schema.md
│   │   ├── design-system.md
│   │   ├── directory-structure.md
│   │   ├── project-requirements.md
│   │   └── site-configuration.md
│   └── README.md
├── fonts/
│   ├── .DS_Store
│   ├── Montserrat/
│   │   ├── .DS_Store
│   │   ├── Montserrat-Italic-VariableFont_wght.ttf
│   │   ├── Montserrat-VariableFont_wght.ttf
│   │   ├── OFL.txt
│   │   └── README.txt
│   └── Nunito-Sans/
│       ├── NunitoSans-Italic-VariableFont_YTLC,opsz,wdth,wght.ttf
│       ├── NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf
│       ├── OFL.txt
│       └── README.txt
├── hooks/
│   ├── use-debounce.ts
│   ├── use-media-query.ts
│   └── use-toast.ts
├── lib/
│   ├── actions/
│   │   ├── contact.ts
│   │   ├── dbt.ts
│   │   ├── faq.ts
│   │   ├── feedback.ts
│   │   ├── page.ts
│   │   ├── project.ts
│   │   ├── quiz.ts
│   │   ├── service.ts
│   │   └── testimonial.ts
│   ├── data/
│   │   ├── dbt.ts
│   │   └── quizzes.ts
│   ├── schemas/
│   │   ├── contact.ts
│   │   ├── dbt.ts
│   │   ├── faq.ts
│   │   ├── feedback.ts
│   │   ├── page.ts
│   │   ├── project.ts
│   │   ├── service.ts
│   │   └── testimonial.ts
│   └── utils.ts
├── middleware.ts
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.js
├── public/
│   └── admin/
│       └── component-audit/
│           └── data/
├── reports/
│   ├── app-routes/
│   │   ├── ROUTES-2025-05-02-072612.json
│   │   ├── ROUTES-2025-05-02-072612.md
│   │   └── ROUTES-2025-05-02-072612.mmd
│   ├── component-structure.json
│   ├── jscpd-report.json
│   ├── project-directory-tree.md
│   └── roadmap/
│       └── roadmap-2025-05-02-072612.md
├── scripts/
│   ├── README.md
│   ├── check-schema-drift.sh
│   ├── create-issues.py
│   ├── create-labels.sh*
│   ├── create-milestones.sh*
│   ├── generate-database-schema.sh
│   ├── generate-directory-structure.sh
│   ├── generate-roadmap.sh*
│   ├── generate-route-index.sh
│   └── generate-supabase-types.sh
├── supabase/
│   └── .temp/
│       ├── cli-latest
│       ├── gotrue-version
│       ├── pooler-url
│       ├── postgres-version
│       ├── project-ref
│       ├── rest-version
│       └── storage-version
├── tailwind.config.ts
├── tsconfig.json
├── types/
│   ├── about.ts
│   ├── blog.ts
│   ├── cta.ts
│   ├── dbt.ts
│   ├── faq.ts
│   ├── hero.ts
│   ├── process.ts
│   ├── project.ts
│   ├── quiz.ts
│   ├── services.ts
│   ├── supabase.ts
│   ├── testimonials.ts
│   └── why-ux.ts
└── utils/
    ├── supabase/
    │   ├── check-env-vars.ts
    │   ├── client.ts
    │   ├── middleware.ts
    │   └── server.ts
    └── utils.ts
```
