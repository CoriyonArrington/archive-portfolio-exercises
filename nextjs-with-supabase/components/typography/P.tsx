import * as React from "react";
import { cn } from "@/lib/utils";

export interface PProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const P = React.forwardRef<HTMLParagraphElement, PProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        // NOTE: Adjust line-height, margin as needed
        className={cn("leading-7 [&:not(:first-child)]:mt-6 font-sans mb-4", className)} // Added mb-4 (16px)
        {...props}
      >
        {children}
      </p>
    );
  }
);
P.displayName = "P";

export { P };