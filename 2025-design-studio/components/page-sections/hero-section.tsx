// components/page-sections/hero-section.tsx
import React from 'react'
import { HeroProps } from '@/types/hero'

interface SharedHeroProps extends HeroProps {
  /** id for the <section> so you can target it uniquely */
  id?: string
  /** link target (defaults to your consult route) */
  href?: string
}

export default function HeroSection({
  headline,
  subheadline,
  cta,
  id = 'page-hero',
  href = '/consult',
}: SharedHeroProps) {
  return (
    <section id={id}>
      <h1>{headline}</h1>
      <p>{subheadline}</p>
      <a href={href}>{cta}</a>
    </section>
  )
}
