// components/page-sections/home-hero.tsx
import React from 'react'
import { HeroProps } from '@/types/hero'

export default function HomeHero({ headline, subheadline, cta }: HeroProps) {
  return (
    <section id="home-hero">
      {/* your custom markup & styling here */}
      <h1>{headline}</h1>
      <p>{subheadline}</p>
      <a href="/consult">{cta}</a>
    </section>
  )
}