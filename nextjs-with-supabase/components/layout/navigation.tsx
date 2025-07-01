// components/layout/navigation.tsx
"use client"; // Needs to be a client component to use usePathname

import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { cn } from "@/lib/utils"; // For conditional classes

interface NavigationProps {
  // Routes passed as props
  routes: { name: string; path: string }[];
  // Optional className for additional styling
  className?: string;
}

export default function Navigation({ routes, className }: NavigationProps) {
  const pathname = usePathname(); // Get current path

  return (
    <nav className={cn("flex items-center gap-4 lg:gap-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.path}
          href={route.path}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            // Apply muted foreground unless it's the active path
            pathname === route.path
              ? "text-primary" // Active link color
              : "text-muted-foreground" // Inactive link color
          )}
          aria-current={pathname === route.path ? "page" : undefined}
        >
          {route.name}
        </Link>
      ))}
    </nav>
  );
}
