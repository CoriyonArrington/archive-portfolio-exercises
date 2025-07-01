export interface TestimonialType {
  id: string
  quote: string
  author: string
  name?: string
  title?: string
  image?: string
  avatar?: string
  project?: string
  featured: boolean
  phaseTag?: string
  phase_tag?: string // For database compatibility
  displayOrder: number
  display_order?: number // For database compatibility
  createdAt?: string
  created_at?: string // For database compatibility
  updatedAt?: string
  updated_at?: string // For database compatibility
}
