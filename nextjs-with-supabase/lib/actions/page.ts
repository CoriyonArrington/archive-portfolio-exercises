// lib/actions/page.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getUserProfile } from "@/utils/supabase/server";
// Import schema and state type
import { pageContentSchema, type PageContentState } from "@/lib/schemas/page";
import type { Json } from '@/types/supabase'; // Import Supabase Json type

export async function editPageContentAction(
  prevState: PageContentState | null,
  formData: FormData
): Promise<PageContentState> {
  const supabase = createClient();

  // 1. Auth Check
  const { profile, error: profileError } = await getUserProfile();
  if (profileError || !profile || profile.role !== 'admin') {
    return { status: 'error', message: "Unauthorized.", errors: null };
  }

  // 2. Prepare form data
  const formValues = {
    slug: formData.get("slug"), // Get slug from hidden input
    content: formData.get("content"), // Get content string from textarea
  };

  // 3. Validate
  const validatedFields = pageContentSchema.safeParse(formValues);
  if (!validatedFields.success) {
    console.error("Validation Errors (Edit Page Content):", validatedFields.error.flatten().fieldErrors);
    return {
        status: 'error',
        message: "Validation failed. Please check the JSON content.",
        errors: validatedFields.error.flatten().fieldErrors,
        pageSlug: String(formValues.slug ?? '')
    };
  }

  // 4. Extract validated data
  const { slug, content: contentString } = validatedFields.data;

  // 5. Parse the validated JSON string into an actual JSON object
  let contentJson: Json;
  try {
    contentJson = JSON.parse(contentString);
  } catch (e) {
    // Should not happen due to Zod refine, but catch just in case
    console.error("JSON Parsing Error:", e);
    return { status: 'error', message: "Failed to parse JSON content.", errors: { content: ["Invalid JSON structure."] }, pageSlug: slug };
  }

  // 6. Update Page Content in Database
  const { error: updateError } = await supabase
    .from('pages')
    .update({
        content: contentJson, // Update with the parsed JSON object
        updated_at: new Date().toISOString(),
    })
    .eq('slug', slug); // Match the specific page slug

  if (updateError) {
    console.error(`Supabase Page Content Update Error (Slug: ${slug}):`, updateError);
    return { status: 'error', message: `Database Error: Failed to update page content. ${updateError.message}`, errors: null, pageSlug: slug };
  }

  // 7. Revalidate paths
  revalidatePath(`/admin/pages`); // Revalidate admin list
  revalidatePath(`/admin/pages/${slug}/edit`); // Revalidate edit page
  // Revalidate the actual public page based on its slug
  revalidatePath(slug === 'home' ? '/' : `/${slug}`);

  // 8. Redirect back to the Pages list page WITH a success message
  const successMessage = encodeURIComponent(`Page content for '${slug}' updated successfully!`);
  redirect(`/admin/pages?status=success&message=${successMessage}`);
}
