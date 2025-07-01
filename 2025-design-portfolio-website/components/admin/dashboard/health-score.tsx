"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cva } from "class-variance-authority"

interface HealthScoreProps {
  score: number
}

const scoreColorVariants = cva("", {
  variants: {
    status: {
      excellent: "text-green-500",
      good: "text-emerald-500",
      fair: "text-amber-500",
      poor: "text-red-500",
    },
  },
})

const scoreBackgroundVariants = cva("", {
  variants: {
    status: {
      excellent: "from-green-50 to-emerald-50 border-green-100",
      good: "from-emerald-50 to-teal-50 border-emerald-100",
      fair: "from-amber-50 to-yellow-50 border-amber-100",
      poor: "from-red-50 to-rose-50 border-red-100",
    },
  },
})

export function HealthScore({ score }: HealthScoreProps) {
  const getStatus = (score: number) => {
    if (score >= 90) return "excellent"
    if (score >= 75) return "good"
    if (score >= 50) return "fair"
    return "poor"
  }

  const status = getStatus(score)

  return (
    <Card className={`bg-gradient-to-br border-2 ${scoreBackgroundVariants({ status })}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Code Health Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center">
          <div className={`text-4xl font-bold ${scoreColorVariants({ status })}`}>{Math.round(score)}</div>
          <div className="text-sm font-medium mt-1 capitalize">{status}</div>
        </div>
      </CardContent>
    </Card>
  )
}

