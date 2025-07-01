// /components/layout/navigation.tsx
"use client"

import Link from "next/link";
import { useState } from "react";

// Combined navigation component for both desktop and mobile
interface NavigationProps {
  pathname: string;
  routes: { name: string; path: string }[];
}

export function Navigation({ pathname, routes }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={
              pathname === route.path
                ? "text-sm font-medium transition-colors hover:text-primary text-primary"
                : "text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
            }
            aria-current={pathname === route.path ? "page" : undefined}
          >
            {route.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center md:hidden">
        <button
          className="p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <span className="text-lg">Close</span>
          ) : (
            <span className="text-lg">Menu</span>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute left-0 top-16 w-full bg-white shadow-lg">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={
                pathname === route.path
                  ? "block p-4 text-lg font-semibold text-primary"
                  : "block p-4 text-lg font-semibold text-muted-foreground"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {route.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
