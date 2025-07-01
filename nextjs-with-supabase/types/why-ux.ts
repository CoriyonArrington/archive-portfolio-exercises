// types/why-ux.ts
import type { Database } from './supabase'; // Adjust path if needed

export type Problem = Database['public']['Tables']['problems']['Row'];
export type Solution = Database['public']['Tables']['solutions']['Row'];

// Interface for the text content part
export interface WhyUXContentProps {
  headline?: string | null;
  body?: string | null;
  cta?: string | null;
  href?: string; // <-- Add optional href prop here
}

// Final props for the WhyUX component
export interface WhyUXProps extends WhyUXContentProps {
  problems: Problem[];
  solutions: Solution[];
}