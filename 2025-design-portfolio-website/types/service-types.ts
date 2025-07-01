/**
 * Service types
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  slug: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}
