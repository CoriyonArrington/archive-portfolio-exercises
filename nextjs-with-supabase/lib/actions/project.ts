// lib/actions/project.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getUserProfile } from "@/utils/supabase/server";
import { projectSchema, type ProjectState, generateSlug } from "@/lib/schemas/project";
import { v4 as uuidv4 } from 'uuid';

// --- ADD PROJECT ACTION (Existing) ---
export async function addProjectAction(
  prevState: ProjectState | null,
  formData: FormData
): Promise<ProjectState> {
  // ... (add action code remains the same) ...
  const supabase = createClient();

  // 1. Auth Check
  const { profile, error: profileError } = await getUserProfile();
  if (profileError || !profile || profile.role !== 'admin') {
    return { status: 'error', message: "Unauthorized: Admin access required.", errors: null };
  }

  // 2. Prepare form data
  const formValues = {
    title: formData.get("title"),
    description: formData.get("description"),
    slug: formData.get("slug"),
    featured: formData.get("featured"),
    tags: formData.get("tags"),
  };

  // 3. Validate
  const validatedFields = projectSchema.safeParse(formValues);

  if (!validatedFields.success) {
    console.error("Validation Errors (Add Project):", validatedFields.error.flatten().fieldErrors);
    return {
      status: 'error',
      message: "Validation failed. Please check the fields.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 4. Generate ID and Slug
  const newProjectId = uuidv4();
  const finalSlug = validatedFields.data.slug
                    ? generateSlug(validatedFields.data.slug)
                    : generateSlug(validatedFields.data.title);

  if (!finalSlug) {
      return { status: 'error', message: "Could not generate a valid slug from the title.", errors: { title: ["Title must contain letters or numbers to generate a slug."] } };
  }

  // 5. Insert Project
  const { data: projectData, error: projectError } = await supabase
    .from("projects")
    .insert({
      id: newProjectId,
      title: validatedFields.data.title,
      description: validatedFields.data.description,
      slug: finalSlug,
      featured: validatedFields.data.featured,
      sort_order: 0, // Assuming default sort order
    })
    .select('id')
    .single();

  if (projectError || !projectData) {
    console.error("Supabase Project Insert Error:", projectError);
    if (projectError?.code === '23505' && projectError?.message.includes('slug')) {
         return { status: 'error', message: `Database Error: The slug "${finalSlug}" is already taken. Please provide a unique slug.`, errors: { slug: ["This slug is already in use."] } };
    }
    return { status: 'error', message: `Database Error: Failed to create project. ${projectError?.message ?? ''}`, errors: null };
  }

  // 6. Insert Tags
  const tagsString = validatedFields.data.tags ?? '';
  const tagsToInsert = tagsString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag);

  if (tagsToInsert.length > 0) {
      const tagInsertData = tagsToInsert.map(tag => ({
          project_id: newProjectId,
          tag: tag,
      }));
      const { error: tagsError } = await supabase
          .from('project_tags')
          .insert(tagInsertData);
      if (tagsError) {
          console.error("Supabase Project Tags Insert Error:", tagsError);
          return {
              status: 'error',
              message: `Project created (ID: ${newProjectId}), but failed to add tags. ${tagsError.message}`,
              errors: null,
              projectId: newProjectId
            };
      }
  }

  // 7. Revalidate paths
  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath("/projects");

  // 8. Redirect
  const successMessage = encodeURIComponent("Project added successfully!");
  redirect(`/admin/projects?status=success&message=${successMessage}`);
}


// --- EDIT PROJECT ACTION (Existing) ---
export async function editProjectAction(
  prevState: ProjectState | null,
  formData: FormData
): Promise<ProjectState> {
    // ... (edit action code remains the same) ...
    const supabase = createClient();

    // 1. Auth Check
    const { profile, error: profileError } = await getUserProfile();
    if (profileError || !profile || profile.role !== 'admin') {
        return { status: 'error', message: "Unauthorized: Admin access required.", errors: null };
    }

    // 2. Prepare form data
    const formValues = {
        id: formData.get("id"),
        title: formData.get("title"),
        description: formData.get("description"),
        slug: formData.get("slug"),
        featured: formData.get("featured"),
        tags: formData.get("tags"),
    };

    // 3. Validate
    const validatedFields = projectSchema.safeParse(formValues);

    if (!validatedFields.success) {
        console.error("Validation Errors (Edit Project):", validatedFields.error.flatten().fieldErrors);
        return {
            status: 'error',
            message: "Validation failed. Please check the fields.",
            errors: validatedFields.error.flatten().fieldErrors,
            projectId: String(formValues.id ?? '')
        };
    }

    // 4. Extract data & handle slug
    const { id: projectId, title, description, slug, featured, tags } = validatedFields.data;
    if (!projectId) {
        return { status: 'error', message: "Project ID is missing. Cannot update.", errors: null };
    }
    const finalSlug = slug ? generateSlug(slug) : generateSlug(title);
     if (!finalSlug) {
        return { status: 'error', message: "Could not generate a valid slug.", errors: { slug: ["Slug cannot be empty or invalid."] }, projectId };
    }

    // 5. Update Project
    const { error: projectUpdateError } = await supabase
        .from('projects')
        .update({
            title: title,
            description: description,
            slug: finalSlug,
            featured: featured,
            updated_at: new Date().toISOString(),
        })
        .eq('id', projectId);

    if (projectUpdateError) {
        console.error("Supabase Project Update Error:", projectUpdateError);
        if (projectUpdateError?.code === '23505' && projectUpdateError?.message.includes('slug')) {
            return { status: 'error', message: `Database Error: The slug "${finalSlug}" is already taken. Please provide a unique slug.`, errors: { slug: ["This slug is already in use."] }, projectId };
        }
        return { status: 'error', message: `Database Error: Failed to update project. ${projectUpdateError.message}`, errors: null, projectId };
    }

    // 6. Update Tags (Delete old, Insert new)
    const { error: deleteTagsError } = await supabase
        .from('project_tags')
        .delete()
        .eq('project_id', projectId);
    if (deleteTagsError) console.error("Supabase Project Tags Delete Error:", deleteTagsError);

    const tagsString = tags ?? '';
    const tagsToInsert = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);

    if (tagsToInsert.length > 0) {
        const tagInsertData = tagsToInsert.map(tag => ({
            project_id: projectId,
            tag: tag,
        }));
        const { error: insertTagsError } = await supabase
            .from('project_tags')
            .insert(tagInsertData);
        if (insertTagsError) {
            console.error("Supabase Project Tags Insert Error (Edit):", insertTagsError);
            return {
                status: 'error',
                message: `Project details updated, but failed to update tags. ${insertTagsError.message}`,
                errors: null,
                projectId
            };
        }
    }

    // 7. Revalidate paths
    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${projectId}/edit`);
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath(`/projects/${finalSlug}`);

    // 8. Redirect
    const successMessage = encodeURIComponent("Project updated successfully!");
    redirect(`/admin/projects?status=success&message=${successMessage}`);
}


// --- DELETE PROJECT ACTION (New) ---
export async function deleteProjectAction(
    projectId: string
): Promise<Omit<ProjectState, 'errors' | 'projectId'>> { // Simpler return state
    const supabase = createClient();

    // 1. Check user authentication and role
    const { profile, error: profileError } = await getUserProfile();
    if (profileError || !profile || profile.role !== 'admin') {
        return { status: 'error', message: "Unauthorized: Admin access required." };
    }

    // 2. Validate the incoming ID (basic check)
    if (!projectId || typeof projectId !== 'string') {
         return { status: 'error', message: "Invalid Project ID provided." };
    }

    // 3. Delete the main project entry
    // Assuming ON DELETE CASCADE is set for project_tags, this should remove associated tags.
    // If CASCADE is not set, you would need to delete from project_tags first.
    const { error: deleteProjectError } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

    if (deleteProjectError) {
        console.error(`Supabase Project Delete Error (ID: ${projectId}):`, deleteProjectError);
        return { status: 'error', message: `Failed to delete project. ${deleteProjectError.message}` };
    }

    // 4. Revalidate paths
    revalidatePath("/admin/projects");
    revalidatePath("/"); // Revalidate relevant public paths
    revalidatePath("/projects");

    // 5. Return success state
    return { status: 'success', message: "Project deleted successfully!" };
}
