import * as React from "react";
import { cn } from "@/lib/utils";

export interface LeadProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const Lead = React.forwardRef<HTMLParagraphElement, LeadProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        // NOTE: Adjust text size, margin as needed
        className={cn("text-xl text-muted-foreground font-sans mb-4", className)} // Added mb-4 (16px)
        {...props}
      >
        {children}
      </p>
    );
  }
);
Lead.displayName = "Lead";

export { Lead };