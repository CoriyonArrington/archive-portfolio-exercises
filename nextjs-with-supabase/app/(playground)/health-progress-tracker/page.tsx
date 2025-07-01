// app/(playground)/health-progress-tracker/page.tsx
import { HealthTrackerComparisonView } from "./components/health-tracker-comparison"; // We'll name the export this
import { H1 } from "@/components/typography/H1"; // Assuming you have these
import { P } from "@/components/typography/P";

export const metadata = {
  title: "Health Progress Tracker",
  description: "Visualize health data progress with an interactive before/after comparison slider.",
};

export default function HealthProgressTrackerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <H1>Health Progress Tracker</H1>
        <P className="mt-2 text-muted-foreground">
          An interactive tool to visualize and compare different representations of health and wellness data.
          Drag the slider to see the transformation from an older interface to a modern dashboard.
        </P>
      </div>
      <HealthTrackerComparisonView />
    </div>
  );
}