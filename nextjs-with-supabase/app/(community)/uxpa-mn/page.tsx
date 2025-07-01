// app/(community)/uxpa-mn/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Import Supabase client creator and types
import { createClient } from '@/utils/supabase/server';
import { Database, Json } from '@/types/supabase';

// Import your existing components
import HeroSection from '@/components/page-sections/hero-section';
import { Button } from '@/components/ui/button';
import ContentSection from '@/components/layout/content-section';

// Interface for the expected JSON structure in the 'content' field
interface UXPAPageContent {
    hero?: { headline?: string; subheadline?: string };
    leadership?: {
        headline?: string;
        body_html?: string; // Using _html suffix convention for safe rendering
        cta?: string;
        ctaHref?: string;
        ctaNewTab?: boolean;
    };
    whyCommunity?: {
        headline?: string;
        body?: string;
    };
    exploreFurther?: {
        headline?: string;
        links?: { label: string; href: string }[];
    };
}

// --- Data Fetching Function ---
async function fetchUXPAPageData() {
    const supabase = createClient();
    const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .select('content')
        .eq('slug', 'uxpa-mn') // Match the slug for this page
        .single();

    if (pageError) {
        console.error('Error loading UXPA MN page content:', pageError.message);
    }

    const pageContent = (pageData?.content ?? {}) as UXPAPageContent;
    return { pageContent };
}
// ---

// --- TODO: Update Metadata dynamically if needed ---
export const metadata: Metadata = {
    title: 'UXPA Minnesota Involvement | Coriyon',
    description:
        'Highlighting commitment to the local UX community through leadership and involvement with UXPA Minnesota.',
};

export default async function UXPAMinnesotaPage() {
    // Fetch data
    const { pageContent } = await fetchUXPAPageData();

    // Extract content sections safely
    const hero = pageContent.hero ?? {};
    const leadership = pageContent.leadership ?? {};
    const whyCommunity = pageContent.whyCommunity ?? {};
    const exploreFurther = pageContent.exploreFurther ?? {};

    // Basic check if essential content is missing
    if (!pageContent.hero) {
        console.error('Essential UXPA MN page content (hero) missing from database.');
        return <div>Failed to load page content. Please try again later.</div>;
    }

    return (
        <main>
            <HeroSection
                id="uxpa-hero"
                 // --- FIX: Provide default values for required string props ---
                headline={hero.headline ?? 'Default Headline'}
                subheadline={hero.subheadline ?? 'Default Subheadline'}
                 // --- End FIX ---
                cta={null} // cta is optional
            />

            {/* ... rest of the component remains the same ... */}

            <ContentSection id="leadership" variant="narrow">
                 <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-center">
                    {leadership.headline ?? 'Leadership in UXPA Minnesota'}
                </h2>
                 {/* Optional: Add an image if configured */}
                 {/*
                <div className="my-6 flex justify-center"> ... </div>
                */}
                 {/* Render HTML content safely */}
                 {leadership.body_html && (
                    <div
                        className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground mb-6" // Adjust prose classes as needed
                        dangerouslySetInnerHTML={{ __html: leadership.body_html }}
                    />
                 )}
                 {/* Leadership CTA Button */}
                {leadership.cta && leadership.ctaHref && (
                    <div className="text-center">
                         <Button asChild variant="outline">
                            <Link
                                href={leadership.ctaHref}
                                target={leadership.ctaNewTab ? '_blank' : '_self'}
                                rel={leadership.ctaNewTab ? 'noopener noreferrer' : ''}
                            >
                                {leadership.cta}
                            </Link>
                         </Button>
                    </div>
                )}
            </ContentSection>

            <ContentSection id="why-community" variant="narrow" className="text-center border-t bg-secondary/50">
                 <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    {whyCommunity.headline ?? 'Why Community Matters'}
                </h2>
                {whyCommunity.body && (
                    <p className="text-lg md:text-xl text-muted-foreground mb-8">
                        {whyCommunity.body}
                    </p>
                )}
                {/* Explore Further Links */}
                {exploreFurther.headline && (
                     <h3 className="text-xl font-semibold mb-4">{exploreFurther.headline}</h3>
                )}
                {exploreFurther.links && exploreFurther.links.length > 0 && (
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                         {exploreFurther.links.map((link, index) => (
                             <Button key={index} asChild>
                                <Link href={link.href}>{link.label}</Link>
                             </Button>
                         ))}
                    </div>
                )}
            </ContentSection>
        </main>
    );
}