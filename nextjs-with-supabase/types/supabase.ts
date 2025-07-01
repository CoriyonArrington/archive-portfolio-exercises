export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      dbt_custom_fields: {
        Row: {
          created_at: string
          id: string
          name: string
          options: Json | null
          sort_order: number
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          options?: Json | null
          sort_order?: number
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          options?: Json | null
          sort_order?: number
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      dbt_diary_entries: {
        Row: {
          created_at: string
          crisis: boolean
          date: string
          id: string
          notes: string | null
          updated_at: string
          user_id: string
          wellness_rating: number
        }
        Insert: {
          created_at?: string
          crisis?: boolean
          date: string
          id?: string
          notes?: string | null
          updated_at?: string
          user_id: string
          wellness_rating: number
        }
        Update: {
          created_at?: string
          crisis?: boolean
          date?: string
          id?: string
          notes?: string | null
          updated_at?: string
          user_id?: string
          wellness_rating?: number
        }
        Relationships: []
      }
      dbt_emotions: {
        Row: {
          color: string
          created_at: string
          id: string
          is_custom: boolean
          name: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          color: string
          created_at?: string
          id?: string
          is_custom?: boolean
          name: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          color?: string
          created_at?: string
          id?: string
          is_custom?: boolean
          name?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      dbt_entry_custom_fields: {
        Row: {
          entry_id: string
          field_id: string
          id: string
          value: Json | null
        }
        Insert: {
          entry_id: string
          field_id: string
          id?: string
          value?: Json | null
        }
        Update: {
          entry_id?: string
          field_id?: string
          id?: string
          value?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "dbt_entry_custom_fields_entry_id_fkey"
            columns: ["entry_id"]
            isOneToOne: false
            referencedRelation: "dbt_diary_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dbt_entry_custom_fields_field_id_fkey"
            columns: ["field_id"]
            isOneToOne: false
            referencedRelation: "dbt_custom_fields"
            referencedColumns: ["id"]
          },
        ]
      }
      dbt_entry_emotions: {
        Row: {
          emotion_id: string
          entry_id: string
          id: string
          intensity: number
        }
        Insert: {
          emotion_id: string
          entry_id: string
          id?: string
          intensity: number
        }
        Update: {
          emotion_id?: string
          entry_id?: string
          id?: string
          intensity?: number
        }
        Relationships: [
          {
            foreignKeyName: "dbt_entry_emotions_emotion_id_fkey"
            columns: ["emotion_id"]
            isOneToOne: false
            referencedRelation: "dbt_emotions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dbt_entry_emotions_entry_id_fkey"
            columns: ["entry_id"]
            isOneToOne: false
            referencedRelation: "dbt_diary_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      dbt_entry_skills: {
        Row: {
          entry_id: string
          id: string
          skill_id: string
        }
        Insert: {
          entry_id: string
          id?: string
          skill_id: string
        }
        Update: {
          entry_id?: string
          id?: string
          skill_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dbt_entry_skills_entry_id_fkey"
            columns: ["entry_id"]
            isOneToOne: false
            referencedRelation: "dbt_diary_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dbt_entry_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "dbt_skills"
            referencedColumns: ["id"]
          },
        ]
      }
      dbt_entry_urges: {
        Row: {
          entry_id: string
          id: string
          rating: number
          urge_id: string
        }
        Insert: {
          entry_id: string
          id?: string
          rating: number
          urge_id: string
        }
        Update: {
          entry_id?: string
          id?: string
          rating?: number
          urge_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dbt_entry_urges_entry_id_fkey"
            columns: ["entry_id"]
            isOneToOne: false
            referencedRelation: "dbt_diary_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dbt_entry_urges_urge_id_fkey"
            columns: ["urge_id"]
            isOneToOne: false
            referencedRelation: "dbt_urges"
            referencedColumns: ["id"]
          },
        ]
      }
      dbt_skills: {
        Row: {
          benefits: string | null
          category: string
          created_at: string
          description: string | null
          examples: string | null
          icon: string | null
          id: string
          is_custom: boolean
          name: string
          practice: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          benefits?: string | null
          category: string
          created_at?: string
          description?: string | null
          examples?: string | null
          icon?: string | null
          id?: string
          is_custom?: boolean
          name: string
          practice?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          benefits?: string | null
          category?: string
          created_at?: string
          description?: string | null
          examples?: string | null
          icon?: string | null
          id?: string
          is_custom?: boolean
          name?: string
          practice?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      dbt_urges: {
        Row: {
          created_at: string
          id: string
          is_custom: boolean
          name: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_custom?: boolean
          name: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_custom?: boolean
          name?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      dbt_user_preferences: {
        Row: {
          notifications_enabled: boolean
          reminder_time: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          notifications_enabled?: boolean
          reminder_time?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          notifications_enabled?: boolean
          reminder_time?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      faq_page_slugs: {
        Row: {
          created_at: string | null
          faq_id: string
          id: string
          page_slug: string
        }
        Insert: {
          created_at?: string | null
          faq_id: string
          id?: string
          page_slug: string
        }
        Update: {
          created_at?: string | null
          faq_id?: string
          id?: string
          page_slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "faq_page_slugs_faq_id_fkey"
            columns: ["faq_id"]
            isOneToOne: false
            referencedRelation: "faqs"
            referencedColumns: ["id"]
          },
        ]
      }
      faqs: {
        Row: {
          answer: string | null
          created_at: string | null
          id: string
          question: string | null
          updated_at: string | null
        }
        Insert: {
          answer?: string | null
          created_at?: string | null
          id?: string
          question?: string | null
          updated_at?: string | null
        }
        Update: {
          answer?: string | null
          created_at?: string | null
          id?: string
          question?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      feedback_submissions: {
        Row: {
          clarity_rating: number | null
          comments: string | null
          created_at: string | null
          id: string
          source_url: string | null
          usefulness_rating: number | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          clarity_rating?: number | null
          comments?: string | null
          created_at?: string | null
          id?: string
          source_url?: string | null
          usefulness_rating?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          clarity_rating?: number | null
          comments?: string | null
          created_at?: string | null
          id?: string
          source_url?: string | null
          usefulness_rating?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      icons: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      pages: {
        Row: {
          content: Json | null
          created_at: string | null
          id: string
          meta_description: string | null
          slug: string | null
          sort_order: number | null
          title: string | null
          type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          id?: string
          meta_description?: string | null
          slug?: string | null
          sort_order?: number | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          id?: string
          meta_description?: string | null
          slug?: string | null
          sort_order?: number | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      pg_question_options: {
        Row: {
          created_at: string
          id: string
          is_correct: boolean
          option_text: string
          question_id: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_correct?: boolean
          option_text: string
          question_id: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_correct?: boolean
          option_text?: string
          question_id?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "pg_quiz_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      pg_quiz_questions: {
        Row: {
          created_at: string
          explanation: string | null
          id: string
          question_text: string
          quiz_id: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          explanation?: string | null
          id?: string
          question_text: string
          quiz_id: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          explanation?: string | null
          id?: string
          question_text?: string
          quiz_id?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "pg_quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      pg_quizzes: {
        Row: {
          created_at: string
          description: string | null
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      pg_tools: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_alt: string | null
          image_url: string | null
          slug: string
          sort_order: number | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_alt?: string | null
          image_url?: string | null
          slug: string
          sort_order?: number | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_alt?: string | null
          image_url?: string | null
          slug?: string
          sort_order?: number | null
          title?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          author_id: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          id: string
          published_at: string | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published_at?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      problem_page_slugs: {
        Row: {
          created_at: string | null
          id: string
          page_slug: string
          problem_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          page_slug: string
          problem_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          page_slug?: string
          problem_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "problem_page_slugs_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      problems: {
        Row: {
          created_at: string | null
          description: string | null
          icon_id: string | null
          id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon_id?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon_id?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "problems_icon_id_fkey"
            columns: ["icon_id"]
            isOneToOne: false
            referencedRelation: "icons"
            referencedColumns: ["id"]
          },
        ]
      }
      process_phases: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          phase_title: string | null
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          phase_title?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          phase_title?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          role: string
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          role?: string
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      project_tags: {
        Row: {
          created_at: string | null
          id: string
          project_id: string
          tag: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          project_id: string
          tag: string
        }
        Update: {
          created_at?: string | null
          id?: string
          project_id?: string
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_tags_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          content: Json | null
          created_at: string | null
          description: string | null
          featured: boolean | null
          id: string
          og_image_url: string | null
          slug: string | null
          sort_order: number | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          og_image_url?: string | null
          slug?: string | null
          sort_order?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          og_image_url?: string | null
          slug?: string | null
          sort_order?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      public_messages: {
        Row: {
          created_at: string
          email: string | null
          id: number
          message: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          message?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          message?: string | null
          name?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description: string | null
          featured: boolean | null
          id: string
          slug: string | null
          sort_order: number | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          slug?: string | null
          sort_order?: number | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          slug?: string | null
          sort_order?: number | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      solution_page_slugs: {
        Row: {
          created_at: string | null
          id: string
          page_slug: string
          solution_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          page_slug: string
          solution_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          page_slug?: string
          solution_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "solution_page_slugs_solution_id_fkey"
            columns: ["solution_id"]
            isOneToOne: false
            referencedRelation: "solutions"
            referencedColumns: ["id"]
          },
        ]
      }
      solution_pages: {
        Row: {
          created_at: string | null
          detailed_content: Json | null
          headline: string | null
          id: string
          meta_description: string | null
          og_image_url: string | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          detailed_content?: Json | null
          headline?: string | null
          id?: string
          meta_description?: string | null
          og_image_url?: string | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          detailed_content?: Json | null
          headline?: string | null
          id?: string
          meta_description?: string | null
          og_image_url?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      solutions: {
        Row: {
          created_at: string | null
          description: string | null
          icon_id: string | null
          id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon_id?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon_id?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "solutions_icon_id_fkey"
            columns: ["icon_id"]
            isOneToOne: false
            referencedRelation: "icons"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          created_at: string | null
          featured: boolean | null
          id: string
          name: string | null
          project_id: string | null
          quote: string | null
          role: string | null
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          featured?: boolean | null
          id?: string
          name?: string | null
          project_id?: string | null
          quote?: string | null
          role?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          featured?: boolean | null
          id?: string
          name?: string | null
          project_id?: string | null
          quote?: string | null
          role?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_diary_entries_list_for_user: {
        Args: { p_user_id: string }
        Returns: {
          id: string
          date: string
          wellness_rating: number
          notes: string
          crisis: boolean
          emotions: Json
          skills: Json
        }[]
      }
      get_diary_entry_details: {
        Args: { p_entry_id: string; p_user_id: string }
        Returns: {
          id: string
          user_id: string
          date: string
          wellness_rating: number
          notes: string
          crisis: boolean
          created_at: string
          updated_at: string
          logged_emotions: Json
          logged_skills: Json
          logged_urges: Json
          logged_custom_fields: Json
        }[]
      }
      update_diary_entry_with_details: {
        Args: {
          p_entry_id: string
          p_user_id: string
          p_date: string
          p_wellness_rating: number
          p_notes: string
          p_crisis: boolean
          p_new_emotions: Json
          p_new_skills: Json
          p_new_urges: Json
          p_new_custom_fields: Json
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
