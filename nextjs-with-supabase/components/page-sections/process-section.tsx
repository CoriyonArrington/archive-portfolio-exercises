// components/page-sections/process-section.tsx (Final Consistent Padding)
import React from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import DesignProcess from '@/components/common/design-process';
import type { ProcessSectionProps } from '@/types/process';
import { H2, P } from '@/components/typography';
import { cn } from '@/lib/utils';

interface ProcessSectionComponentProps extends ProcessSectionProps { className?: string; }

export default function ProcessSection({ headline, body, cta, process = [], href = '/process', className }: ProcessSectionComponentProps) {
  const hasValidCta = cta && cta.trim() !== '';

  return (
    <section
      id="process"
      // Outer section handles background and vertical padding
      className={cn(
        "bg-muted py-16 md:py-24 mb-16 md:mb-24", // NO negative margins
        className
       )}
    >
      {/* Inner container for intro text, applying consistent padding & max-width */}
      <div className="container mx-auto max-w-3xl text-center mb-12 md:mb-16 px-4 md:px-8">
        <H2 className="mb-4"> {headline ?? 'My Design Process'} </H2>
        {body && ( <P className="text-lg text-muted-foreground"> {body} </P> )}
      </div>

      {/* Inner container for DesignProcess, applying consistent padding & max-width */}
      <div className="container mx-auto max-w-screen-lg px-4 md:px-8"> {/* Standard max-width for wider content */}
         <DesignProcess processPhases={process} />
      </div>

       {/* Inner container for CTA, applying consistent padding & max-width */}
       {hasValidCta && (
         <div className="container mx-auto max-w-3xl text-center mt-12 md:mt-16 px-4 md:px-8">
             <Link href={href} className={cn(buttonVariants({ size: 'lg', variant: 'outline' }))} > {cta} </Link>
         </div>
       )}
    </section>
  );
}