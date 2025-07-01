// app/(main)/layout.tsx - Simplified for Option 2
import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  // No wrapper needed, container styling is handled by app/layout.tsx
  return <>{children}</>;
  // You could add structure specific ONLY to the (main) section here later if needed
}