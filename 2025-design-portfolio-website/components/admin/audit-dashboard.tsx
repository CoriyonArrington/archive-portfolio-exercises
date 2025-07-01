"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { UnusedComponentsList } from "./unused-components-list"
import { CodeDuplicationList } from "./code-duplication-list"
import { ComponentStatusList } from "./component-status-list"
import { ImplementationChecklist } from "./implementation-checklist"
import { HealthScore } from "./health-score"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RefreshCw, AlertTriangle, CheckCircle, FileCode } from "lucide-react"

interface AuditData {
  timestamp: string
  summary: {
    unusedComponentsCount: number
    unusedDependenciesCount: number
    duplicationPercentage: number
    healthScore: number
    standardizedCount: number
    totalComponents: number
  }
  details: {
    unusedComponents: Array<{
      path: string
      name: string
      type: string
      status: string
    }>
    unusedDependencies: Array<{
      name: string
      type: string
      status: string
      devDependency: boolean
    }>
    duplications: Array<{
      sourceFile: string
      targetFile: string
      lines: number
      tokens: number
    }>
    componentStatus: Array<{
      name: string
      location: string
      status: string
      usageCount: number
      notes: string
    }>
  }
}

// Default empty audit data
const emptyAuditData: AuditData = {
  timestamp: new Date().toISOString(),
  summary: {
    unusedComponentsCount: 0,
    unusedDependenciesCount: 0,
    duplicationPercentage: 0,
    healthScore: 100,
    standardizedCount: 0,
    totalComponents: 0,
  },
  details: {
    unusedComponents: [],
    unusedDependencies: [],
    duplications: [],
    componentStatus: [
      { name: "Button", location: "@/components/ui/button.tsx", status: "Standardized", usageCount: 24, notes: "" },
      { name: "Card", location: "@/components/ui/card.tsx", status: "Needs Review", usageCount: 12, notes: "" },
      {
        name: "Typography",
        location: "@/components/ui/typography.tsx",
        status: "Standardized",
        usageCount: 35,
        notes: "",
      },
      {
        name: "ImageCard",
        location: "@/components/shared/image-card.tsx",
        status: "Standardized",
        usageCount: 8,
        notes: "",
      },
      {
        name: "FormField",
        location: "@/components/shared/form-field.tsx",
        status: "Standardized",
        usageCount: 6,
        notes: "",
      },
    ],
  },
}

