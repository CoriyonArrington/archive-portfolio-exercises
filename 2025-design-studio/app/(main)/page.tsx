// app/(main)/page.tsx

import React from 'react'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import Hero from '@/components/page-sections/home-hero'
import About from '@/components/page-sections/about-section'
import WhyUX from '@/components/page-sections/why-ux-section'
import Services from '@/components/page-sections/services-section'
import TestimonialsSection from '@/components/page-sections/testimonials-section'
import CTA from '@/components/page-sections/cta-section'
import ProjectsSection from '@/components/page-sections/projects-section'
import ProcessSection from '@/components/page-sections/process-section'
import FaqSection from '@/components/page-sections/faq-section'

import type { ClientProblem, ValueProposition } from '@/types/why-ux'
import type { Testimonial } from '@/types/testimonials'
import type { Service } from '@/types/services'
import type { ProcessPhase } from '@/types/process'
import type { Project } from '@/types/project'
import type { FAQ } from '@/types/faq'

type HomeContent = {
  content: {
    hero?: { headline: string; subheadline: string; cta: string }
    about?: { headline: string; body: string; cta: string }
    why_ux?: { headline: string; body: string; cta: string }
    services?: { headline: string; body: string; cta: string }
    process?: { headline: string; body: string; cta: string }
    final_cta?: { headline: string; body: string; cta: string }
    case_studies?: { headline: string; body: string; cta: string }
    testimonials?: { headline: string; body: string }
    faqs?: { headline: string; body: string; cta: string }
  }
}

const supabaseAdmin: SupabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function fetchHomepageContent() {
  const { data: pageRow, error: pageError } = await supabaseAdmin
    .from('pages')
    .select('content')
    .eq('slug', 'home')
    .single()

  if (pageError || !pageRow) {
    console.error('Error fetching homepage content:', pageError)
    return null
  }

  // fetch & coalesce, then cast
  const pr = await supabaseAdmin.from('problems').select('*')
  if (pr.error) console.error('Error fetching problems:', pr.error)
  const problems = (pr.data ?? []) as ClientProblem[]

  const sr = await supabaseAdmin.from('solutions').select('*')
  if (sr.error) console.error('Error fetching solutions:', sr.error)
  const solutions = (sr.data ?? []) as ValueProposition[]

  const srv = await supabaseAdmin
    .from('services')
    .select('*')
    .eq('featured', true)
    .order('priority', { ascending: true })
    .limit(3)
  if (srv.error) console.error('Error fetching featured services:', srv.error)
  const featuredServices = (srv.data ?? []) as Service[]

  const tr = await supabaseAdmin
    .from('testimonials')
    .select('*')
    .eq('featured', true)
    .order('priority', { ascending: true })
    .limit(3)
  if (tr.error) console.error('Error fetching testimonials:', tr.error)
  const testimonials = (tr.data ?? []) as Testimonial[]

  const prj = await supabaseAdmin
    .from('projects')
    .select('id, title, description, slug, content')
    .eq('featured', true)
    .order('priority', { ascending: true })
    .limit(3)
  if (prj.error) console.error('Error fetching projects:', prj.error)
  const projects = (prj.data ?? []) as Project[]

  const proc = await supabaseAdmin
    .from('process_phases')
    .select('phase_title, description')
    .order('step_order', { ascending: true })
  if (proc.error) console.error('Error fetching process phases:', proc.error)
  const processPhases = (proc.data ?? []) as ProcessPhase[]

  const fq = await supabaseAdmin.from('faqs').select('*').contains('page_slugs', ['home'])
  if (fq.error) console.error('Error fetching FAQs:', fq.error)
  const faqs = (fq.data ?? []) as FAQ[]

  return {
    content: (pageRow as HomeContent).content,
    problems,
    solutions,
    featuredServices,
    testimonials,
    projects,
    processPhases,
    faqs,
  }
}

export default async function HomePage() {
  const data = await fetchHomepageContent()
  if (!data) {
    return <p className="text-center mt-20">Homepage content is unavailable.</p>
  }

  const {
    content,
    problems,
    solutions,
    featuredServices,
    testimonials,
    projects,
    processPhases,
    faqs,
  } = data

  const {
    hero = { headline: '', subheadline: '', cta: '' },
    about = { headline: '', body: '', cta: '' },
    why_ux = { headline: '', body: '', cta: '' },
    services: svc = { headline: '', body: '', cta: '' },
    process: proc = { headline: '', body: '', cta: '' },
    final_cta = { headline: '', body: '', cta: '' },
    case_studies = { headline: '', body: '', cta: '' },
    testimonials: tst = { headline: '', body: '' },
    faqs: fqMeta = { headline: '', body: '', cta: '' },
  } = content

  return (
    <>
      <Hero headline={hero.headline} subheadline={hero.subheadline} cta={hero.cta} />

      <WhyUX
        headline={why_ux.headline}
        body={why_ux.body}
        cta={why_ux.cta}
        problems={problems}
        solutions={solutions}
      />

      <TestimonialsSection headline={tst.headline} testimonials={testimonials} />

      <Services
        headline={svc.headline}
        body={svc.body}
        service_list={featuredServices}
        cta={svc.cta}
      />

      <ProcessSection
        headline={proc.headline}
        body={proc.body}
        cta={proc.cta}
        process={processPhases}
      />

      <ProjectsSection
        headline={case_studies.headline}
        body={case_studies.body}
        cta={case_studies.cta}
        projects={projects}
      />

      <About headline={about.headline} body={about.body} cta={about.cta} />

      <FaqSection headline={fqMeta.headline} body={fqMeta.body} cta={fqMeta.cta} faqs={faqs} />

      <CTA headline={final_cta.headline} body={final_cta.body} cta={final_cta.cta} />
    </>
  )
}
