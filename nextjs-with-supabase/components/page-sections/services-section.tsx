// components/page-sections/services-section.tsx (Consistent Padding)
import React from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import ServiceCard from '@/components/common/service-card';
import type { Service, ServicesSummaryProps } from '@/types/services';
import { H2, P } from '@/components/typography';
import { cn } from '@/lib/utils';

interface ServicesSectionComponentProps extends ServicesSummaryProps { className?: string; }

export default function ServicesSection({ headline, body, service_list = [], cta, href = '/services', className }: ServicesSectionComponentProps) {
  const hasValidCta = cta && cta.trim() !== '';

  return (
    <section id="services" className={cn("py-16 md:py-24", className)}>
      {/* Intro Text Container: Apply consistent padding */}
      {/* --- UPDATED: Standardized Padding --- */}
      <div className="container mx-auto text-center max-w-3xl mb-12 md:mb-16 px-4 md:px-8"> {/* Example padding */}
        <H2 className="mb-4"> {headline ?? 'My Services'} </H2>
        {body && ( <P className="text-lg text-muted-foreground"> {body} </P> )}
      </div>

      {/* Grid Container: Apply consistent padding */}
      {/* --- UPDATED: Standardized Padding --- */}
      <div className="container mx-auto px-4 md:px-8"> {/* Example padding */}
        {service_list.length === 0 ? ( <P className="text-center text-muted-foreground"> No featured services available at the moment. </P>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {service_list.map((service: Service) => ( <ServiceCard key={service.id} title={service.title ?? 'Service Title'} description={service.description ?? 'Service description.'} /> ))}
          </div>
        )}
      </div>

      {/* CTA Container: Apply consistent padding */}
      {hasValidCta && (
        // --- UPDATED: Standardized Padding ---
        <div className="container mx-auto mt-12 md:mt-16 text-center px-4 md:px-8"> {/* Example padding */}
            <Link href={href} className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }))} > {cta} </Link>
        </div>
      )}
    </section>
  );
}