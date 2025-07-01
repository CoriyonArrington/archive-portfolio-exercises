"use server"

import type { ProjectType } from "@/types/project"

export async function generateProjectPDF(project: ProjectType): Promise<string> {
  // This function is no longer needed since we're generating HTML instead
  // But we'll keep it as a stub to avoid breaking existing code
  return "HTML generation is handled directly in the API route"
}
