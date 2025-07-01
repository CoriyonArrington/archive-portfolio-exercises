'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { getRoutes } from '@/lib/routes/get-routes'

export default function PageFooterNav() {
  const pathname = usePathname()
  const routes = getRoutes()

  // Don’t strip the slash off the root path
  const cleanedPathname = pathname === '/' ? '/' : pathname.replace(/\/$/, '')
  const currentIndex = routes.findIndex(r => r.path === cleanedPathname)

  if (currentIndex === -1) return null

  const prevPage = currentIndex > 0 ? routes[currentIndex - 1] : null
  const nextPage = currentIndex < routes.length - 1 ? routes[currentIndex + 1] : null

  if (!prevPage && !nextPage) return null

  return (
    <div className="border-t mt-12">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {prevPage && (
            <Link
              href={prevPage.path}
              className="border rounded-lg p-6 flex items-center hover:bg-muted transition-colors group text-left"
            >
              <span className="text-muted-foreground">←</span>
              <h3 className="ml-4 font-medium text-xl font-playfair group-hover:text-primary transition-colors">
                {prevPage.name}
              </h3>
            </Link>
          )}

          {nextPage && (
            <Link
              href={nextPage.path}
              className={`border rounded-lg p-6 flex items-center justify-between hover:bg-muted transition-colors group text-left ${
                !prevPage ? 'md:col-span-2' : ''
              }`}
            >
              <h3 className="font-medium text-xl font-playfair group-hover:text-primary transition-colors">
                {nextPage.name}
              </h3>
              <span className="text-muted-foreground">→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
