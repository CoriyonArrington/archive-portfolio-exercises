// app/admin/page.tsx
import { redirect } from 'next/navigation';

export default function AdminRootPage() {
  // Redirect immediately to the main dashboard page
  redirect('/admin/dashboard');

  // Note: Nothing below the redirect will ever render
  // return null; // Or return null if your ESLint requires a return
}
