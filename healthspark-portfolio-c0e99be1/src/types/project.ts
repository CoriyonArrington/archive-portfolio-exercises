
/**
 * Project type definition
 * 
 * Defines the structure of project data for case studies and project listings.
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  platforms: string[];
  deviceTypes: string[];
  outcome?: {
    value: string;
    description: string;
  };
  featured?: boolean;
}
