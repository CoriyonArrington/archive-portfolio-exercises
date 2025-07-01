// types/faq.ts

/** One FAQ item */
export interface FAQ {
    id: string
    question: string
    answer: string
  }
  
  /** Props for the FaqSection component */
  export interface FaqSectionProps {
    faqs: FAQ[]
    headline: string
    body: string
    cta: string
  }
  