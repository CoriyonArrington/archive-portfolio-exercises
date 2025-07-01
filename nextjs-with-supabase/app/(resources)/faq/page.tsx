// app/(resources)/faq/page.tsx - Updated FAQ query
import type { Metadata } from 'next'; // Added import
import React from 'react';
import { createClient } from "@/utils/supabase/server";
import { Section } from "@/components/ui/section";
import FaqFilter from "@/components/common/faq-filter";
import { Database } from '@/types/supabase';
import { siteConfig } from '@/config/site'; // Added import

// Added static metadata export
export const metadata: Metadata = {
  title: `FAQ | ${siteConfig.name}`, // Specific title
  description: `Frequently asked questions about ${siteConfig.name}'s services and process.` || siteConfig.description, // Specific description with fallback
};

type PageContent = {
  hero?: { headline?: string | null; subheadline?: string | null; cta?: string[] | null } | null;
  section?: { headline?: string | null; body?: string | null; } | null;
} | null;

// Base Faq type from schema
type Faq = Database['public']['Tables']['faqs']['Row'];

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const supabase = await createClient();

  // 1) Fetch CMS page content
  const { data: pageData, error: pageError } = await supabase
    .from("pages")
    .select("content")
    .eq("slug", "faq")
    .maybeSingle();

  if (pageError) {
    console.error("Error fetching FAQ page content:", pageError.message);
  }
  const content: PageContent = pageData?.content as PageContent ?? null;

  const heroHeadline = content?.hero?.headline ?? "Frequently Asked Questions";
  const heroSubheadline = content?.hero?.subheadline ?? "";
  const sectionBody = content?.section?.body ?? "";

  // 2) Fetch FAQs linked to 'faq' slug via join table
  const { data: faqs, error: faqsError } = await supabase
    .from("faqs")
    .select(`
      id,
      question,
      answer,
      faq_page_slugs!inner (
        page_slug
      )
    `)
    .eq('faq_page_slugs.page_slug', 'faq')
    .order('created_at', { ascending: true }) // Order by creation or ID
    .returns<Faq[]>(); // Expecting an array of Faq Rows

  // DEBUG: Log the result to the server console where `npm run dev` runs
  console.log('Fetched FAQs for /faq page:', { faqs, faqsError });

  if (faqsError) {
    console.error("Error fetching FAQs:", faqsError.message);
    // faqs will be null or undefined here, FaqFilter will handle empty state
  }

  return (
    <>
      <Section id="faq-hero" background="muted" padding="sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold">{heroHeadline}</h1>
          {heroSubheadline && (
            <p className="mt-2 text-lg text-muted-foreground">{heroSubheadline}</p>
          )}
        </div>
      </Section>

      <Section id="faq-list">
         {sectionBody && (
             <div className="prose dark:prose-invert max-w-none mb-8">
                 <p>{sectionBody}</p>
             </div>
         )}
         {/* Ensure faqs passed is an array, even if null/undefined/error */}
         <FaqFilter faqs={faqs ?? []} />
      </Section>
    </>
  );
}