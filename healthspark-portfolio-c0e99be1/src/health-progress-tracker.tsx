"use client"

import { useState, useEffect } from "react"
import { Heart, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

// Define the structure for our task data
interface Task {
  id: string
  description: string
  completed: boolean
  category: "assessments" | "interventions" | "orderSets"
}

export default function HealthProgressTracker() {
  // Access the toast functionality for notifications
  const { toast } = useToast()

  // State to track if we're on a mobile device
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on a mobile device when the component mounts
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Set initial value
    checkIfMobile()

    // Update on window resize
    window.addEventListener("resize", checkIfMobile)

    // Clean up event listener when component unmounts
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // State to store all our tasks with their completion status
  const [tasks, setTasks] = useState<Task[]>([
    // Assessments tasks
    {
      id: "a1",
      description: "Daily assessment of lab value and communication to MD if not drawn",
      completed: true,
      category: "assessments",
    },
    {
      id: "a2",
      description: "Daily assessment of lab value and communication to MD if out of normal range",
      completed: true,
      category: "assessments",
    },
    {
      id: "a3",
      description: "Communication to MD if anticoagulant refused by patient",
      completed: true,
      category: "assessments",
    },
    {
      id: "a4",
      description: "SCD boots on patient when in bed",
      completed: true,
      category: "assessments",
    },

    // Interventions tasks
    {
      id: "i1",
      description: "Daily assessment of lab value and communication to MD if not drawn",
      completed: false,
      category: "interventions",
    },
    {
      id: "i2",
      description: "Daily assessment of lab value and communication to MD if out of normal range",
      completed: false,
      category: "interventions",
    },
    {
      id: "i3",
      description: "Communication to MD if anticoagulant refused by patient",
      completed: false,
      category: "interventions",
    },
    {
      id: "i4",
      description: "SCD boots on patient when in bed",
      completed: false,
      category: "interventions",
    },
    {
      id: "i5",
      description: "Conduct DVT Risk Assessment",
      completed: true,
      category: "interventions",
    },

    // Order Sets tasks
    {
      id: "o1",
      description: "Complete medication reconciliation",
      completed: true,
      category: "orderSets",
    },
    {
      id: "o2",
      description: "Order initial lab work",
      completed: true,
      category: "orderSets",
    },
    {
      id: "o3",
      description: "Order diagnostic imaging",
      completed: true,
      category: "orderSets",
    },
    {
      id: "o4",
      description: "Initiate IV fluids",
      completed: true,
      category: "orderSets",
    },
    {
      id: "o5",
      description: "Schedule physical therapy consult",
      completed: true,
      category: "orderSets",
    },
  ])

  // Function to handle when a task checkbox is clicked
  const handleTaskChange = (taskId: string, checked: boolean) => {
    // Update the tasks array with the new completion status
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: checked } : task)))

    // Announce the change to screen readers
    const task = tasks.find((t) => t.id === taskId)
    const action = checked ? "completed" : "marked as incomplete"
    const announcement = `Task ${task?.description} ${action}`

    // Use aria-live to announce the change
    const liveRegion = document.getElementById("task-status-announcer")
    if (liveRegion) {
      liveRegion.textContent = announcement
    }
  }

  // Function to handle when the save button is clicked
  const handleSave = () => {
    // Show a toast notification
    toast({
      title: "Progress saved",
      description: "Your task progress has been successfully saved.",
    })

    // Announce the save to screen readers
    const liveRegion = document.getElementById("task-status-announcer")
    if (liveRegion) {
      liveRegion.textContent = "Progress has been saved successfully"
    }
  }

  // Function to calculate completion statistics for a category
  const getTaskStats = (category: "assessments" | "interventions" | "orderSets") => {
    // Filter tasks by category
    const categoryTasks = tasks.filter((task) => task.category === category)
    // Count completed tasks
    const completed = categoryTasks.filter((task) => task.completed).length
    // Get total number of tasks
    const total = categoryTasks.length
    // Return the stats
    return { completed, total }
  }

  // Calculate stats for each category
  const assessmentStats = getTaskStats("assessments")
  const interventionStats = getTaskStats("interventions")
  const orderSetStats = getTaskStats("orderSets")

  // Calculate overall progress percentage
  const totalCompleted = tasks.filter((task) => task.completed).length
  const progressPercentage = (totalCompleted / tasks.length) * 100

  // If on mobile, show a static image
  if (isMobile) {
    return (
      <div className="max-w-6xl bg-white rounded-lg shadow-lg">
          <img
            src="/images/healthcare-dashboard.png"
            alt="Health Progress Tracker interface showing assessments, interventions, and order sets with their completion status"
            className="border border-gray-200 w-full h-auto"
          />
      </div>
    )
  }

  // Interactive version for desktop
  return (
    <div className="max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      {/* Hidden element for screen reader announcements */}
      <div id="task-status-announcer" className="sr-only" aria-live="polite" aria-atomic="true"></div>

      {/* Header with title and save button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Stroke Intervention Progress</h1>
          <Heart className="ml-2 text-red-500 fill-red-500" aria-hidden="true" />
        </div>
        <Button
          onClick={handleSave}
          className="bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          aria-label="Save progress"
        >
          <Save className="mr-2 h-4 w-4 text-white" aria-hidden="true" />
          SAVE
        </Button>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left sidebar with progress stats */}
        <div className="md:col-span-1 md:sticky md:top-4 md:self-start">
          <Card>
            <CardContent className="p-0">
              {/* Assessments progress */}
              <div className="p-4 border-l-4 border-blue-600">
                <h3 className="font-medium">Assessments</h3>
                <Progress
                  value={(assessmentStats.completed / assessmentStats.total) * 100}
                  className="h-2 mt-2"
                  aria-label={`${assessmentStats.completed} of ${assessmentStats.total} assessment tasks completed`}
                />
                <p className="text-sm text-gray-600 mt-1">
                  {assessmentStats.completed} of {assessmentStats.total} Tasks Completed
                </p>
              </div>

              <Separator />

              {/* Interventions progress */}
              <div className="p-4">
                <h3 className="font-medium">Interventions</h3>
                <Progress
                  value={(interventionStats.completed / interventionStats.total) * 100}
                  className="h-2 mt-2"
                  aria-label={`${interventionStats.completed} of ${interventionStats.total} intervention tasks completed`}
                />
                <p className="text-sm text-gray-600 mt-1">
                  {interventionStats.completed} of {interventionStats.total} Tasks Completed
                </p>
              </div>

              <Separator />

              {/* Order Sets progress */}
              <div className="p-4">
                <h3 className="font-medium">Order Sets</h3>
                <Progress
                  value={(orderSetStats.completed / orderSetStats.total) * 100}
                  className="h-2 mt-2"
                  aria-label={`${orderSetStats.completed} of ${orderSetStats.total} order set tasks completed`}
                />
                <p className="text-sm text-gray-600 mt-1">
                  {orderSetStats.completed} of {orderSetStats.total} Tasks Completed
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content area with task lists */}
        <div className="md:col-span-3">
          {/* Assessments section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4" id="assessments-heading">
              Assessments
            </h2>
            <div className="space-y-3" role="list" aria-labelledby="assessments-heading">
              {tasks
                .filter((task) => task.category === "assessments")
                .map((task) => (
                  <div key={task.id} className="flex items-start space-x-3" role="listitem">
                    <Checkbox
                      id={task.id}
                      checked={task.completed}
                      onCheckedChange={(checked) => handleTaskChange(task.id, checked as boolean)}
                      className="mt-1"
                      aria-label={
                        task.completed
                          ? `Mark ${task.description} as incomplete`
                          : `Mark ${task.description} as complete`
                      }
                    />
                    <label htmlFor={task.id} className="text-sm leading-tight cursor-pointer">
                      {task.description}
                    </label>
                  </div>
                ))}
            </div>
          </section>

          {/* Interventions section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4" id="interventions-heading">
              Interventions
            </h2>
            <div className="space-y-3" role="list" aria-labelledby="interventions-heading">
              {tasks
                .filter((task) => task.category === "interventions")
                .map((task) => (
                  <div key={task.id} className="flex items-start space-x-3" role="listitem">
                    <Checkbox
                      id={task.id}
                      checked={task.completed}
                      onCheckedChange={(checked) => handleTaskChange(task.id, checked as boolean)}
                      className="mt-1"
                      aria-label={
                        task.completed
                          ? `Mark ${task.description} as incomplete`
                          : `Mark ${task.description} as complete`
                      }
                    />
                    <label htmlFor={task.id} className="text-sm leading-tight cursor-pointer">
                      {task.description}
                    </label>
                  </div>
                ))}
            </div>
          </section>

          {/* Order Sets section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4" id="ordersets-heading">
              Order Sets
            </h2>
            <div className="space-y-3" role="list" aria-labelledby="ordersets-heading">
              {tasks
                .filter((task) => task.category === "orderSets")
                .map((task) => (
                  <div key={task.id} className="flex items-start space-x-3" role="listitem">
                    <Checkbox
                      id={task.id}
                      checked={task.completed}
                      onCheckedChange={(checked) => handleTaskChange(task.id, checked as boolean)}
                      className="mt-1"
                      aria-label={
                        task.completed
                          ? `Mark ${task.description} as incomplete`
                          : `Mark ${task.description} as complete`
                      }
                    />
                    <label htmlFor={task.id} className="text-sm leading-tight cursor-pointer">
                      {task.description}
                    </label>
                  </div>
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
