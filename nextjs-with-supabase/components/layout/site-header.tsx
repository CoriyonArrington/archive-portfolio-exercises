// components/layout/site-header.tsx
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
// Import the refactored Navigation component
import Navigation from './navigation';
// Import Supabase client creator and types
import { createClient } from '@/utils/supabase/server';
import type { Database } from '@/types/supabase';

// Define a type for the relevant page data needed in the header nav
type HeaderNavLinkData = {
  title: string | null;
  slug: string | null;
  sort_order: number | null; // Ensure sort_order is included
};

// Define the type expected by the Navigation component props
type NavRoute = {
    name: string;
    path: string;
};

// --- Data Fetching Function for Main Navigation ---
async function fetchMainNavLinks(): Promise<HeaderNavLinkData[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('pages')
    .select('title, slug, sort_order') // Select only needed columns
    .eq('type', 'main') // --- Filter specifically for 'main' type pages ---
    .neq('title', null)
    .neq('slug', null)
    .order('sort_order', { ascending: true, nullsFirst: false }); // Order by sort_order

  if (error) {
    console.error("Error fetching header main nav links:", error.message);
    return []; // Return empty array on error
  }

  return (data as HeaderNavLinkData[] | null) ?? [];
}
// ---

// Make SiteHeader an async component to fetch data
export default async function SiteHeader() {

  // Fetch the main navigation links, already sorted by the database
  const fetchedNavLinks = await fetchMainNavLinks();

  // --- Transform fetched data into the format expected by Navigation component ---
  const mainNavRoutes: NavRoute[] = fetchedNavLinks
    .filter(link => link.title && link.slug) // Ensure title and slug are not null
    .map(link => {
        // --- Apply title shortening logic here ---
        const rawTitle = link.title!; // Assert non-null based on filter
        const displayName = rawTitle.length > 30 ? rawTitle.split('–')[0].trim() : rawTitle;
        // --- End title shortening logic ---

        return {
            name: displayName, // Use the potentially shortened name
            path: link.slug === 'home' ? '/' : `/${link.slug!}` // Assert non-null based on filter
        };
    });
  // --- End Transformation ---

  return (
    // Use flex, items-center for the entire header content within this component
    // Added container class for consistent padding, adjust if layout.tsx handles it
    <div className="container flex items-center h-14 w-full">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold mr-6 flex-shrink-0">
            Coriyon&apos;s <span className="text-primary">Studio</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-center">
             {/* Pass the dynamically generated and formatted routes */}
            <Navigation routes={mainNavRoutes} />
        </div>

        {/* Mobile Menu Button */}
        {/* TODO: Pass dynamic routes (mainNavRoutes) to your actual mobile menu component */}
        <div className="lg:hidden ml-auto">
            <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="h-5 w-5" />
            </Button>
        </div>
    </div>
  );
}