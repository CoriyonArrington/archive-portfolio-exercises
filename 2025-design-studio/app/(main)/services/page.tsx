// app/(main)/services/page.tsx
import React from 'react';
import { supabase } from '@/lib/utils/supabaseClient';
import HeroSection from '@/components/page-sections/hero-section';
import ServicesSummary from '@/components/page-sections/services-section';
import WhyUXSection from '@/components/page-sections/why-ux-section';
import ProcessSection from '@/components/page-sections/process-section';
import CtaSection from '@/components/page-sections/cta-section';

export const metadata = {
  title: 'UX Design & Full-Stack App Development Services | Coriyon’s Studio',
  description:
    'UX strategy, research, audits, mobile app design, and AI-powered app development for health, wellness, education, and tech brands.',
};

export default async function ServicesPage() {
  // Load CMS content for services
  const { data: pageRow, error: pageError } = await supabase
    .from('pages')
    .select('content')
    .eq('slug', 'services')
    .single();
  if (pageError) console.error('Error loading services page:', pageError);

  const content = pageRow?.content ?? {};
  const hero = content.hero ?? { headline: '', subheadline: '', cta: '' };
  const servicesMeta = content.services ?? {
    headline: 'Our Services',
    body: '',
    cta: '→ Explore our work',
  };
  const whyMeta = content.why_ux ?? {
    headline: 'Good UX makes products better — and businesses stronger.',
    body:
      'These examples show how human‑centered design improves interfaces and outcomes — from higher retention to fewer support tickets.',
    cta: '→ Start your project',
  };
  const processMeta = content.process ?? {
    headline: '',
    body: '',
    cta: '→ Learn how we work',
  };
  const finalCTA = content.cta ?? {
    headline: 'Let’s make something better together.',
    body: '',
    cta: '→ Start your project',
  };

  // Fetch all services
  const { data: servicesList, error: svcError } = await supabase
    .from('services')
    .select('*')
    .order('priority', { ascending: true });
  if (svcError) console.error('Error loading services list:', svcError);

  // Fetch only the problems & solutions tagged for services
  const { data: problems, error: pErr } = await supabase
    .from('problems')
    .select('*')
    .contains('page_slugs', ['services']);
  if (pErr) console.error('Error loading problems:', pErr);

  const { data: solutions, error: sErr } = await supabase
    .from('solutions')
    .select('*')
    .contains('page_slugs', ['services']);
  if (sErr) console.error('Error loading solutions:', sErr);

  return (
    <main>
      <HeroSection
        id="services-hero"
        headline={hero.headline}
        subheadline={hero.subheadline}
        cta={hero.cta}
      />

      <ServicesSummary
        headline={servicesMeta.headline}
        body={servicesMeta.body}
        service_list={servicesList || []}
        cta={servicesMeta.cta}
      />

      <WhyUXSection
        headline={whyMeta.headline}
        body={whyMeta.body}
        cta={whyMeta.cta}
        problems={problems || []}
        solutions={solutions || []}
      />

      <ProcessSection
        headline={processMeta.headline}
        body={processMeta.body}
        cta={processMeta.cta}
        process={content.process_phases || []}
      />

      <CtaSection
        headline={finalCTA.headline}
        body={finalCTA.body}
        cta={finalCTA.cta}
      />
    </main>
  );
}
