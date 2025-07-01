// app/(main)/work/page.tsx

import React from 'react'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import HeroSection from '@/components/page-sections/hero-section'
import ProjectsSection from '@/components/page-sections/projects-section'
import WhyUXSection from '@/components/page-sections/why-ux-section'
import CtaSection from '@/components/page-sections/cta-section'

import type { Project } from '@/types/project'
import type { ClientProblem, ValueProposition } from '@/types/why-ux'

const supabaseAdmin: SupabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function WorkPage() {
  const { data: pageRow, error: pageError } = await supabaseAdmin
    .from('pages')
    .select('content')
    .eq('slug', 'work')
    .single()
  if (pageError) console.error('Error loading work page:', pageError)

  const content = pageRow?.content ?? {}
  const hero = content.hero ?? { headline: '', subheadline: '', cta: '' }
  const projectsMeta = content.projects ?? {
    headline: '',
    body: '',
    cta: '→ Explore our work',
  }
  const whyMeta = content.why_ux ?? {
    headline: 'Good UX makes products better — and businesses stronger.',
    body:
      'These projects highlight how clear, human-centered design improves not just interfaces, but outcomes — from increased retention to reduced support tickets.',
    cta: '→ Start your project',
  }
  const finalCTA = content.cta ?? {
    headline: 'Ready to see your own before and after?',
    body: "Let’s create a better experience for your users.",
    cta: '→ Book a consult',
  }

  const pj = await supabaseAdmin.from('projects').select('id, title, description, slug, content')
  if (pj.error) console.error('Error loading projects:', pj.error)
  const projects = (pj.data ?? []) as Project[]

  const pr = await supabaseAdmin.from('problems').select('*').contains('page_slugs', ['work'])
  if (pr.error) console.error('Error loading problems:', pr.error)
  const problems = (pr.data ?? []) as ClientProblem[]

  const sr = await supabaseAdmin.from('solutions').select('*').contains('page_slugs', ['work'])
  if (sr.error) console.error('Error loading solutions:', sr.error)
  const solutions = (sr.data ?? []) as ValueProposition[]

  return (
    <main>
      <HeroSection
        id="work-hero"
        headline={hero.headline}
        subheadline={hero.subheadline}
        cta={hero.cta}
      />

      <ProjectsSection
        headline={projectsMeta.headline}
        body={projectsMeta.body}
        projects={projects}
        cta={projectsMeta.cta}
      />

      <WhyUXSection
        headline={whyMeta.headline}
        body={whyMeta.body}
        cta={whyMeta.cta}
        problems={problems}
        solutions={solutions}
      />

      <CtaSection headline={finalCTA.headline} body={finalCTA.body} cta={finalCTA.cta} />
    </main>
  )
}
