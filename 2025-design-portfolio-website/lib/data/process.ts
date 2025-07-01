import { createServerClient } from "@/lib/supabase/server"
import type { ProcessStep } from "@/types/process-steps"

export async function getProcessSteps(): Promise<ProcessStep[]> {
  try {
    const supabase = await createServerClient()

    const { data, error } = await supabase.from("process_steps").select("*").order("display_order", { ascending: true })

    if (error) {
      console.error("Error fetching process steps:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error in getProcessSteps:", error)
    return []
  }
}

export async function getProcessStepById(id: string): Promise<ProcessStep | null> {
  try {
    const supabase = await createServerClient()

    const { data, error } = await supabase.from("process_steps").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching process step:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in getProcessStepById:", error)
    return null
  }
}

export const getAllProcessPhases = getProcessSteps

export async function createProcessPhase(phaseData: Partial<ProcessStep>): Promise<ProcessStep | null> {
  try {
    const supabase = await createServerClient()

    const { data, error } = await supabase.from("process_steps").insert([phaseData]).select().single()

    if (error) {
      console.error("Error creating process phase:", error)
      return null
    }

    return data as ProcessStep
  } catch (error) {
    console.error("Error in createProcessPhase:", error)
    return null
  }
}

export const getProcessPhaseById = getProcessStepById

export async function updateProcessPhase(id: string, phaseData: Partial<ProcessStep>): Promise<ProcessStep | null> {
  try {
    const supabase = await createServerClient()

    const { data, error } = await supabase.from("process_steps").update(phaseData).eq("id", id).select().single()

    if (error) {
      console.error(`Error updating process phase with id ${id}:`, error)
      return null
    }

    return data as ProcessStep
  } catch (error) {
    console.error("Error in updateProcessPhase:", error)
    return null
  }
}

export async function deleteProcessPhase(id: string): Promise<boolean> {
  try {
    const supabase = await createServerClient()

    const { error } = await supabase.from("process_steps").delete().eq("id", id)

    if (error) {
      console.error(`Error deleting process phase with id ${id}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error in deleteProcessPhase:", error)
    return false
  }
}
