// types/faq.ts (Updated)
import { type Database } from './supabase';

// Alias the generated type - Use this for data fetched from DB
export type Faq = Database['public']['Tables']['faqs']['Row'];

// Props for the FaqSection component
// Made text props optional, added optional href
export interface FaqSectionProps {
  faqs: Faq[]; // Keep faqs array required
  headline?: string | null;
  body?: string | null;
  cta?: string | null;
  href?: string; // Optional href for the main CTA button
}

// Props for FaqFilter (can live here or in component file)
// Uses the shared Faq type
export interface FaqFilterProps {
  faqs: Faq[];
  className?: string; // Allow passing additional classes
}

// Props for FaqItem (can live here or in component file)
export interface FaqItemProps {
  id: string;
  question: string | null;
  answer: string | null;
  className?: string; // Allow passing additional classes
}