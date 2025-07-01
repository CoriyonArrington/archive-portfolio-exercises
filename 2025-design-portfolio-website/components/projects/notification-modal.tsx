"use client"

import type React from "react"

import { useState } from "react"
import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NotificationModalProps {
  isOpen: boolean
  onClose: () => void
  projectTitle: string
  projectId: string
}

export function NotificationModal({ isOpen, onClose, projectTitle, projectId }: NotificationModalProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Simple validation
      if (!email || !email.includes("@")) {
        throw new Error("Please enter a valid email address")
      }

      // Store subscription in localStorage for demo purposes
      const subscriptions = JSON.parse(localStorage.getItem("projectSubscriptions") || "{}")
      subscriptions[projectId] = email
      localStorage.setItem("projectSubscriptions", JSON.stringify(subscriptions))

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to subscribe. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6">
          <div className="flex items-center mb-4">
            <Bell className="h-5 w-5 text-green-500 mr-2" />
            <h3 className="text-xl font-bold">Get notified when published</h3>
          </div>

          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="mb-4 text-green-500 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-lg font-medium mb-2">You're all set!</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We'll notify you when "{projectTitle}" is published.
              </p>
              <Button onClick={onClose} className="w-full">
                Close
              </Button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Enter your email to be notified when "{projectTitle}" is published.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

                <div className="flex justify-end space-x-3">
                  <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700 text-white">
                    {isSubmitting ? "Subscribing..." : "Subscribe"}
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
