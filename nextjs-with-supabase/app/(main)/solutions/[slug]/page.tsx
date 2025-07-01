// app/solutions/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import type { Database, Json } from '@/types/supabase';
import type { Metadata, ResolvingMetadata } from 'next';
import { siteConfig } from '@/config/site';

// --- Import Components ---
import HeroSection from '@/components/page-sections/hero-section';
import CtaSection from '@/components/page-sections/cta-section';
import ProjectImage from '@/components/common/project-image'; // Using ProjectImage

// --- Define Types ---
type SolutionPageData = Database['public']['Tables']['solution_pages']['Row'];

// Add hero_cta to the content interface
interface SolutionPageDetailedContent {
  overview?: string | null;
  problem_addressed?: string | null;
  approach_details?: string | null;
  key_benefits?: string | null;
  visuals?: { url: string; alt: string }[] | null;
  deliverables?: string | null;
  ideal_for?: string | null;
  hero_cta?: string | null; // <-- Added optional hero CTA text field
}

// --- Generate Dynamic Metadata ---
type MetadataProps = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

// Metadata function (no changes needed here from last version)
export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const supabase = await createClient();
  const slug = params.slug;
  const { data: solutionPage, error } = await supabase
    .from('solution_pages')
    .select('title, meta_description, og_image_url')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !solutionPage) {
     return { title: 'Solution Not Found', description: 'Could not load details.' }
  }
  const ogImageUrl = solutionPage.og_image_url || siteConfig.ogImage;
  return {
    title: solutionPage.title,
    description: solutionPage.meta_description || siteConfig.description,
    openGraph: {
        title: solutionPage.title || siteConfig.name,
        description: solutionPage.meta_description || siteConfig.description,
        url: `${siteConfig.url}/solutions/${slug}`,
        images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: solutionPage.title || 'Solution Page Image', }] : [siteConfig.ogImage],
      },
      twitter: {
        card: "summary_large_image",
        title: solutionPage.title || siteConfig.name,
        description: solutionPage.meta_description || siteConfig.description,
        images: ogImageUrl ? [ogImageUrl] : [siteConfig.ogImage],
      },
  };
}

// --- Data Fetching Function --- (no changes needed)
async function getSolutionPageBySlug(slug: string): Promise<SolutionPageData | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('solution_pages')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
    if (error) { console.error(`Error fetching Solution Page with slug ${slug}:`, error.message); return null; }
    return data;
}

// --- Page Component ---
interface SolutionPageProps {
  params: {
    slug: string;
  };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const solutionPageData = await getSolutionPageBySlug(params.slug);

  if (!solutionPageData) { notFound(); }

  let content: SolutionPageDetailedContent = {};
  // Parse content safely
  if (solutionPageData.detailed_content && typeof solutionPageData.detailed_content === 'object' && !Array.isArray(solutionPageData.detailed_content)) {
      content = solutionPageData.detailed_content as SolutionPageDetailedContent;
  }

  // Extract data (including hero_cta)
  const title = solutionPageData.title ?? 'Solution Details';
  const headline = solutionPageData.headline || title;
  const overviewContent = content.overview;
  const problemContent = content.problem_addressed;
  const approachContent = content.approach_details;
  const benefitsContent = content.key_benefits;
  const deliverablesContent = content.deliverables;
  const idealForContent = content.ideal_for;
  const visuals = content.visuals ?? [];
  const heroCtaText = content.hero_cta; // Extract potential CTA text
  const fallbackImageUrl = "https://lwanuwbdwxlcbnwiricu.supabase.co/storage/v1/object/public/project-visuals/600x400.svg";

  return (
    <main>
        {/* 1. Hero Section - Pass dynamic or null CTA */}
        <HeroSection
            id={`solution-${solutionPageData.slug}-hero`}
            headline={headline}
            subheadline={solutionPageData.meta_description ?? ''}
            cta={heroCtaText ?? null} // <-- Pass dynamic text or null
            // Removed ctaLink
            />

        {/* --- Main Content Area --- */}
        <div className="container py-12 md:py-16 lg:py-20 space-y-12 md:space-y-16">

            {/* Render sections based on available content */}
            {overviewContent && ( <section aria-labelledby="overview-heading"><h2 id="overview-heading" className="text-2xl md:text-3xl font-semibold mb-4">Overview</h2><div className="prose dark:prose-invert max-w-none"><p>{overviewContent}</p></div></section> )}
            {problemContent && ( <section aria-labelledby="problem-heading"><h2 id="problem-heading" className="text-2xl md:text-3xl font-semibold mb-4">Problem Addressed</h2><div className="prose dark:prose-invert max-w-none"><p>{problemContent}</p></div></section> )}
            {approachContent && ( <section aria-labelledby="approach-heading"><h2 id="approach-heading" className="text-2xl md:text-3xl font-semibold mb-4">Our Approach</h2><div className="prose dark:prose-invert max-w-none"><p>{approachContent}</p></div></section> )}
            {benefitsContent && ( <section aria-labelledby="benefits-heading"><h2 id="benefits-heading" className="text-2xl md:text-3xl font-semibold mb-4">Key Benefits</h2><div className="prose dark:prose-invert max-w-none"><p>{benefitsContent}</p></div></section> )}

            {/* Visuals Section */}
            {visuals.length > 0 && (
                <section aria-labelledby="visuals-heading">
                    <h2 id="visuals-heading" className="text-2xl md:text-3xl font-semibold mb-4">Visual Examples</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {visuals.map((visual, index) => (
                            <ProjectImage
                                key={index}
                                src={visual.url}
                                alt={visual.alt || `Solution visual ${index + 1}`}
                                className="rounded-lg shadow-md w-full object-cover aspect-video"
                                fallbackSrc={fallbackImageUrl}
                                width={800} height={450}
                            />
                        ))}
                    </div>
                </section>
            )}

            {deliverablesContent && ( <section aria-labelledby="deliverables-heading"><h2 id="deliverables-heading" className="text-2xl md:text-3xl font-semibold mb-4">Deliverables</h2><div className="prose dark:prose-invert max-w-none"><p>{deliverablesContent}</p></div></section> )}
            {idealForContent && ( <section aria-labelledby="ideal-for-heading" className="bg-muted p-6 rounded-lg"><h2 id="ideal-for-heading" className="text-xl font-semibold mb-4">Ideal For</h2><div className="prose dark:prose-invert max-w-none text-sm"><p>{idealForContent}</p></div></section> )}

        </div> {/* End Container */}

        {/* 9. Final Call to Action */}
        <CtaSection
            headline="Interested in this Solution?"
            body="Let's discuss how this approach can help you achieve your specific goals."
            cta="Request a Consultation"
            // Removed ctaLink prop
            />
    </main>
  );
}