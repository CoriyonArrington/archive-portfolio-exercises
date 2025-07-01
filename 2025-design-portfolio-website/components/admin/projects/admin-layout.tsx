import Link from "next/link"
import type { ReactNode } from "react"
import {
  LayoutDashboardIcon,
  FileTextIcon,
  SettingsIcon,
  FileQuestionIcon,
  ListOrderedIcon,
  ImageIcon,
  MessageSquareIcon,
  RefreshCwIcon,
  DatabaseIcon,
  PiIcon as ApiIcon,
} from "lucide-react"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <aside className="w-64 border-r bg-background">
          <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center gap-2">
              <LayoutDashboardIcon className="h-5 w-5" />
              <Link href="/admin" className="font-medium">
                Dashboard
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <FileTextIcon className="h-5 w-5" />
              <Link href="/admin/projects" className="font-medium">
                Projects
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              <Link href="/admin/services" className="font-medium">
                Services
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <FileQuestionIcon className="h-5 w-5" />
              <Link href="/admin/faqs" className="font-medium">
                FAQs
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <ListOrderedIcon className="h-5 w-5" />
              <Link href="/admin/process" className="font-medium">
                Process Steps
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              <Link href="/admin/images" className="font-medium">
                Images
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquareIcon className="h-5 w-5" />
              <Link href="/admin/testimonials" className="font-medium">
                Testimonials
              </Link>
            </div>

            <div className="pt-4">
              <p className="mb-4 text-xs font-semibold uppercase text-muted-foreground">Developer Tools</p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <RefreshCwIcon className="h-5 w-5" />
                  <Link href="/admin/revalidate" className="font-medium">
                    Revalidate Cache
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <DatabaseIcon className="h-5 w-5" />
                  <Link href="/admin/supabase-debug" className="font-medium">
                    Supabase Debug
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <ApiIcon className="h-5 w-5" />
                  <Link href="/admin/api-debug" className="font-medium">
                    API Debug
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
