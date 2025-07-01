// Global type definitions
declare global {
  interface CustomWindow extends Window {
    dataLayer: Record<string, unknown>[]
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void
  }
}

export {}
