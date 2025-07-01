export interface ProjectType {
  id: string
  title: string
  slug: string
  description: string
  client?: string
  year?: string
  role?: string
  duration?: string
  challenge?: string
  solution?: string
  outcomes?: string[]
  process?: string[] | any[] // Allow for complex process objects
  images?: string[]
  tags?: string[]
  featured: boolean
  scheduled?: boolean
  thumbnailUrl?: string
  thumbnail_url?: string // For database compatibility
  tools?: string[]
  categories?: string[]
  displayOrder?: number
  display_order?: number | null // For database compatibility
  createdAt?: string
  created_at?: string // For database compatibility
  updatedAt?: string
  updated_at?: string // For database compatibility
  externalUrl?: string // Added for external links
}

