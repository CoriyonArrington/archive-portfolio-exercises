// components/page-sections/why-ux-section.tsx (Restore Inner Containers)

import React from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { H2, P, H3 } from '@/components/typography';
import type { WhyUXProps, Problem, Solution } from '@/types/why-ux';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/common/icon';
import { type LucideProps, HelpCircle, Palette, TrendingDown, MousePointerSquareDashed, Milestone, Sparkles, Gem, TrendingUp, Workflow } from 'lucide-react';

// --- WhyUXItem helper component remains the same ---
const iconMap: { [key: string]: React.FC<LucideProps> } = { Palette, TrendingDown, MousePointerSquareDashed, Milestone, Sparkles, Gem, TrendingUp, Workflow, HelpCircle };
type WhyUXItemData = (Problem & { icon_id?: { name: string | null } | null }) | (Solution & { icon_id?: { name: string | null } | null });
const WhyUXItem = ({ item, itemType }: { item: WhyUXItemData, itemType: 'problem' | 'solution' }) => { /* ... unchanged ... */
    const iconColorClass = itemType === 'problem'
        ? 'bg-destructive/10 text-destructive'
        : 'bg-success/10 text-success';
    const iconName = item.icon_id?.name;
    return (
        <div className="flex items-start gap-4">
            <div className={cn(`p-2 rounded-lg flex items-center justify-center w-10 h-10 flex-shrink-0`, iconColorClass)}> <Icon iconName={iconName} className="h-6 w-6" /> </div>
            <div className="flex-1">
                 <P className="font-semibold text-foreground mb-0.5">{item.title ?? 'Untitled'}</P>
                 <div className="text-sm text-muted-foreground mt-3">{item.description ?? 'No description'}</div>
            </div>
        </div>
    );
 };

// --- Main Component Definition ---
type WhyUXSectionComponentProps = WhyUXProps & { className?: string; };

export default function WhyUXSection({ headline, body, cta, problems = [], solutions = [], href = "/solutions", className }: WhyUXSectionComponentProps) {
  const hasValidCta = cta && cta.trim() !== '';

  return (
    // Outer section only has vertical padding/margin
    <section
      id="why-ux"
      className={cn( "py-16 md:py-24 mb-16 md:mb-24", className )}
    >
      {/* --- UPDATED: Restore Inner Container Structure --- */}

      {/* Inner container for Intro Text */}
      <div className="container mx-auto text-center max-w-3xl mb-12 md:mb-16 px-4 md:px-8"> {/* Added container/padding */}
        <H2 className="mb-4">{headline ?? 'Why Invest in UX?'}</H2>
        {body && <P className="text-lg text-muted-foreground">{body}</P>}
      </div>

      {/* Inner container for Problems and Solutions Grid */}
      {/* Added container/padding. Adjusted max-width for grid content */}
      <div className="container mx-auto grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16 max-w-5xl px-4 md:px-8">

        {/* Problems Card */}
        {problems.length > 0 && (
          <Card>
            <CardHeader> <CardTitle><H3>Challenges you might face</H3></CardTitle> </CardHeader>
            <CardContent className="space-y-6">
              {problems.map((item) => (<WhyUXItem key={item.id} item={item as WhyUXItemData} itemType="problem" />))}
            </CardContent>
          </Card>
        )}
        {/* Solutions Card */}
         {solutions.length > 0 && (
            <Card className="border-success/50">
              <CardHeader> <CardTitle><H3>How I help you succeed</H3></CardTitle> </CardHeader>
              <CardContent className="space-y-6">
                {solutions.map((item) => (<WhyUXItem key={item.id} item={item as WhyUXItemData} itemType="solution" />))}
              </CardContent>
            </Card>
         )}
      </div>

       {/* Inner container for CTA */}
       {hasValidCta && (
         <div className="container mx-auto mt-12 md:mt-16 text-center px-4 md:px-8"> {/* Added container/padding */}
             <Link href={href} className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }))} > {cta} </Link>
         </div>
       )}
       {/* --- End Update --- */}
    </section>
  );
}