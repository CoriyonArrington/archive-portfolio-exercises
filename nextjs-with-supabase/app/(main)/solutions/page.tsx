// app/solutions/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import type { Database, Json } from '@/types/supabase';
import { siteConfig } from '@/config/site';

// Import page section components
import HeroSection from '@/components/page-sections/hero-section';
import CtaSection from '@/components/page-sections/cta-section';
import SolutionsSection from '@/components/page-sections/solutions-section'; // Corrected import name

// Types (remain the same)
type SolutionPageListItem = Pick<
    Database['public']['Tables']['solution_pages']['Row'],
    'id' | 'slug' | 'title' | 'headline'
>;
interface SolutionsPageContent {
    hero?: { headline?: string; subheadline?: string; cta?: string }; // Removed ctaLink from here if it was added
    solutions_list?: { headline?: string; body?: string; cta?: string; ctaLink?: string }; // ctaLink is for SolutionsSection
    cta?: { headline?: string; body?: string; cta?: string }; // Removed ctaLink from here if it was added
}
type PageContent = SolutionsPageContent | null;

type PageRowData = Pick<
    Database['public']['Tables']['pages']['Row'],
    'id' | 'title' | 'content' | 'meta_description'
> | null;

// Metadata (remains the same)
export const metadata: Metadata = {
    title: 'Solutions – Coriyon’s Studio | Minneapolis UX Designer',
    description: 'Explore outcome-focused UX solutions tailored to solve specific business challenges and drive measurable results for tech startups and established brands.',
};

// Data Fetching Functions (remain the same)
async function getSolutionPageList(): Promise<SolutionPageListItem[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('solution_pages')
        .select('id, slug, title, headline')
        .order('title', { ascending: true });
    if (error) { console.error("Error fetching Solution Page list:", error.message); return []; }
    return data.filter(item => item.slug && item.title) as SolutionPageListItem[];
}
async function getPageIndexData(slug: string): Promise<PageRowData> {
     const supabase = await createClient();
     const { data, error } = await supabase
        .from('pages').select('id, title, content, meta_description')
        .eq('slug', slug).maybeSingle();
    if (error) { console.error(`Error fetching page data for slug ${slug}:`, error.message); return null; }
    return data;
}

// --- Page Component ---
export default async function SolutionsIndexPage() {
    const [pageData, solutionPages] = await Promise.all([
        getPageIndexData('solutions'),
        getSolutionPageList()
    ]);

    if (!pageData) { notFound(); }

    let pageContent: PageContent = null;
    if (pageData.content && typeof pageData.content === 'object') {
        pageContent = pageData.content as PageContent;
    }

    const hero = pageContent?.hero ?? {};
    const solutionsListMeta = pageContent?.solutions_list ?? {};
    const finalCTA = pageContent?.cta ?? {};

    return (
        <main>
            {/* 1. Hero Section - Removed ctaLink prop */}
            <HeroSection
                id="solutions-hero"
                headline={hero.headline ?? 'Default Solutions Headline'}
                subheadline={hero.subheadline ?? ''}
                cta={hero.cta ?? 'Default CTA'}
                // ctaLink="/contact" // Removed this prop
            />

            {/* 2. Solutions List Section - Pass props including ctaLink */}
            <SolutionsSection
                 headline={solutionsListMeta.headline ?? 'Explore Our Solutions'}
                 body={solutionsListMeta.body ?? ''}
                 solution_pages={solutionPages}
                 cta={solutionsListMeta.cta ?? 'Learn More'}
                 // Pass the ctaLink specific to this section if defined in JSON
                 ctaLink={solutionsListMeta.ctaLink ?? "/solutions"}
            />

            {/* 3. Final CTA Section - Removed ctaLink prop */}
            <CtaSection
                headline={finalCTA.headline ?? 'Ready to Get Started?'}
                body={finalCTA.body ?? ''}
                cta={finalCTA.cta ?? 'Contact Us'}
               // ctaLink="/contact" // Removed this prop
            />
        </main>
    );
}