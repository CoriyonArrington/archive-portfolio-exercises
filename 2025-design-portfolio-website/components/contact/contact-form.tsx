/**
 * ContactForm Component
 *
 * This component displays a form for visitors to send a message to the designer.
 *
 * Accessibility features:
 * - Semantic form structure
 * - Proper form labeling
 * - Required field indication
 * - Form validation
 * - Loading state indication
 * - Success feedback
 */
"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, this would submit to a server action that connects to Supabase
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      })
      // Reset form
      e.currentTarget.reset()
    }, 1500)
  }

  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-8">Send a Message</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
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
            placeholder="Tell me about your project or inquiry..."
            className="min-h-[150px]"
            aria-required="true"
            disabled={isSubmitting}
          />
        </div>
        <Button type="submit" size="lg" disabled={isSubmitting} aria-disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </>
  )
}
