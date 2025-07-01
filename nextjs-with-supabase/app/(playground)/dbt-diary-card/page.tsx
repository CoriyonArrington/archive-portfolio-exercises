// app/(playground)/dbt-diary-card/page.tsx
import { H1 } from "@/components/typography/H1";
import { P } from "@/components/typography/P";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "DBT Diary Card",
  description: "Track your DBT skills, emotions, and progress.",
};

export default async function DBTDiaryCardPage() {
  return (
    <div className="space-y-6">
      <header className="text-center">
        <H1>DBT Diary Card</H1>
        <P className="text-muted-foreground mt-2">
          Your personal tool for tracking emotions, skills, and overall wellness.
        </P>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-card border rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Today's Entry</h3>
          <P className="text-muted-foreground mb-4">Log your emotions, skills, and urges for today.</P>
          <Button asChild className="w-full">
            {/* Corrected Path */}
            <Link href="/dbt-diary-card/new-entry">Create New Entry</Link>
          </Button>
        </div>

        <div className="p-6 bg-card border rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">View Past Entries</h3>
          <P className="text-muted-foreground mb-4">Review your previous diary card entries and track patterns.</P>
          <Button asChild className="w-full">
            {/* Corrected Path */}
            <Link href="/dbt-diary-card/entries">Browse Entries</Link>
          </Button>
        </div>
        
        <div className="p-6 bg-card border rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Skills Library</h3>
          <P className="text-muted-foreground mb-4">Explore DBT skills, their descriptions, and how to practice them.</P>
          <Button asChild className="w-full">
            {/* Corrected Path - This is the one causing the 404 */}
            <Link href="/dbt-diary-card/skills">Access Skills</Link>
          </Button>
        </div>

        <div className="p-6 bg-card border rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Your Progress</h3>
          <P className="text-muted-foreground mb-4">Visualize your emotional trends and skill usage over time.</P>
          <Button asChild className="w-full">
            {/* Corrected Path */}
            <Link href="/dbt-diary-card/progress">View Progress</Link>
          </Button>
        </div>
        
        <div className="p-6 bg-card border rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Profile & Settings</h3>
          <P className="text-muted-foreground mb-4">Customize your tracking options and manage preferences.</P>
          <Button asChild className="w-full">
            {/* Corrected Path */}
            <Link href="/dbt-diary-card/profile">Go to Profile</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}