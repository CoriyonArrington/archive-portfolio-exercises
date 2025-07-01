// Consolidated type definitions for process steps data

// Basic step in a process phase
export interface ProcessStep {
  title: string
  description: string
}

// Complete process phase with all details
export interface ProcessPhase {
  id: string
  phaseTitle: string
  phase_title?: string // For database compatibility
  phaseSubtitle?: string
  phase_subtitle?: string // For database compatibility
  phaseDescription: string
  phase_description?: string // For database compatibility
  steps?: ProcessStep[]
  imageUrl?: string
  image_url?: string // For database compatibility
  quoteText?: string
  quote_text?: string // For database compatibility
  quoteAuthor?: string
  quote_author?: string // For database compatibility
  outputs?: string[]
  insights?: string[]
  displayOrder: number
  display_order?: number // For database compatibility
  createdAt?: string
  created_at?: string // For database compatibility
  updatedAt?: string
  updated_at?: string // For database compatibility
}

// For backward compatibility
export type ProcessStepType = ProcessPhase
