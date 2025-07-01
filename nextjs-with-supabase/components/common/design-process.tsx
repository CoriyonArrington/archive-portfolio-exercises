// components/common/design-process.tsx (Updated)
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription, // Use CardDescription
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ProcessPhase } from '@/types/process'; // Use base type
import type { DesignProcessProps } from '@/types/process'; // Use props type
import { cn } from '@/lib/utils'; // Import cn

const DesignProcess: React.FC<DesignProcessProps> = ({ processPhases, className }) => {
  // If processPhases is empty or null, maybe render nothing or a message?
  if (!processPhases || processPhases.length === 0) {
    // Or return null if the parent handles the empty state
    return <p className="text-center text-muted-foreground">No process phases defined.</p>;
  }

  return (
    // Removed the outer container div - layout handled by parent section
    // Added cn() to the grid div
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8", className)}>
      {processPhases.map((phase) => (
        <Card key={phase.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{phase.phase_title ?? 'Untitled Phase'}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
             {/* Use CardDescription for consistency within Card */}
            <CardDescription>{phase.description ?? 'No description available.'}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DesignProcess;