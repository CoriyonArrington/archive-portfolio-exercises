// types/about.ts (Updated)

/** Props for the AboutSection component */
export interface AboutProps {
  headline?: string | null;
  body?: string | null;
  cta?: string | null;
  href?: string;
  showApproachSection?: boolean; // <-- ADDED: Control visibility of approach cards
}