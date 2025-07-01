// app/(main)/projects/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { Database, Json } from '@/types/supabase';
import { siteConfig } from '@/config/site'; // Import siteConfig for fallback

// Import page section components
import HeroSection from '@/components/page-sections/hero-section';
import ProjectsSection from '@/components/page-sections/projects-section';
import WhyUXSection from '@/components/page-sections/why-ux-section';
import CtaSection from '@/components/page-sections/cta-section';

// Define types for fetched data
type ProjectType = Database['public']['Tables']['projects']['Row'] & {
    project_tags?: {
        tag_id: string;
    }[] | null;
};
type Problem = Database['public']['Tables']['problems']['Row'];
type Solution = Database['public']['Tables']['solutions']['Row'];

// Define type for the page content JSON
interface ProjectsPageContent {
    hero?: { headline?: string; subheadline?: string; cta?: string };
    projects?: { headline?: string; body?: string; cta?: string };
    why_ux?: { headline?: string; body?: string; cta?: string };
    cta?: { headline?: string; body?: string; cta?: string };
}

// Define metadata (Using your previous values, added fallback)
export const metadata: Metadata = {
    title: 'Projects & Case Studies | Coriyon’s Studio',
    description: 'Explore UX design case studies and full-stack development projects showcasing improvements in user experience and business outcomes.' || siteConfig.description, // Fallback added
};

// Async function to fetch data remains the same...
async function fetchProjectsPageData() {
    const supabase = createClient();
    const [ pageResult, projectsResult, problemsResult, solutionsResult ] = await Promise.all([
        supabase.from('pages').select('content').eq('slug', 'projects').single(),
        supabase.from('projects').select('*, project_tags!left(*)').order('sort_order', { ascending: true }),
        supabase.from('problems').select('*, problem_page_slugs!inner(page_slug)').eq('problem_page_slugs.page_slug', 'projects'),
        supabase.from('solutions').select('*, solution_page_slugs!inner(page_slug)').eq('solution_page_slugs.page_slug', 'projects'),
    ]);
    // Error handling remains the same...
    if (pageResult.error) console.error('Error loading projects page content:', pageResult.error.message);
    if (projectsResult.error) console.error('Error loading projects:', projectsResult.error.message);
    if (problemsResult.error) console.error('Error loading problems for projects:', problemsResult.error.message);
    if (solutionsResult.error) console.error('Error loading solutions for projects:', solutionsResult.error.message);

    const pageContent = (pageResult.data?.content ?? {}) as ProjectsPageContent;
    const projects: ProjectType[] = (projectsResult.data as ProjectType[] | null) ?? [];
    const problems: Problem[] = problemsResult.data ?? [];
    const solutions: Solution[] = solutionsResult.data ?? [];
    // Logging remains the same...
    console.log('Fetched Projects Data for /projects page:', JSON.stringify(projectsResult, null, 2));
    console.log('Processed Projects Array Length for /projects page:', projects.length);

    return { pageContent, projects, problems, solutions };
}

// Default export component remains the same...
export default async function ProjectsPage() {
    const { pageContent, projects, problems, solutions } =
        await fetchProjectsPageData();

    const hero = pageContent.hero ?? {};
    const projectsMeta = pageContent.projects ?? {};
    const whyMeta = pageContent.why_ux ?? {};
    const finalCTA = pageContent.cta ?? {};

    return (
        <main>
            <HeroSection
                id="projects-hero"
                headline={hero.headline}
                subheadline={hero.subheadline}
                cta={hero.cta}
                ctaLink="/contact"
            />
            <ProjectsSection
                headline={projectsMeta.headline}
                body={projectsMeta.body}
                projects={projects}
                cta={projectsMeta.cta}
                ctaLink="/services"
            />
            <WhyUXSection
                headline={whyMeta.headline}
                body={whyMeta.body}
                cta={whyMeta.cta}
                ctaLink="/contact"
                problems={problems}
                solutions={solutions}
            />
            <CtaSection
                headline={finalCTA.headline}
                body={finalCTA.body}
                cta={finalCTA.cta}
                ctaLink="/contact"
            />
        </main>
    );
}