
/**
 * Service type definition
 * 
 * Defines the structure of service data for service listings and detail pages.
 */
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
}
