// app/(playground)/dbt-diary-card/entries/page.tsx
import { createClient } from '@/utils/supabase/server'; 
import { redirect } from 'next/navigation';
import { getDiaryEntriesList } from '@/lib/data/dbt'; 
import EntriesListDisplay from '@/app/(playground)/dbt-diary-card/components/entries-list-display'; 
import { H1 } from '@/components/typography';

export default async function DiaryEntriesPage() {
  const supabase = createClient(); 

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    // UPDATED Redirect path to /sign-in
    redirect('/sign-in?message=Please log in to view diary entries.'); 
  }

  const entries = await getDiaryEntriesList(user.id);

  if (entries === null) {
    return (
      <div className="p-4 md:p-6">
        <H1 className="mb-6">Past Diary Entries</H1>
        <p className="mt-4 text-destructive">
          Could not load diary entries. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <H1 className="mb-6">Past Diary Entries</H1>
      <EntriesListDisplay entries={entries} />
    </div>
  );
}