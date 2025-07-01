export interface ServiceType {
  id: string
  title: string
  description: string
  icon: string
  deliverables?: string[]
  image?: string
  businessOutcomes?: string[]
  business_outcomes?: string[] // For database compatibility
  businessStatValue?: string
  business_stat_value?: string // For database compatibility
  businessStatLabel?: string
  business_stat_label?: string // For database compatibility
  clientQuote?: string
  client_quote?: string // For database compatibility
  price?: string
  displayOrder: number
  display_order?: number // For database compatibility
  createdAt?: string
  created_at?: string // For database compatibility
  updatedAt?: string
  updated_at?: string // For database compatibility
}
