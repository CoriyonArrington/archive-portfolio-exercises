import type { Project } from "@/types/project"

/**
 * Ensures that all array fields in a project are properly initialized
 */
export function ensureProjectArrayFields(project: Partial<Project>): Partial<Project> {
  return {
    ...project,
    outcomes: project.outcomes || [],
    process: project.process || [],
    images: project.images || [],
    tags: project.tags || [],
    tools: project.tools || [],
    categories: project.categories || [],
  }
}
