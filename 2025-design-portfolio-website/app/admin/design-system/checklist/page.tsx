"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CheckCircle2, Circle, AlertCircle } from "lucide-react"

type ComponentStatus = "not-started" | "in-progress" | "completed"
type ComponentPriority = "high" | "medium" | "low"

interface ComponentItem {
  name: string
  description: string
  status: ComponentStatus
  priority: ComponentPriority
  dependencies: string[]
  notes: string
}

const initialComponents: ComponentItem[] = [
  {
    name: "Typography",
    description: "Text components including headings, paragraphs, and other text elements",
    status: "in-progress", // You've already started this
    priority: "high",
    dependencies: [],
    notes: "Currently implementing standardized typography components",
  },
  {
    name: "Button",
    description: "Button components including primary, secondary, and other variants",
    status: "not-started",
    priority: "high",
    dependencies: [],
    notes: "Need to consolidate custom button implementations",
  },
  {
    name: "Card",
    description: "Card components for displaying content in containers",
    status: "not-started",
    priority: "high",
    dependencies: ["Typography"],
    notes: "Multiple card implementations need to be standardized",
  },
  {
    name: "Form Elements",
    description: "Input, select, checkbox, radio, and other form components",
    status: "not-started",
    priority: "medium",
    dependencies: ["Button"],
    notes: "Form validation needs to be standardized",
  },
  {
    name: "Layout Components",
    description: "Grid, container, and other layout components",
    status: "not-started",
    priority: "medium",
    dependencies: [],
    notes: "Need to ensure responsive behavior is consistent",
  },
  {
    name: "Navigation",
    description: "Header, footer, sidebar, and other navigation components",
    status: "not-started",
    priority: "medium",
    dependencies: ["Typography", "Button"],
    notes: "Mobile navigation needs special attention",
  },
  {
    name: "Modal/Dialog",
    description: "Overlay components for user interactions",
    status: "not-started",
    priority: "low",
    dependencies: ["Button", "Typography"],
    notes: "Accessibility is crucial here",
  },
  {
    name: "Notification Components",
    description: "Toast, alert, and other notification components",
    status: "not-started",
    priority: "low",
    dependencies: ["Typography"],
    notes: "Multiple implementations exist",
  },
]

export default function ChecklistPage() {
  const [components, setComponents] = useState<ComponentItem[]>(initialComponents)
  const [filter, setFilter] = useState<"all" | ComponentPriority | ComponentStatus>("all")

  const updateStatus = (index: number, status: ComponentStatus) => {
    const updatedComponents = [...components]
    updatedComponents[index].status = status
    setComponents(updatedComponents)

    // In a real application, you would save this to a database or localStorage
    localStorage.setItem("designSystemChecklist", JSON.stringify(updatedComponents))
  }

  const filteredComponents = components.filter((component) => {
    if (filter === "all") return true
    if (filter === "high" || filter === "medium" || filter === "low") {
      return component.priority === filter
    }
    return component.status === filter
  })

  const getStatusIcon = (status: ComponentStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Circle className="h-5 w-5 text-amber-500 fill-amber-500" />
      default:
        return <Circle className="h-5 w-5 text-gray-300" />
    }
  }

  const getPriorityBadge = (priority: ComponentPriority) => {
    const colors = {
      high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      low: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    }

    return <span className={`px-2 py-1 rounded text-xs ${colors[priority]}`}>{priority}</span>
  }

  const completedCount = components.filter((c) => c.status === "completed").length
  const progressPercentage = Math.round((completedCount / components.length) * 100)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Implementation Checklist</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Progress: {completedCount}/{components.length} components ({progressPercentage}%)
          </span>
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-500" style={{ width: `${progressPercentage}%` }} />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            All
          </Button>
          <Button variant={filter === "high" ? "default" : "outline"} size="sm" onClick={() => setFilter("high")}>
            High Priority
          </Button>
          <Button variant={filter === "medium" ? "default" : "outline"} size="sm" onClick={() => setFilter("medium")}>
            Medium Priority
          </Button>
          <Button variant={filter === "low" ? "default" : "outline"} size="sm" onClick={() => setFilter("low")}>
            Low Priority
          </Button>
          <Button
            variant={filter === "not-started" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("not-started")}
          >
            Not Started
          </Button>
          <Button
            variant={filter === "in-progress" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("in-progress")}
          >
            In Progress
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("completed")}
          >
            Completed
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredComponents.map((component, index) => (
          <div
            key={index}
            className={cn(
              "border rounded-lg p-4",
              component.status === "completed" &&
                "border-green-200 bg-green-50/50 dark:bg-green-950/10 dark:border-green-900/30",
              component.status === "in-progress" &&
                "border-amber-200 bg-amber-50/50 dark:bg-amber-950/10 dark:border-amber-900/30",
            )}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {getStatusIcon(component.status)}
                  <h3 className="text-lg font-semibold">{component.name}</h3>
                  {getPriorityBadge(component.priority)}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{component.description}</p>

                {component.dependencies.length > 0 && (
                  <div className="flex gap-1 items-center mb-2">
                    <span className="text-xs text-muted-foreground">Dependencies:</span>
                    <div className="flex gap-1">
                      {component.dependencies.map((dep, i) => (
                        <span key={i} className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {component.notes && (
                  <div className="flex items-start gap-1 mt-1">
                    <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">{component.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 ml-4">
                <Button
                  size="sm"
                  variant={component.status === "not-started" ? "outline" : "ghost"}
                  onClick={() => updateStatus(components.indexOf(component), "not-started")}
                >
                  Not Started
                </Button>
                <Button
                  size="sm"
                  variant={component.status === "in-progress" ? "outline" : "ghost"}
                  onClick={() => updateStatus(components.indexOf(component), "in-progress")}
                >
                  In Progress
                </Button>
                <Button
                  size="sm"
                  variant={component.status === "completed" ? "outline" : "ghost"}
                  onClick={() => updateStatus(components.indexOf(component), "completed")}
                >
                  Completed
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
