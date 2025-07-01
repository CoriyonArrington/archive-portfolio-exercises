// app/admin/faqs/page.tsx
import type { Metadata } from 'next'; // Added import
import { siteConfig } from '@/config/site'; // Added import
import React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import type { Database } from '@/types/supabase';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import FaqTable from '@/components/admin/faq-table';

// Added static metadata export
export const metadata: Metadata = {
  title: `Manage FAQs | Admin | ${siteConfig.name}`,
  description: `View, add, edit, and delete Frequently Asked Questions.`,
  robots: { index: false, follow: false },
};

// Type for FAQ with joined page slugs remains the same
type FaqWithPages = Database['public']['Tables']['faqs']['Row'] & {
  faq_page_slugs: { page_slug: string }[];
};

// Data fetching function (can stay here or move to lib/data)
async function fetchFaqs(): Promise<FaqWithPages[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('faqs')
        .select(`
            *,
            faq_page_slugs ( page_slug )
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching FAQs:", error);
        return [];
    }
    const faqsWithDefaults = data.map(faq => ({
        ...faq,
        faq_page_slugs: faq.faq_page_slugs ?? [],
    }));

    return faqsWithDefaults as FaqWithPages[];
}

// This is now a Server Component
export default async function AdminFaqsPage() {
  // Fetch data directly here
  const faqs = await fetchFaqs();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Manage FAQs</h1>
        <Button size="sm" asChild>
           <Link href="/admin/faqs/new">
             <PlusCircle className="h-4 w-4 mr-2" />
             Add New FAQ
           </Link>
        </Button>
      </div>

      {/* Render the Client Component, passing fetched data */}
      <FaqTable faqs={faqs} />

    </div>
  );
}