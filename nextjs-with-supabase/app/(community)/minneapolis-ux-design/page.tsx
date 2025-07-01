// app/(community)/minneapolis-ux-design/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
// Import Supabase client creator and types
import { createClient } from '@/utils/supabase/server';
import { Database, Json } from '@/types/supabase';

// Import your existing components
import HeroSection from '@/components/page-sections/hero-section';
import TestimonialsSection from '@/components/page-sections/testimonials-section';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/common/service-card';
import ContentSection from '@/components/layout/content-section';

// Interface for the expected JSON structure in the 'content' field
interface MinneapolisPageContent {
    hero?: { headline?: string; subheadline?: string; cta?: string; ctaHref?: string; };
    localAdvantage?: { headline?: string; body_html?: string; };
    localServices?: { headline?: string; };
    testimonials?: { headline?: string; }; // Assuming testimonials fetched separately
    finalCta?: {
        headline?: string;
        body?: string;
        primaryCta?: string;
        primaryCtaHref?: string;
        secondaryCta?: string;
        secondaryCtaHref?: string;
    };
}

// Define types for fetched data (adjust as needed)
type Testimonial = Database['public']['Tables']['testimonials']['Row'];
// Using placeholder type from previous turn - adjust to your actual data if needed
interface ServiceHighlight {
    id: string;
    title: string;
    description: string;
    icon?: string;
    link?: string;
}

// --- Data Fetching Function ---
async function fetchMinneapolisPageData() {
    const supabase = createClient();
    // Fetch main page content JSON
    const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .select('content')
        .eq('slug', 'minneapolis-ux-design') // Match the slug for this page
        .single();

    // --- TODO: Fetch relevant local testimonials ---
    const { data: testimonialsData, error: testimonialsError } = await supabase
        .from('testimonials')
        .select('*')
        // .eq('tags', 'local') // Example filter if you add tags
        .order('sort_order', { ascending: true });
    // ---

     // --- TODO: Fetch relevant services (or use static if defined here) ---
     const relevantServices: ServiceHighlight[] = [
        { id: '1', title: 'UX Audits & Optimization', description: 'Identify usability issues and opportunities for improvement on your existing digital products.', link: '/services#ux-audits' },
        { id: '2', title: 'Mobile App UX Design', description: 'Design intuitive and engaging mobile experiences for iOS and Android.', link: '/services#mobile-ux' },
        { id: '3', title: 'UX Design Workshops', description: 'Collaborative sessions to define strategy, solve problems, and align teams.', link: '/services#workshops' },
    ];
    // ---

    if (pageError) console.error('Error loading Minneapolis page content:', pageError.message);
    if (testimonialsError) console.error('Error loading testimonials:', testimonialsError.message);

    const pageContent = (pageData?.content ?? {}) as MinneapolisPageContent;
    const testimonials: Testimonial[] = testimonialsData ?? [];
    return { pageContent, testimonials, relevantServices }; // Return all fetched data
}
// ---

// --- TODO: Update Metadata dynamically if needed ---
export const metadata: Metadata = {
    title: 'Expert UX Design Studio in Minneapolis | Coriyon',
    description:
        'Your trusted partner for UX design, research, and strategy in Minneapolis. Helping local businesses, startups, and nonprofits succeed.',
    keywords:
        'UX design Minneapolis, UX studio Minneapolis, user experience Minnesota, UI/UX design Minneapolis, UX consultant Minneapolis',
};

export default async function MinneapolisUXDesignPage() {
    // Fetch data
    const { pageContent, testimonials, relevantServices } = await fetchMinneapolisPageData();

    // Extract content sections safely
    const hero = pageContent.hero ?? {};
    const localAdvantage = pageContent.localAdvantage ?? {};
    const localServices = pageContent.localServices ?? {};
    const testimonialsMeta = pageContent.testimonials ?? {}; // Content *about* testimonials section
    const finalCta = pageContent.finalCta ?? {};

     // Basic check if essential content is missing
    if (!pageContent.hero) {
        console.error('Essential Minneapolis UX page content (hero) missing from database.');
        return <div>Failed to load page content. Please try again later.</div>;
    }

    return (
        <main>
             <HeroSection
                id="minneapolis-hero"
                // --- FIX: Provide default values for required string props ---
                headline={hero.headline ?? 'Default Headline'}
                subheadline={hero.subheadline ?? 'Default Subheadline'}
                // --- End FIX ---
                cta={hero.cta} // cta is already optional in HeroSection props
                href={hero.ctaHref} // href is already optional in HeroSection props
            />

            {/* ... rest of the component remains the same ... */}

            <ContentSection id="local-advantage" variant="narrow">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-center">
                    {localAdvantage.headline ?? 'Your Local UX Advantage'}
                </h2>
                 {/* Render HTML content safely */}
                {localAdvantage.body_html && (
                     <div
                        className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground" // Adjust prose classes
                        dangerouslySetInnerHTML={{ __html: localAdvantage.body_html }}
                    />
                )}
            </ContentSection>

            <ContentSection id="local-services" className="bg-secondary/50">
                 <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-center">
                    {localServices.headline ?? 'Services for Minneapolis Organizations'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                     {/* Use the new ServiceCard component with fetched/defined services */}
                     {relevantServices.map((service) => (
                         <ServiceCard
                            key={service.id}
                            title={service.title}
                            description={service.description}
                            link={service.link}
                         />
                    ))}
                </div>
            </ContentSection>

            {/* Use existing Testimonials Section with fetched testimonials */}
            {testimonials.length > 0 && (
                <TestimonialsSection
                    headline={testimonialsMeta.headline ?? 'What Minneapolis Clients Say'}
                    testimonials={testimonials}
                />
            )}

            {/* Final CTA Section */}
            <ContentSection id="local-cta" variant="narrow" className="text-center border-t">
                 <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    {finalCta.headline ?? 'Ready to Elevate Your User Experience?'}
                </h2>
                 {finalCta.body && (
                    <p className="text-lg md:text-xl text-muted-foreground mb-8">
                        {finalCta.body}
                    </p>
                 )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {/* Primary CTA Button */}
                    {finalCta.primaryCta && finalCta.primaryCtaHref && (
                         <Button asChild size="lg">
                            <Link href={finalCta.primaryCtaHref}>{finalCta.primaryCta}</Link>
                        </Button>
                    )}
                    {/* Secondary CTA Button */}
                     {finalCta.secondaryCta && finalCta.secondaryCtaHref && (
                        <Button asChild size="lg" variant="outline">
                            <Link href={finalCta.secondaryCtaHref}>{finalCta.secondaryCta}</Link>
                        </Button>
                     )}
                </div>
            </ContentSection>
        </main>
    );
}