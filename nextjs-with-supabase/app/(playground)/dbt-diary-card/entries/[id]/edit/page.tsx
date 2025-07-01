// app/(playground)/dbt-diary-card/entries/[id]/edit/page.tsx
import React, { Suspense } from 'react';
import { createClient } from '@/utils/supabase/server';
import DiaryEntryEditForm from '@/app/(playground)/dbt-diary-card/components/diary-entry-edit-form';
import type {
    DiaryEntryClient, DBTEmotionClient, DBTSkillClient, DBTUrgeClient,
    CustomFieldDefinitionClient, LoggedCustomField, CustomFieldType
} from '@/types/dbt';
import { notFound, redirect } from 'next/navigation';
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from '@/components/ui/separator';

interface EditDiaryEntryPageProps { params: Promise<{ id: string; }>; }

// --- Data Fetching Functions ---
async function getDiaryEntryById(id: string, userId: string): Promise<DiaryEntryClient | null> {
    const supabase = createClient();
    const { data, error } = await supabase.from('dbt_diary_entries')
        .select(`id, date, wellness_rating, notes, crisis, user_id, created_at, updated_at, dbt_entry_emotions (id, emotion_id, intensity, dbt_emotions (id, name, color, user_id)), dbt_entry_skills (id, skill_id, dbt_skills (id, name, category, user_id)), dbt_entry_urges (id, urge_id, rating, dbt_urges (id, name, user_id)), dbt_entry_custom_fields (id, field_id, value, definition:dbt_custom_fields (id, name, type, options, sort_order, user_id))`)
        .eq('id', id).eq('user_id', userId).single();

    if (error) { console.error('Error fetching diary entry by ID:', error.message); return null; }
    if (!data) { console.log(`Diary entry with ID ${id} not found for user ${userId}.`); return null; }

    return {
        id: data.id, date: data.date, wellnessRating: data.wellness_rating, notes: data.notes, crisis: data.crisis, userId: data.user_id, createdAt: data.created_at, updatedAt: data.updated_at,
        emotions: data.dbt_entry_emotions?.map((e: any) => ({ emotionId: e.emotion_id, intensity: e.intensity, name: e.dbt_emotions?.name ?? 'Unknown Emotion', color: e.dbt_emotions?.color ?? '#808080', })) || [],
        skills: data.dbt_entry_skills?.map((s: any) => ({ skillId: s.skill_id, name: s.dbt_skills?.name ?? 'Unknown Skill', category: s.dbt_skills?.category ?? 'General', })) || [],
        urges: data.dbt_entry_urges?.map((u: any) => ({ urgeId: u.urge_id, rating: u.rating, name: u.dbt_urges?.name ?? 'Unknown Urge', })) || [],
        customFields: data.dbt_entry_custom_fields?.map((cf: any): LoggedCustomField => {
            let parsedDefOptions: string[] | null = null;
            const options = cf.definition?.options; // Assign to variable for easier checking
            if (options) {
                if (Array.isArray(options)) {
                    const allStrings = options.every((opt: unknown) => typeof opt === 'string');
                    if (allStrings) {
                        parsedDefOptions = options as string[];
                    } else {
                        const filteredOptions = options.filter((opt: unknown) => typeof opt === 'string');
                        // Only assign if filtering resulted in a non-empty array
                        parsedDefOptions = filteredOptions.length > 0 ? filteredOptions : null;
                        // Optional warning if options existed but were all filtered out
                        // if (parsedDefOptions === null && options.length > 0) { console.warn(...) }
                    }
                } else if (options !== null) { // Check explicitly for non-null non-arrays
                    console.warn(`Custom field definition ${cf.definition.id} has unexpected options type:`, options);
                } // If null or undefined, parsedDefOptions remains null
            }
             return { fieldId: cf.field_id, value: cf.value, name: cf.definition?.name ?? 'Unknown Custom Field', type: cf.definition?.type as CustomFieldType ?? 'TEXT', options: parsedDefOptions, sortOrder: cf.definition?.sort_order ?? 0, };
        }) || [],
    };
}
async function getAvailableEmotions(userId: string): Promise<DBTEmotionClient[]> { /* ... function body ... */ 
    const supabase = createClient(); const { data, error } = await supabase .from('dbt_emotions').select('id, name, color, user_id').or(`user_id.eq.${userId},user_id.is.null`); if (error) { console.error('Error fetching available emotions:', error.message); return []; } return data.map(e => ({ id: e.id, name: e.name, color: e.color, userId: e.user_id, isCustom: !!e.user_id })); 
}
async function getAvailableSkills(userId: string): Promise<DBTSkillClient[]> { /* ... function body ... */ 
    const supabase = createClient(); const { data, error } = await supabase .from('dbt_skills').select('id, name, category, user_id, description, practice, examples, benefits, icon').or(`user_id.eq.${userId},user_id.is.null`); if (error) { console.error('Error fetching available skills:', error.message); return []; } return data.map(s => ({ id: s.id, name: s.name, category: s.category, description: s.description, practice: s.practice, examples: s.examples, benefits: s.benefits, icon: s.icon, userId: s.user_id, isCustom: !!s.user_id })); 
}
async function getAvailableUrges(userId: string): Promise<DBTUrgeClient[]> { /* ... function body ... */ 
    const supabase = createClient(); const { data, error } = await supabase .from('dbt_urges').select('id, name, user_id').or(`user_id.eq.${userId},user_id.is.null`); if (error) { console.error('Error fetching available urges:', error.message); return []; } return data.map(u => ({ id: u.id, name: u.name, userId: u.user_id, isCustom: !!u.user_id })); 
}
async function getCustomFieldDefinitions(userId: string): Promise<CustomFieldDefinitionClient[]> { /* ... function body ... */ 
     const supabase = createClient(); const { data, error } = await supabase .from('dbt_custom_fields').select('id, name, type, options, sort_order, user_id').or(`user_id.eq.${userId},user_id.is.null`); if (error) { console.error('Error fetching custom field definitions:', error.message); return []; } return data.map(cfd => { let parsedOptions: string[] | null = null; const options = cfd.options; if (options) { if (Array.isArray(options)) { const allStrings = options.every(opt => typeof opt === 'string'); if(allStrings) { parsedOptions = options as string[]; } else { const filteredOptions = options.filter(opt => typeof opt === 'string'); parsedOptions = filteredOptions.length > 0 ? filteredOptions : null; } } else if (options !== null) { console.warn(`Custom field definition ${cfd.id} options not array/null`, options); } } return { id: cfd.id, name: cfd.name, fieldType: cfd.type as CustomFieldType, options: parsedOptions, userId: cfd.user_id, sortOrder: cfd.sort_order ?? 0, }; }); 
}

