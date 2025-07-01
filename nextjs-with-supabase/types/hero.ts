// types/hero.ts (Updated)

// Props for the HeroSection component
export interface HeroProps {
  headline?: string | null;
  subheadline?: string | null;
  cta?: string | null;
  href?: string; // Optional href for the main CTA button
}