// app/(playground)/dbt-diary-card/components/diary-entry-edit-form.tsx
// Final Working Version: All Sections Active, useEffect init, Controller for nested, Text-Only Custom Fields + Debug Logs
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller, useFieldArray, FieldArrayWithId, SubmitHandler, FieldErrors, ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';

import { diaryEntryFormSchema, DiaryEntryFormValues, DiaryEntryActionResult } from '@/lib/schemas/dbt';
import type {
    DiaryEntryClient,
    DBTSkillClient,
    DBTEmotionClient,
    DBTUrgeClient,
    CustomFieldDefinitionClient,
    CustomFieldType // Ensure includes 'TEXTAREA' in types/dbt.ts
} from '@/types/dbt';

// UI Imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label as ShadcnLabel } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Switch } from "@/components/ui/switch"; // Keep import
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils'; // Keep import

import { updateDiaryEntryAction } from '@/lib/actions/dbt';

// --- Type Aliases ---
type CustomFieldValueField = ControllerRenderProps<DiaryEntryFormValues, `customFields.${number}.value`>;

interface DiaryEntryEditFormProps {
    entryData: DiaryEntryClient;
    availableSkills: DBTSkillClient[];
    availableEmotions: DBTEmotionClient[];
    availableUrges: DBTUrgeClient[];
    customFieldDefs: CustomFieldDefinitionClient[];
}

