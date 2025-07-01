// components/page-sections/projects-section.tsx (Final Consistent Padding)
import React from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import ProjectCard from '@/components/common/project-card';
import type { Project, ProjectsSectionProps } from '@/types/project';
import { H2, P } from '@/components/typography';
import { cn } from '@/lib/utils';

interface ProjectsSectionComponentProps extends ProjectsSectionProps { className?: string; }

export default function ProjectsSection({ headline, body, cta, projects = [], href = '/projects', className }: ProjectsSectionComponentProps) {
  const hasValidCta = cta && cta.trim() !== '';

  return (
    <section 
      id="projects"
      // Outer section only has vertical padding/margin
      className={cn("py-16 md:py-24 mb-16 md:mb-24", className)}
    >
      {/* Inner container for intro text, applying consistent padding & max-width */}
      <div className="container mx-auto max-w-3xl text-center mb-12 md:mb-16 px-4 md:px-8">
        <H2 className="mb-4"> {headline ?? 'Our Work'} </H2>
         {body && ( <P className="text-lg text-muted-foreground"> {body} </P> )}
      </div>

      {/* Inner container for Grid, applying consistent padding & max-width */}
      <div className="container mx-auto max-w-screen-lg px-4 md:px-8"> {/* Standard max-width for wider content */}
        {projects.length === 0 ? ( <P className="text-center text-muted-foreground"> No featured projects available. </P>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project: Project) => ( <ProjectCard key={project.id} project={project} /> ))}
          </div>
        )}
      </div>

      {/* Inner container for CTA, applying consistent padding & max-width */}
      {hasValidCta && (
        <div className="container mx-auto max-w-3xl text-center mt-12 md:mt-16 px-4 md:px-8">
            <Link href={href} className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }))} > {cta} </Link>
        </div>
      )}
    </section>
  );
}