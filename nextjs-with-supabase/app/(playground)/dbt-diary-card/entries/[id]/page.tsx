// app/(playground)/dbt-diary-card/entries/[id]/page.tsx

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation'; // Import notFound
import { getDiaryEntryById } from '@/lib/data/dbt'; // The detail fetching function
import { H1 } from '@/components/typography'; // Assuming typography components
// Adjust import path based on actual location and filename (kebab-case)
import DiaryEntryDetailDisplay from '../../components/diary-entry-detail-display';

// Define props type for dynamic route parameters
interface PageProps {
  params: Promise<{ // MODIFIED: params is a Promise
    id: string; // Corresponds to the [id] folder name
  }>;
}

export default async function DiaryEntryDetailPage({ params: paramsPromise }: PageProps) { // MODIFIED: Renamed params to paramsPromise for clarity
  const supabase = createClient();
  const params = await paramsPromise; // ADDED: Await the params Promise
  const entryId = params.id;          // MODIFIED: Access id from the resolved params

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    // Consider redirecting to a login page that can then redirect back after login
    // For example: redirect(`/login?redirectTo=/dbt-diary-card/entries/${entryId}`);
    redirect(`/sign-in?message=Please log in to view diary entry details.`);
  }

  // Fetch the specific diary entry details
  const entry = await getDiaryEntryById(entryId, user.id);

  // If the entry is not found (or doesn't belong to the user), show a 404 page
  if (!entry) {
    notFound();
  }

  // If entry is found, pass it to the client component for display
  return (
    <div className="p-4 md:p-6">
      {/* Maybe add a title or breadcrumbs here */}
      {/* Example: <H1 className="mb-6">Diary Entry Details</H1> */}
      <DiaryEntryDetailDisplay entry={entry} />
    </div>
  );
}