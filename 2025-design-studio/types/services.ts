// types/services.ts

/** One service item */
export interface Service {
    title: string
    description: string
  }
  
  /** Props for the ServicesSummary component */
  export interface ServicesSummaryProps {
    headline: string
    body: string
    service_list: Service[]
    cta: string
  }
  