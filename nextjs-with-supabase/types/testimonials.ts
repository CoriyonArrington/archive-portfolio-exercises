// types/testimonials.ts
import { type Database } from './supabase';

export type Testimonial = Database['public']['Tables']['testimonials']['Row'];

// Props for the TestimonialsSection component
export interface TestimonialsSectionProps {
  headline?: string | null; // Make optional
  body?: string | null;     // Add optional body prop if used by component
  testimonials: Testimonial[]; // Assuming testimonials array is required
}