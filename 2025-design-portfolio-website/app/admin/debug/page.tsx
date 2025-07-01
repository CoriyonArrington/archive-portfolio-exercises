import type React from "react"
import Link from "next/link"
import { AdminLayout } from "@/components/admin/layout/admin-layout"
import { Database, FileCheck, Lock, Server, Wrench } from "lucide-react"

export default function DebugDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Debug Dashboard</h1>
        <p className="text-gray-600">Use these tools to diagnose and fix issues with your admin portal.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DebugCard
            title="Authentication Debug"
            description="Check authentication status and session details"
            icon={<Lock className="h-6 w-6" />}
            href="/admin/auth-debug"
          />

          <DebugCard
            title="Supabase Connection Test"
            description="Test direct connection to Supabase (client-side)"
            icon={<Database className="h-6 w-6" />}
            href="/admin/supabase-connection-test"
            highlight={true}
          />

          <DebugCard
            title="Supabase Debug"
            description="Test Supabase queries and check table data"
            icon={<Database className="h-6 w-6" />}
            href="/admin/supabase-debug"
          />

          <DebugCard
            title="API Debug"
            description="Test API endpoints and check responses"
            icon={<Server className="h-6 w-6" />}
            href="/admin/api-debug"
          />

          <DebugCard
            title="Path Check"
            description="Check if routes are accessible and returning expected status codes"
            icon={<FileCheck className="h-6 w-6" />}
            href="/admin/check-paths"
          />

          <DebugCard
            title="Schema Check"
            description="Check database schema and table structures"
            icon={<Wrench className="h-6 w-6" />}
            href="/admin/check-schema"
          />
        </div>
      </div>
    </AdminLayout>
  )
}

interface DebugCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  highlight?: boolean
}

function DebugCard({ title, description, icon, href, highlight = false }: DebugCardProps) {
  return (
    <Link
      href={href}
      className={`block p-6 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow ${
        highlight ? "border-blue-500 bg-blue-50 hover:bg-blue-100" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex-shrink-0 p-2 rounded-full ${
            highlight ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
          }`}
        >
          {icon}
        </div>
        <div>
          <h3 className={`text-lg font-medium ${highlight ? "text-blue-700" : ""}`}>{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </Link>
  )
}
