// components/page-sections/about-section.tsx (Corrected Padding & Button Variant)
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { H2, H3, P } from '@/components/typography';
import type { AboutProps } from '@/types/about';
import { cn } from '@/lib/utils';
// Icon component not needed if the "Learn more about me" button with ArrowRight is removed

interface AboutSectionComponentProps extends AboutProps {
    className?: string;
}

export default function AboutSection({
  headline,
  body,
  cta,
  href = '/about',
  className,
}: AboutSectionComponentProps) {

  const hasValidIntroCta = cta && cta.trim() !== '';

  return (
    <section
      id="about"
      // Outer section has bg-muted and vertical padding/margin.
      // NO negative margins needed IF app/layout.tsx <main> has no px-*.
      className={cn(
        "bg-muted py-16 md:py-24 mb-16 md:mb-24",
        className
       )}
     >
       {/* --- Block 1: Dynamic Intro Content (Centered) --- */}
       {/* This inner container now has standard consistent padding and max-width */}
       <div className="container mx-auto max-w-3xl px-4 md:px-8 text-center">
         <H2 className="mb-4">{headline ?? 'About Me'}</H2>
         {body && (
           <P className="text-lg text-muted-foreground mb-8"> {body} </P>
         )}
       </div>

       {/* --- Block 2: Static "From biomedical engineer..." 2-Column Layout --- */}
       {/* This inner container also has standard consistent padding and max-width */}
       <div className={`container mx-auto max-w-screen-lg px-4 md:px-8 ${(headline || body) ? 'mt-8 md:mt-10' : ''}`}>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
           {/* Image Column */}
           <div className="relative h-[350px] sm:h-[400px] md:h-[450px] rounded-lg overflow-hidden">
             <Image
               src="https://lwanuwbdwxlcbnwiricu.supabase.co/storage/v1/object/public/avatars/bju33h2432_1741740888680.png"
               alt="Portrait of Coriyon Arrington"
               fill
               className="object-cover rounded-lg object-[center_40%]"
               sizes="(max-width: 768px) 100vw, 50vw"
               priority
             />
           </div>

           {/* Content Column */}
           <div>
             <H3 className="mb-4">From biomedical engineer to product designer</H3>
             <div className="space-y-4 text-muted-foreground">
               <P>
                 👋🏾 I'm a product designer with a biomedical engineering background. I specialize in creating seamless
                 customer experiences for tech startups and enterprises.
               </P>
               <P>
                 🏥 Currently, I lead the design process at CareHive Health, where we build tools that help patients get
                 quality care at affordable prices—when they need it most.
               </P>
               <P>
                 ❤️ When not working, I enjoy spending time with my wife, our son, and two cats. My hobbies include
                 swimming, hiking, playing piano, and watching movies.
               </P>
             </div>
           </div>
         </div>
       </div>

      {/* --- Main CTA Button (from props) --- */}
      {/* This inner container also has standard consistent padding and max-width */}
      {hasValidIntroCta && (
        <div className="container mx-auto max-w-3xl px-4 md:px-8 text-center mt-12 md:mt-16">
            <Link
              href={href}
              // --- UPDATED: Changed variant to "outline" ---
              className={cn(buttonVariants({ size: "lg", variant: "outline"}))}
            >
                {cta}
            </Link>
        </div>
       )}
    </section>
  );
}