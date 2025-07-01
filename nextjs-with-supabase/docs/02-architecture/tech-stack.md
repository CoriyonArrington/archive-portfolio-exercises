# 🧰 Tech Stack

This document outlines the core technologies and tools used in this Next.js Supabase starter project.

---

## 🖼️ Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Components**:
    - Shadcn/UI (built on Radix UI + Tailwind CSS)
    - Lucide React (Icon set, commonly used with Shadcn/UI)
- **Styling**: Tailwind CSS
- **State Management**: Primarily React Server Components state + Client Component state (`useState`, `useReducer`). [Context or Zustand can be added if needed]
- **Data Fetching**: Server Components (direct Supabase calls), Client Components (`fetch`, SWR, or React Query if added), Server Actions (`/lib/actions/`)
- **Metadata**: Next.js Metadata API (`metadata` export, `generateMetadata` function) using `/config/site.ts` for defaults. *(Added this line)*
- **Forms**: [TODO: Specify form library if used, e.g., React Hook Form, or using Server Actions directly with Shadcn form components]
- **Image Optimization**: Next.js `Image` component
- **Animations**: [TODO: Specify animation library if used, e.g., Framer Motion, or Tailwind CSS utilities]

---

## 🔧 Backend & Database

- **Platform**: Supabase
    - **Database**: PostgreSQL
    - **Authentication**: Supabase Auth (Cookie-based via `supabase-ssr`)
    - **Storage**: Supabase Storage (for file uploads if used)
    - **Edge Functions**: [TODO: Specify if used]
- **API**: Primarily Server Actions. Next.js API Routes can be used if needed (e.g., for webhooks).
- **Deployment**: Vercel

---

## 🛠️ Development Tools

- **Package Manager**: npm (or Yarn/pnpm as preferred)
- **Version Control**: Git (GitHub recommended)
- **Linting**: ESLint
- **Formatting**: Prettier (typically configured with ESLint)
- **Testing**: Vitest (as indicated by `npm run test`)
- **CLI Scripts**: See `scripts/README.md` for details on helpers like type generation, schema dumps, etc.
- **Admin Interface**: Custom-built admin section under `/app/admin/` using Server Components/Actions.

---

## 🌐 External Services (If applicable)

- **Analytics**: Vercel Analytics
- **Monitoring**: [TODO: Specify if using Sentry, Logtail, etc.]
- **Email**: [TODO: Specify if using Supabase default, SendGrid, Resend, etc.]

---

*Note: Keep this document updated as dependencies or services change.*