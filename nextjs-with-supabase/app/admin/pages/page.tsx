// app/admin/pages/page.tsx
import type { Metadata } from 'next'; // Added import
import { siteConfig } from '@/config/site'; // Added import
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import type { Database } from '@/types/supabase';
import PageTable from '@/components/admin/page-table';

// Added static metadata export
export const metadata: Metadata = {
  title: `Manage CMS Pages | Admin | ${siteConfig.name}`,
  description: `View, add, edit, and delete CMS pages.`,
  robots: { index: false, follow: false },
};


// Define the type for the page data
type PageRow = Database['public']['Tables']['pages']['Row'];

// Data fetching function
async function fetchPages(): Promise<PageRow[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('pages')
        .select(`*`) // Select all columns for the list view
        .order('type') // Order by type then title
        .order('title');

    if (error) {
        console.error("Error fetching Pages:", error);
        return [];
    }
    return data as PageRow[]; // Type assertion
}

// Server Component page
export default async function AdminPagesPage() {
  // Fetch data directly here
  const pages = await fetchPages();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Manage Page Content</h1>
         {/* No "Add New" button needed if pages are predefined */}
      </div>

      {/* Render the Client Component table, passing fetched data */}
      <PageTable pages={pages} />

    </div>
  );
}