/**
 * Testimonial types
 */

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image_url?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}
