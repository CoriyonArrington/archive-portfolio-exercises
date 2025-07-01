export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          description: string
          slug: string
          featured: boolean
          display_order: number // Changed from displayOrder
          tags: string[]
          image_url: string | null // Changed from imageUrl
          content: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          slug: string
          featured?: boolean
          display_order?: number // Changed from displayOrder
          tags?: string[]
          image_url?: string | null // Changed from imageUrl
          content?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          slug?: string
          featured?: boolean
          display_order?: number // Changed from displayOrder
          tags?: string[]
          image_url?: string | null // Changed from imageUrl
          content?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          quote: string
          author: string | null
          name: string | null
          title: string | null
          image: string | null
          avatar: string | null
          project: string | null
          created_at: string | null
          updated_at: string | null
          featured: boolean | null
          phase_tag: string | null
          display_order: number | null // Changed from displayOrder
        }
        Insert: {
          id?: string
          quote: string
          author?: string | null
          name?: string | null
          title?: string | null
          image?: string | null
          avatar?: string | null
          project?: string | null
          created_at?: string | null
          updated_at?: string | null
          featured?: boolean | null
          phase_tag?: string | null
          display_order?: number | null // Changed from displayOrder
        }
        Update: {
          id?: string
          quote?: string
          author?: string | null
          name?: string | null
          title?: string | null
          image?: string | null
          avatar?: string | null
          project?: string | null
          created_at?: string | null
          updated_at?: string | null
          featured?: boolean | null
          phase_tag?: string | null
          display_order?: number | null // Changed from displayOrder
        }
      }
      services: {
        Row: {
          id: string
          title: string
          description: string
          deliverables: string[]
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description: string
          deliverables: string[]
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          deliverables?: string[]
          created_at?: string | null
          updated_at?: string | null
        }
      }
      process_phases: {
        // Changed from process to process_phases
        Row: {
          id: string
          phase_title: string // Changed from phaseTitle
          phase_subtitle: string | null // Changed from phaseSubtitle
          phase_description: string // Changed from phaseDescription
          steps: Json
          image_url: string | null // Changed from imageUrl
          quote_text: string | null // Changed from quoteText
          quote_author: string | null // Changed from quoteAuthor
          outputs: string[]
          insights: string[] | null
          display_order: number // Changed from displayOrder
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          phase_title: string // Changed from phaseTitle
          phase_subtitle?: string | null // Changed from phaseSubtitle
          phase_description: string // Changed from phaseDescription
          steps: Json
          image_url?: string | null // Changed from imageUrl
          quote_text?: string | null // Changed from quoteText
          quote_author?: string | null // Changed from quoteAuthor
          outputs: string[]
          insights?: string[] | null
          display_order: number // Changed from displayOrder
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          phase_title?: string // Changed from phaseTitle
          phase_subtitle?: string | null // Changed from phaseSubtitle
          phase_description?: string // Changed from phaseDescription
          steps?: Json
          image_url?: string | null // Changed from imageUrl
          quote_text?: string | null // Changed from quoteText
          quote_author?: string | null // Changed from quoteAuthor
          outputs?: string[]
          insights?: string[] | null
          display_order?: number // Changed from displayOrder
          created_at?: string | null
          updated_at?: string | null
        }
      }
      faqs: {
        Row: {
          id: string
          question: string
          answer: string
          category: string | null
          display_order: number // Changed from displayOrder
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          question: string
          answer: string
          category?: string | null
          display_order: number // Changed from displayOrder
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          category?: string | null
          display_order?: number // Changed from displayOrder
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
  }
}
