"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Mail, MapPin, Phone } from "lucide-react"
import { useState } from "react"
import { submitContactForm } from "@/app/actions"
import { useFormStatus } from "react-dom"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? "Sending..." : "Send Message"}
    </Button>
  )
}

export default function ContactPage() {
  const { toast } = useToast()
  const [formKey, setFormKey] = useState(0)

  async function handleAction(formData: FormData) {
    const result = await submitContactForm(formData)

    if (result.success) {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      })
      // Reset form by changing the key
      setFormKey((prev) => prev + 1)
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-6">Get in Touch</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          I'm always interested in discussing new projects, design challenges, or opportunities to collaborate on
          healthcare innovations.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
        <div className="lg:col-span-2">
          <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-8">Send a Message</h2>
          <form key={formKey} action={handleAction} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input id="name" name="name" required placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" name="email" type="email" required placeholder="Your email address" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input id="subject" name="subject" required placeholder="What's this regarding?" />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                required
                placeholder="Tell me about your project or inquiry..."
                className="min-h-[150px]"
              />
            </div>
            <SubmitButton />
          </form>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-8">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <Mail className="h-5 w-5 mr-3 mt-1 text-primary" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">hello@designerportfolio.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-5 w-5 mr-3 mt-1 text-primary" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-muted-foreground">(123) 456-7890</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 mt-1 text-primary" />
              <div>
                <h3 className="font-medium">Location</h3>
                <p className="text-muted-foreground">San Francisco, CA</p>
                <p className="text-muted-foreground">Available for remote work worldwide</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h3 className="text-xl font-bold mb-4">Availability</h3>
            <p className="mb-4">Currently available for:</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mr-2 mt-2"></div>
                <span>Full-time design positions</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mr-2 mt-2"></div>
                <span>Freelance projects</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mr-2 mt-2"></div>
                <span>Design consultations</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mr-2 mt-2"></div>
                <span>Speaking engagements</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-24">
        <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              question: "What is your design process?",
              answer:
                "My design process typically includes research, ideation, prototyping, testing, and implementation. I adapt this process based on project needs and constraints.",
            },
            {
              question: "How do you charge for projects?",
              answer:
                "I offer both hourly rates and project-based pricing depending on the scope and requirements. I'm happy to discuss options that work best for your budget.",
            },
            {
              question: "Do you work with startups?",
              answer:
                "I enjoy working with healthcare startups to help shape their products from early stages. I offer flexible engagement models for early-stage companies.",
            },
            {
              question: "What makes you different from other designers?",
              answer:
                "My background in biomedical engineering gives me unique insights into healthcare challenges. I combine this technical knowledge with human-centered design principles.",
            },
          ].map((faq, index) => (
            <div key={index} className="p-6 border rounded-lg">
              <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

