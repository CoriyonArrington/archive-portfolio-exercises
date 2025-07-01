"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"

type Sentiment = "negative" | "neutral" | "positive" | null

export function FeedbackModalFallback() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [sentiment, setSentiment] = useState<Sentiment>(null)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (!feedback.trim()) return

    setIsSubmitting(true)
    setError(null)

    try {
      // First try the server-side approach
      try {
        const response = await fetch("/api/feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: feedback.trim(),
            sentiment,
            pageUrl: window.location.href,
            metadata: {
              userAgent: navigator.userAgent,
              screenWidth: window.innerWidth,
              screenHeight: window.innerHeight,
            },
          }),
        })

        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json()

          if (response.ok) {
            // Success with server-side approach
            toast({
              title: "Feedback submitted",
              description: "Thank you for your feedback!",
              variant: "default",
            })

            setFeedback("")
            setSentiment(null)
            setIsOpen(false)
            return
          } else {
            console.error("Server-side submission failed:", data)
          }
        }

        // If we get here, the server-side approach failed
        throw new Error("Server-side submission failed, trying client-side")
      } catch (serverError) {
        console.log("Server-side submission failed, falling back to client-side:", serverError)

        // Fall back to client-side approach
        const { error: supabaseError } = await supabase.from("feedback").insert([
          {
            content: feedback.trim(),
            sentiment,
            page_url: window.location.href,
            metadata: {
              userAgent: navigator.userAgent,
              screenWidth: window.innerWidth,
              screenHeight: window.innerHeight,
            },
          },
        ])

        if (supabaseError) throw supabaseError

        toast({
          title: "Feedback submitted",
          description: "Thank you for your feedback!",
          variant: "default",
        })

        setFeedback("")
        setSentiment(null)
        setIsOpen(false)
      }
    } catch (err) {
      console.error("Error submitting feedback:", err)

      toast({
        title: "Submission failed",
        description: err instanceof Error ? err.message : "Failed to submit feedback",
        variant: "destructive",
      })

      setError(err instanceof Error ? err.message : "Failed to submit feedback")
    } finally {
      setIsSubmitting(false)
    }
  }

  // UI code remains the same
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 fixed bottom-4 right-4 shadow-md">
          <MessageSquare className="h-4 w-4" />
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none">
        {/* Dialog content remains the same */}
        <div className="p-6 bg-white rounded-lg max-w-[500px] w-full">
          <DialogHeader className="p-0 text-left space-y-2">
            <DialogTitle className="text-xl font-semibold">Leave Feedback</DialogTitle>
            <p className="text-sm text-gray-600">
              We'd love to hear what went well or how we can improve the product experience.
            </p>
          </DialogHeader>

          <div className="mt-4">
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your feedback"
              className="min-h-[120px] resize-none border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-200 focus:border-gray-300"
            />
          </div>

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSentiment("negative")}
                className={`w-10 h-10 flex items-center justify-center rounded-full border ${
                  sentiment === "negative" ? "bg-gray-100 border-gray-300" : "border-gray-200"
                }`}
                aria-label="Negative feedback"
              >
                <span className="text-xl" role="img" aria-label="Sad face">
                  😞
                </span>
              </button>
              <button
                type="button"
                onClick={() => setSentiment("neutral")}
                className={`w-10 h-10 flex items-center justify-center rounded-full border ${
                  sentiment === "neutral" ? "bg-gray-100 border-gray-300" : "border-gray-200"
                }`}
                aria-label="Neutral feedback"
              >
                <span className="text-xl" role="img" aria-label="Neutral face">
                  😐
                </span>
              </button>
              <button
                type="button"
                onClick={() => setSentiment("positive")}
                className={`w-10 h-10 flex items-center justify-center rounded-full border ${
                  sentiment === "positive" ? "bg-gray-100 border-gray-300" : "border-gray-200"
                }`}
                aria-label="Positive feedback"
              >
                <span className="text-xl" role="img" aria-label="Happy face">
                  😊
                </span>
              </button>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 h-9 text-sm font-medium rounded-md border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleSubmit}
                disabled={!feedback.trim() || isSubmitting}
                className="px-4 py-2 h-9 text-sm font-medium rounded-md bg-black text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
