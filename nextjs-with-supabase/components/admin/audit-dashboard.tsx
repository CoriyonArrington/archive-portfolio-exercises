// components/admin/audit-dashboard.tsx (Fixes for TS errors)
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

// Define ComponentStatus type clearly for reuse
interface ComponentStatusData {
  name: string
  location: string
  status: string
  usageCount: number
  notes: string
}

// Define other detail types
interface UnusedComponentData {
  path: string
  name: string
  type?: string // Optional
  status?: string // Optional
}
interface UnusedDependencyData {
  name: string
  type?: string
  status?: string
  devDependency?: boolean
}
interface DuplicationData {
  sourceFile: string
  targetFile: string
  lines: number
  tokens: number
}

interface AuditData {
  timestamp: string
  summary: {
    unusedComponentsCount?: number
    unusedDependenciesCount?: number
    duplicationPercentage?: number
    healthScore?: number
    standardizedCount?: number
    totalComponents?: number
  }
  details: {
    unusedComponents: UnusedComponentData[]
    unusedDependencies?: UnusedDependencyData[]
    duplications: DuplicationData[]
    componentStatus: ComponentStatusData[]
  }
}

// Default empty audit data
const emptyAuditData: AuditData = { /* ... same as before ... */
  timestamp: new Date().toISOString(),
  summary: {
    unusedComponentsCount: 0,
    unusedDependenciesCount: 0,
    duplicationPercentage: 0,
    healthScore: 100,
    standardizedCount: 5,
    totalComponents: 14,
  },
  details: {
    unusedComponents: [],
    unusedDependencies: [],
    duplications: [],
    componentStatus: [
      { name: "Button", location: "@/components/ui/button.tsx", status: "Standardized", usageCount: 0, notes: "Shadcn Base" },
      { name: "Card", location: "@/components/ui/card.tsx", status: "Standardized", usageCount: 0, notes: "Shadcn Base" },
      { name: "Input", location: "@/components/ui/input.tsx", status: "Standardized", usageCount: 0, notes: "Shadcn Base" },
      { name: "Select", location: "@/components/ui/select.tsx", status: "Standardized", usageCount: 0, notes: "Shadcn Base" },
      { name: "Table", location: "@/components/ui/table.tsx", status: "Needs Review", usageCount: 0, notes: "" },
      { name: "H1-H4, P, etc.", location: "@/components/typography/", status: "Standardized", usageCount: 0, notes: "Refactored w/ Fonts" },
      { name: "BlogPostCard", location: "@/components/common/blog-card.tsx", status: "Needs Review", usageCount: 0, notes: "Check image handling" },
      { name: "ProjectCard", location: "@/components/common/project-card.tsx", status: "Standardized", usageCount: 0, notes: "Refactored" },
      { name: "ServiceCard", location: "@/components/common/service-card.tsx", status: "Standardized", usageCount: 0, notes: "Refactored" },
      { name: "Icon", location: "@/components/common/icon.tsx", status: "Standardized", usageCount: 0, notes: "" },
      { name: "MarkdownRenderer", location: "@/components/common/markdown-renderer.tsx", status: "Needs Review", usageCount: 0, notes: "" },
      { name: "HeroSection", location: "@/components/page-sections/hero-section.tsx", status: "Standardized", usageCount: 0, notes: "Refactored" },
      { name: "ServicesSection", location: "@/components/page-sections/services-section.tsx", status: "Standardized", usageCount: 0, notes: "Refactored" },
      { name: "SiteHeader", location: "@/components/layout/site-header.tsx", status: "Needs Review", usageCount: 0, notes: "Check dynamic nav logic" },
    ],
  },
};


