import type React from "react"
import Link from "next/link"
import {
  MessageSquare,
  Settings,
  FileQuestion,
  ListChecks,
  Image,
  FolderIcon,
  User,
  ClipboardCheck,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Welcome to your admin dashboard. Manage your portfolio content from here.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Projects"
          description="Manage your portfolio projects"
          icon={<FolderIcon className="h-6 w-6" />}
          href="/admin/projects"
        />
        <DashboardCard
          title="Testimonials"
          description="Manage client testimonials"
          icon={<MessageSquare className="h-6 w-6" />}
          href="/admin/testimonials"
        />
        <DashboardCard
          title="About"
          description="Update your about page content"
          icon={<User className="h-6 w-6" />}
          href="/admin/about"
        />
        <DashboardCard
          title="Component Audit"
          description="Analyze and optimize your components"
          icon={<ClipboardCheck className="h-6 w-6" />}
          href="/admin/component-audit"
        />
        <DashboardCard
          title="Services"
          description="Manage your service offerings"
          icon={<Settings className="h-8 w-8" />}
          href="/admin/services"
        />
        <DashboardCard
          title="FAQs"
          description="Manage frequently asked questions"
          icon={<FileQuestion className="h-8 w-8" />}
          href="/admin/faqs"
        />
        <DashboardCard
          title="Process"
          description="Manage your design process phases"
          icon={<ListChecks className="h-8 w-8" />}
          href="/admin/process"
        />
        <DashboardCard
          title="Images"
          description="Manage your image assets"
          icon={<Image className="h-8 w-8" />}
          href="/admin/images"
        />
      </div>
    </div>
  )
}

function DashboardCard({
  title,
  description,
  icon,
  href,
}: {
  title: string
  description: string
  icon: React.ReactNode
  href: string
}) {
  return (
    <Link href={href} className="block">
      <div className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-primary/10 rounded-full text-primary">{icon}</div>
          <div>
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
