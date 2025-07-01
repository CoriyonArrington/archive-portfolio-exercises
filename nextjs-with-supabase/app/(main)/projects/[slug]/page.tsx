// app/(main)/projects/[slug]/page.tsx

import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { Database, Json } from '@/types/supabase';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { siteConfig } from '@/config/site';

// --- Import Components ---
import HeroSection from '@/components/page-sections/hero-section';
import TestimonialsSection from '@/components/page-sections/testimonials-section';
import CtaSection from '@/components/page-sections/cta-section';
import { Badge } from '@/components/ui/badge';
import ProjectImage from '@/components/common/project-image';

// --- Define Types ---
interface ProjectTag { id: string; project_id: string; tag: string; created_at: string | null; }
type Testimonial = Database['public']['Tables']['testimonials']['Row'];

// Add hero_cta to ProjectContent interface
interface ProjectContent {
    overview?: string | null;
    challenge?: string | null;
    solution?: string | null;
    results?: string | null;
    visuals?: { url: string; alt: string }[] | null;
    client_name?: string | null;
    year?: number | string | null;
    image_url?: string | null; // Keep if used elsewhere
    hero_cta?: string | null; // <-- Added optional hero CTA text field
}

// ProjectTypeDetail (no changes needed)
type ProjectTypeDetail = Database['public']['Tables']['projects']['Row'] & {
    content: Json | null;
    project_tags: ProjectTag[] | null;
    og_image_url?: string | null;
};

// --- Generate Dynamic Metadata --- (no changes needed)
type Props = { params: { slug: string }; searchParams: { [key: string]: string | string[] | undefined }; };
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const supabase = await createClient();
  const slug = params.slug;
  const { data: project, error } = await supabase
    .from('projects')
    .select('title, description, og_image_url')
    .eq('slug', slug)
    .maybeSingle();
  if (error) {
    console.error("Error fetching project metadata:", error.message);
    return { title: 'Error Loading Project', description: 'Could not load project details.', robots: { index: false, follow: false }, };
  }
  if (!project) {
    return { title: 'Project Not Found', description: 'The requested project could not be found.', robots: { index: false, follow: false }, };
  }
  const previousImages = (await parent).openGraph?.images || [];
  const imageUrl = project.og_image_url || siteConfig.ogImage;
  return {
    title: project.title || 'Project Case Study',
    description: project.description || siteConfig.description,
    openGraph: {
      title: project.title || siteConfig.name,
      description: project.description || siteConfig.description,
      url: `${siteConfig.url}/projects/${slug}`,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: project.title || 'Project Image', }, ...previousImages, ],
    },
    twitter: {
        card: "summary_large_image",
        title: project.title || siteConfig.name,
        description: project.description || siteConfig.description,
        images: [imageUrl],
    },
  };
}

// --- Data Fetching Function --- (no changes needed)
async function fetchProjectData(slug: string): Promise<{ project: ProjectTypeDetail | null; testimonial: Testimonial | null }> {
    const supabase = createClient();
    const { data: projectData, error: projectError } = await supabase
        .from('projects').select('*, project_tags!left(id, project_id, tag, created_at)')
        .eq('slug', slug).maybeSingle();
    if (projectError) { console.error(`Error fetching project data:`, projectError.message); return { project: null, testimonial: null }; }
    if (!projectData) { return { project: null, testimonial: null }; }
    let testimonialData: Testimonial | null = null;
    const { data: testimonialResult, error: testimonialError } = await supabase
        .from('testimonials').select('*')
        .eq('project_id', projectData.id).limit(1).maybeSingle();
    if (testimonialError) { console.warn(`Warning: Error fetching testimonial:`, testimonialError.message); }
    else { testimonialData = testimonialResult as Testimonial | null; }
    const project = projectData as ProjectTypeDetail;
    return { project, testimonial: testimonialData };
}

