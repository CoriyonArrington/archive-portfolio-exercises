// app/(playground)/dbt-diary-card/components/urges-edit-section.tsx
'use client';

import React from 'react';
// Keep imports needed for the outer structure if any, like FormLabel
import { FormLabel, FormDescription } from "@/components/ui/form";

// Props might not be needed if we render nothing from them
interface UrgesEditSectionProps {
    // availableUrges: DBTUrgeClient[]; // Not used in this test
}

export default function UrgesEditSection({ /* availableUrges */ }: UrgesEditSectionProps) {
    // Comment out hooks for this test
    // const { control, getValues, formState: { errors } } = useFormContext<DiaryEntryFormValues>();
    // const { fields, append, remove } = useFieldArray({ control, name: "urges" });

    return (
        <div className="space-y-4">
            <FormLabel className="text-base font-semibold">Urges Logged</FormLabel>
            <FormDescription>Select urges experienced and their strength (0-5).</FormDescription>
            <div className='p-3 border rounded-md text-sm text-muted-foreground italic'>
                [Urges Checkbox List Placeholder - Content Commented Out]
            </div>
            {/* Comment out FormMessage if errors not passed/used */}
            {/* <FormMessage>{getArrayErrorMessage(errors, 'urges')}</FormMessage> */}
        </div>
    );
}