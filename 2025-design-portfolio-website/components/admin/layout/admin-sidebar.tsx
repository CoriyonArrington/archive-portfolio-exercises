"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, MessageSquare, Layers, HelpCircle, ImageIcon, LogOut, Bug } from "lucide-react"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

export function AdminSidebar() {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      label: "Projects",
      href: "/admin/projects",
      icon: <Layers className="h-5 w-5" />,
    },
    {
      label: "Testimonials",
      href: "/admin/testimonials",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      label: "Services",
      href: "/admin/services",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      label: "Process",
      href: "/admin/process",
      icon: <Layers className="h-5 w-5" />,
    },
    {
      label: "FAQs",
      href: "/admin/faqs",
      icon: <HelpCircle className="h-5 w-5" />,
    },
    {
      label: "Images",
      href: "/admin/images",
      icon: <ImageIcon className="h-5 w-5" />,
    },
    {
      label: "Debug",
      href: "/admin/debug",
      icon: <Bug className="h-5 w-5" />,
    },
  ]

  return (
    <div className="w-64 border-r h-full flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-bold">Admin Portal</h2>
      </div>
      <nav className="flex-1">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <Link
          href="/admin/logout"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Link>
      </div>
    </div>
  )
}
