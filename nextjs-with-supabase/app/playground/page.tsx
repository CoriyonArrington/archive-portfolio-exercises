// app/playground/page.tsx

import type { Metadata } from 'next';
import React from 'react';
import { createClient } from '@/utils/supabase/server'; // Ensure this path is correct
import { Database } from '@/types/supabase';         // Ensure this path is correct and types are updated
import { siteConfig } from '@/config/site';           // Ensure this path is correct

// Import your ToolCard component (adjust path as needed)
// For example: import { ToolCard } from '@/components/common/tool-card';
// Or: import { ToolCard } from '@/components/playground/tool-card';
import { ToolCard } from '@/components/common/tool-card'; // Assuming common location for ToolCard

// Import page section components you might use
import HeroSection from '@/components/page-sections/hero-section'; // Adjust path as needed
import ContentSection from '@/components/layout/content-section'; // Adjust path as needed
import { H2, P } from '@/components/typography'; // Adjust path as needed, using your typography components

// Define type for your playground tool data from the 'pg_tools' table
// This should align with your Supabase generated types for 'pg_tools'
export type PlaygroundToolEntry = Database['public']['Tables']['pg_tools']['Row'];

// Define type for the 'playground' page content from the 'pages' table's JSONB field
interface PlaygroundPageContent {
    hero?: {
        headline?: string;
        subheadline?: string;
        cta?: { text?: string; link?: string }[]; // Example, adjust to your JSON structure
    };
    tools_overview_section?: {
        headline?: string;
        body?: string;
    };
    // Add other dynamic sections from your JSONB as needed
}

// Function to generate metadata for the playground page
export async function generateMetadata(): Promise<Metadata> {
    const supabase = createClient(); // Server-side Supabase client
    let pageTitle = `Playground | ${siteConfig.name ?? 'Your Site'}`;
    let pageDescription = siteConfig.description ?? 'Explore interactive tools and experiments.';

    try {
        const { data: pageData, error } = await supabase
            .from('pages')
            .select('title, meta_description, content') // Assuming 'title' & 'meta_description' fields exist for SEO
            .eq('slug', 'playground')
            .single();

        if (error) {
            console.error('Error fetching metadata for playground page:', error.message);
        }

        if (pageData) {
            // Use specific SEO fields if they exist, otherwise try to infer from content
            pageTitle = pageData.title || (pageData.content as PlaygroundPageContent)?.hero?.headline || pageTitle;
            pageDescription = pageData.meta_description || (pageData.content as PlaygroundPageContent)?.hero?.subheadline || pageDescription;
        }
    } catch (e: any) {
        console.error('Exception fetching metadata for playground page:', e.message);
    }

    return {
        title: pageTitle,
        description: pageDescription,
        openGraph: {
            title: pageTitle,
            description: pageDescription,
            url: `${siteConfig.url}/playground`,
            siteName: siteConfig.name,
            // images: [ /* Add images if you have them */ ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: pageTitle,
            description: pageDescription,
            // images: [ /* Add images if you have them */ ],
        },
    };
}

// Async function to fetch data for the playground page
async function fetchPlaygroundPageData() {
    const supabase = createClient(); // Server-side Supabase client

    // Fetch general page content for '/playground' (from 'pages' table)
    // and fetch all playground tools (from 'pg_tools' table)
    const [pageContentResult, toolsResult] = await Promise.all([
        supabase
            .from('pages')
            .select('content')
            .eq('slug', 'playground')
            .single(),
        supabase
            .from('pg_tools') // Updated table name
            .select('*')
            .order('sort_order', { ascending: true }) // Assuming you have a sort_order column
    ]);

    // Handle potential error for page content
    if (pageContentResult.error) {
        console.error('Error loading playground page dynamic content:', pageContentResult.error.message);
        // Optionally, throw the error or return a specific error state
    }

    // Handle potential error for tools
    if (toolsResult.error) {
        console.error('Error loading playground tools from pg_tools:', toolsResult.error.message);
        // Optionally, throw the error or return a specific error state
    }

    const pageContent = (pageContentResult.data?.content ?? {}) as PlaygroundPageContent;
    const tools: PlaygroundToolEntry[] = (toolsResult.data as PlaygroundToolEntry[] | null) ?? [];

    return { pageContent, tools };
}

// The Playground Page component
export default async function PlaygroundPage() {
    const { pageContent, tools } = await fetchPlaygroundPageData();

    const heroContent = pageContent.hero ?? {};
    const toolsOverview = pageContent.tools_overview_section ?? {};

    return (
        <main id="playground-page">
            <HeroSection
                id="playground-hero"
                headline={heroContent.headline || "The Workshop & Playground"} // Fallback headline
                subheadline={heroContent.subheadline || "Dive into a collection of interactive tools, UX experiments, and coding projects."} // Fallback subheadline
                // Map CTAs if your HeroSection component supports them and they exist in pageContent.hero.cta
            />

            <ContentSection id="playground-tools-list" aria-labelledby="tools-overview-headline">
                {toolsOverview.headline && (
                    <H2 id="tools-overview-headline" className="text-center mb-4">
                        {toolsOverview.headline}
                    </H2>
                )}
                {toolsOverview.body && (
                    <P className="text-lg text-muted-foreground text-center mb-8 md:mb-12">
                        {toolsOverview.body}
                    </P>
                )}

                {tools.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tools.map((tool) => (
                            <ToolCard key={tool.id} tool={tool} />
                        ))}
                    </div>
                ) : (
                    <P className="text-center text-lg">
                        No tools available at the moment. Check back soon!
                    </P>
                )}
            </ContentSection>
        </main>
    );
}