// app/(main)/page.tsx (Updated to include BlogSection)

import type { Metadata } from 'next';
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import type { Database, Json } from '@/types/supabase';
import { siteConfig } from '@/config/site';

// Import ALL section components (INCLUDING NEW BlogSection)
import HeroSection from '@/components/page-sections/hero-section';
import WhyUXSection from '@/components/page-sections/why-ux-section';
import TestimonialsSection from '@/components/page-sections/testimonials-section';
import ServicesSection from '@/components/page-sections/services-section';
import ProcessSection from '@/components/page-sections/process-section';
import ProjectsSection from '@/components/page-sections/projects-section';
import AboutSection from '@/components/page-sections/about-section';
import FaqSection from '@/components/page-sections/faq-section';
import BlogSection from '@/components/page-sections/blog-section'; // <-- Import New Section
import CTASection from '@/components/page-sections/cta-section';

// Import ALL relevant types (INCLUDING NEW Blog types)
import type { HeroProps } from '@/types/hero';
import type { Problem, Solution, WhyUXContentProps } from '@/types/why-ux'; // Removed WhyUXProps if not used directly
import type { Testimonial, TestimonialsSectionProps } from '@/types/testimonials';
import type { Service, ServicesSummaryProps } from '@/types/services';
import type { ProcessPhase, ProcessSectionProps } from '@/types/process';
import type { Project, ProjectsSectionProps } from '@/types/project';
import type { AboutProps } from '@/types/about';
import type { Faq, FaqSectionProps } from '@/types/faq';
import type { PostForList, BlogSectionProps } from '@/types/blog'; // <-- Import New Types
import type { CTAProps } from '@/types/cta';
// Import Typography for error message
import { H1, P } from '@/components/typography';

// Type for the 'content' field JSONB (Corrected Pick syntax)
interface HomePageJsonContent {
  hero?: HeroProps;
  why_ux?: WhyUXContentProps;
  // Corrected: Use '|' for union of keys in Pick
  testimonials?: Pick<TestimonialsSectionProps, 'headline' | 'body'>;
  services?: Pick<ServicesSummaryProps, 'headline' | 'body' | 'cta' | 'href'>; // Fixed: '|' used
  process?: Pick<ProcessSectionProps, 'headline' | 'body' | 'cta' | 'href'>; // Fixed: '|' used
  case_studies?: Pick<ProjectsSectionProps, 'headline' | 'body' | 'cta' | 'href'>; // Fixed: '|' used
  about?: AboutProps;
  faqs?: Pick<FaqSectionProps, 'headline' | 'body' | 'cta' | 'href'>; // Fixed: '|' used
  blog?: Pick<BlogSectionProps, 'headline' | 'body' | 'cta' | 'href'>; // Fixed: '|' used
  final_cta?: CTAProps;
}

// Expected structure from DB join
type ProblemWithIcon = Problem & { icon_id: { name: string | null } | null };
type SolutionWithIcon = Solution & { icon_id: { name: string | null } | null };
type ProjectWithTags = Project & { project_tags: { tag: string }[] };

// Update HomePageData type (ADD posts)
type HomePageData = {
  pageContent: HomePageJsonContent | null;
  problems: ProblemWithIcon[];
  solutions: SolutionWithIcon[];
  testimonials: Testimonial[];
  services: Service[];
  processPhases: ProcessPhase[];
  projects: ProjectWithTags[];
  faqs: Faq[];
  posts: PostForList[]; // <-- Add posts array
};

