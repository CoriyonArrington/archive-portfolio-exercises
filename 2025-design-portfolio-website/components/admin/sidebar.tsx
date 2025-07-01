"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboardIcon,
  FileTextIcon,
  MessageSquareIcon,
  WrenchIcon,
  ImageIcon,
  RefreshCwIcon,
  DatabaseIcon,
  PiIcon as ApiIcon,
  ListIcon,
} from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Projects",
    href: "/admin/projects",
    icon: FileTextIcon,
  },
  {
    title: "Services",
    href: "/admin/services",
    icon: WrenchIcon,
  },
  {
    title: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquareIcon,
  },
  {
    title: "Process Steps",
    href: "/admin/process",
    icon: ListIcon,
  },
  {
    title: "Images",
    href: "/admin/images",
    icon: ImageIcon,
  },
]

const devTools = [
  {
    title: "Revalidate Cache",
    href: "/admin/revalidate",
    icon: RefreshCwIcon,
  },
  {
    title: "Supabase Debug",
    href: "/admin/supabase-debug",
    icon: DatabaseIcon,
  },
  {
    title: "API Debug",
    href: "/admin/api-debug",
    icon: ApiIcon,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-6">
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
              pathname === item.href || pathname?.startsWith(`${item.href}/`)
                ? "bg-muted font-medium"
                : "hover:bg-muted/50",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-2">
        <h3 className="mb-2 text-xs font-medium text-muted-foreground">DEVELOPER TOOLS</h3>
        <nav className="flex flex-col gap-2">
          {devTools.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                pathname === item.href ? "bg-muted font-medium" : "hover:bg-muted/50",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
