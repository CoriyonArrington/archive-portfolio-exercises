// components/page-sections/hero-section.tsx (Updated Tablet Margins)
import React from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button'; // Use buttonVariants
import { H1, Lead } from '@/components/typography';
import { cn } from '@/lib/utils';
import type { HeroProps } from '@/types/hero';

interface HeroSectionComponentProps extends HeroProps {
  id?: string;
  className?: string;
}

export default function HeroSection({
  headline,
  subheadline,
  cta,
  href = '/contact',
  id = 'page-hero',
  className,
}: HeroSectionComponentProps) {
  const hasValidCta = cta && cta.trim() !== '';

  return (
    <section id={id} className={cn("py-16 md:py-24 text-center", className)}>
      {/* --- UPDATED: Added responsive margin --- */}
      {/* Default mb-6 (from H1 component) overridden for md+ */}
      <H1 className="mb-6 md:mb-8">
        {headline ?? 'Default Headline'}
      </H1>
      {/* --- End Update --- */}

      {/* --- UPDATED: Added responsive margin --- */}
      {subheadline && (
        // Keep mb-8 for mobile, increase to mb-10 for md+
        <Lead className="mb-8 md:mb-10 max-w-3xl mx-auto">
            {subheadline}
        </Lead>
      )}
      {/* --- End Update --- */}

      {hasValidCta && (
        <Link
          href={href}
          className={cn(buttonVariants({ size: 'lg', variant: 'default' }))}
        >
            {cta}
        </Link>
      )}
    </section>
  );
}