// components/layout/footer.tsx
import React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server'; // Import server client
import { ThemeSwitcher } from '@/components/theme-switcher';
import type { Database } from '@/types/supabase'; // Import base DB type

// Define a type for the relevant page data needed in the footer
type FooterPageLink = {
  title: string | null;
  slug: string | null;
  type: string | null;
  sort_order: number | null; // Include sort_order
};

// Helper function to group pages by type (remains the same)
function groupPagesByType(pages: FooterPageLink[]): Record<string, FooterPageLink[]> {
    return pages.reduce((acc, page) => {
        if (page.type && page.title && page.slug) {
            const category = page.type.toUpperCase();
            if (!acc[category]) {
                acc[category] = [];
            }
            // Pages are already sorted by sort_order from the query
            acc[category].push(page);
        }
        return acc;
    }, {} as Record<string, FooterPageLink[]>);
}

// Helper function to format category titles (remains the same)
function formatCategoryTitle(category: string): string {
    if (!category) return '';
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
}

// Make Footer an async component
export default async function Footer() {
  const supabase = await createClient();

  // Fetch necessary page data for footer links, including sort_order
  const { data: pagesData, error: pagesError } = await supabase
    .from('pages')
    .select('title, slug, type, sort_order') // Select the new sort_order column
    .neq('title', null)
    .neq('slug', null)
    .neq('type', null)
    // --- Order by type, then by the new sort_order column ---
    .order('type', { ascending: true })
    .order('sort_order', { ascending: true, nullsFirst: false }); // Ensure NULLs go last

  if (pagesError) {
    console.error("Error fetching footer pages:", pagesError);
    // Handle error appropriately, maybe return a simplified footer or null
  }

  // Group the fetched pages by their type
  // The pages within each group will already be sorted by sort_order
  const groupedPages = groupPagesByType((pagesData as FooterPageLink[] | null) ?? []);

  // Get category keys dynamically and sort them (e.g., MAIN first, then alpha)
  const dynamicCategories = Object.keys(groupedPages).sort((a, b) => {
      if (a === 'MAIN') return -1;
      if (b === 'MAIN') return 1;
      return a.localeCompare(b);
  });

  // Calculate grid columns needed
  const totalColumns = 1 + dynamicCategories.length;
  const lgGridColsClass = totalColumns > 3 ? `lg:grid-cols-${totalColumns}` : 'lg:grid-cols-4';

  return (
    <footer className="border-t w-full bg-muted/50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className={`grid grid-cols-1 md:grid-cols-3 ${lgGridColsClass} gap-8`}>
          {/* Column 1: Logo and description */}
          <div className="md:col-span-1 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-semibold">
                Coriyon&rsquo;s <span className="text-primary">Studio</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Senior Product Designer with a biomedical engineering background. I specialize in creating seamless
              customer experiences for tech startups and enterprises.
            </p>
          </div>

          {/* Dynamically generated columns for page categories */}
          {dynamicCategories.map(category => {
            // Links are already sorted by the database query
            const categoryLinks = groupedPages[category];

            return (
              <div key={category} className="md:col-span-1">
                <h3 className="text-sm font-semibold text-foreground mb-4">
                    {formatCategoryTitle(category)}
                </h3>
                <ul className="space-y-2">
                  {/* Map over the database-sorted categoryLinks */}
                  {categoryLinks.map((page) => (
                    <li key={page.slug!}>
                      <Link
                        href={page.slug === 'home' ? '/' : `/${page.slug}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {page.title && page.title.length > 30 ? page.title.split('–')[0].trim() : page.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom Bar: Copyright & Theme Switcher */}
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Coriyon&rsquo;s Studio. All rights reserved.
          </p>
           <ThemeSwitcher />
        </div>
      </div>
    </footer>
  );
}