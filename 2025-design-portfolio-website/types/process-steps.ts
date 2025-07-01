export interface ProcessStep {
  id: string
  phaseTitle: string
  phaseSubtitle: string
  phaseDescription: string
  displayOrder: number
  imageUrl?: string
  quoteText?: string
  quoteAuthor?: string
  icon?: string
  steps?: string[]
  outputs?: string[] | string
  keyResults?: string[] | string
  statValue?: string
  statLabel?: string
}

export interface ProcessStepFormData {
  title: string
  subtitle: string
  description: string
  imageUrl?: string
  quoteText?: string
  quoteAuthor?: string
  icon?: string
  displayOrder: number
  outputs?: string
  keyResults?: string
  statValue?: string
  statLabel?: string
}
