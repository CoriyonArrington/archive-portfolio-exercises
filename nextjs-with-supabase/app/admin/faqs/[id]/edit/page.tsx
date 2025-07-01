// app/admin/faqs/[id]/edit/page.tsx
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import FaqForm from '@/components/admin/faq-form';
import { editFaqAction } from '@/lib/actions/faq';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import type { Database } from '@/types/supabase';
import type { FaqFormValues } from '@/lib/schemas/faq';

// --- Metadata Imports ---
import type { Metadata, ResolvingMetadata } from 'next';
import { siteConfig } from '@/config/site';

// --- Define Types ---
type FaqForEdit = Database['public']['Tables']['faqs']['Row'] & {
  faq_page_slugs: { page_slug: string }[];
};

// --- Generate Dynamic Metadata ---
type MetadataProps = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const supabase = await createClient();
  const id = params.id;

  // Fetch only the necessary data for metadata (e.g., question)
  const { data: faq, error } = await supabase
    .from('faqs')
    .select('question') // Select minimal data needed for title
    .eq('id', id)
    .maybeSingle();

  // Handle errors during fetch
  if (error) {
    console.error("Error fetching FAQ for metadata:", error.message);
    return {
      title: 'Error Loading FAQ Edit',
      description: 'Failed to load FAQ details for editing.',
      robots: { index: false, follow: false }, // Ensure no indexing on error
    };
  }

  // Handle FAQ not found
  if (!faq) {
    return {
      title: 'FAQ Not Found',
      description: 'The requested FAQ could not be found for editing.',
      robots: { index: false, follow: false }, // Ensure no indexing for not found
    };
  }

  // Construct dynamic title - use question snippet or ID as fallback
  const titlePrefix = faq.question
    ? faq.question.substring(0, 50) + (faq.question.length > 50 ? '...' : '')
    : `ID: ${id}`;

  return {
    title: `Edit FAQ: ${titlePrefix}`, // Title uses template from layout/siteConfig
    description: `Edit details for FAQ: ${titlePrefix}`, // Simple description
    robots: { index: false, follow: false }, // IMPORTANT: Disallow indexing for admin pages
    // OpenGraph and Twitter metadata can be minimal or omitted for admin pages
    // as they shouldn't be indexed or shared publicly.
    // openGraph: {
    //   title: `Edit FAQ: ${titlePrefix}`,
    //   description: `Edit details for FAQ: ${titlePrefix}`,
    // },
  };
}


// --- Data Fetching Functions ---

// Function to fetch a single FAQ by ID (for the form)
async function getFaqById(id: string): Promise<FaqForEdit | null> {
    const supabase = await createClient();
    // Fetch all needed data for the form rendering
    const { data, error } = await supabase
        .from('faqs')
        .select(`
            *,
            faq_page_slugs ( page_slug )
        `)
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Error fetching FAQ with ID ${id}:`, error.message);
        // Return null instead of throwing error to allow page component to handle 'notFound'
        return null;
    }

    // Ensure faq_page_slugs is always an array, even if null from DB
    return {
        ...data,
        faq_page_slugs: data.faq_page_slugs ?? [],
    } as FaqForEdit;
}


// Function to fetch distinct page slugs
async function getAvailablePageSlugs(): Promise<string[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('pages')
        .select('slug')
        .neq('slug', null); // Ensure slug is not null

    if (error) {
        console.error("Error fetching page slugs:", error);
        return [];
    }
    // Filter out any potential null slugs just in case and ensure type is string[]
    return data.map(p => p.slug).filter((slug): slug is string => slug !== null);
}


// --- Page Component ---

// Define props for the page component, including URL params
interface EditFaqPageProps {
  params: {
    id: string; // The FAQ ID from the URL segment [id]
  };
}

export default async function EditFaqPage({ params }: EditFaqPageProps) {
  const faqId = params.id;

  // Fetch existing FAQ data and available slugs concurrently
  const [faqData, availablePageSlugs] = await Promise.all([
    getFaqById(faqId),
    getAvailablePageSlugs()
  ]);

  // If FAQ data not found (getFaqById returned null), show 404 page
  if (!faqData) {
    notFound();
  }

  // Prepare default values for the form
  // Ensure default values match the expected types in FaqFormValues
  const defaultValues: Partial<FaqFormValues> & { id: string } = {
    id: faqData.id, // Include the ID for the edit action - ensure it's always present
    question: faqData.question ?? "", // Use nullish coalescing for defaults
    answer: faqData.answer ?? "",   // Use nullish coalescing for defaults
    // Ensure page_slugs is an array of strings
    page_slugs: faqData.faq_page_slugs.map(link => link.page_slug).filter(slug => typeof slug === 'string'),
  };

  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
             <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link href="/admin/faqs">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to FAQs</span>
                </Link>
             </Button>
            {/* Display the question being edited, or ID if question is empty */}
            <h1 className="text-lg font-semibold md:text-2xl truncate">
                Edit FAQ: {faqData.question ? `"${faqData.question.substring(0, 80)}${faqData.question.length > 80 ? '...' : ''}"` : `ID ${faqData.id}`}
            </h1>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>FAQ Details</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Render the form, passing the edit action, default values, and slugs */}
                <FaqForm
                    action={editFaqAction} // Use the edit action
                    defaultValues={defaultValues} // Pass fetched data as defaults
                    availablePageSlugs={availablePageSlugs}
                    submitButtonText="Update FAQ" // Change button text
                />
            </CardContent>
        </Card>
    </div>
  );
}