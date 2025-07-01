// app/(playground)/dbt-diary-card/skills/page.tsx
import { H1 } from "@/components/typography/H1";
import { P } from "@/components/typography/P";
import { getDBTSkills } from "@/lib/data/dbt"; // Ensure this path is correct for your data fetching function
import { createClient } from "@/utils/supabase/server"; // Your Supabase server client
import SkillsDisplay from "../components/skills-display"; // Path relative to this page.tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BookOpenCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "DBT Skills Library",
  description: "Explore and learn about various DBT skills.",
};

// Optional: export const revalidate = 3600; // Revalidate page data periodically if skills change often

export default async function SkillsLibraryPage() {
  const supabase = createClient(); // Or your specific way of getting the server client
  const { data: { user } } = await supabase.auth.getUser();

  // Pass userId if available to fetch custom skills, otherwise only system skills are fetched
  const skills = await getDBTSkills(user?.id);

  return (
    <div className="space-y-8 py-8"> {/* Added some top/bottom padding */}
      <header className="text-center px-4">
        <H1>DBT Skills Library</H1>
        <P className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Browse mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness skills.
          System skills are available to all, and you can add your own custom skills via your profile (feature coming soon!).
        </P>
      </header>

      <Separator />

      <div className="px-4"> {/* Add padding for the content area */}
        {skills.length === 0 ? (
          <Alert className="max-w-lg mx-auto">
            <BookOpenCheck className="h-4 w-4" />
            <AlertTitle>No Skills Available</AlertTitle>
            <AlertDescription>
              We couldn&apos;t find any DBT skills at this moment.
              This could be because system skills haven&apos;t been populated in the database yet,
              or you haven&apos;t added any custom skills.
            </AlertDescription>
          </Alert>
        ) : (
          <SkillsDisplay skills={skills} />
        )}
      </div>
    </div>
  );
}