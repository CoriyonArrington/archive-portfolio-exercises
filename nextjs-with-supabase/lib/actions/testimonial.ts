// lib/actions/testimonial.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getUserProfile } from "@/utils/supabase/server";
// Import the UPDATED schema and types
import { testimonialSchema, type TestimonialState } from "@/lib/schemas/testimonial";
import { v4 as uuidv4 } from 'uuid';

// --- ADD TESTIMONIAL ACTION (No changes needed here for sort_order) ---
export async function addTestimonialAction(
  prevState: TestimonialState | null,
  formData: FormData
): Promise<TestimonialState> {
  const supabase = createClient();

  // 1. Auth Check
  const { profile, error: profileError } = await getUserProfile();
  if (profileError || !profile || profile.role !== 'admin') {
    return { status: 'error', message: "Unauthorized.", errors: null };
  }

  // 2. Prepare form data (sort_order not taken from form)
  const formValues = {
    name: formData.get("name"),
    role: formData.get("role"),
    quote: formData.get("quote"),
    featured: formData.get("featured"),
    // sort_order: formData.get("sort_order"), // Removed
  };

  // 3. Validate (Schema doesn't include sort_order)
  const validatedFields = testimonialSchema.safeParse(formValues);
  if (!validatedFields.success) {
    console.error("Validation Errors (Add Testimonial):", validatedFields.error.flatten().fieldErrors);
    return { status: 'error', message: "Validation failed.", errors: validatedFields.error.flatten().fieldErrors };
  }

  // 4. Get next sort_order
  const { data: maxOrderData, error: maxOrderError } = await supabase
    .from('testimonials')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
    .single();
  if (maxOrderError && maxOrderError.code !== 'PGRST116') {
      console.error("Error fetching max sort_order:", maxOrderError);
      return { status: 'error', message: "Could not determine next sort order.", errors: null };
  }
  const nextSortOrder = (maxOrderData?.sort_order ?? -1) + 1;

  // 5. Generate ID
  const newTestimonialId = uuidv4();

  // 6. Insert Testimonial (using calculated sort_order)
  const { data: testimonialData, error: testimonialError } = await supabase
    .from("testimonials")
    .insert({
      id: newTestimonialId,
      name: validatedFields.data.name,
      role: validatedFields.data.role,
      quote: validatedFields.data.quote,
      featured: validatedFields.data.featured,
      sort_order: nextSortOrder, // Use calculated order
    })
    .select('id')
    .single();

  if (testimonialError || !testimonialData) {
    console.error("Supabase Testimonial Insert Error:", testimonialError);
    return { status: 'error', message: `Database Error: Failed to create testimonial. ${testimonialError?.message ?? ''}`, errors: null };
  }

  // 7. Revalidate & Redirect
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  const successMessage = encodeURIComponent("Testimonial added successfully!");
  redirect(`/admin/testimonials?status=success&message=${successMessage}`);
}


// --- EDIT TESTIMONIAL ACTION ---
export async function editTestimonialAction(
  prevState: TestimonialState | null,
  formData: FormData
): Promise<TestimonialState> {
    const supabase = createClient();

    // 1. Auth Check
    const { profile, error: profileError } = await getUserProfile();
    if (profileError || !profile || profile.role !== 'admin') {
        return { status: 'error', message: "Unauthorized.", errors: null };
    }

    // 2. Prepare form data (excluding sort_order)
    const formValues = {
        id: formData.get("id"),
        name: formData.get("name"),
        role: formData.get("role"),
        quote: formData.get("quote"),
        featured: formData.get("featured"),
        // sort_order: formData.get("sort_order"), // Removed
    };

    // 3. Validate (Schema doesn't include sort_order)
    const validatedFields = testimonialSchema.safeParse(formValues);
    if (!validatedFields.success) {
        console.error("Validation Errors (Edit Testimonial):", validatedFields.error.flatten().fieldErrors);
        return { status: 'error', message: "Validation failed.", errors: validatedFields.error.flatten().fieldErrors, testimonialId: String(formValues.id ?? '') };
    }

    // 4. Extract data & handle ID (sort_order removed)
    const { id: testimonialId, name, role, quote, featured } = validatedFields.data;
    if (!testimonialId) {
        return { status: 'error', message: "Testimonial ID missing.", errors: null };
    }

    // 5. Update Testimonial (sort_order removed from update payload)
    const { error: testimonialUpdateError } = await supabase
        .from('testimonials')
        .update({
            name: name,
            role: role,
            quote: quote,
            featured: featured,
            // sort_order: sort_order, // Removed
            updated_at: new Date().toISOString(),
        })
        .eq('id', testimonialId);

    if (testimonialUpdateError) {
        console.error("Supabase Testimonial Update Error:", testimonialUpdateError);
        return { status: 'error', message: `Database Error: Failed to update testimonial. ${testimonialUpdateError.message}`, errors: null, testimonialId };
    }

    // 6. Revalidate & Redirect
    revalidatePath("/admin/testimonials");
    revalidatePath(`/admin/testimonials/${testimonialId}/edit`);
    revalidatePath("/");
    const successMessage = encodeURIComponent("Testimonial updated successfully!");
    redirect(`/admin/testimonials?status=success&message=${successMessage}`);
}


// --- DELETE TESTIMONIAL ACTION (Existing) ---
export async function deleteTestimonialAction(
    testimonialId: string
): Promise<Omit<TestimonialState, 'errors' | 'testimonialId'>> {
    // ... (delete action code remains the same) ...
    const supabase = createClient();

    // 1. Auth Check
    const { profile, error: profileError } = await getUserProfile();
    if (profileError || !profile || profile.role !== 'admin') {
        return { status: 'error', message: "Unauthorized." };
    }

    // 2. Validate ID
    if (!testimonialId || typeof testimonialId !== 'string') {
         return { status: 'error', message: "Invalid Testimonial ID." };
    }

    // 3. Delete Testimonial
    const { error: deleteError } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', testimonialId);

    if (deleteError) {
        console.error(`Supabase Testimonial Delete Error (ID: ${testimonialId}):`, deleteError);
        return { status: 'error', message: `Failed to delete testimonial. ${deleteError.message}` };
    }

    // 4. Revalidate
    revalidatePath("/admin/testimonials");
    revalidatePath("/");

    // 5. Return success
    return { status: 'success', message: "Testimonial deleted successfully!" };
}