// --- Edit Page Component Structure ---
async function EditFormLoader({ entryId, userId }: { entryId: string, userId: string }) { /* ... function body ... */ 
    const [ entryData, availableEmotions, availableSkills, availableUrges, customFieldDefs ] = await Promise.all([ getDiaryEntryById(entryId, userId), getAvailableEmotions(userId), getAvailableSkills(userId), getAvailableUrges(userId), getCustomFieldDefinitions(userId) ]); if (!entryData) { console.log(`EditFormLoader: No entryData found for ID ${entryId}`); notFound(); } return ( <DiaryEntryEditForm entryData={entryData} availableEmotions={availableEmotions} availableSkills={availableSkills} availableUrges={availableUrges} customFieldDefs={customFieldDefs} /> ); 
}
function EditFormSkeleton() { /* ... function body ... */ 
     return ( <div className="space-y-8 animate-pulse"><div className="space-y-2"> <Skeleton className="h-4 w-1/4" /> <Skeleton className="h-10 w-full" /> </div><div className="space-y-2"> <Skeleton className="h-4 w-1/5" /> <Skeleton className="h-10 w-1/3" /> </div><div className="space-y-2"> <Skeleton className="h-4 w-1/6" /> <Skeleton className="h-24 w-full" /> </div><div className="flex items-center justify-between rounded-lg border p-4"> <div className="space-y-1"> <Skeleton className="h-4 w-1/3" /> <Skeleton className="h-3 w-1/2" /> </div> <Skeleton className="h-6 w-12 rounded-full" /> </div><Separator /><div> <Skeleton className="h-6 w-1/3 mb-4" /> <div className="space-y-3"> {[1, 2].map(i => (<div key={i} className="flex items-center gap-4 p-3 border rounded-md"> <Skeleton className="h-5 w-5 rounded" /> <Skeleton className="h-4 w-2/5" /> <Skeleton className="h-8 w-1/4 ml-auto" /> </div> ))} </div> </div><Separator /><div> <Skeleton className="h-6 w-1/3 mb-4" /> <div className="grid grid-cols-1 sm:grid-cols-2 gap-3"> {[1, 2, 3, 4].map(i => (<div key={i} className="flex items-center gap-2 p-3 border rounded-md"> <Skeleton className="h-5 w-5 rounded" /> <Skeleton className="h-4 w-3/5" /> </div> ))} </div> </div><Skeleton className="h-10 w-32 mt-6" /></div> ); 
}

export default async function EditDiaryEntryPage({ params: paramsPromise }: EditDiaryEntryPageProps) { /* ... function body ... */ 
     const params = await paramsPromise; const { id: entryId } = params; const supabase = createClient(); const { data: { user } , error: authError } = await supabase.auth.getUser(); if (authError || !user) { console.log("User not authenticated for edit page, redirecting to login."); redirect('/login'); } return ( <div className="container mx-auto px-4 py-8 max-w-3xl"> <h1 className="text-3xl font-bold mb-8 text-center tracking-tight"> Edit Diary Entry </h1> <Suspense fallback={<EditFormSkeleton />}> <EditFormLoader entryId={entryId} userId={user.id} /> </Suspense> </div> ); 
}