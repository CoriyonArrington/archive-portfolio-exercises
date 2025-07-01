// types/why-ux.ts
import React from 'react'

/** One “problem” card */
export interface ClientProblem {
  title: string
  description: string
  icon: React.ReactNode
}

/** One “solution” card */
export interface ValueProposition {
  title: string
  description: string
  icon: React.ReactNode
}

/** Props for the WhyUX component */
export interface WhyUXProps {
  headline: string
  body: string
  cta: string
  problems: ClientProblem[]
  solutions: ValueProposition[]
}
