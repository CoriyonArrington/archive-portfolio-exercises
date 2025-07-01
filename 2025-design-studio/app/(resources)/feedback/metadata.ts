import type { Metadata } from 'next';
import { supabase } from '@/lib/utils/supabaseClient';

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await supabase
    .from('pages')
    .select('title, meta_description')
    .eq('slug', 'feedback')
    .single();

  return {
    title: page?.title ?? 'Feedback – Coriyon’s Studio',
    description:
      page?.meta_description ??
      'Share your thoughts on Coriyon’s Studio. Rate clarity and usefulness, and leave any comments to help us improve.',
  };
}
