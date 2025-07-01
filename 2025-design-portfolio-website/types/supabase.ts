export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          created_at: string
          title: string
          slug: string
          description: string
          content: string
          featured_image: string
          images: string[]
          tags: string[]
          category: string
          client: string
          year: number
          is_featured: boolean
          is_published: boolean
          seo_title: string | null
          seo_description: string | null
          order: number
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          slug: string
          description: string
          content: string
          featured_image: string
          images?: string[]
          tags?: string[]
          category: string
          client: string
          year: number
          is_featured?: boolean
          is_published?: boolean
          seo_title?: string | null
          seo_description?: string | null
          order?: number
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          slug?: string
          description?: string
          content?: string
          featured_image?: string
          images?: string[]
          tags?: string[]
          category?: string
          client?: string
          year?: number
          is_featured?: boolean
          is_published?: boolean
          seo_title?: string | null
          seo_description?: string | null
          order?: number
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          id: string
          created_at: string
          name: string
          role: string
          company: string
          content: string
          avatar_url: string | null
          is_featured: boolean
          rating: number
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          role: string
          company: string
          content: string
          avatar_url?: string | null
          is_featured?: boolean
          rating?: number
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          role?: string
          company?: string
          content?: string
          avatar_url?: string | null
          is_featured?: boolean
          rating?: number
        }
        Relationships: []
      }
    }
    Views: {
      [key: string]: {
        Row: Record<string, unknown>
        Insert: Record<string, unknown>
        Update: Record<string, unknown>
        Relationships: Record<string, unknown>
      }
    }
    Functions: {
      [key: string]: {
        Args: Record<string, unknown>
        Returns: unknown
      }
    }
    Enums: {
      [key: string]: {
        [key: string]: string
      }
    }
  }
}
