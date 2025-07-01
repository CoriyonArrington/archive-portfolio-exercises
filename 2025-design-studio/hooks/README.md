# hooks

Welcome to the **hooks** folder! This directory contains custom React hooks used throughout the application to manage state, effects, data fetching, and responsive behavior.

## 📚 Table of Contents
No subdirectories available.

## 📖 Purpose of This Folder

Contains reusable React hooks that encapsulate commonly used logic, improving consistency, maintainability, and reducing repetition across components.

## 📜 Hooks Overview

| Hook                        | Description                                                          |
|-----------------------------|----------------------------------------------------------------------|
| `use-auth-user.ts`          | Manages user authentication state with Supabase Auth.                |
| `use-click-outside.ts`      | Detects and handles clicks outside components (menus, modals).       |
| `use-debounce.ts`           | Debounces rapidly changing values to optimize performance.           |
| `use-dialog.ts`             | Manages global modal/dialog visibility states.                       |
| `use-media-query.ts`        | General-purpose hook to evaluate custom media queries.               |
| `use-mobile-viewport.ts`    | Boolean hook to detect if viewport matches the mobile breakpoint.    |
| `use-supabase-data.ts`      | Fetches and manages data from Supabase with consistent states.       |
| `use-toast.ts`              | Manages consistent notification/toast messages across the app.       |

## 🤝 How to Contribute

- Follow established naming conventions (`use-example-hook.ts`).
- Ensure each hook includes TypeScript typings and JSDoc comments.
- Keep hooks focused on a single purpose for maximum reusability.
- Update this README whenever new hooks are added or existing ones modified.
- For questions or suggestions, contact a project administrator.

Happy coding!

---

## ✅ Hook Files (Implemented)

The following hook files have been implemented:

- `hooks/use-auth-user.ts`
- `hooks/use-click-outside.ts`
- `hooks/use-debounce.ts`
- `hooks/use-dialog.ts`
- `hooks/use-media-query.ts`
- `hooks/use-mobile-viewport.ts`
- `hooks/use-supabase-data.ts`
- `hooks/use-toast.ts`

## 🔁 Files to Update to Use These Hooks

| File Path                                        | Update Needed                                         |
|--------------------------------------------------|-------------------------------------------------------|
| `components/layout/header.tsx`                  | Replace viewport detection with `use-mobile-viewport` |
| `components/layout/footer.tsx`                  | Add `use-media-query` if using conditional layouts    |
| `components/common/toast-provider.tsx`          | Refactor to use `use-toast` hook                     |
| `components/forms/contact-form.tsx`             | Use `use-supabase-data` for dropdowns or status      |
| `components/forms/feedback-form.tsx`            | Use `use-toast`, `use-supabase-data`, `use-dialog`   |
| `components/page-sections/why-ux-section.tsx`   | Conditional rendering using `use-mobile-viewport`     |
| `app/(main)/page.tsx`                           | Use `use-supabase-data` for SSR + client fetching     |
| `app/playground/page.tsx`                       | Refactor data pull with `use-supabase-data`           |
| `components/ui/modal.tsx`                       | Integrate with `use-dialog`                           |
| `components/forms/search-bar.tsx`               | Implement `use-debounce` on search input              |

Let me know if you’d like these updated files scaffolded or refactored automatically.