export default function DiaryEntryEditForm({
    entryData,
    availableSkills,
    availableEmotions,
    availableUrges,
    customFieldDefs
}: DiaryEntryEditFormProps) {
    console.log("--- DiaryEntryEditForm Render Start ---");
    console.log("Received entryData:", entryData);
    console.log("Received availableSkills:", availableSkills);
    console.log("Received availableEmotions:", availableEmotions);
    console.log("Received availableUrges:", availableUrges);
    console.log("Received customFieldDefs:", customFieldDefs);

    const { toast } = useToast();
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const isResetDone = useRef(false);

    const form = useForm<DiaryEntryFormValues>({
        resolver: zodResolver(diaryEntryFormSchema),
        // Initialize with simple defaults
        defaultValues: {
            date: new Date(), wellnessRating: 0, notes: '', crisis: false,
            emotions: [], skills: [], urges: [], customFields: []
        }
    });
    console.log("Initial form state created (before useEffect)");

    // --- Field Array Hooks (All Active) ---
    const { fields: customFormFields } = useFieldArray({ control: form.control, name: "customFields" });
    const { fields: emotionFields, append: appendEmotion, remove: removeEmotion } = useFieldArray({ control: form.control, name: "emotions" });
    const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control: form.control, name: "skills" });
    const { fields: urgeFields, append: appendUrge, remove: removeUrge } = useFieldArray({ control: form.control, name: "urges" });

    // useEffect to set initial values ONCE
    useEffect(() => {
        console.log("--- useEffect Running ---");
        if (!entryData || isResetDone.current) {
            console.log("useEffect: Skipping reset (no entryData or already reset)");
            return;
        }
        console.log("useEffect: Calculating default values...");
        const safeParseDate = (dateString: string | undefined): Date | null => { if (!dateString) return null; try { return parseISO(dateString); } catch { return null; } };
        const initialDate = safeParseDate(entryData.date) ?? new Date();
        const defaultEmotions = entryData.emotions?.map(e => ({ emotionId: e.emotionId, intensity: e.intensity ?? 0 })) || [];
        const defaultSkills = entryData.skills?.map(s => ({ skillId: s.skillId })) || [];
        const defaultUrges = entryData.urges?.map(u => ({ urgeId: u.urgeId, rating: u.rating ?? 0 })) || [];
        const defaultCustomFields = customFieldDefs.map(def => {
            const existingField = entryData.customFields?.find(cf => cf.fieldId === def.id);
             let value: string | number | boolean | Date | null = ''; if (existingField) { value = existingField.value; if (def.fieldType === 'DATE' && typeof value === 'string' && value) { try { value = parseISO(value); } catch { value = null; } } else if (def.fieldType === 'BOOLEAN') { value = typeof value === 'boolean' ? value : (String(value).toLowerCase() === 'true'); } else if (def.fieldType === 'NUMBER') { value = (value === null || value === undefined || value === '') ? null : Number(value); } } else { if (def.fieldType === 'BOOLEAN') value = false; else if (def.fieldType === 'NUMBER') value = null; else if (def.fieldType === 'DATE') value = null; else value = ''; } return { fieldId: def.id, value: value };
         }) || [];

        const resetValues = {
            date: initialDate,
            wellnessRating: entryData.wellnessRating ?? 0,
            notes: entryData.notes ?? '',
            crisis: entryData.crisis ?? false,
            emotions: defaultEmotions,
            skills: defaultSkills,
            urges: defaultUrges,
            customFields: defaultCustomFields,
        };
        console.log("useEffect: Resetting form with values:", resetValues);
        form.reset(resetValues, { keepValues: false });
        isResetDone.current = true;
        console.log("useEffect: Form reset complete.");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entryData, customFieldDefs]); // Dependencies only on props

    // --- Helper Functions (All Active) ---
    // Use RHF fields state to find index for name generation if needed by Controller
    const findEmotionIndex = (emotionDefId: string) => emotionFields.findIndex(field => field.emotionId === emotionDefId);
    const findSkillIndex = (skillDefId: string) => skillFields.findIndex((field) => field.skillId === skillDefId);
    const findUrgeIndex = (urgeDefId: string) => urgeFields.findIndex((field) => field.urgeId === urgeDefId);

    // --- On Submit Handler ---
    const onSubmit: SubmitHandler<DiaryEntryFormValues> = async (values) => {
         console.log("--- onSubmit Start ---");
         console.log("onSubmit: Raw values:", values);
         setIsPending(true);
         try {
             const valuesToSubmit = values; // Submit all values
             const dateStringToSubmit = valuesToSubmit.date ? format(valuesToSubmit.date, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');
             const processedValues = {
                 ...valuesToSubmit,
                 date: dateStringToSubmit,
                 customFields: (valuesToSubmit.customFields ?? []).map(cf => {
                     const def = customFieldDefs.find(d => d.id === cf.fieldId);
                     if (!def) return cf; // Should not happen
                     // Ensure values match expected type based on definition for backend
                     if (def.fieldType === 'NUMBER') { return { ...cf, value: (cf.value === null || cf.value === undefined || cf.value === '') ? null : Number(cf.value) }; }
                     if (def.fieldType === 'BOOLEAN') { return { ...cf, value: Boolean(cf.value) }; }
                     if (def.fieldType === 'DATE' && cf.value instanceof Date) { return { ...cf, value: format(cf.value, 'yyyy-MM-dd') }; }
                     // Ensure text types are strings
                     if (['TEXT', 'Text', 'TEXTAREA'].includes(def.fieldType)) { return { ...cf, value: String(cf.value ?? '') }; }
                     return cf; // Return as is for other types
                 }),
             };
             console.log("onSubmit: Processed values (before action call):", processedValues);

             const result: DiaryEntryActionResult = await updateDiaryEntryAction({ id: entryData.id, values: processedValues as unknown as DiaryEntryFormValues, });
             console.log("onSubmit: Action result:", result);

             if (result.success) { toast({ title: "Success", description: "Diary entry updated successfully." }); router.push(`/dbt-diary-card/entries/${entryData.id}`); router.refresh(); } else { let mainErrorMessage = result.message || "An error occurred during update."; let detailedErrorMessages = ""; if (result.errors) { if (result.errors.formErrors && result.errors.formErrors.length > 0) { mainErrorMessage = result.errors.formErrors.join(' '); } if (result.errors.fieldErrors) { detailedErrorMessages = Object.entries(result.errors.fieldErrors).map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`).join('\n'); Object.entries(result.errors.fieldErrors).forEach(([field, errors]) => { if (errors && Array.isArray(errors) && errors.length > 0) form.setError(field as keyof DiaryEntryFormValues, { type: 'server', message: errors.join(', ') }); else if (typeof errors === 'string') form.setError(field as keyof DiaryEntryFormValues, { type: 'server', message: errors }); }); } } console.error("onSubmit: Update failed.", { mainErrorMessage, detailedErrorMessages }); toast({ title: "Update Failed", description: `${mainErrorMessage}${detailedErrorMessages ? `\nDetails:\n${detailedErrorMessages}` : ''}`, variant: "destructive", duration: 9000 }); }
         } catch (error) { console.error("Update failed (client-side catch):", error); toast({ title: "Error", description: "An unexpected client-side error occurred.", variant: "destructive" }); } finally { setIsPending(false); console.log("--- onSubmit End ---"); }
    };

    // --- Render Custom Field Input (SIMPLIFIED TO TEXT ONLY FOR TEST) ---
     const renderSimplifiedCustomFieldInput = (fieldDef: CustomFieldDefinitionClient, field: ControllerRenderProps<any, any>) => {
         const inputId = `custom-field-${fieldDef.id}-${field.name}`;
         // Always render a basic text input regardless of fieldDef.fieldType for this test
         console.log(`Rendering SIMPLIFIED input for ${fieldDef.name}`); // Debug Log
         return <Input id={inputId} type="text" placeholder={`${fieldDef.name} (Text Input Only)`} {...field} value={String(field.value ?? '')} />;
    };

    // --- Get Array Error Message ---
    const getArrayErrorMessage = (errors: FieldErrors<DiaryEntryFormValues>, name: "emotions" | "skills" | "urges" | "customFields") => {
        const error = errors[name]; if (!error) return null;
        if (typeof error.message === 'string') return error.message;
        if (error.root && typeof error.root.message === 'string') return error.root.message;
        return null;
    };

    // Watch arrays needed for rendering logic
    const watchedEmotions = form.watch('emotions');
    const watchedSkills = form.watch('skills');
    const watchedUrges = form.watch('urges');

    console.log("--- DiaryEntryEditForm Rendering JSX ---");
    // --- Render Form ---
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                {/* Section 1: Date, Basic Info */}
                <FormField control={form.control} name="date" render={({ field }) => ( <FormItem><FormLabel>Entry Date</FormLabel><FormControl><DatePicker value={field.value} onChange={field.onChange} /></FormControl><FormDescription>The date this diary card entry pertains to.</FormDescription><FormMessage /></FormItem> )}/>
                <FormField control={form.control} name="wellnessRating" render={({ field }) => ( <FormItem><FormLabel>Wellness Rating (0-5)</FormLabel><FormControl><Input type="number" min="0" max="5" {...field} value={field.value ?? ''} onChange={e => field.onChange(e.target.value === '' ? null : Number(e.target.value))} /></FormControl><FormMessage /></FormItem> )}/>
                <FormField control={form.control} name="notes" render={({ field }) => ( <FormItem><FormLabel>Notes</FormLabel><FormControl><Textarea placeholder="How was your day? Any significant events, thoughts, or feelings?" {...field} value={field.value ?? ''} rows={6} /></FormControl><FormMessage /></FormItem> )}/>
                <FormField control={form.control} name="crisis" render={({ field }) => ( <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4"><div className="space-y-0.5"><FormLabel>Crisis Occurred?</FormLabel><FormDescription>Did a crisis event happen since your last entry?</FormDescription></div><FormControl><Switch checked={!!field.value} onCheckedChange={field.onChange} /></FormControl></FormItem> )}/>
                <Separator />

                 {/* Section 2: Emotions - Using Controller for Intensity */}
                <div className="space-y-4">
                    <FormLabel className="text-base font-semibold">Emotions Logged</FormLabel><FormDescription>Select emotions felt and their intensity (0-5).</FormDescription>
                    <div className="space-y-3">
                        {console.log("Rendering Emotions Map...")}
                        {availableEmotions.map((emotionDef) => {
                            const currentEmotions = watchedEmotions || [];
                            const currentFieldIndex = currentEmotions.findIndex(e => e.emotionId === emotionDef.id);
                            const isSelected = currentFieldIndex !== -1;
                            return ( <div key={emotionDef.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 border rounded-md"><div className="flex items-center gap-2 flex-grow"><Checkbox id={`emotion-${emotionDef.id}`} checked={isSelected} onCheckedChange={(checked) => { const index = form.getValues('emotions')?.findIndex(e => e.emotionId === emotionDef.id) ?? -1; if (checked && index === -1) { appendEmotion({ emotionId: emotionDef.id, intensity: 0 }); } else if (!checked && index !== -1) { removeEmotion(index); } }}/> <ShadcnLabel htmlFor={`emotion-${emotionDef.id}`} className="flex items-center gap-2 cursor-pointer"> <span className="inline-block w-4 h-4 rounded-full border" style={{ backgroundColor: emotionDef.color }}></span> {emotionDef.name} </ShadcnLabel></div>{isSelected && currentFieldIndex !== -1 && ( <Controller name={`emotions.${currentFieldIndex}.intensity`} control={form.control} render={({ field, fieldState }) => ( <div className="flex-shrink-0 w-full sm:w-auto flex flex-col items-start"><div className="flex items-center gap-2"><Input id={`intensity-${emotionDef.id}`} type="number" min="0" max="5" className="w-16 h-8" {...field} value={field.value ?? ''} onChange={e => field.onChange(e.target.value === '' ? 0 : Number(e.target.value))} aria-label={`Intensity for ${emotionDef.name}`}/> <span className="text-xs text-muted-foreground">(0-5)</span></div>{fieldState.error?.message && <p className="text-xs text-destructive mt-1">{fieldState.error.message}</p>}</div> )}/> )}</div>);
                        })}
                    </div>
                    <FormMessage>{getArrayErrorMessage(form.formState.errors, 'emotions')}</FormMessage>
                </div>
                <Separator />

                 {/* Section 3: Skills */}
                 <div className="space-y-4">
                     <FormLabel className="text-base font-semibold">Skills Used</FormLabel><FormDescription>Select skills used.</FormDescription>
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {console.log("Rendering Skills Map...")}
                         {availableSkills.map((skillDef) => {
                            const currentSkills = watchedSkills || [];
                            const currentFieldIndex = currentSkills.findIndex(s => s.skillId === skillDef.id);
                            const isSelected = currentFieldIndex !== -1;
                             return ( <div key={skillDef.id} className="flex items-center gap-2 p-3 border rounded-md"><Checkbox id={`skill-${skillDef.id}`} checked={isSelected} onCheckedChange={(checked) => { const index = form.getValues('skills')?.findIndex(s => s.skillId === skillDef.id) ?? -1; if (checked && index === -1) { appendSkill({ skillId: skillDef.id }); } else if (!checked && index !== -1) { removeSkill(index); } }}/> <ShadcnLabel htmlFor={`skill-${skillDef.id}`} className="cursor-pointer text-sm font-medium leading-none">{skillDef.name}{skillDef.category && <span className="text-xs text-muted-foreground ml-1">({skillDef.category})</span>}</ShadcnLabel></div> );
                         })}
                     </div>
                     <FormMessage>{getArrayErrorMessage(form.formState.errors, 'skills')}</FormMessage>
                 </div>
                 <Separator />

                {/* Section 4: Urges - Using Controller for Rating */}
                 <div className="space-y-4">
                     <FormLabel className="text-base font-semibold">Urges Logged</FormLabel><FormDescription>Select urges experienced and their strength (0-5).</FormDescription>
                     <div className="space-y-3">
                          {console.log("Rendering Urges Map...")}
                         {availableUrges.map((urgeDef) => {
                            const currentUrges = watchedUrges || [];
                            const currentFieldIndex = currentUrges.findIndex(u => u.urgeId === urgeDef.id);
                            const isSelected = currentFieldIndex !== -1;
                             return ( <div key={urgeDef.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 border rounded-md"><div className="flex items-center gap-2 flex-grow"><Checkbox id={`urge-${urgeDef.id}`} checked={isSelected} onCheckedChange={(checked) => { const index = form.getValues('urges')?.findIndex(u => u.urgeId === urgeDef.id) ?? -1; if (checked && index === -1) { appendUrge({ urgeId: urgeDef.id, rating: 0 }); } else if (!checked && index !== -1) { removeUrge(index); } }}/> <ShadcnLabel htmlFor={`urge-${urgeDef.id}`} className="cursor-pointer">{urgeDef.name}</ShadcnLabel></div>
                                 {isSelected && currentFieldIndex !== -1 && (
                                     <Controller
                                         name={`urges.${currentFieldIndex}.rating`}
                                         control={form.control}
                                         render={({ field, fieldState }) => (
                                             <div className="flex-shrink-0 w-full sm:w-auto flex flex-col items-start">
                                                 <div className="flex items-center gap-2">
                                                     <Input id={`rating-${urgeDef.id}`} type="number" min="0" max="5" className="w-16 h-8" {...field} value={field.value ?? ''} onChange={e => field.onChange(e.target.value === '' ? 0 : Number(e.target.value))} aria-label={`Rating for ${urgeDef.name}`}/>
                                                     <span className="text-xs text-muted-foreground">(0-5)</span>
                                                 </div>
                                                 {fieldState.error?.message && <p className="text-xs text-destructive mt-1">{fieldState.error.message}</p>}
                                             </div>
                                         )}
                                     />
                                 )}
                             </div> );
                         })}
                     </div>
                     <FormMessage>{getArrayErrorMessage(form.formState.errors, 'urges')}</FormMessage>
                 </div>
                 <Separator />

                {/* Section 5: Custom Fields - SIMPLIFIED RENDER (Text Only) */}
                {customFieldDefs && customFieldDefs.length > 0 && (
                     <div className="space-y-6">
                       <div> <FormLabel className="text-base font-semibold">Additional Details</FormLabel> <FormDescription>Record any other relevant information using the custom fields below.</FormDescription> </div>
                        {console.log("Rendering Custom Fields Map...")}
                       {/* Iterate over DEFINITIONS, access RHF state via index */}
                       {customFieldDefs.sort((a, b) => a.sortOrder - b.sortOrder).map((fieldDef, index) => {
                           // This assumes the RHF customFields array order perfectly matches customFieldDefs order after reset
                           const fieldId = `custom-field-${fieldDef.id}-${index}`;
                           // Check if RHF state has an entry for this index before rendering
                           // Note: This check might be slightly racy if reset isn't instant, but safer
                           const customFieldsState = form.getValues('customFields');
                           if (!customFieldsState || index >= customFieldsState.length) {
                                return null; // Don't render if RHF state isn't ready
                           }
                           return (
                                <FormField
                                    key={fieldDef.id} // Use definition id for React key
                                    control={form.control}
                                    name={`customFields.${index}.value`} // Use index from definitions map
                                    render={({ field }) => (
                                        <FormItem className="p-3 border rounded-md space-y-2">
                                            <ShadcnLabel htmlFor={fieldId}> {fieldDef.name} </ShadcnLabel>
                                            {fieldDef.description && <FormDescription>{fieldDef.description}</FormDescription>}
                                            {/* Always render basic text input via FormControl */}
                                            <FormControl>
                                                {renderSimplifiedCustomFieldInput(fieldDef, field)}
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                           );
                       })}
                    </div>
                )}

                <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
                    {isPending ? "Saving..." : "Save Changes"}
                </Button>
            </form>
        </Form>
    );
}