export function AuditDashboard() {
  const [auditData, setAuditData] = useState<AuditData | null>(null)
  const [loading, setLoading] = useState(true)
  const [runningAudit, setRunningAudit] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [componentFilter, setComponentFilter] = useState("")

  useEffect(() => {
    fetchAuditData()
  }, [])

  const fetchAuditData = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/admin/component-audit/data/latest-audit.json")

      if (!response.ok) {
        if (response.status === 404) {
          // If file doesn't exist yet, use empty data
          setAuditData(emptyAuditData)
          setError("No audit data found. Run your first audit to generate data.")
        } else {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
      } else {
        const data = await response.json()
        // Ensure componentStatus exists in the data
        if (!data.details.componentStatus) {
          data.details.componentStatus = emptyAuditData.details.componentStatus
          data.summary.standardizedCount = data.details.componentStatus.filter(
            (c) => c.status === "Standardized",
          ).length
          data.summary.totalComponents = data.details.componentStatus.length
        }
        setAuditData(data)
      }
    } catch (error) {
      console.error("Failed to load audit data:", error)
      setError("Failed to load audit data. Please try again.")
      // Use empty data as fallback
      setAuditData(emptyAuditData)
    } finally {
      setLoading(false)
    }
  }

  const runAudit = async () => {
    try {
      setRunningAudit(true)
      setError(null)

      // Call the API endpoint to trigger the audit script
      const response = await fetch("/api/run-audit", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to run audit")
      }

      // Wait for the script to complete and then fetch the new data
      await fetchAuditData()
    } catch (error) {
      console.error("Failed to run audit:", error)
      setError("Failed to run audit. Please try again.")
    } finally {
      setRunningAudit(false)
    }
  }

  const updateComponentStatus = (index: number, field: string, value: string | number) => {
    if (!auditData) return

    const updatedData = { ...auditData }
    const component = { ...updatedData.details.componentStatus[index] }

    // @ts-ignore - We know the field exists on the component
    component[field] = value
    updatedData.details.componentStatus[index] = component

    // Update summary counts
    updatedData.summary.standardizedCount = updatedData.details.componentStatus.filter(
      (c) => c.status === "Standardized",
    ).length

    setAuditData(updatedData)

    // In a real app, you would save this data to the server
    // For now, we'll just update the local state
    console.log("Updated component status:", component)
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading audit data...</div>
  }

  if (!auditData) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <AlertTriangle className="h-12 w-12 text-yellow-500" />
        <h3 className="text-xl font-medium">No audit data available</h3>
        <p className="text-muted-foreground mb-4">Run your first code audit to get started</p>
        <Button onClick={runAudit} disabled={runningAudit}>
          {runningAudit ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Running Audit...
            </>
          ) : (
            "Run Code Audit"
          )}
        </Button>
      </div>
    )
  }

  const { summary, details } = auditData
  const lastUpdated = new Date(auditData.timestamp).toLocaleString()

  // Filter component status based on search
  const filteredComponents = details.componentStatus.filter(
    (component) =>
      component.name.toLowerCase().includes(componentFilter.toLowerCase()) ||
      component.location.toLowerCase().includes(componentFilter.toLowerCase()) ||
      component.status.toLowerCase().includes(componentFilter.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Design System Health</h2>
          <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
          {error && <p className="text-red-500 mt-1">{error}</p>}
        </div>
        <Button onClick={runAudit} disabled={runningAudit}>
          {runningAudit ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Running Audit...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Run New Audit
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <HealthScore score={summary.healthScore} />

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Component Standardization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {summary.standardizedCount}/{summary.totalComponents}
              </div>
              <CheckCircle
                className={`h-5 w-5 ${
                  summary.standardizedCount === summary.totalComponents ? "text-green-500" : "text-amber-500"
                }`}
              />
            </div>
            <Progress
              value={summary.totalComponents > 0 ? (summary.standardizedCount / summary.totalComponents) * 100 : 0}
              className="h-1 mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unused Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{summary.unusedComponentsCount}</div>
              <FileCode
                className={`h-5 w-5 ${summary.unusedComponentsCount > 0 ? "text-amber-500" : "text-green-500"}`}
              />
            </div>
            <Progress value={Math.max(0, 100 - summary.unusedComponentsCount * 5)} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Code Duplication</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{summary.duplicationPercentage.toFixed(1)}%</div>
              {summary.duplicationPercentage < 5 ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle
                  className={`h-5 w-5 ${summary.duplicationPercentage > 10 ? "text-red-500" : "text-amber-500"}`}
                />
              )}
            </div>
            <Progress value={Math.max(0, 100 - summary.duplicationPercentage * 2)} className="h-1 mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="status">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="status">Component Status</TabsTrigger>
          <TabsTrigger value="unused">Unused Components</TabsTrigger>
          <TabsTrigger value="duplication">Code Duplication</TabsTrigger>
          <TabsTrigger value="checklist">Implementation Checklist</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Component Status Tracking</CardTitle>
              <CardDescription>Track the implementation status of your design system components</CardDescription>
              <div className="mt-2">
                <Input
                  placeholder="Filter components..."
                  value={componentFilter}
                  onChange={(e) => setComponentFilter(e.target.value)}
                  className="max-w-sm"
                />
              </div>
            </CardHeader>
            <CardContent>
              <ComponentStatusList components={filteredComponents} onUpdateComponent={updateComponentStatus} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unused" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Unused Components</CardTitle>
              <CardDescription>Components that are defined but not imported anywhere in your codebase</CardDescription>
            </CardHeader>
            <CardContent>
              <UnusedComponentsList components={details.unusedComponents} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="duplication" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Code Duplication</CardTitle>
              <CardDescription>Sections of code that are duplicated across multiple files</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeDuplicationList duplications={details.duplications} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklist" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Implementation Checklist</CardTitle>
              <CardDescription>Track your progress implementing the design system</CardDescription>
            </CardHeader>
            <CardContent>
              <ImplementationChecklist />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
