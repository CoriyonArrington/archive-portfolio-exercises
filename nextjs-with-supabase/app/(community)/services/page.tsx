// app/(main)/services/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { Database, Json } from '@/types/supabase';
import { siteConfig } from '@/config/site'; // Import siteConfig for fallback

// Import page section components
import HeroSection from '@/components/page-sections/hero-section';
import ServicesSection from '@/components/page-sections/services-section';
import WhyUXSection from '@/components/page-sections/why-ux-section';
import ProcessSection from '@/components/page-sections/process-section';
import CtaSection from '@/components/page-sections/cta-section';

// Define types for fetched data
type Service = Database['public']['Tables']['services']['Row'];
type Problem = Database['public']['Tables']['problems']['Row'];
type Solution = Database['public']['Tables']['solutions']['Row'];
interface ProcessPhase {
    id: string;
    title?: string | null;
    description?: string | null;
    sort_order?: number | null;
}

// Define type for the page content JSON
interface ServicesPageContent {
    hero?: { headline?: string; subheadline?: string; cta?: string };
    services?: { headline?: string; body?: string; cta?: string };
    why_ux?: { headline?: string; body?: string; cta?: string };
    process?: { headline?: string; body?: string; cta?: string };
    cta?: { headline?: string; body?: string; cta?: string };
}

// Define metadata (Using your previous values, added fallback)
export const metadata: Metadata = {
    title: 'UX Design & Full-Stack App Development Services | Coriyon’s Studio',
    description: 'UX strategy, research, audits, mobile app design, and AI-powered app development for health, wellness, education, and tech brands.' || siteConfig.description, // Fallback added
};

// Async function to fetch data remains the same...
async function fetchServicesPageData() {
    const supabase = createClient();
    const [ pageResult, servicesResult, problemsResult, solutionsResult, processPhasesResult ] = await Promise.all([
        supabase.from('pages').select('content').eq('slug', 'services').single(),
        supabase.from('services').select('*').order('sort_order', { ascending: true }),
        supabase.from('problems').select('*, problem_page_slugs!inner(page_slug)').eq('problem_page_slugs.page_slug', 'services'),
        supabase.from('solutions').select('*, solution_page_slugs!inner(page_slug)').eq('solution_page_slugs.page_slug', 'services'),
        supabase.from('process_phases').select('*').order('sort_order', { ascending: true }),
    ]);
    // Error handling remains the same...
    if (pageResult.error) console.error('Error loading services page content:', pageResult.error.message);
    if (servicesResult.error) console.error('Error loading services list:', servicesResult.error.message);
    if (problemsResult.error) console.error('Error loading problems for services:', problemsResult.error.message);
    if (solutionsResult.error) console.error('Error loading solutions for services:', solutionsResult.error.message);
    if (processPhasesResult.error) console.error('Error loading process phases:', processPhasesResult.error.message);

    const pageContent = (pageResult.data?.content ?? {}) as ServicesPageContent;
    const services: Service[] = servicesResult.data ?? [];
    const problems: Problem[] = problemsResult.data ?? [];
    const solutions: Solution[] = solutionsResult.data ?? [];
    const processPhases: ProcessPhase[] = processPhasesResult.data ?? [];

    return { pageContent, services, problems, solutions, processPhases };
}

// Default export component remains the same...
export default async function ServicesPage() {
    const { pageContent, services, problems, solutions, processPhases } =
        await fetchServicesPageData();

    const hero = pageContent.hero ?? {};
    const servicesMeta = pageContent.services ?? {};
    const whyMeta = pageContent.why_ux ?? {};
    const processMeta = pageContent.process ?? {};
    const finalCTA = pageContent.cta ?? {};

    return (
        <main>
            <HeroSection
                id="services-hero"
                headline={hero.headline}
                subheadline={hero.subheadline}
                cta={hero.cta}
                ctaLink="/contact"
            />
            <ServicesSection
                headline={servicesMeta.headline}
                body={servicesMeta.body}
                service_list={services}
                cta={servicesMeta.cta}
                ctaLink="/work"
            />
            <WhyUXSection
                headline={whyMeta.headline}
                body={whyMeta.body}
                cta={whyMeta.cta}
                ctaLink="/contact"
                problems={problems}
                solutions={solutions}
            />
            <ProcessSection
                headline={processMeta.headline}
                body={processMeta.body}
                cta={processMeta.cta}
                ctaLink="/about#process"
                process={processPhases}
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