// app/(resources)/process/page.tsx
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { Database, Json } from '@/types/supabase';
import { notFound } from 'next/navigation';
// Only import Metadata types, keep existing generateMetadata function
import type { Metadata, ResolvingMetadata } from 'next';
// Import siteConfig if needed for fallback within generateMetadata (optional)
// import { siteConfig } from '@/config/site';

// --- Import Components ---
import HeroSection from '@/components/page-sections/hero-section';
import ProcessSection from '@/components/page-sections/process-section';
import CtaSection from '@/components/page-sections/cta-section';

// --- Define Types ---
interface ProcessPhase {
    id: string; title?: string | null; description?: string | null; sort_order?: number | null;
}
interface ProcessPageContent {
    hero?: { headline?: string; subheadline?: string; cta?: string | null };
    process?: { headline?: string; body?: string; cta?: string | null };
    cta?: { headline?: string; body?: string; cta?: string | null };
}

// --- Generate Dynamic Metadata (Keep Existing Function) ---
type Props = { params: {}; searchParams: { [key: string]: string | string[] | undefined }; };
export async function generateMetadata( { params }: Props, parent: ResolvingMetadata ): Promise<Metadata> {
  const supabase = createClient();
  // Fetch page title and description from CMS 'pages' table
  const { data: page } = await supabase
    .from('pages')
    .select('title, meta_description') // Assuming you have these columns in your 'pages' table
    .eq('slug', 'process')
    .maybeSingle();

  // Construct title and description, using fallbacks if CMS data is missing
  const title = page?.title ? `${page.title} | Coriyon’s Studio` : 'Our Process | Coriyon’s Studio';
  const description = page?.meta_description || 'Learn about the design and development process at Coriyon’s Studio.'; // Fallback description

  return {
    title: title,
    description: description,
    // You could potentially add dynamic openGraph tags here too if needed
  };
}

// --- Data Fetching Function ---
async function fetchProcessPageData(): Promise<{ pageContent: ProcessPageContent; processPhases: ProcessPhase[] }> {
    const supabase = createClient();
    const [pageResult, processPhasesResult] = await Promise.all([
        supabase.from('pages').select('content').eq('slug', 'process').maybeSingle(),
        supabase.from('process_phases').select('*').order('sort_order', { ascending: true })
    ]);

    // Error handling remains the same...
    if (pageResult.error) console.error('Error loading process page content:', pageResult.error.message);
    if (processPhasesResult.error) console.error('Error loading process phases:', processPhasesResult.error.message);

    const pageContent = (pageResult.data?.content ?? {}) as ProcessPageContent;
    const processPhases: ProcessPhase[] = processPhasesResult.data ?? [];
    // Logging remains the same...
    console.log('Fetched Process Page Content:', JSON.stringify(pageContent, null, 2));
    console.log('Fetched Process Phases:', JSON.stringify(processPhases, null, 2));

    return { pageContent, processPhases };
}

// --- Page Component (Remains the same) ---
export default async function ProcessPage() {
    const { pageContent, processPhases } = await fetchProcessPageData();

    const hero = pageContent.hero ?? { headline: "Our Process", subheadline: "A collaborative journey from concept to launch." };
    const processMeta = pageContent.process ?? { headline: "How We Work", body: "We follow a structured yet flexible process..." };
    const finalCTA = pageContent.cta ?? { headline: "Ready to start your project?", cta: "Get in Touch" };

    if (processPhases.length === 0) {
        console.warn("No process phases found in the database.");
    }

    return (
        <main>
            <HeroSection
                id="process-hero"
                headline={hero.headline}
                subheadline={hero.subheadline}
                cta={hero.cta ?? ""}
                ctaLink={"/projects"}
            />
            <ProcessSection
                headline={processMeta.headline}
                body={processMeta.body}
                process={processPhases}
                cta={processMeta.cta ?? ""}
                ctaLink="/process" // Or maybe link elsewhere?
            />
            <CtaSection
                headline={finalCTA.headline}
                body={finalCTA.body}
                cta={finalCTA.cta ?? ""}
                ctaLink="/contact"
            />
        </main>
    );
}