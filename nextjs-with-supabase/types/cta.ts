// types/cta.ts

/** Props for the CTASection component */
export interface CTAProps {
  headline?: string | null;
  body?: string | null;
  cta?: string | null;
  href?: string; // <-- Ensure this optional href prop is added/present
}