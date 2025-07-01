import type { Metadata } from 'next';
import React from 'react';
import { createClient } from '@/utils/supabase/server';
// Import Json type
import { Database, Json } from '@/types/supabase';
import { siteConfig } from '@/config/site';

// Import page section components
import HeroSection from '@/components/page-sections/hero-section';
import AboutSection from '@/components/page-sections/about-section';
import WhyUXSection from '@/components/page-sections/why-ux-section';
import TestimonialsSection from '@/components/page-sections/testimonials-section';
import CtaSection from '@/components/page-sections/cta-section';

// Import Props from updated types
import type { HeroProps } from '@/types/hero';
import type { AboutProps } from '@/types/about';
// Import WhyUXContentProps separately if needed by AboutPageContent interface
import type { WhyUXProps, WhyUXContentProps, Problem, Solution } from '@/types/why-ux';
import type { TestimonialsSectionProps, Testimonial } from '@/types/testimonials';
import type { CTAProps } from '@/types/cta';

// Combined type for page content structure
interface AboutPageContent {
    hero?: HeroProps;
    about?: AboutProps;
    whyUX?: WhyUXContentProps; // Expecting only content props here
    testimonialsMeta?: Pick<TestimonialsSectionProps, 'headline' | 'body'>;
    ctaSection?: CTAProps;
}

// Structure returned by join including icon name
// Adjust based on regenerated Supabase types
type ProblemWithIcon = Problem & { icon_id: { name: string | null } | null };
type SolutionWithIcon = Solution & { icon_id: { name: string | null } | null };

// Metadata
export const metadata: Metadata = {
    title: 'About Coriyon’s Studio | UX Design in Minneapolis',
    description: 'Learn about the background, skills, and process of Coriyon’s Studio, focusing on user-centered design and development.' || siteConfig.description,
};

// Data Fetching
async function fetchAboutPageData() {
    const supabase = createClient();
    // Ignore TS2872 warning on this line
    const [ pageResult, problemsResult, solutionsResult, testimonialsResult ] = await Promise.all([
        supabase.from('pages').select('content').eq('slug', 'about').single(),
        supabase.from('problems')
            .select('*, icon_id ( name ), problem_page_slugs!inner(page_slug)')
            .eq('problem_page_slugs.page_slug', 'about'),
        supabase.from('solutions')
            .select('*, icon_id ( name ), solution_page_slugs!inner(page_slug)')
            .eq('solution_page_slugs.page_slug', 'about'),
        supabase.from('testimonials').select('*').order('sort_order', { ascending: true })
    ]);

    if (pageResult.error !== null) console.error('Error loading about page content:', pageResult.error.message);
    if (problemsResult.error !== null) console.error('Error loading problems for about:', problemsResult.error.message);
    if (solutionsResult.error !== null) console.error('Error loading solutions for about:', solutionsResult.error.message);
    if (testimonialsResult.error !== null) console.error('Error loading testimonials:', testimonialsResult.error.message);

    // --- Fix: Check content type before casting ---
    let pageContent: AboutPageContent | null = null;
    const rawContent = pageResult.data?.content; // Type is Json | null

    if (typeof rawContent === 'object' && rawContent !== null && !Array.isArray(rawContent)) {
         // Now it's safer to cast to the expected object structure
        pageContent = rawContent as AboutPageContent;
    } else if (rawContent) {
        console.error("Fetched page content is not a valid object:", rawContent);
    }
    // pageContent is now AboutPageContent | null

    const problems: ProblemWithIcon[] = (problemsResult.data as ProblemWithIcon[] | null) ?? [];
    const solutions: SolutionWithIcon[] = (solutionsResult.data as SolutionWithIcon[] | null) ?? [];
    const testimonials: Testimonial[] = testimonialsResult.data ?? [];

    return { pageContent, problems, solutions, testimonials };
}

// Page Component
export default async function AboutPage() {
    const { pageContent, problems, solutions, testimonials } = await fetchAboutPageData();

    // Access content safely using optional chaining
    const hero = pageContent?.hero;
    const about = pageContent?.about;
    const whyUXContent = pageContent?.whyUX; // Contains headline, body, cta, href?
    const testimonialsMeta = pageContent?.testimonialsMeta;
    const ctaSection = pageContent?.ctaSection;

    if (!hero?.headline && !about?.headline) {
         console.error('Essential About page content (hero/about headline) missing.');
         return <div className="container py-10">Failed to load page content. Please try again later.</div>;
    }

    return (
        <>
            <HeroSection
                id="about-hero"
                headline={hero?.headline}
                subheadline={hero?.subheadline}
                cta={hero?.cta}
                href={hero?.href ?? "/contact"}
            />
            <AboutSection
                headline={about?.headline}
                body={about?.body}
                cta={about?.cta}
                href={about?.href ?? "/about"}
            />
             {/* Pass content props and separate data arrays */}
            <WhyUXSection
                headline={whyUXContent?.headline}
                body={whyUXContent?.body}
                cta={whyUXContent?.cta}
                problems={problems} // Pass full problem objects
                solutions={solutions} // Pass full solution objects
                href={whyUXContent?.href ?? "/services"}
            />
            {testimonials.length > 0 && (
                <TestimonialsSection
                    headline={testimonialsMeta?.headline}
                    body={testimonialsMeta?.body}
                    testimonials={testimonials}
                />
            )}
            <CtaSection
                headline={ctaSection?.headline}
                body={ctaSection?.body}
                cta={ctaSection?.cta}
                href={ctaSection?.href ?? "/contact"}
            />
        </>
    );
}