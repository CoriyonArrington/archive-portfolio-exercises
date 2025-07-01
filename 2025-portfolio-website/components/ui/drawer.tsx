"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface DrawerProps {
  children: React.ReactNode
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  direction?: "top" | "bottom" | "left" | "right"
  className?: string
}

export function Drawer({ children, trigger, open, onOpenChange, direction = "bottom", className }: DrawerProps) {
  const [isOpen, setIsOpen] = React.useState(open || false)

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleOpenChange = (value: boolean) => {
    setIsOpen(value)
    onOpenChange?.(value)
  }

  const getTransformStyles = () => {
    switch (direction) {
      case "top":
        return "translate-y-full"
      case "bottom":
        return "translate-y-[-100%]"
      case "left":
        return "translate-x-full"
      case "right":
        return "translate-x-[-100%]"
      default:
        return "translate-y-[-100%]"
    }
  }

  const getDirectionClasses = () => {
    switch (direction) {
      case "top":
        return "inset-x-0 top-0 border-b"
      case "bottom":
        return "inset-x-0 bottom-0 border-t"
      case "left":
        return "inset-y-0 left-0 h-full border-r"
      case "right":
        return "inset-y-0 right-0 h-full border-l"
      default:
        return "inset-x-0 bottom-0 border-t"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={cn(
          "fixed bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out duration-300",
          getDirectionClasses(),
          direction === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
          direction === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          direction === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
          direction === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
          className,
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

export const DrawerTrigger = DialogTrigger
export const DrawerContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("", className)} {...props} />,
)
DrawerContent.displayName = "DrawerContent"

export const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)
DrawerHeader.displayName = "DrawerHeader"

export const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
DrawerFooter.displayName = "DrawerFooter"

export const DrawerTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
  ),
)
DrawerTitle.displayName = "DrawerTitle"

export const DrawerDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
DrawerDescription.displayName = "DrawerDescription"
