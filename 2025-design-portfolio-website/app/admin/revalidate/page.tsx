"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCwIcon, RocketIcon, AlertTriangleIcon } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function RevalidatePage() {
  const [isRevalidatingProjects, setIsRevalidatingProjects] = useState(false)
  const [isRevalidatingTestimonials, setIsRevalidatingTestimonials] = useState(false)
  const [isRevalidatingServices, setIsRevalidatingServices] = useState(false)
  const [isRevalidatingFAQs, setIsRevalidatingFAQs] = useState(false)
  const [isRevalidatingProcessSteps, setIsRevalidatingProcessSteps] = useState(false)
  const [isRevalidatingAll, setIsRevalidatingAll] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)
  const [isNuclearRevalidating, setIsNuclearRevalidating] = useState(false)

  const revalidateProjects = async () => {
    setIsRevalidatingProjects(true)
    try {
      const res = await fetch("/api/revalidate?tag=projects")
      const data = await res.json()

      if (data.revalidated) {
        toast({
          title: "Success",
          description: "Projects revalidated successfully",
        })
      } else {
        throw new Error("Failed to revalidate")
      }
    } catch (error) {
      console.error("Error revalidating projects:", error)
      toast({
        title: "Error",
        description: "Failed to revalidate projects",
        variant: "destructive",
      })
    } finally {
      setIsRevalidatingProjects(false)
    }
  }

  const revalidateTestimonials = async () => {
    setIsRevalidatingTestimonials(true)
    try {
      const res = await fetch("/api/revalidate?tag=testimonials")
      const data = await res.json()

      if (data.revalidated) {
        toast({
          title: "Success",
          description: "Testimonials revalidated successfully",
        })
      } else {
        throw new Error("Failed to revalidate")
      }
    } catch (error) {
      console.error("Error revalidating testimonials:", error)
      toast({
        title: "Error",
        description: "Failed to revalidate testimonials",
        variant: "destructive",
      })
    } finally {
      setIsRevalidatingTestimonials(false)
    }
  }

  const revalidateServices = async () => {
    setIsRevalidatingServices(true)
    try {
      const res = await fetch("/api/revalidate?tag=services")
      const data = await res.json()

      if (data.revalidated) {
        toast({
          title: "Success",
          description: "Services revalidated successfully",
        })
      } else {
        throw new Error("Failed to revalidate")
      }
    } catch (error) {
      console.error("Error revalidating services:", error)
      toast({
        title: "Error",
        description: "Failed to revalidate services",
        variant: "destructive",
      })
    } finally {
      setIsRevalidatingServices(false)
    }
  }

  const revalidateFAQs = async () => {
    setIsRevalidatingFAQs(true)
    try {
      const res = await fetch("/api/revalidate?tag=faqs")
      const data = await res.json()

      if (data.revalidated) {
        toast({
          title: "Success",
          description: "FAQs revalidated successfully",
        })
      } else {
        throw new Error("Failed to revalidate")
      }
    } catch (error) {
      console.error("Error revalidating FAQs:", error)
      toast({
        title: "Error",
        description: "Failed to revalidate FAQs",
        variant: "destructive",
      })
    } finally {
      setIsRevalidatingFAQs(false)
    }
  }

  const revalidateProcessSteps = async () => {
    setIsRevalidatingProcessSteps(true)
    try {
      const res = await fetch("/api/revalidate?tag=process-steps")
      const data = await res.json()

      if (data.revalidated) {
        toast({
          title: "Success",
          description: "Process steps revalidated successfully",
        })
      } else {
        throw new Error("Failed to revalidate")
      }
    } catch (error) {
      console.error("Error revalidating process steps:", error)
      toast({
        title: "Error",
        description: "Failed to revalidate process steps",
        variant: "destructive",
      })
    } finally {
      setIsRevalidatingProcessSteps(false)
    }
  }

  const revalidateAll = async () => {
    setIsRevalidatingAll(true)
    try {
      const res = await fetch("/api/revalidate")
      const data = await res.json()

      if (data.revalidated) {
        toast({
          title: "Success",
          description: "All content revalidated successfully",
        })
      } else {
        throw new Error("Failed to revalidate")
      }
    } catch (error) {
      console.error("Error revalidating all content:", error)
      toast({
        title: "Error",
        description: "Failed to revalidate all content",
        variant: "destructive",
      })
    } finally {
      setIsRevalidatingAll(false)
    }
  }

  const deployToProduction = async () => {
    setIsDeploying(true)
    try {
      const res = await fetch("/api/deploy", { method: "POST" })
      const data = await res.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "Deployment triggered successfully",
        })
      } else {
        throw new Error("Failed to trigger deployment")
      }
    } catch (error) {
      console.error("Error triggering deployment:", error)
      toast({
        title: "Error",
        description: "Failed to trigger deployment",
        variant: "destructive",
      })
    } finally {
      setIsDeploying(false)
    }
  }

  const nuclearRevalidation = async () => {
    setIsNuclearRevalidating(true)
    try {
      const res = await fetch("/api/revalidate/nuclear")
      const data = await res.json()

      if (data.revalidated) {
        toast({
          title: "Success",
          description: "Nuclear revalidation completed successfully",
        })
      } else {
        throw new Error("Failed to perform nuclear revalidation")
      }
    } catch (error) {
      console.error("Error performing nuclear revalidation:", error)
      toast({
        title: "Error",
        description: "Failed to perform nuclear revalidation",
        variant: "destructive",
      })
    } finally {
      setIsNuclearRevalidating(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Revalidate Cache</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revalidate Content</CardTitle>
            <CardDescription>Refresh the cache for specific content types</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={revalidateProjects} disabled={isRevalidatingProjects} className="w-full">
              <RefreshCwIcon className={`h-4 w-4 mr-2 ${isRevalidatingProjects ? "animate-spin" : ""}`} />
              {isRevalidatingProjects ? "Revalidating Projects..." : "Revalidate Projects"}
            </Button>

            <Button onClick={revalidateTestimonials} disabled={isRevalidatingTestimonials} className="w-full">
              <RefreshCwIcon className={`h-4 w-4 mr-2 ${isRevalidatingTestimonials ? "animate-spin" : ""}`} />
              {isRevalidatingTestimonials ? "Revalidating Testimonials..." : "Revalidate Testimonials"}
            </Button>

            <Button onClick={revalidateServices} disabled={isRevalidatingServices} className="w-full">
              <RefreshCwIcon className={`h-4 w-4 mr-2 ${isRevalidatingServices ? "animate-spin" : ""}`} />
              {isRevalidatingServices ? "Revalidating Services..." : "Revalidate Services"}
            </Button>

            <Button onClick={revalidateFAQs} disabled={isRevalidatingFAQs} className="w-full">
              <RefreshCwIcon className={`h-4 w-4 mr-2 ${isRevalidatingFAQs ? "animate-spin" : ""}`} />
              {isRevalidatingFAQs ? "Revalidating FAQs..." : "Revalidate FAQs"}
            </Button>

            <Button onClick={revalidateProcessSteps} disabled={isRevalidatingProcessSteps} className="w-full">
              <RefreshCwIcon className={`h-4 w-4 mr-2 ${isRevalidatingProcessSteps ? "animate-spin" : ""}`} />
              {isRevalidatingProcessSteps ? "Revalidating Process Steps..." : "Revalidate Process Steps"}
            </Button>

            <Button onClick={revalidateAll} disabled={isRevalidatingAll} className="w-full" variant="secondary">
              <RefreshCwIcon className={`h-4 w-4 mr-2 ${isRevalidatingAll ? "animate-spin" : ""}`} />
              {isRevalidatingAll ? "Revalidating All Content..." : "Revalidate All Content"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Advanced Options</CardTitle>
            <CardDescription>Use these options when regular revalidation doesn't work</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={deployToProduction} disabled={isDeploying} className="w-full" variant="outline">
              <RocketIcon className="h-4 w-4 mr-2" />
              {isDeploying ? "Deploying..." : "Deploy to Production"}
            </Button>

            <Button
              onClick={nuclearRevalidation}
              disabled={isNuclearRevalidating}
              className="w-full"
              variant="destructive"
            >
              <AlertTriangleIcon className="h-4 w-4 mr-2" />
              {isNuclearRevalidating ? "REVALIDATING EVERYTHING..." : "NUCLEAR REVALIDATION"}
            </Button>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Nuclear revalidation will force-revalidate all pages and paths. Use only as a last resort.
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
