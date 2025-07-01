// app/(main)/about/page.tsx
import { supabase } from '@/lib/utils/supabaseClient';
import HeroSection from '@/components/page-sections/hero-section';
import AboutSection from '@/components/page-sections/about-section';
import WhyUXSection from '@/components/page-sections/why-ux-section';
import CtaSection from '@/components/page-sections/cta-section';

export default async function AboutPage() {
  // Fetch CMS content
  const { data: pageRow, error: pageErr } = await supabase
    .from('pages')
    .select('content')
    .eq('slug', 'about')
    .single();
  if (pageErr || !pageRow) {
    console.error('Failed to load About content.', pageErr);
    return <div>Failed to load About content.</div>;
  }

  const { hero, about, whyUX, ctaSection } = pageRow.content;

  // Fetch only the problems & solutions tagged for about
  const { data: rawProblems, error: problemsError } = await supabase
    .from('problems')
    .select('*')
    .contains('page_slugs', ['about']);
  if (problemsError) console.error('Error loading problems:', problemsError);

  const { data: rawSolutions, error: solutionsError } = await supabase
    .from('solutions')
    .select('*')
    .contains('page_slugs', ['about']);
  if (solutionsError) console.error('Error loading solutions:', solutionsError);

  const problems = rawProblems ?? [];
  const solutions = rawSolutions ?? [];

  return (
    <>
      <HeroSection
        headline={hero.headline}
        subheadline={hero.subheadline}
        cta={hero.cta}
      />

      <AboutSection
        headline={about.headline}
        body={about.body}
        cta={about.cta}
      />

      <WhyUXSection
        headline={whyUX.headline}
        body={whyUX.body}
        cta={whyUX.cta}
        problems={problems}
        solutions={solutions}
      />

      <CtaSection
        headline={ctaSection.headline}
        body={ctaSection.body}
        cta={ctaSection.cta}
      />
    </>
  );
}
