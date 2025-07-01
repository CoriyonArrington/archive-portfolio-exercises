"use client"
import { Clock, ExternalLink, Phone } from "lucide-react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

// Add this interface to properly type the Calendly property on window
interface WindowWithCalendly extends Window {
  Calendly?: any
}

interface CalendlySectionProps {
  hideHeading?: boolean
  compact?: boolean
}

export default function CalendlySection({ hideHeading = false, compact = false }: CalendlySectionProps) {
  // Function to open Calendly in a new tab
  const openCalendly = () => {
    window.open("https://calendly.com/coriyonarrington/chat", "_blank")
  }

  // Remove any existing Calendly scripts and widgets
  useEffect(() => {
    // Find and remove any Calendly scripts
    const calendlyScripts = document.querySelectorAll('script[src*="calendly"]')
    calendlyScripts.forEach((script) => script.remove())

    // Find and remove any Calendly widgets
    const calendlyWidgets = document.querySelectorAll(".calendly-inline-widget, .calendly-overlay")
    calendlyWidgets.forEach((widget) => widget.remove())

    // Clear any Calendly data from window object
    const windowWithCalendly = window as WindowWithCalendly
    if (windowWithCalendly.Calendly) {
      windowWithCalendly.Calendly = undefined
    }
  }, [])

  return (
    <section className={compact ? "py-12" : "py-24"} aria-labelledby="contact-heading">
      <div className="md:grid md:grid-cols-3 md:gap-4 lg:gap-5">
        <div>
          {!hideHeading && (
            <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold mb-12">
              Schedule a call
            </h2>
          )}

          <div className="space-y-8">
            <div className="flex items-start">
              <Calendar className="h-5 w-5 mr-3 mt-1 text-blue-600" aria-hidden="true" />
              <div>
                <h3 className="font-medium">Quick Scheduling</h3>
                <p className="text-muted-foreground">Choose a time that works for you</p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="h-5 w-5 mr-3 mt-1 text-blue-600" aria-hidden="true" />
              <div>
                <h3 className="font-medium">30-Minute Session</h3>
                <p className="text-muted-foreground">Brief but productive discussion</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-5 w-5 mr-3 mt-1 text-blue-600" aria-hidden="true" />
              <div>
                <h3 className="font-medium">Video or Phone</h3>
                <p className="text-muted-foreground">Connect in the way that suits you best</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action - Takes up 2 columns */}
        <div className="mt-8 md:mt-0 md:col-span-2">
          <div className="bg-blue-50 dark:bg-blue-950 p-8 rounded-lg border border-blue-100 dark:border-blue-900 shadow-md h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-4">Ready to get started?</h3>
              <p className="mb-6 text-muted-foreground">
                Select a convenient time for our call and I'll reach out to confirm the details.
              </p>

              {/* Added expectations section to bridge the gap */}
              <div className="mb-6 border-t border-blue-100 dark:border-blue-800 pt-6">
                <h4 className="font-medium mb-3">What to expect:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-800 rounded-full p-1 mr-2 mt-0.5">
                      <svg className="h-3 w-3 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Brief discussion about your project needs</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-800 rounded-full p-1 mr-2 mt-0.5">
                      <svg className="h-3 w-3 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Exploration of potential solutions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-800 rounded-full p-1 mr-2 mt-0.5">
                      <svg className="h-3 w-3 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Next steps if we decide to work together</span>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <Button onClick={openCalendly} size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6">
                Schedule Your Call
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">No commitment required. Free 30-minute consultation.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
