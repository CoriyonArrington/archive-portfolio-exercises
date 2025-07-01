"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navigation } from "./navigation";
import { useAuthUser } from "@/hooks/use-auth-user";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMobileViewport } from "@/hooks/use-mobile-viewport";

/**
 * Site header with logo, navigation links, and auth controls.
 */
export default function Header({
  routes,
}: {
  routes: { name: string; path: string }[];
}) {
  const pathname = usePathname();
  const { user, loading } = useAuthUser();

  // true if viewport is at least 1024px wide
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  // true if viewport is narrower than Tailwind's `sm` breakpoint (640px)
  const isMobile = useMobileViewport();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold">
          Coriyon&apos;s <span className="text-green-600">Studio</span>
        </Link>

        {/* Navigation (desktop) or mobile menu button */}
        {isDesktop ? (
          <Navigation pathname={pathname} routes={routes} />
        ) : isMobile ? (
          <button aria-label="Open menu" className="p-2 rounded hover:bg-gray-100">
            ☰
          </button>
        ) : (
          <Navigation pathname={pathname} routes={routes} />
        )}

        {/* Auth Controls */}
        <div>
          {loading ? (
            <span className="italic">Loading...</span>
          ) : user ? (
            <Link
              href="/admin"
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {isDesktop ? "Dashboard" : "🛠️"}
            </Link>
          ) : (
            <Link
              href="/auth"
              className="px-3 py-1 border border-green-500 text-green-500 rounded hover:bg-green-50"
            >
              {isDesktop ? "Login" : "🔑"}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
