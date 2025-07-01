import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { getAdjacentPages, type NavigationItem } from "@/lib/navigation"

interface PageFooterNavProps {
  pathname: string
}

export default function PageFooterNav({ pathname }: PageFooterNavProps) {
  const { prevPage, nextPage } = getAdjacentPages(pathname)

  // If there are no adjacent pages, don't render anything
  if (!prevPage && !nextPage) {
    return null
  }

  // Helper function to get category label
  function getCategoryLabel(item: NavigationItem): string {
    switch (item.category) {
      case "main":
        return "Main"
      case "resources":
        return "Resources"
      case "explore":
        return "Explore"
      default:
        return ""
    }
  }

  return (
    <div className="border-t mt-12">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {prevPage && (
            <Link
              href={prevPage.href}
              className="border rounded-lg p-6 flex items-center hover:bg-muted transition-colors group text-left"
              prefetch={true}
            >
              <div className="flex items-center space-x-4">
                <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <p className="text-sm text-muted-foreground">{getCategoryLabel(prevPage)}</p>
                  <h3 className="font-medium text-xl font-playfair group-hover:text-primary transition-colors">
                    {prevPage.title}
                  </h3>
                </div>
              </div>
            </Link>
          )}

          {nextPage && (
            <Link
              href={nextPage.href}
              className={`border rounded-lg p-6 flex items-center justify-between hover:bg-muted transition-colors group text-left ${!prevPage ? "md:col-span-2" : ""}`}
              prefetch={true}
            >
              <div>
                <p className="text-sm text-muted-foreground">{getCategoryLabel(nextPage)}</p>
                <h3 className="font-medium text-xl font-playfair group-hover:text-primary transition-colors">
                  {nextPage.title}
                </h3>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
