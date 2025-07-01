"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children?: React.ReactNode
  className?: string
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({ href, children, className, ...props }, ref) => {
  const isHash = href.startsWith("#")

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHash) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        const yOffset = -100 // Adjust based on your header height
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: "smooth" })
      }
    }

    if (props.onClick) {
      props.onClick(e)
    }
  }

  return (
    <a ref={ref} href={href} className={cn("transition-colors", className)} onClick={handleClick} {...props}>
      {children}
    </a>
  )
})

Link.displayName = "Link"

export { Link }
