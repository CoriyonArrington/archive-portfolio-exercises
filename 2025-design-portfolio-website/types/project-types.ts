/**
 * Project types
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  slug: string;
  featured: boolean;
  image_url?: string;
  created_at: string;
  updated_at: string;
  tags?: string[];
  client?: string;
  year?: number;
  category?: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  url: string;
  alt: string;
  order: number;
  created_at: string;
}

export interface ProjectProcess {
  id: string;
  project_id: string;
  title: string;
  description: string;
  order: number;
  image_url?: string;
  created_at: string;
}
