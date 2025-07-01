// types/services.ts (Updated)
import { type Database } from './supabase';

// Alias the generated type - Use this for data fetched from DB
export type Service = Database['public']['Tables']['services']['Row'];

// Props for the ServicesSection component
// Made text props optional, added optional href
export interface ServicesSummaryProps {
  headline?: string | null;
  body?: string | null;
  service_list: Service[]; // Keep service list required, handle empty state in component
  cta?: string | null;
  href?: string; // Optional href for the main CTA button
}

// Props for the ServiceCard component (can also live here or in the component file)
export interface ServiceCardProps {
    title: string;
    description: string;
    link?: string; // Optional link for the card's "Learn More"
    // icon?: React.ComponentType<{ className?: string }>; // Optional icon component
    className?: string; // Allow passing additional classes
}