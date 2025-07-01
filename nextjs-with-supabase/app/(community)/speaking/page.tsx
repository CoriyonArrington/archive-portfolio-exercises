// app/(community)/speaking/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
// Import Supabase client creator and types
import { createClient } from '@/utils/supabase/server';
import { Database, Json } from '@/types/supabase'; // Assuming Json type exists

// Import your existing components
import HeroSection from '@/components/page-sections/hero-section';
import { Button } from '@/components/ui/button';
import SpeakingCard from '@/components/community/speaking-card';
import ContentSection from '@/components/layout/content-section';

// Interface for the expected JSON structure in the 'content' field
interface SpeakingPageContent {
    hero?: { headline?: string; subheadline?: string };
    pastEngagements?: { headline?: string };
    speakingTopics?: {
        headline?: string;
        body?: string;
        list?: string[];
        cta?: string;
        ctaHref?: string;
    };
}

// Interface for the SpeakingEngagement data (assuming it's fetched separately)
interface SpeakingEngagement {
    id: string;
    title: string;
    event: string;
    date: string;
    description: string | null;
    link: string | null;
    type: string;
}

// --- Data Fetching Function ---
async function fetchSpeakingPageData() {
    const supabase = createClient();
    // Fetch main page content JSON
    const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .select('content')
        .eq('slug', 'speaking') // Match the slug for this page
        .single();

    // --- TODO: Fetch actual speaking engagements list ---
    // Example: const { data: engagementsData, error: engagementsError } = await supabase.from('speaking_engagements')...
    const speakingEngagements: SpeakingEngagement[] = [
        // Replace with actual fetched data later
        { id: '1', title: 'Example Talk Title 1', event: 'Minneapolis UX Conference 2024', date: '2024-10-15', description: 'A brief description of the talk...', link: '#', type: 'Conference Talk' },
        { id: '2', title: 'Example Workshop Title', event: 'Local Meetup', date: '2023-05-20', description: 'Details about the workshop content...', link: null, type: 'Workshop' },
    ];
    // ---

    if (pageError) {
        console.error('Error loading speaking page content:', pageError.message);
    }
    // TODO: Handle engagementsError

    const pageContent = (pageData?.content ?? {}) as SpeakingPageContent;
    return { pageContent, speakingEngagements }; // Return both content and engagements
}
// ---

// --- TODO: Update Metadata dynamically if needed ---
export const metadata: Metadata = {
    title: 'Speaking Engagements | Coriyon',
    description:
        'Explore past talks, workshops, and speaking topics by Coriyon, showcasing expertise and leadership in UX design.',
};

export default async function SpeakingPage() {
    // Fetch data
    const { pageContent, speakingEngagements } = await fetchSpeakingPageData();

    // Extract content sections safely
    const hero = pageContent.hero ?? {};
    const pastEngagements = pageContent.pastEngagements ?? {};
    const speakingTopics = pageContent.speakingTopics ?? {};

    // Basic check if essential content is missing
    if (!pageContent.hero) {
        console.error('Essential Speaking page content (hero) missing from database.');
        // Consider rendering a more user-friendly error state
        return <div>Failed to load page content. Please try again later.</div>;
    }

    return (
        <main>
            <HeroSection
                id="speaking-hero"
                 // --- FIX: Provide default values for required string props ---
                headline={hero.headline ?? 'Default Headline'}
                subheadline={hero.subheadline ?? 'Default Subheadline'}
                 // --- End FIX ---
                cta={null} // cta is optional
            />

             {/* ... rest of the component remains the same ... */}

            <ContentSection id="past-engagements">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-center">
                    {pastEngagements.headline ?? 'Past Engagements'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {speakingEngagements.map((engagement) => (
                        <SpeakingCard key={engagement.id} engagement={engagement} />
                    ))}
                    {speakingEngagements.length === 0 && (
                        <p className="text-center col-span-full text-muted-foreground">Details on past speaking engagements coming soon.</p>
                    )}
                </div>
            </ContentSection>

             <ContentSection id="speaking-topics" variant="narrow" className="text-center border-t">
                 <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    {speakingTopics.headline ?? 'Speaking Topics'}
                </h2>
                {speakingTopics.body && (
                    <p className="text-lg md:text-xl text-muted-foreground mb-4">
                        {speakingTopics.body}
                    </p>
                )}
                {speakingTopics.list && speakingTopics.list.length > 0 && (
                    <ul className="list-disc list-inside inline-block text-left mb-8">
                        {speakingTopics.list.map((topic, index) => (
                           <li key={index}>{topic}</li>
                        ))}
                    </ul>
                )}
                {/* CTA Button - Use data from JSON */}
                {speakingTopics.cta && speakingTopics.ctaHref && (
                     <Button asChild size="lg">
                        <Link href={speakingTopics.ctaHref}>{speakingTopics.cta}</Link>
                    </Button>
                )}
            </ContentSection>
        </main>
    );
}