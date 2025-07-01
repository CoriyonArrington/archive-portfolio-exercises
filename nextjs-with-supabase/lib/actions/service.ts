// lib/actions/service.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getUserProfile } from "@/utils/supabase/server";
// Import the UPDATED schema (will remove sort_order)
import { serviceSchema, type ServiceState } from "@/lib/schemas/service";
import { generateSlug } from "@/lib/schemas/project";
import { v4 as uuidv4 } from 'uuid';

// --- ADD SERVICE ACTION ---
export async function addServiceAction(
  prevState: ServiceState | null,
  formData: FormData
): Promise<ServiceState> {
  const supabase = createClient();

  // 1. Auth Check
  const { profile, error: profileError } = await getUserProfile();
  if (profileError || !profile || profile.role !== 'admin') {
    return { status: 'error', message: "Unauthorized.", errors: null };
  }

  // 2. Prepare form data (sort_order removed from here)
  const formValues = {
    title: formData.get("title"),
    description: formData.get("description"),
    slug: formData.get("slug"),
    featured: formData.get("featured"),
    // sort_order: formData.get("sort_order"), // Removed
  };

  // 3. Validate (Schema will be updated to remove sort_order)
  const validatedFields = serviceSchema.safeParse(formValues);
  if (!validatedFields.success) {
    console.error("Validation Errors (Add Service):", validatedFields.error.flatten().fieldErrors);
    return { status: 'error', message: "Validation failed.", errors: validatedFields.error.flatten().fieldErrors };
  }

  // 4. Get current max sort_order + 1
  const { data: maxOrderData, error: maxOrderError } = await supabase
    .from('services')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
    .single(); // Get the single row with the highest sort_order

  if (maxOrderError && maxOrderError.code !== 'PGRST116') { // Ignore 'PGRST116' (No rows found)
      console.error("Error fetching max sort_order:", maxOrderError);
      return { status: 'error', message: "Could not determine next sort order.", errors: null };
  }
  const nextSortOrder = (maxOrderData?.sort_order ?? -1) + 1; // Default to 0 if table is empty

  // 5. Generate ID and Slug
  const newServiceId = uuidv4();
  const finalSlug = validatedFields.data.slug
                    ? generateSlug(validatedFields.data.slug)
                    : generateSlug(validatedFields.data.title);
  if (!finalSlug) {
      return { status: 'error', message: "Could not generate a valid slug.", errors: { title: ["Title must contain letters or numbers."] } };
  }

  // 6. Insert Service with calculated sort_order
  const { data: serviceData, error: serviceError } = await supabase
    .from("services")
    .insert({
      id: newServiceId,
      title: validatedFields.data.title,
      description: validatedFields.data.description,
      slug: finalSlug,
      featured: validatedFields.data.featured,
      sort_order: nextSortOrder, // Use calculated order
    })
    .select('id')
    .single();

  if (serviceError || !serviceData) {
    console.error("Supabase Service Insert Error:", serviceError);
    if (serviceError?.code === '23505' && serviceError?.message.includes('slug')) {
         return { status: 'error', message: `Database Error: Slug "${finalSlug}" already exists.`, errors: { slug: ["This slug is already in use."] } };
    }
    return { status: 'error', message: `Database Error: Failed to create service. ${serviceError?.message ?? ''}`, errors: null };
  }

  // 7. Revalidate & Redirect
  revalidatePath("/admin/services");
  revalidatePath("/");
  revalidatePath("/services");
  const successMessage = encodeURIComponent("Service added successfully!");
  redirect(`/admin/services?status=success&message=${successMessage}`);
}


// --- EDIT SERVICE ACTION ---
export async function editServiceAction(
  prevState: ServiceState | null,
  formData: FormData
): Promise<ServiceState> {
    const supabase = createClient();

    // 1. Auth Check
    const { profile, error: profileError } = await getUserProfile();
    if (profileError || !profile || profile.role !== 'admin') {
        return { status: 'error', message: "Unauthorized.", errors: null };
    }

    // 2. Prepare form data (including id, removing sort_order)
    const formValues = {
        id: formData.get("id"),
        title: formData.get("title"),
        description: formData.get("description"),
        slug: formData.get("slug"),
        featured: formData.get("featured"),
        // sort_order: formData.get("sort_order"), // Removed
    };

    // 3. Validate (Schema updated to remove sort_order)
    const validatedFields = serviceSchema.safeParse(formValues);
    if (!validatedFields.success) {
        console.error("Validation Errors (Edit Service):", validatedFields.error.flatten().fieldErrors);
        return { status: 'error', message: "Validation failed.", errors: validatedFields.error.flatten().fieldErrors, serviceId: String(formValues.id ?? '') };
    }

    // 4. Extract data & handle slug/ID
    // Removed sort_order from destructuring
    const { id: serviceId, title, description, slug, featured } = validatedFields.data;
    if (!serviceId) {
        return { status: 'error', message: "Service ID missing.", errors: null };
    }
    const finalSlug = slug ? generateSlug(slug) : generateSlug(title);
    if (!finalSlug) {
        return { status: 'error', message: "Could not generate valid slug.", errors: { title: ["Title must contain letters or numbers."] }, serviceId };
    }

    // 5. Update Service (Removed sort_order from update payload)
    const { error: serviceUpdateError } = await supabase
        .from('services')
        .update({
            title: title,
            description: description,
            slug: finalSlug,
            featured: featured,
            // sort_order: sort_order, // Removed
            updated_at: new Date().toISOString(),
        })
        .eq('id', serviceId);

    if (serviceUpdateError) {
        console.error("Supabase Service Update Error:", serviceUpdateError);
         if (serviceUpdateError?.code === '23505' && serviceUpdateError?.message.includes('slug')) {
            return { status: 'error', message: `Database Error: Slug "${finalSlug}" already exists.`, errors: { slug: ["This slug is already in use."] }, serviceId };
        }
        return { status: 'error', message: `Database Error: Failed to update service. ${serviceUpdateError.message}`, errors: null, serviceId };
    }

    // 6. Revalidate & Redirect
    revalidatePath("/admin/services");
    revalidatePath(`/admin/services/${serviceId}/edit`);
    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath(`/services/${finalSlug}`);
    const successMessage = encodeURIComponent("Service updated successfully!");
    redirect(`/admin/services?status=success&message=${successMessage}`);
}


// --- DELETE SERVICE ACTION (Existing) ---
export async function deleteServiceAction(
    serviceId: string
): Promise<Omit<ServiceState, 'errors' | 'serviceId'>> {
    // ... (delete action code remains the same) ...
    const supabase = createClient();

    // 1. Auth Check
    const { profile, error: profileError } = await getUserProfile();
    if (profileError || !profile || profile.role !== 'admin') {
        return { status: 'error', message: "Unauthorized." };
    }

    // 2. Validate ID
    if (!serviceId || typeof serviceId !== 'string') {
         return { status: 'error', message: "Invalid Service ID." };
    }

    // 3. Delete Service
    const { error: deleteError } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);

    if (deleteError) {
        console.error(`Supabase Service Delete Error (ID: ${serviceId}):`, deleteError);
        return { status: 'error', message: `Failed to delete service. ${deleteError.message}` };
    }

    // 4. Revalidate
    revalidatePath("/admin/services");
    revalidatePath("/");
    revalidatePath("/services");

    // 5. Return success
    return { status: 'success', message: "Service deleted successfully!" };
}
