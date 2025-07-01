// app/admin/pages/[slug]/edit/page.tsx
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import PageContentForm from '@/components/admin/page-content-form';
import { editPageContentAction } from '@/lib/actions/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import type { Database } from '@/types/supabase';
import type { PageContentFormValues } from '@/lib/schemas/page';

// --- Metadata Imports ---
import type { Metadata, ResolvingMetadata } from 'next';
import { siteConfig } from '@/config/site';

// --- Define Types ---
type PageRow = Database['public']['Tables']['pages']['Row'];

// --- Generate Dynamic Metadata ---
type MetadataProps = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const supabase = await createClient();
  const slug = params.slug;

  // Fetch minimal data just to confirm the page exists
  const { data: page, error } = await supabase
    .from('pages')
    .select('slug') // Only need slug to confirm existence
    .eq('slug', slug)
    .maybeSingle(); // Use maybeSingle to handle not found gracefully

  // Handle errors during fetch
  if (error) {
    console.error("Error fetching Page for metadata:", error.message);
    return {
      title: 'Error Loading Page Edit',
      description: 'Failed to load page content details for editing.',
      robots: { index: false, follow: false }, // Ensure no indexing on error
    };
  }

  // Handle Page not found
  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found for editing.',
      robots: { index: false, follow: false }, // Ensure no indexing for not found
    };
  }

  // Construct dynamic title using the slug
  return {
    title: `Edit Page: ${page.slug}`, // Title uses template from layout/siteConfig
    description: `Edit content for the page with slug: ${page.slug}`, // Simple description
    robots: { index: false, follow: false }, // IMPORTANT: Disallow indexing for admin pages
    // OpenGraph and Twitter metadata usually omitted for non-indexed admin pages
  };
}


// --- Data Fetching Function ---

// Function to fetch a single page by SLUG (for the form)
async function getPageBySlug(slug: string): Promise<PageRow | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('pages')
        .select(`*`) // Select all columns needed for the form
        .eq('slug', slug)
        .single(); // Use single() here, assuming slug is unique constraint

    if (error) {
        // Log specific Supabase error if available
        console.error(`Error fetching Page with slug ${slug}:`, error.message || error);
        // Return null to allow the page component to trigger notFound()
        return null;
    }
    // Type assertion might be needed if Supabase types aren't perfectly inferred
    return data as PageRow | null;
}


// --- Page Component ---

// Define props for the page component, including URL params
interface EditPageContentPageProps {
  params: {
    slug: string; // The Page SLUG from the URL segment [slug]
  };
}

// Destructure params directly in the function signature
export default async function EditPageContentPage({ params: { slug } }: EditPageContentPageProps) {

  // Fetch existing page data needed for the form
  const pageData = await getPageBySlug(slug);

  // If page data not found (getPageBySlug returned null), show 404 page
  if (!pageData || !pageData.slug) { // Extra check for slug just in case
    notFound();
  }

  // Prepare default values for the form
  // Stringify the content JSONB for the textarea
  let formattedContent = "";
  try {
    // Ensure content is not null/undefined before stringifying
    formattedContent = pageData.content
        ? JSON.stringify(pageData.content, null, 2) // Indent for readability
        : "";
  } catch (e) {
    console.error("Error stringifying page content:", e);
    // Fallback to raw content if stringify fails, or keep empty
    formattedContent = typeof pageData.content === 'string' ? pageData.content : "";
  }

  const defaultValues: PageContentFormValues = {
    slug: pageData.slug, // Pass the slug (it's read-only in the form anyway)
    content: formattedContent,
  };

  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
             {/* Back button */}
             <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link href="/admin/pages">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Pages</span>
                </Link>
             </Button>
            <h1 className="text-lg font-semibold md:text-2xl">Edit Page Content: <span className="font-mono text-primary">{pageData.slug}</span></h1>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Content (JSON)</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Render the form, passing the edit action and default values */}
                <PageContentForm
                    action={editPageContentAction} // Use the edit action
                    defaultValues={defaultValues} // Pass fetched data as defaults
                    submitButtonText="Update Page Content" // Change button text
                />
            </CardContent>
        </Card>
    </div>
  );
}