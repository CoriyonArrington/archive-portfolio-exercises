// app/admin/faqs/new/page.tsx
import type { Metadata } from 'next'; // Added import
import { siteConfig } from '@/config/site'; // Added import
import React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import FaqForm from '@/components/admin/faq-form';
import { addFaqAction } from '@/lib/actions/faq';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

// Added static metadata export
export const metadata: Metadata = {
  title: `New FAQ | Admin | ${siteConfig.name}`,
  description: `Add a new Frequently Asked Question.`,
  robots: { index: false, follow: false },
};

// Function to fetch distinct page slugs that can be assigned
async function getAvailablePageSlugs(): Promise<string[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('pages')
        .select('slug')
        .neq('slug', null);

    if (error) {
        console.error("Error fetching page slugs:", error);
        return [];
    }
    return data.map(p => p.slug).filter((slug): slug is string => slug !== null);
}

export default async function AddNewFaqPage() {
  // Fetch the slugs server-side
  const availablePageSlugs = await getAvailablePageSlugs();

  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
             <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link href="/admin/faqs">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to FAQs</span>
                </Link>
             </Button>
            <h1 className="text-lg font-semibold md:text-2xl">Add New FAQ</h1>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>FAQ Details</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Render the form, passing the action and slugs */}
                <FaqForm
                    action={addFaqAction}
                    availablePageSlugs={availablePageSlugs}
                    submitButtonText="Add FAQ"
                />
            </CardContent>
        </Card>
    </div>
  );
}