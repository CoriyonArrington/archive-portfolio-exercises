# 🔐 Environment Variables — Coriyon’s Studio

Environment variables provide a secure and configurable way to manage sensitive credentials, service URLs, and runtime secrets for your app.

---

## ✅ Required Variables

### Supabase
- `NEXT_PUBLIC_SUPABASE_URL` – Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` – Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` – Full access key (used only server-side)

### Deployment
- `VERCEL_URL` – Set automatically by Vercel
- `VERCEL_DEPLOY_HOOK_URL` – Optional: trigger deployments from CMS actions

### Application
- `NEXT_PUBLIC_SITE_URL` – Public-facing site URL (used for canonical, OG, etc.)
- `REVALIDATION_SECRET` – Secure token for `/api/admin/revalidate`

### PDF + Debug Tools
- `PDF_API_SECRET` – Internal use for PDF generation routes
- `DEBUG_API_KEY` – Optional: protect API debug routes

---

## 🧪 Development Setup

Create a `.env.local` file in the root of your project with these variables defined:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=public-anon-key
SUPABASE_SERVICE_ROLE_KEY=super-secret-role-key
NEXT_PUBLIC_SITE_URL=https://localhost:3000
REVALIDATION_SECRET=my-secret-token
PDF_API_SECRET=another-secret
DEBUG_API_KEY=dev-only-key
```

---

## 🔍 Environment Variable Validation

The application uses `lib/env-validation.ts` to validate critical environment variables at build time. Missing or undefined keys will throw a hard error during development or deployment.

---

## ⚙️ Usage in Components

- **Server Components**: Use `process.env.VARIABLE_NAME`
- **Client Components**: Only access `NEXT_PUBLIC_*` variables via `process.env.NEXT_PUBLIC_VARIABLE_NAME`

---

## 🔒 Security Considerations

- Never expose private keys in public code or frontend bundles
- Use `SUPABASE_SERVICE_ROLE_KEY` only in secure contexts (server-only)
- Use `REVALIDATION_SECRET` and `PDF_API_SECRET` in server routes only
- Rotate secrets on a regular basis
- Avoid hardcoding any values; rely on environment files instead

Let me know if you'd like an `.env.example` scaffold or secrets management workflow.