async function fetchHomepageData(): Promise<HomePageData> {
    const supabase = createClient();
    const pageSlug = 'home';
    const now = new Date().toISOString(); // Get current time for post filtering

    // Add query for recent blog posts
    const [
        pageResult, problemsResult, solutionsResult, testimonialsResult,
        servicesResult, processPhasesResult, projectsResult, faqsResult,
        postsResult // <-- Add posts result
      ] = await Promise.all([
      supabase.from('pages').select('content').eq('slug', pageSlug).single(),
      supabase.from('problems').select('*, icon_id ( name ), problem_page_slugs!inner(page_slug)').eq('problem_page_slugs.page_slug', pageSlug),
      supabase.from('solutions').select('*, icon_id ( name ), solution_page_slugs!inner(page_slug)').eq('solution_page_slugs.page_slug', pageSlug),
      supabase.from('testimonials').select('*').eq('featured', true).order('sort_order', { ascending: true }),
      supabase.from('services').select('*').eq('featured', true).order('sort_order', { ascending: true }),
      supabase.from('process_phases').select('*').order('sort_order', { ascending: true }),
      supabase.from('projects').select('*, project_tags(tag)').eq('featured', true).order('sort_order', { ascending: true }),
      supabase.from('faqs').select('*, faq_page_slugs!inner(page_slug)').eq('faq_page_slugs.page_slug', pageSlug),
      // --- Query for recent blog posts (limit 3) ---
      supabase.from('posts')
        .select('slug, title, excerpt, published_at, featured_image_url, tags') // Select fields needed for PostForList/BlogPostCard
        .eq('status', 'published')
        .lte('published_at', now)
        .order('published_at', { ascending: false })
        .limit(3) // <-- Limit to 3 most recent posts
    ]);

    // --- Handle Page Content ---
    let fetchedPageContent: HomePageJsonContent | null = null;
    if (pageResult.error) {
        console.error(`Error fetching content for page '${pageSlug}':`, pageResult.error);
    } else if (pageResult.data?.content) {
        const rawContent = pageResult.data.content;
        if (typeof rawContent === 'object' && rawContent !== null && !Array.isArray(rawContent)) {
            fetchedPageContent = rawContent as HomePageJsonContent;
        } else {
            console.error("Fetched page content is not a valid object:", rawContent);
        }
    }

    // --- Log Errors for all fetches ---
    if (problemsResult.error) console.error(`Error fetching problems for page '${pageSlug}':`, problemsResult.error);
    if (solutionsResult.error) console.error(`Error fetching solutions for page '${pageSlug}':`, solutionsResult.error);
    if (testimonialsResult.error) console.error(`Error fetching testimonials for page '${pageSlug}':`, testimonialsResult.error);
    if (servicesResult.error) console.error(`Error fetching services for page '${pageSlug}':`, servicesResult.error);
    if (processPhasesResult.error) console.error(`Error fetching process phases for page '${pageSlug}':`, processPhasesResult.error);
    if (projectsResult.error) console.error(`Error fetching projects for page '${pageSlug}':`, projectsResult.error);
    if (faqsResult.error) console.error(`Error fetching faqs for page '${pageSlug}':`, faqsResult.error);
    if (postsResult.error) console.error(`Error fetching posts for page '${pageSlug}':`, postsResult.error); // <-- Log post errors


    // --- Return all data ---
    return {
      pageContent: fetchedPageContent,
      problems: (problemsResult.data as ProblemWithIcon[] | null) ?? [],
      solutions: (solutionsResult.data as SolutionWithIcon[] | null) ?? [],
      testimonials: (testimonialsResult.data as Testimonial[] | null) ?? [],
      services: (servicesResult.data as Service[] | null) ?? [],
      processPhases: (processPhasesResult.data as ProcessPhase[] | null) ?? [],
      projects: (projectsResult.data as ProjectWithTags[] | null) ?? [],
      faqs: (faqsResult.data as Faq[] | null) ?? [],
      posts: (postsResult.data as PostForList[] | null) ?? [], // <-- Assign fetched posts
    };
}

// Metadata (remains static for now)
export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

// --- Page Component ---
export default async function HomePage() {
  const {
      pageContent,
      problems,
      solutions,
      testimonials,
      services,
      processPhases,
      projects,
      faqs,
      posts // <-- Destructure posts
    } = await fetchHomepageData();

  if (!pageContent) {
    // ... Error handling remains the same ...
    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <H1>Error</H1>
            <P className="text-muted-foreground">
                Homepage content could not be loaded. Please try again later.
            </P>
        </div>
    );
  }

  // Extract content for each section (INCLUDING NEW blog section content)
  const heroData = pageContent.hero;
  const whyUxData = pageContent.why_ux;
  const testimonialData = pageContent.testimonials;
  const serviceContentData = pageContent.services;
  const processContentData = pageContent.process;
  const projectContentData = pageContent.case_studies;
  const aboutData = pageContent.about;
  const faqContentData = pageContent.faqs;
  const blogContentData = pageContent.blog; // <-- Extract Blog Content Config
  const ctaData = pageContent.final_cta;

  return (
    <>
      {/* --- Render ALL Sections including BlogSection --- */}

      {heroData && ( <HeroSection {...heroData} href={heroData.href ?? '/contact'} /> )}
      {whyUxData && (problems.length > 0 || solutions.length > 0) && ( <WhyUXSection {...whyUxData} problems={problems} solutions={solutions} href={whyUxData.href ?? '/solutions'} /> )}
      {testimonialData?.headline && testimonials.length > 0 && ( <TestimonialsSection {...testimonialData} testimonials={testimonials} /> )}
      {serviceContentData && services.length > 0 && ( <ServicesSection {...serviceContentData} service_list={services} href={serviceContentData.href} /> )}
      {processContentData && processPhases.length > 0 && ( <ProcessSection {...processContentData} process={processPhases} href={processContentData.href} /> )}
      {projectContentData && projects.length > 0 && ( <ProjectsSection {...projectContentData} projects={projects} href={projectContentData.href}/> )}
      {aboutData && ( <AboutSection {...aboutData} /> )}
      {faqContentData && faqs.length > 0 && ( <FaqSection {...faqContentData} faqs={faqs} href={faqContentData.href}/> )}

      {/* --- Render Blog Section (conditionally on posts existing) --- */}
      {/* Render even if blogContentData is missing, using fallbacks, but only if posts exist */}
      {posts.length > 0 && (
        <BlogSection
            headline={blogContentData?.headline} // Access content safely
            body={blogContentData?.body}
            cta={blogContentData?.cta}
            href={blogContentData?.href ?? '/blog'} // Use content href or default
            posts={posts} // Pass the fetched posts
        />
       )}

      {/* --- Render Final CTA Section --- */}
      {ctaData && ( <CTASection {...ctaData} /> )}
    </>
  );
}