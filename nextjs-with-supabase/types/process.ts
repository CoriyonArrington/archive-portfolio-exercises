// types/process.ts (Updated)
import { type Database } from './supabase';

// Alias the generated type - Use this for data fetched from DB
export type ProcessPhase = Database['public']['Tables']['process_phases']['Row'];

// Props for the ProcessSection component
// Made text props optional, added optional href
export interface ProcessSectionProps {
  headline?: string | null;
  body?: string | null;
  cta?: string | null;
  process: ProcessPhase[]; // Keep process array required
  href?: string; // Optional href for the main CTA button
}

// Props for DesignProcess (can live here or in component file)
// Added optional className
export interface DesignProcessProps {
  processPhases: ProcessPhase[];
  className?: string; // Allow passing additional classes
}