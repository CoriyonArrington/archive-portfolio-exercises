import type React from "react"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface TypographyProps {
  children: ReactNode
  className?: string
  id?: string
}

export function H1({ children, className, id }: TypographyProps) {
  return (
    <h1
      id={id}
      className={cn(
        "font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl",
        "scroll-m-20 mb-4",
        className,
      )}
    >
      {children}
    </h1>
  )
}

export function H2({ children, className, id }: TypographyProps) {
  return (
    <h2
      id={id}
      className={cn(
        "font-heading text-3xl font-semibold tracking-tight md:text-4xl",
        "scroll-m-20 border-b pb-2 mb-4",
        className,
      )}
    >
      {children}
    </h2>
  )
}

export function H3({ children, className, id }: TypographyProps) {
  return (
    <h3
      id={id}
      className={cn("font-heading text-2xl font-semibold tracking-tight md:text-3xl", "scroll-m-20 mb-3", className)}
    >
      {children}
    </h3>
  )
}

export function H4({ children, className, id }: TypographyProps) {
  return (
    <h4
      id={id}
      className={cn("font-heading text-xl font-semibold tracking-tight md:text-2xl", "scroll-m-20 mb-2", className)}
    >
      {children}
    </h4>
  )
}

export function P({ children, className }: TypographyProps) {
  return <p className={cn("leading-7 mb-4", className)}>{children}</p>
}

export function Lead({ children, className }: TypographyProps) {
  return <p className={cn("text-xl text-muted-foreground mb-4", className)}>{children}</p>
}

export function Large({ children, className }: TypographyProps) {
  return <div className={cn("text-lg font-semibold", className)}>{children}</div>
}

export function Small({ children, className }: TypographyProps) {
  return <small className={cn("text-sm font-medium leading-none", className)}>{children}</small>
}

export function Muted({ children, className }: TypographyProps) {
  return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
}

export function Blockquote({ children, className }: TypographyProps) {
  return <blockquote className={cn("mt-6 border-l-2 border-primary pl-6 italic", className)}>{children}</blockquote>
}

// Add new typography components for consistency
export function Code({ children, className }: TypographyProps) {
  return (
    <code
      className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold", className)}
    >
      {children}
    </code>
  )
}

export function List({ children, className }: TypographyProps) {
  return <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>{children}</ul>
}

export function InlineLink({
  children,
  className,
  ...props
}: TypographyProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn("font-medium text-primary underline underline-offset-4 hover:text-primary/80", className)}
      {...props}
    >
      {children}
    </a>
  )
}
