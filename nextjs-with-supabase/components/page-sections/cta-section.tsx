// components/page-sections/cta-section.tsx (Corrected Props and Styles)
import React from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button'; // Use buttonVariants
import { H2, P } from '@/components/typography';
import type { CTAProps } from '@/types/cta';
import { cn } from '@/lib/utils';

// Extend props to include an optional href and className
interface FlexibleCTAProps extends CTAProps {
    href?: string;
    className?: string; // Ensure className is part of the interface
    body?: string | null;
}

export default function CTASection({
  headline,
  body,
  cta,
  href = '/contact',
  className, // Ensure className is destructured
}: FlexibleCTAProps) {
  const hasValidCta = cta && cta.trim() !== '';

  return (
    <section
      id="cta"
      // --- UPDATED: Removed border-t, only vertical padding ---
      className={cn(
        "py-16 md:py-24", // Removed border-t
        className
       )}
     >
      {/* Inner container: Apply consistent padding & max-width */}
      {/* --- UPDATED: Added explicit horizontal padding --- */}
      <div className="container mx-auto text-center max-w-3xl px-4 md:px-8">
        <H2 className="mb-4">{headline ?? 'Ready to Start?'}</H2>

        {body && (
          <P className="text-lg md:text-xl text-muted-foreground mb-8">
              {body}
          </P>
        )}

        {hasValidCta && (
          <Link
            href={href}
            className={cn(buttonVariants({ size: 'lg', variant: 'default' }))} // Primary variant
          >
            {cta}
          </Link>
        )}
      </div>
    </section>
  );
}