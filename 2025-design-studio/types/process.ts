// types/process.ts

/** One phase in the design process */
export interface ProcessPhase {
    phase_title: string
    description: string
  }
  
  /** Props for the ProcessSection component */
  export interface ProcessSectionProps {
    headline: string
    body: string
    cta: string
    process: ProcessPhase[]
  }
  