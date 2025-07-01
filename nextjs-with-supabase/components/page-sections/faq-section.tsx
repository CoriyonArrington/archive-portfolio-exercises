// components/page-sections/faq-section.tsx (Updated CTA Variant)
import React from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import FaqFilter from '@/components/common/faq-filter';
import type { FaqSectionProps } from '@/types/faq';
import { H2, P } from '@/components/typography';
import { cn } from '@/lib/utils';

interface FaqSectionComponentProps extends FaqSectionProps {
    className?: string;
}

export default function FaqSection({
  headline,
  body,
  cta,
  faqs = [],
  href = '/faq',
  className,
}: FaqSectionComponentProps) {

  const hasValidCta = cta && cta.trim() !== '';

  return (
    <section id="faq" className={cn("py-16 md:py-24 mb-16 md:mb-24", className)}>
        <div className="container mx-auto text-center max-w-3xl mb-12 md:mb-16 px-4 md:px-8">
            <H2 className="mb-4">
                {headline ?? 'Frequently Asked Questions'}
            </H2>
            {body && (
                <P className="text-lg text-muted-foreground">
                    {body}
                </P>
            )}
        </div>

        <div className="container mx-auto max-w-3xl px-4 md:px-8">
            {faqs.length === 0 ? (
                <P className="text-center text-muted-foreground">
                  No FAQs available for this page.
                </P>
            ) : (
                <FaqFilter faqs={faqs} />
            )}
        </div>

        {hasValidCta && (
            <div className="container mx-auto max-w-3xl text-center mt-12 md:mt-16 px-4 md:px-8">
                {/* --- UPDATED: Changed variant to secondary --- */}
                <Link
                  href={href}
                  className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }))}
                >
                    {cta}
                </Link>
                {/* --- End Update --- */}
            </div>
        )}
    </section>
  );
}