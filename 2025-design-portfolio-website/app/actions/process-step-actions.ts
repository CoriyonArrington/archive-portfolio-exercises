"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { ProcessStep, ProcessStepFormData } from "@/types/process-steps"

export async function getProcessSteps(): Promise<ProcessStep[]> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("process_steps").select("*").order("display_order", { ascending: true })

    if (error) {
      console.error("Error fetching process steps:", error)
      return []
    }

    return data as ProcessStep[]
  } catch (error) {
    console.error("Error in getProcessSteps:", error)
    return []
  }
}

export async function getProcessStepById(id: string): Promise<ProcessStep | null> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("process_steps").select("*").eq("id", id).single()

    if (error) {
      console.error(`Error fetching process step with id ${id}:`, error)
      return null
    }

    return data as ProcessStep
  } catch (error) {
    console.error(`Error in getProcessStepById:`, error)
    return null
  }
}

export async function createProcessStepAction(formData: ProcessStepFormData) {
  try {
    const supabase = await createClient()

    // Ensure arrays are initialized properly
    const dataToInsert = {
      ...formData,
      steps: formData.steps || [],
      outputs: formData.outputs || [],
      insights: formData.insights || [],
    }

    const { data, error } = await supabase.from("process_steps").insert([dataToInsert]).select()

    if (error) {
      console.error("Error creating process step:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/process-steps")
    revalidatePath("/process")
    redirect("/admin/process-steps")
  } catch (error) {
    console.error("Error in createProcessStepAction:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function updateProcessStepAction(id: string, formData: ProcessStepFormData) {
  try {
    const supabase = await createClient()

    // Ensure arrays are initialized properly
    const dataToUpdate = {
      ...formData,
      steps: formData.steps || [],
      outputs: formData.outputs || [],
      insights: formData.insights || [],
    }

    const { error } = await supabase.from("process_steps").update(dataToUpdate).eq("id", id)

    if (error) {
      console.error(`Error updating process step with id ${id}:`, error)
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/process-steps")
    revalidatePath("/process")
    redirect("/admin/process-steps")
  } catch (error) {
    console.error("Error in updateProcessStepAction:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function deleteProcessStepAction(id: string) {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from("process_steps").delete().eq("id", id)

    if (error) {
      console.error(`Error deleting process step with id ${id}:`, error)
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/process-steps")
    revalidatePath("/process")
    redirect("/admin/process-steps")
  } catch (error) {
    console.error("Error in deleteProcessStepAction:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export const deleteProcessStep = deleteProcessStepAction
