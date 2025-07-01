// types/project.ts

/** The structured object your CMS stores under `content` */
export interface ProjectContent {
  why: string
  overview: string
  before_after: string
}

/** One project record */
export interface Project {
  id: string
  title: string
  description: string | null
  slug: string
  content: ProjectContent
  tags?: string[]
}

/** Props for the ProjectsSection component */
export interface ProjectsSectionProps {
  headline: string
  body: string
  cta: string
  projects: Project[]
}
