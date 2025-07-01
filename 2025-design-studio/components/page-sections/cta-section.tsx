// components/page-sections/cta-section.tsx
import React from 'react'
import { CTAProps } from '@/types/cta'

export default function CTASection({
  headline,
  body,
  cta,
}: CTAProps) {
  return (
    <section id="cta">
      <h2>{headline}</h2>
      <p>{body}</p>
      <a href="/consult">{cta}</a>
    </section>
  )
}
