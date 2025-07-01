"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Sentiment = "negative" | "neutral" | "positive" | null

export function FeedbackModal() {
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
      // Server-side API route call
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

      // Check if response is JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned an invalid response format")
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit feedback")
      }

      // Show success toast
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback!",
        variant: "default",
      })

      // Reset form and close modal
      setFeedback("")
      setSentiment(null)
      setIsOpen(false)
    } catch (err) {
      console.error("Error submitting feedback:", err)

      let errorMessage = err instanceof Error ? err.message : "Failed to submit feedback"

      // Check for specific configuration error
      if (errorMessage.includes("Server configuration error")) {
        errorMessage = "The feedback system is currently unavailable. Please try again later."
      }

      // Show error toast
      toast({
        title: "Submission failed",
        description: errorMessage,
        variant: "destructive",
      })

      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Listen for custom event to open the feedback modal
  useEffect(() => {
    const handleOpenFeedback = () => setIsOpen(true)
    window.addEventListener("openFeedback", handleOpenFeedback)
    return () => window.removeEventListener("openFeedback", handleOpenFeedback)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 fixed bottom-4 right-4 shadow-md hidden">
          <MessageSquare className="h-4 w-4" />
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[90%] max-w-[90vw] rounded-lg bg-background p-6">
        <DialogHeader className="text-left space-y-2">
          <DialogTitle className="text-xl font-semibold dark:text-white">Leave Feedback</DialogTitle>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            We'd love to hear what went well or how we can improve the product experience.
          </p>
        </DialogHeader>

        <div className="mt-4">
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback"
            className="min-h-[120px] resize-none border-gray-200 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-600 focus:border-gray-300 dark:focus:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSentiment("negative")}
              className={`w-10 h-10 flex items-center justify-center rounded-full border ${
                sentiment === "negative"
                  ? "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  : "border-gray-200 dark:border-gray-700"
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
                sentiment === "neutral"
                  ? "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  : "border-gray-200 dark:border-gray-700"
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
                sentiment === "positive"
                  ? "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  : "border-gray-200 dark:border-gray-700"
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
              className="px-4 py-2 h-9 text-sm font-medium rounded-md border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleSubmit}
              disabled={!feedback.trim() || isSubmitting}
              className="px-4 py-2 h-9 text-sm font-medium rounded-md bg-black dark:bg-gray-900 text-white hover:bg-gray-800 dark:hover:bg-gray-800 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
