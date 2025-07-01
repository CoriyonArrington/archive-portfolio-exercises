"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Mail, MapPin, Clock, Calendar, Phone, ExternalLink } from "lucide-react"
import { useState, useRef } from "react"
import { submitContactForm } from "./actions"

export default function ContactPageClient() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const result = await submitContactForm(formData)

      if (result.success) {
        // Clear the form using the ref
        if (formRef.current) {
          formRef.current.reset()
        }

        // Show success toast
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you within 24-48 hours.",
          variant: "default",
        })
      } else {
        throw new Error(result.error || "Failed to send message")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="pt-12 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-6">Let's Discuss Your Project</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Ready to create healthcare experiences that users love and that drive business results? I'm here to help solve
          your design challenges.
        </p>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-8">Send a Message</h2>
          <div className="bg-gray-50 dark:bg-gray-950 p-8 rounded-lg shadow-lg border-l-4 border-l-primary">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name{" "}
                    <span aria-hidden="true" className="text-destructive">
                      *
                    </span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    aria-required="true"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email{" "}
                    <span aria-hidden="true" className="text-destructive">
                      *
                    </span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Your email address"
                    aria-required="true"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject{" "}
                  <span aria-hidden="true" className="text-destructive">
                    *
                  </span>
                </label>
                <Input
                  id="subject"
                  name="subject"
                  required
                  placeholder="What's this regarding?"
                  aria-required="true"
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message{" "}
                  <span aria-hidden="true" className="text-destructive">
                    *
                  </span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell me about your project, challenges, and goals..."
                  className="min-h-[150px]"
                  aria-required="true"
                  disabled={isSubmitting}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">I'll respond to your message within 24-48 hours.</p>
            </form>
          </div>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-8">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <Mail className="h-5 w-5 mr-3 mt-1 text-primary" aria-hidden="true" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">coriyonarrington@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 mt-1 text-primary" aria-hidden="true" />
              <div>
                <h3 className="font-medium">Location</h3>
                <p className="text-muted-foreground">Minneapolis, MN</p>
                <p className="text-muted-foreground">Available for remote work worldwide</p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="h-5 w-5 mr-3 mt-1 text-primary" aria-hidden="true" />
              <div>
                <h3 className="font-medium">Response Time</h3>
                <p className="text-muted-foreground">I typically respond to inquiries within 24-48 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-8">Working Together</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="text-xl font-bold mb-6">How I Can Help You</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2" aria-hidden="true"></div>
                <span>Create intuitive interfaces for complex healthcare products</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2" aria-hidden="true"></div>
                <span>Improve user engagement and retention for existing products</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2" aria-hidden="true"></div>
                <span>Design with healthcare regulations and compliance in mind</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2" aria-hidden="true"></div>
                <span>Establish design systems that scale with your business</span>
              </li>
            </ul>
          </div>

          <div className="p-8 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Project Availability</h3>
            <p className="mb-4">Currently available for:</p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2" aria-hidden="true"></div>
                <span>New client projects starting in 2-3 weeks</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2" aria-hidden="true"></div>
                <span>UX audits and consultations</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2" aria-hidden="true"></div>
                <span>Ongoing retainer relationships</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2" aria-hidden="true"></div>
                <span>Design system development</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Prefer to schedule directly?</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* CTA Card */}
            <div className="bg-blue-50 dark:bg-blue-950 p-8 rounded-lg border border-blue-100 dark:border-blue-900 shadow-md h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-4">Ready to get started?</h3>
                <p className="mb-6 text-muted-foreground">
                  Select a convenient time for our call and I'll reach out to confirm the details.
                </p>

                {/* Added expectations section */}
                <div className="mb-6 border-t border-blue-100 dark:border-blue-800 pt-6">
                  <h4 className="font-medium mb-3">What to expect:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-800 rounded-full p-1 mr-2 mt-0.5">
                        <svg
                          className="h-3 w-3 text-blue-600 dark:text-blue-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
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
                        <svg
                          className="h-3 w-3 text-blue-600 dark:text-blue-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
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
                        <svg
                          className="h-3 w-3 text-blue-600 dark:text-blue-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
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
                <Button
                  onClick={() => window.open("https://calendly.com/coriyonarrington/chat", "_blank")}
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
                >
                  Schedule Your Call
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
                <p className="mt-4 text-sm text-muted-foreground">
                  No commitment required. Free 30-minute consultation.
                </p>
              </div>
            </div>
          </div>

          {/* Information Column */}
          <div>
            <h3 className="text-xl font-bold mb-6">Call Details</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 mr-3 mt-1 text-blue-600" aria-hidden="true" />
                <div>
                  <h4 className="font-medium">Quick Scheduling</h4>
                  <p className="text-muted-foreground">Choose a time that works for you</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-3 mt-1 text-blue-600" aria-hidden="true" />
                <div>
                  <h4 className="font-medium">30-Minute Session</h4>
                  <p className="text-muted-foreground">Brief but productive discussion</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-1 text-blue-600" aria-hidden="true" />
                <div>
                  <h4 className="font-medium">Video or Phone</h4>
                  <p className="text-muted-foreground">Connect in the way that suits you best</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Toaster />
    </>
  )
}

