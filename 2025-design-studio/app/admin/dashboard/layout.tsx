import type { ReactNode } from "react";
import Link from "next/link";
import { SignOutButton } from "@/components/common/sign-out-button";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const sections = [
    { label: "Pages", href: "/admin/dashboard/pages" },
    { label: "Projects", href: "/admin/dashboard/projects" },
    { label: "Services", href: "/admin/dashboard/services" },
    { label: "FAQs", href: "/admin/dashboard/faqs" },
    // etc.
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      <nav className="w-64 bg-white border-r p-6 space-y-4">
        <h2 className="text-2xl font-bold">CMS Dashboard</h2>
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="block px-3 py-2 rounded hover:bg-gray-100"
          >
            {s.label}
          </Link>
        ))}

        {/* client‑only sign out */}
        <SignOutButton />
      </nav>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
