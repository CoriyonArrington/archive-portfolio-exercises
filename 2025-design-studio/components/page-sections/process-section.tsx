// components/page-sections/process-section.tsx
import React from 'react'
import DesignProcess from '@/components/common/design-process'
import { ProcessSectionProps } from '@/types/process'

export default function ProcessSection({
  headline,
  body,
  cta,
  process,
}: ProcessSectionProps) {
  return (
    <section className="bg-muted py-12" id="process">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">{headline}</h2>
        <p className="mb-6">{body}</p>
        <a href="/process" className="text-primary-500">
          {cta}
        </a>
      </div>
      <DesignProcess processPhases={process} />
    </section>
  )
}