// --- Page Component ---
export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
    const { project, testimonial } = await fetchProjectData(params.slug);
    if (!project) { notFound(); }

    let projectContent: ProjectContent = {};
    // Parse content safely
    if (project.content && typeof project.content === 'object' && !Array.isArray(project.content)) {
         projectContent = project.content as ProjectContent;
    }

    // Extract data (including hero_cta)
    const title = project.title ?? 'Project Details';
    const description = project.description ?? '';
    const tags = project.project_tags ?? [];
    const clientName = projectContent.client_name ?? (project as any).client_name ?? 'Confidential Client';
    const projectYear = projectContent.year ?? (project as any).year ?? new Date().getFullYear();
    const resultsContent = projectContent.results;
    const overviewContent = projectContent.overview;
    const challengeContent = projectContent.challenge;
    const solutionContent = projectContent.solution;
    const visuals = projectContent.visuals ?? [];
    const heroCtaText = projectContent.hero_cta; // Extract potential CTA text
    const testimonialSectionHeadline = "Client Feedback";
    const fallbackImageUrl = "https://lwanuwbdwxlcbnwiricu.supabase.co/storage/v1/object/public/project-visuals/600x400.svg";

    return (
        <main>
            {/* 1. Project Hero - Pass dynamic or null CTA */}
            <HeroSection
                id={`project-${project.slug}-hero`}
                headline={title}
                subheadline={description}
                cta={heroCtaText ?? null} // <-- Pass dynamic text or null
                // Removed ctaLink
                />

            {/* --- Main Content Area --- */}
            <div className="container py-12 md:py-16 lg:py-20 space-y-12 md:space-y-16">
                 {/* Render sections based on available content */}
                {resultsContent && ( <section aria-labelledby="results-heading"><h2 id="results-heading" className="text-2xl md:text-3xl font-semibold mb-4">Results & Outcomes</h2><div className="prose dark:prose-invert max-w-none"><p>{resultsContent}</p></div></section> )}
                {testimonial && ( <TestimonialsSection headline={testimonialSectionHeadline} testimonials={[testimonial]} /> )}
                {overviewContent && ( <section aria-labelledby="overview-heading"><h2 id="overview-heading" className="text-2xl md:text-3xl font-semibold mb-4">Project Overview</h2><div className="prose dark:prose-invert max-w-none"><p>{overviewContent}</p></div></section> )}
                {/* Project Meta Section */}
                <section aria-labelledby="meta-heading" className="bg-muted p-6 rounded-lg">
                    <h2 id="meta-heading" className="text-xl font-semibold mb-4">Project Details</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div><span className="font-medium block text-muted-foreground">Client</span><span>{clientName}</span></div>
                        <div><span className="font-medium block text-muted-foreground">Year</span><span>{projectYear}</span></div>
                        {tags.length > 0 && (
                            <div className="col-span-2 md:col-span-2">
                                <span className="font-medium block text-muted-foreground mb-1">Tags / Technologies</span>
                                <div className="flex flex-wrap gap-2">{tags.map((tag) => (<Badge key={tag.id} variant="secondary">{tag.tag || 'Tag'}</Badge>))}</div>
                            </div>
                        )}
                    </div>
                </section>
                {challengeContent && ( <section aria-labelledby="challenge-heading"><h2 id="challenge-heading" className="text-2xl md:text-3xl font-semibold mb-4">The Challenge</h2><div className="prose dark:prose-invert max-w-none"><p>{challengeContent}</p></div></section> )}
                {solutionContent && ( <section aria-labelledby="solution-heading"><h2 id="solution-heading" className="text-2xl md:text-3xl font-semibold mb-4">The Solution & Process</h2><div className="prose dark:prose-invert max-w-none"><p>{solutionContent}</p></div></section> )}
                {/* Visuals Section */}
                 {visuals.length > 0 && (
                    <section aria-labelledby="visuals-heading">
                        <h2 id="visuals-heading" className="text-2xl md:text-3xl font-semibold mb-4">Visuals</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {visuals.map((visual, index) => (
                                <ProjectImage key={index} src={visual.url} alt={visual.alt || `Project visual ${index + 1}`} className="rounded-lg shadow-md w-full object-cover aspect-video" fallbackSrc={fallbackImageUrl} width={800} height={450} />
                            ))}
                        </div>
                    </section>
                )}

            </div> {/* End Container */}

            {/* 9. Call to Action */}
            <CtaSection headline="Have a similar project?" body="Let's discuss how I can help you achieve your goals." cta="Get in Touch" />
        </main>
    );
}