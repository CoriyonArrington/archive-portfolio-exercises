import type { Metadata } from 'next';
import { supabase } from '@/lib/utils/supabaseClient';

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await supabase
    .from('pages')
    .select('title, meta_description')
    .eq('slug', 'contact')
    .single();

  return {
    title: page?.title ?? 'Contact Coriyon’s Studio',
    description:
      page?.meta_description ??
      'Reach out to Coriyon’s Studio for UX consulting, product design services, or a free 20-minute consultation.',
  };
}
