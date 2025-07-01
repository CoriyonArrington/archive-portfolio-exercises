import type { LucideProps } from "lucide-react"
import type dynamicIconImports from "lucide-react/dynamicIconImports"
import dynamic from "next/dynamic"

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports
}

export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = dynamic(() => import("lucide-react").then((mod) => mod[name]), {
    ssr: false,
    loading: () => <div className="w-4 h-4 bg-muted animate-pulse rounded-sm" />,
  })

  return <LucideIcon {...props} />
}
