// lib/actions/dbt.ts
'use server';

import { z } from 'zod';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { diaryEntryFormSchema, DiaryEntryFormValues, DiaryEntryActionResult } from '@/lib/schemas/dbt';
import { Json } from '@/types/supabase'; // Assuming you have this type from Supabase generation

export async function updateDiaryEntryAction({
    id,
    values,
}: {
    id: string;
    values: any; // Accept 'any' here, rely on Zod parsing below for type safety
}): Promise<DiaryEntryActionResult> {
    console.log("Server Action: updateDiaryEntryAction initiated.");
    console.log("Server Action received entryId:", id);

    const supabase = createClient();

    // 1. Authentication Check
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        console.error("Server Action: Authentication failed.", authError);
        return { success: false, message: 'Authentication failed. Please log in.', errors: { formErrors: ['Authentication failed. Please log in.'], fieldErrors: {} } };
    }
    console.log("Server Action: User authenticated:", user.id);

    // 2. Server-side Validation
    const validationResult = diaryEntryFormSchema.safeParse(values);
    if (!validationResult.success) {
        const flattenedErrors = validationResult.error.flatten();
        console.error("Server Action Zod Validation Errors:", JSON.stringify(flattenedErrors, null, 2));
        return { success: false, errors: flattenedErrors, message: 'Invalid form data provided. Please check the fields.', };
    }

    const validatedData: DiaryEntryFormValues = validationResult.data;
    console.log("Server Action: Validation successful.");

    // 3. Prepare parameters for RPC
    const params = {
        p_entry_id: id,
        p_user_id: user.id,
        p_date: validatedData.date.toISOString().split('T')[0], // Corrected date format
        p_wellness_rating: validatedData.wellnessRating,
        p_notes: validatedData.notes ?? '', // FIXED: Pass empty string if null/undefined
        p_crisis: validatedData.crisis ?? false,
        // Cast arrays to Json if RPC expects Json type
        p_new_emotions: (validatedData.emotions ?? []) as unknown as Json,
        p_new_skills: (validatedData.skills ?? []) as unknown as Json,
        p_new_urges: (validatedData.urges ?? []) as unknown as Json,
        p_new_custom_fields: (validatedData.customFields ?? []).map(cf => ({
            field_id: cf.fieldId,
            value: cf.value === '' ? null : cf.value // Handle empty string if needed
        })) as unknown as Json
    };

    console.log("Server Action: Calling RPC 'update_diary_entry_with_details'");

    // 4. Call Supabase RPC function
    try {
        const { error: rpcError } = await supabase.rpc('update_diary_entry_with_details', params);
        if (rpcError) { throw rpcError; }
        console.log("Server Action: RPC successful.");
    } catch (dbError: any) {
         console.error("Server Action: Database update error:", JSON.stringify(dbError, null, 2));
         let userMessage = 'Failed to update diary entry due to a database issue.';
         if (dbError.code === '23505') { userMessage = `An entry for the date ${params.p_date} already exists.`; }
         else if (dbError.message?.toLowerCase().includes('permission denied')) { userMessage = 'Permission denied.'; }
         else { userMessage = `Database error occurred (Code: ${dbError.code || 'N/A'}).`; }
         return { success: false, message: userMessage, errors: { formErrors: [userMessage], fieldErrors: {} } };
    }

    // 5. Revalidate relevant paths
    console.log("Server Action: Revalidating paths...");
    try {
        revalidatePath(`/dbt-diary-card/entries`);
        revalidatePath(`/dbt-diary-card/entries/${id}`);
         revalidatePath(`/dbt-diary-card/entries/${id}/edit`);
        console.log("Server Action: Paths revalidated.");
    } catch (revalError: any) { console.error("Server Action: Revalidation error:", revalError); }

    // 6. Return success
    return { success: true, message: 'Diary entry updated successfully!' };
}