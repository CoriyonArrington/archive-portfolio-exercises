import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar, Mail, Phone } from 'lucide-react';
import PageHeroSection from '@/components/shared/PageHeroSection';
import { useToast } from '@/hooks/use-toast';

/**
 * Contact - Page for user contact form and alternative contact methods
 * 
 * This component provides multiple ways for users to get in touch:
 * - Contact form for sending messages
 * - Booking a call via Calendly
 * - Direct email contact
 * - Phone contact for urgent matters
 * 
 * Accessibility features:
 * - Proper form labeling
 * - Error handling with descriptive messages
 * - Keyboard navigation support
 * - ARIA attributes for enhanced screen reader experience
 */
const Contact = () => {
  const { toast } = useToast();
  
  // Scroll to top when page loads for better user experience
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Form state management
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    submitted: false,
    error: false,
  });

  /**
   * Handle form submission
   * Simulates an API call and shows appropriate toast notifications
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // This would typically be a server action or API call
      // For demo purposes, we're just simulating a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form and show success message
      setFormState({
        ...formState,
        name: "",
        email: "",
        company: "",
        message: "",
        submitted: true,
        error: false,
      });

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you within 1-2 business days.",
      });
    } catch (error) {
      // Handle error state
      setFormState({
        ...formState,
        error: true,
      });

      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    }
  };

  /**
   * Handle form input changes
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Layout>
      <PageHeroSection
        tagline="Get in Touch"
        title="Let's work together"
        description="I'm currently available for new projects. Fill out the form below or book a call directly to discuss how we can collaborate."
      />

      <section 
        className="py-8"
        aria-labelledby="contact-heading"
      >
        <div className="container">
          <h2 id="contact-heading" className="sr-only">Contact Methods</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Send a message</h3>
                <form 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  aria-label="Contact form"
                >
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      aria-required="true"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      aria-required="true"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Your company"
                      value={formState.company}
                      onChange={handleChange}
                      aria-required="false"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      required
                      aria-required="true"
                    />
                  </div>

                  {/* Error message - only visible when there's an error */}
                  {formState.error && (
                    <div 
                      className="text-red-600 text-sm"
                      role="alert"
                      aria-live="assertive"
                    >
                      There was an error sending your message. Please try again.
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    aria-label="Send message"
                  >
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Other contact methods */}
              <div 
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl"
                aria-labelledby="alternative-contact-heading"
              >
                <h3 
                  id="alternative-contact-heading"
                  className="text-2xl font-bold mb-6 dark:text-white"
                >
                  Other ways to connect
                </h3>

                <div className="space-y-6">
                  {/* Calendly booking option */}
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full" aria-hidden="true">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 dark:text-white">Book a call</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        Schedule a 30-minute consultation to discuss your project needs.
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <a 
                          href="https://calendly.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label="Book a call on Calendly (opens in new tab)"
                        >
                          Book on Calendly
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Email contact option */}
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full" aria-hidden="true">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 dark:text-white">Email</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        For direct inquiries, you can reach me at:
                      </p>
                      <a 
                        href="mailto:hello@example.com" 
                        className="text-primary font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded"
                        aria-label="Send email to hello@example.com"
                      >
                        hello@example.com
                      </a>
                    </div>
                  </div>

                  {/* Phone contact option */}
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full" aria-hidden="true">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 dark:text-white">Phone</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        For urgent matters, you can call me at:
                      </p>
                      <a 
                        href="tel:+11234567890" 
                        className="text-primary font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded"
                        aria-label="Call +1 (123) 456-7890"
                      >
                        +1 (123) 456-7890
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
