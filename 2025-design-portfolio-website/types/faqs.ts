export interface FAQ {
  id: string
  question: string
  answer: string
  display_order: number
  category?: string | null
  created_at?: string
  updated_at?: string
}