export function AuditDashboard() {
  const [auditData, setAuditData] = useState<AuditData | null>(null)
  const [loading, setLoading] = useState(true)
  const [runningAudit, setRunningAudit] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [componentFilter, setComponentFilter] = useState("")

  useEffect(() => {
    fetchAuditData()
  }, [])

  const fetchAuditData = async () => { /* ... same as before ... */
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/admin/component-audit/data/latest-audit.json");

        if (!response.ok) {
            if (response.status === 404) {
                console.log("No audit file found, using default empty data.");
                setAuditData(emptyAuditData);
                setError("No audit data found. Run your first audit to generate data.");
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } else {
            const data = await response.json();
             const validatedData: AuditData = {
                timestamp: data.timestamp || new Date().toISOString(),
                summary: {
                    ...emptyAuditData.summary,
                    ...(data.summary || {}),
                },
                details: {
                    ...emptyAuditData.details,
                     ...(data.details || {}),
                     unusedComponents: data.details?.unusedComponents || [],
                     unusedDependencies: data.details?.unusedDependencies || [],
                     duplications: data.details?.duplications || [],
                     componentStatus: data.details?.componentStatus || emptyAuditData.details.componentStatus,
                }
            };
            validatedData.summary.standardizedCount = validatedData.details.componentStatus.filter(c => c.status === "Standardized").length;
            validatedData.summary.totalComponents = validatedData.details.componentStatus.length;

            setAuditData(validatedData);
        }
    } catch (err) {
        console.error("Failed to load audit data:", err);
        setError("Failed to load audit data. Check console or run audit again.");
        setAuditData(emptyAuditData);
    } finally {
        setLoading(false);
    }
  };


  const runAudit = async () => { /* ... same as before ... */
     try {
       setRunningAudit(true);
       setError(null);
       const response = await fetch("/api/run-audit", { method: "POST" });
       if (!response.ok) {
           const errorData = await response.json().catch(() => ({ message: `Audit request failed with status: ${response.status}` }));
           throw new Error(errorData.message || `Audit failed with status: ${response.status}`);
       }
        await fetchAuditData();
     } catch (err) {
       console.error("Failed to run audit:", err);
       setError(err instanceof Error ? err.message : "An unknown error occurred during the audit.");
     } finally {
       setRunningAudit(false);
     }
  };

 const updateComponentStatus = (index: number, field: string, value: string | number) => { /* ... same as before ... */
    setAuditData(currentAuditData => {
        if (!currentAuditData) return null;

        const updatedData = JSON.parse(JSON.stringify(currentAuditData)) as AuditData;

        if (index < 0 || index >= updatedData.details.componentStatus.length) {
            console.error("Attempted to update status for invalid index:", index);
            return currentAuditData;
        }

        const component = updatedData.details.componentStatus[index];

        if (field === 'status' && typeof value === 'string') {
            component.status = value;
        } else if (field === 'notes' && typeof value === 'string') {
            component.notes = value;
        } else if (field === 'usageCount' && typeof value === 'number') {
            component.usageCount = value;
        } else {
            console.warn(`Unsupported field or type for updateComponentStatus: ${field}, ${typeof value}`);
            return currentAuditData;
        }

        updatedData.summary.standardizedCount = updatedData.details.componentStatus.filter(
            (c) => c.status === "Standardized",
        ).length;
        updatedData.summary.totalComponents = updatedData.details.componentStatus.length;

        console.log("Updated component status (local state only):", component);

        return updatedData;
    });
 };


  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading audit data...</div>
  }

  if (!auditData) {
     return ( /* ... same no data state ... */
       <div className="flex flex-col items-center justify-center h-64 gap-4">
         <AlertTriangle className="h-12 w-12 text-yellow-500" />
         <h3 className="text-xl font-medium">No audit data available</h3>
         <p className="text-muted-foreground mb-4">{error || "Run your first code audit to get started."}</p>
         <Button onClick={runAudit} disabled={runningAudit}>
           {runningAudit ? ( <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Running Audit...</> ) : ( "Run Code Audit" )}
         </Button>
       </div>
     )
   }

  const { summary, details } = auditData
  const lastUpdated = auditData.timestamp ? new Date(auditData.timestamp).toLocaleString() : "N/A";

  const filteredComponents = (details?.componentStatus ?? []).filter(
    // Added explicit type annotation for component
    (component: ComponentStatusData) =>
      component.name?.toLowerCase().includes(componentFilter.toLowerCase()) ||
      component.location?.toLowerCase().includes(componentFilter.toLowerCase()) ||
      component.status?.toLowerCase().includes(componentFilter.toLowerCase()),
  )

  // Calculate progress safely
  const total = summary?.totalComponents ?? 0;
  const standardized = summary?.standardizedCount ?? 0;
  const standardizationProgress = total > 0 ? (standardized / total) * 100 : 0; // Avoid division by zero

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
         <div>
           <h2 className="text-2xl font-bold">Design System Health</h2>
           <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
           {error && !runningAudit && <p className="text-red-500 mt-1">{error}</p>}
         </div>
         <Button onClick={runAudit} disabled={runningAudit}>
           {runningAudit ? ( <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Running Audit...</> ) : ( <><RefreshCw className="mr-2 h-4 w-4" /> Run New Audit</> )}
         </Button>
       </div>

      {/* Summary Cards - Use optional chaining and nullish coalescing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <HealthScore score={summary?.healthScore ?? 100} />
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Component Standardization</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{standardized}/{total}</div>
              <CheckCircle className={`h-5 w-5 ${standardized === total && total > 0 ? "text-green-500" : "text-amber-500"}`} />
            </div>
            {/* --- MODIFIED Progress value calculation --- */}
            <Progress value={standardizationProgress} className="h-1 mt-2" />
            {/* --- End Modification --- */}
          </CardContent>
        </Card>
         <Card>
           <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Unused Components</CardTitle></CardHeader>
           <CardContent>
             <div className="flex items-center justify-between">
                 <div className="text-2xl font-bold">{summary?.unusedComponentsCount ?? 0}</div>
                  <FileCode className={`h-5 w-5 ${(summary?.unusedComponentsCount ?? 0) > 0 ? "text-amber-500" : "text-green-500"}`} />
             </div>
              <Progress value={Math.max(0, 100 - (summary?.unusedComponentsCount ?? 0) * 5)} className="h-1 mt-2" />
           </CardContent>
         </Card>
         <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Code Duplication</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{(summary?.duplicationPercentage ?? 0).toFixed(1)}%</div>
                 {(summary?.duplicationPercentage ?? 0) < 5 ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertTriangle className={`h-5 w-5 ${(summary?.duplicationPercentage ?? 0) > 10 ? "text-red-500" : "text-amber-500"}`} />
                )}
              </div>
              <Progress value={Math.max(0, 100 - (summary?.duplicationPercentage ?? 0) * 2)} className="h-1 mt-2" />
            </CardContent>
          </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="status">
         <TabsList className="grid w-full grid-cols-4">
           <TabsTrigger value="status">Component Status</TabsTrigger>
           <TabsTrigger value="unused">Unused Components</TabsTrigger>
           <TabsTrigger value="duplication">Code Duplication</TabsTrigger>
           <TabsTrigger value="checklist">Implementation Checklist</TabsTrigger>
         </TabsList>

        {/* Component Status Tab */}
         <TabsContent value="status" className="mt-4">
           <Card>
             <CardHeader>
               <CardTitle>Component Status Tracking</CardTitle>
               <CardDescription>Track the implementation status of your design system components</CardDescription>
               <div className="mt-2">
                  <Input placeholder="Filter components..." value={componentFilter} onChange={(e) => setComponentFilter(e.target.value)} className="max-w-sm" />
               </div>
             </CardHeader>
             <CardContent>
               <ComponentStatusList components={filteredComponents} onUpdateComponent={updateComponentStatus} />
             </CardContent>
           </Card>
         </TabsContent>

        {/* Unused Components Tab */}
          <TabsContent value="unused" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Unused Components</CardTitle>
                <CardDescription>Components defined but potentially not imported anywhere (requires accurate tooling)</CardDescription>
              </CardHeader>
              <CardContent>
                 {/* Pass details safely */}
                <UnusedComponentsList components={details?.unusedComponents ?? []} />
              </CardContent>
            </Card>
          </TabsContent>

        {/* Code Duplication Tab */}
          <TabsContent value="duplication" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Code Duplication</CardTitle>
                <CardDescription>Code sections duplicated across files (requires accurate tooling)</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Pass details safely */}
                <CodeDuplicationList duplications={details?.duplications ?? []} />
              </CardContent>
            </Card>
          </TabsContent>

        {/* Checklist Tab */}
         <TabsContent value="checklist" className="mt-4">
           <Card>
             <CardHeader>
               <CardTitle>Implementation Checklist</CardTitle>
               <CardDescription>Track your progress implementing the design system (customize items as needed)</CardDescription>
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