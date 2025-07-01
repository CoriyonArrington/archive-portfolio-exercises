// lib/actions/faq.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getUserProfile } from "@/utils/supabase/server";
import { faqSchema, type FaqState } from "@/lib/schemas/faq";
import { v4 as uuidv4 } from 'uuid';

// --- ADD FAQ ACTION (Existing) ---
export async function addFaqAction(
  prevState: FaqState | null,
  formData: FormData
): Promise<FaqState> {
  // ... (add action code remains the same) ...
  const supabase = createClient();

  // 1. Check user authentication and role
  const { profile, error: profileError } = await getUserProfile();
  if (profileError || !profile || profile.role !== 'admin') {
    return { status: 'error', message: "Unauthorized: Admin access required.", errors: null };
  }

  // 2. Prepare form data object (excluding id for add)
  const formValues = {
    question: formData.get("question"),
    answer: formData.get("answer"),
    page_slugs: formData.getAll("page_slugs"),
  };

  // 3. Validate form data using Zod schema
  const validatedFields = faqSchema.safeParse(formValues);

  if (!validatedFields.success) {
    console.error("Validation Errors (Add):", validatedFields.error.flatten().fieldErrors);
    return {
      status: 'error',
      message: "Validation failed. Please check the fields.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 4. Generate a new UUID for the FAQ
  const newFaqId = uuidv4();

  // 5. Insert into 'faqs' table
  const { data: faqData, error: faqError } = await supabase
    .from("faqs")
    .insert({
      id: newFaqId,
      question: validatedFields.data.question,
      answer: validatedFields.data.answer,
    })
    .select('id')
    .single();

  if (faqError || !faqData) {
    console.error("Supabase FAQ Insert Error:", faqError);
    return { status: 'error', message: `Database Error: Failed to create FAQ. ${faqError?.message ?? ''}`, errors: null };
  }

  // 6. Insert into 'faq_page_slugs' join table if slugs were provided
  const pageSlugsToInsert = validatedFields.data.page_slugs
      .filter(slug => slug)
      .map(slug => ({
          faq_id: newFaqId,
          page_slug: String(slug), // Ensure it's a string
      }));

  if (pageSlugsToInsert.length > 0) {
      const { error: slugsError } = await supabase
          .from('faq_page_slugs')
          .insert(pageSlugsToInsert);

      if (slugsError) {
          console.error("Supabase FAQ Page Slugs Insert Error:", slugsError);
          return {
              status: 'error',
              message: `FAQ created (ID: ${newFaqId}), but failed to link page slugs. ${slugsError.message}`,
              errors: null,
              faqId: newFaqId
            };
      }
  }

  // 7. Revalidate paths
  revalidatePath("/admin/faqs");
  revalidatePath("/"); // Revalidate relevant public paths too

  // 8. Redirect back to the FAQs list page WITH a success message
  const successMessage = encodeURIComponent("FAQ added successfully!");
  redirect(`/admin/faqs?status=success&message=${successMessage}`);
}


// --- EDIT FAQ ACTION (Existing) ---
export async function editFaqAction(
  prevState: FaqState | null,
  formData: FormData
): Promise<FaqState> {
    // ... (edit action code remains the same) ...
    const supabase = createClient();

    // 1. Check user authentication and role
    const { profile, error: profileError } = await getUserProfile();
    if (profileError || !profile || profile.role !== 'admin') {
        return { status: 'error', message: "Unauthorized: Admin access required.", errors: null };
    }

    // 2. Prepare form data object (including id for edit)
    const formValues = {
        id: formData.get("id"), // Get the ID from the hidden input
        question: formData.get("question"),
        answer: formData.get("answer"),
        page_slugs: formData.getAll("page_slugs"),
    };

    // 3. Validate form data using Zod schema
    const validatedFields = faqSchema.safeParse(formValues);

    if (!validatedFields.success) {
        console.error("Validation Errors (Edit):", validatedFields.error.flatten().fieldErrors);
        return {
            status: 'error',
            message: "Validation failed. Please check the fields.",
            errors: validatedFields.error.flatten().fieldErrors,
            faqId: String(formValues.id ?? '') // Pass back ID even on validation failure
        };
    }

    // Extract validated data
    const { id: faqId, question, answer, page_slugs } = validatedFields.data;

    // Ensure ID is present for editing
    if (!faqId) {
        return { status: 'error', message: "FAQ ID is missing. Cannot update.", errors: null };
    }

    // 4. Update the 'faqs' table
    const { error: faqUpdateError } = await supabase
        .from('faqs')
        .update({
            question: question,
            answer: answer,
            updated_at: new Date().toISOString(), // Update timestamp
        })
        .eq('id', faqId); // Match the specific FAQ ID

    if (faqUpdateError) {
        console.error("Supabase FAQ Update Error:", faqUpdateError);
        return { status: 'error', message: `Database Error: Failed to update FAQ. ${faqUpdateError.message}`, errors: null, faqId };
    }

    // 5. Update associations in 'faq_page_slugs' table
    // Delete existing associations, then insert new ones.

    // 5a. Delete existing page slugs for this FAQ
    const { error: deleteSlugsError } = await supabase
        .from('faq_page_slugs')
        .delete()
        .eq('faq_id', faqId);

    if (deleteSlugsError) {
        console.error("Supabase FAQ Page Slugs Delete Error:", deleteSlugsError);
        // Proceed with insert, but maybe return a warning?
    }

    // 5b. Insert new page slugs if any were provided
    const pageSlugsToInsert = page_slugs
        .filter(slug => slug)
        .map(slug => ({
            faq_id: faqId,
            page_slug: String(slug),
        }));

    if (pageSlugsToInsert.length > 0) {
        const { error: insertSlugsError } = await supabase
            .from('faq_page_slugs')
            .insert(pageSlugsToInsert);

        if (insertSlugsError) {
            console.error("Supabase FAQ Page Slugs Insert Error (Edit):", insertSlugsError);
            return {
                status: 'error',
                message: `FAQ details updated, but failed to update page slug links. ${insertSlugsError.message}`,
                errors: null,
                faqId
            };
        }
    }

    // 6. Revalidate paths
    revalidatePath("/admin/faqs");
    revalidatePath(`/admin/faqs/${faqId}/edit`);
    revalidatePath("/");

    // 7. Redirect back to the FAQs list page WITH a success message
    const successMessage = encodeURIComponent("FAQ updated successfully!");
    redirect(`/admin/faqs?status=success&message=${successMessage}`);
}


// --- DELETE FAQ ACTION (New) ---
export async function deleteFaqAction(
    faqId: string // Expect just the ID
): Promise<Omit<FaqState, 'errors' | 'faqId'>> { // Return simpler state
    const supabase = createClient();

    // 1. Check user authentication and role
    const { profile, error: profileError } = await getUserProfile();
    if (profileError || !profile || profile.role !== 'admin') {
        return { status: 'error', message: "Unauthorized: Admin access required." };
    }

    // 2. Validate the incoming ID (basic check)
    if (!faqId || typeof faqId !== 'string') {
         return { status: 'error', message: "Invalid FAQ ID provided." };
    }

    // 3. Delete associated page slugs first (safer than relying on cascade)
    const { error: deleteSlugsError } = await supabase
        .from('faq_page_slugs')
        .delete()
        .eq('faq_id', faqId);

    if (deleteSlugsError) {
        console.error(`Supabase FAQ Page Slugs Delete Error (for FAQ ID: ${faqId}):`, deleteSlugsError);
        // Decide if this should prevent FAQ deletion or just be logged
        // Returning error for safety
        return { status: 'error', message: `Failed to delete associated page slugs. ${deleteSlugsError.message}` };
    }

    // 4. Delete the main FAQ entry
    const { error: deleteFaqError } = await supabase
        .from('faqs')
        .delete()
        .eq('id', faqId);

    if (deleteFaqError) {
        console.error(`Supabase FAQ Delete Error (ID: ${faqId}):`, deleteFaqError);
        return { status: 'error', message: `Failed to delete FAQ. ${deleteFaqError.message}` };
    }

    // 5. Revalidate paths
    revalidatePath("/admin/faqs");
    revalidatePath("/"); // Revalidate relevant public paths

    // 6. Return success state (no redirect needed from direct action call)
    return { status: 'success', message: "FAQ deleted successfully!" };
}
