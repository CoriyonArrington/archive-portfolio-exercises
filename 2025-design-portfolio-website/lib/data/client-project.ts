"use client"

import { createBrowserSupabaseClient } from "@/lib/supabase/browser"-browser"
import type { Project } from "@/types/project"

// Client-side only data fetching
export async function getClientProjects(): Promise<Project[]> {
  try {
    const supabase = createBrowserSupabaseClient()

    const { data, error } = await supabase.from("projects").select("*").order("display_order", { ascending: true })

    if (error) {
      console.error("Error fetching projects:", error)
      return []
    }

    return data as Project[]
  } catch (error) {
    console.error("Error in getClientProjects:", error)
    return []
  }
}

export async function getClientProjectById(id: string): Promise<Project | null> {
  try {
    const supabase = createBrowserSupabaseClient()

    const { data, error } = await supabase.from("projects").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching project:", error)
      return null
    }

    return data as Project
  } catch (error) {
    console.error("Error in getClientProjectById:", error)
    return null
  }
}

export async function updateClientProject(id: string, project: Partial<Project>): Promise<Project | null> {
  try {
    const supabase = createBrowserSupabaseClient()

    const { data, error } = await supabase.from("projects").update(project).eq("id", id).select().single()

    if (error) {
      console.error("Error updating project:", error)
      return null
    }

    return data as Project
  } catch (error) {
    console.error("Error in updateClientProject:", error)
    return null
  }
}

export async function createClientProject(project: Partial<Project>): Promise<Project | null> {
  try {
    const supabase = createBrowserSupabaseClient()

    const { data, error } = await supabase.from("projects").insert([project]).select().single()

    if (error) {
      console.error("Error creating project:", error)
      return null
    }

    return data as Project
  } catch (error) {
    console.error("Error in createClientProject:", error)
    return null
  }
}

export async function deleteClientProject(id: string): Promise<boolean> {
  try {
    const supabase = createBrowserSupabaseClient()

    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) {
      console.error("Error deleting project:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error in deleteClientProject:", error)
    return false
  }
}
