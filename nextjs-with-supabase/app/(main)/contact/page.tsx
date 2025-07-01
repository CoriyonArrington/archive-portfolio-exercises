// app/(main)/contact/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { Database, Json } from '@/types/supabase';
import { siteConfig } from '@/config/site'; // Import siteConfig for fallback

// Import page sections/components
import HeroSection from '@/components/page-sections/hero-section';
import ContactForm from '@/components/forms/contact-form';

// Define type for the page content JSON
interface ContactPageContent {
    hero?: { headline?: string; subheadline?: string; cta?: string | string[] | null };
    contactFields?: string[];
    location?: { body?: string };
}

// Define metadata (Using your previous values, added fallback)
export const metadata: Metadata = {
    title: 'Contact Coriyon’s Studio | Minneapolis UX Design',
    description: 'Get in touch with Coriyon’s Studio to discuss your UX design or development project.' || siteConfig.description, // Fallback added
};

// Async function to fetch data remains the same...
async function fetchContactPageData() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('pages')
        .select('content')
        .eq('slug', 'contact')
        .single();
    // Error handling remains the same...
    if (error) {
        console.error('Error loading contact page content:', error.message);
    }
    const pageContent = (data?.content ?? {}) as ContactPageContent;
    // Logging remains the same...
    console.log('Fetched Contact Page Content:', JSON.stringify(pageContent, null, 2));
    const defaultFields = ["Your Name", "Your Email", "Your Message"];
    const contactFields = Array.isArray(pageContent.contactFields) && pageContent.contactFields.length > 0
        ? pageContent.contactFields
        : defaultFields;

    return { pageContent, fields: contactFields as [string, string, string] };
}

// Default export component remains the same...
export default async function ContactPage() {
    const { pageContent, fields } = await fetchContactPageData();
    const heroData = pageContent.hero ?? {
        headline: "Get in Touch",
        subheadline: "We'd love to hear from you.",
        cta: null,
    };
    const heroCtaLabel = Array.isArray(heroData.cta) && heroData.cta.length > 0
        ? heroData.cta[0]
        : typeof heroData.cta === 'string'
            ? heroData.cta
            : null;

    return (
        <main>
            <HeroSection
                id="contact-hero"
                headline={heroData.headline}
                subheadline={heroData.subheadline}
                cta={heroCtaLabel}
                ctaLink={heroCtaLabel ? "/contact" : undefined}
            />
            <ContactForm fields={fields} />
        </main>
    );
}