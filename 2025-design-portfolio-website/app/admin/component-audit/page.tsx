import { AuditDashboard } from "@/components/admin/audit-dashboard"
import "./data/ensure-directory"

export const metadata = {
  title: "Component Audit | Admin",
  description: "Analyze and optimize your component usage",
}

export default function ComponentAuditPage() {
  return (
    <div className="container py-10">
      <AuditDashboard />
    </div>
  )
}
