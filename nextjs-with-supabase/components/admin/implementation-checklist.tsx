"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

interface ChecklistItem {
  id: string
  title: string
  description: string
  completed: boolean
  category: string
}

export function ImplementationChecklist() {
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: "foundations-colors",
      title: "Color System",
      description: "Implement color tokens and variables",
      completed: true,
      category: "Foundations",
    },
    {
      id: "foundations-typography",
      title: "Typography System",
      description: "Implement font families, sizes, and weights",
      completed: true,
      category: "Foundations",
    },
    {
      id: "foundations-spacing",
      title: "Spacing System",
      description: "Implement consistent spacing scale",
      completed: true,
      category: "Foundations",
    },
    {
      id: "components-buttons",
      title: "Button Components",
      description: "Implement all button variants",
      completed: true,
      category: "Components",
    },
    {
      id: "components-inputs",
      title: "Form Components",
      description: "Implement form controls and validation",
      completed: true,
      category: "Components",
    },
    {
      id: "components-cards",
      title: "Card Components",
      description: "Implement card layouts and variants",
      completed: false,
      category: "Components",
    },
    {
      id: "components-navigation",
      title: "Navigation Components",
      description: "Implement navigation patterns",
      completed: false,
      category: "Components",
    },
    {
      id: "patterns-forms",
      title: "Form Patterns",
      description: "Implement common form patterns",
      completed: false,
      category: "Patterns",
    },
    {
      id: "patterns-layouts",
      title: "Layout Patterns",
      description: "Implement responsive layout patterns",
      completed: false,
      category: "Patterns",
    },
    {
      id: "documentation-usage",
      title: "Usage Guidelines",
      description: "Document component usage guidelines",
      completed: false,
      category: "Documentation",
    },
  ])

  const toggleItem = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const categories = Array.from(new Set(items.map((item) => item.category)))

  const completedCount = items.filter((item) => item.completed).length
  const progress = (completedCount / items.length) * 100

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Implementation Progress</span>
          <span className="text-sm font-medium">
            {completedCount}/{items.length} completed
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category} className="space-y-3">
            <h3 className="font-medium text-lg">{category}</h3>
            <div className="space-y-2">
              {items
                .filter((item) => item.category === category)
                .map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 p-3 rounded-md border">
                    <Checkbox id={item.id} checked={item.completed} onCheckedChange={() => toggleItem(item.id)} />
                    <div className="space-y-1">
                      <label
                        htmlFor={item.id}
                        className={`font-medium cursor-pointer ${item.completed ? "line-through text-muted-foreground" : ""}`}
                      >
                        {item.title}
                      </label>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
