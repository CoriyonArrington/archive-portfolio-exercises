# Pre-Deployment Checklist

## TypeScript Issues

- [ ] Replace `any` types with more specific types in:
  - [ ] app/admin/supabase-debug/page.tsx
  - [ ] app/debug/page.tsx
  - [ ] app/supabase-test/page.tsx
  - [ ] lib/projects.ts
  - [ ] lib/supabase.ts
  - [ ] lib/utils/dynamic-import.ts
  - [ ] lib/utils/fetch-helpers.ts
  - [ ] lib/utils/process-array-data.ts
  - [ ] lib/utils/supabase-helpers.ts

## React Hooks Issues

- [ ] Fix missing dependencies in useEffect:
  - [ ] components/about/about-nav.tsx
  - [ ] components/admin/image-gallery.tsx
  - [ ] components/work/case-study-nav.tsx

- [ ] Fix ref cleanup in useEffect:
  - [ ] components/shared/lazy-image.tsx
  - [ ] components/timeline/timeline-item.tsx
  - [ ] components/timeline.tsx

## Accessibility Issues

- [ ] Fix invalid href attributes:
  - [ ] app/work/[slug]/page.tsx
  - [ ] components/work/project-detail-content.tsx

- [ ] Add keyboard listeners to click handlers:
  - [ ] components/admin/image-gallery.tsx

- [ ] Fix headings without content:
  - [ ] components/ui/alert.tsx

- [ ] Fix anchors without content:
  - [ ] components/ui/pagination.tsx

## Unused Variables

- [ ] Remove unused variables:
  - [ ] components/ui/calendar.tsx
  - [ ] components/ui/chart.tsx
  - [ ] lib/testimonials.ts

## Performance Optimization

- [ ] Implement code splitting for large components
- [ ] Optimize image loading with proper sizes
- [ ] Add proper error boundaries around components that fetch data

## Final Checks

- [ ] Run `npx next lint` and verify all critical issues are resolved
- [ ] Run `npx tsc --noEmit` to check for TypeScript errors
- [ ] Test the application in development mode
- [ ] Build the application with `npm run build` and check for any build errors

