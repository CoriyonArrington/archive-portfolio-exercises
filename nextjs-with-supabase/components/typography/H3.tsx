import * as React from "react";
import { cn } from "@/lib/utils";

export interface H3Props extends React.HTMLAttributes<HTMLHeadingElement> {}

const H3 = React.forwardRef<HTMLHeadingElement, H3Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        // NOTE: Adjust text size, weight, margin as needed
        className={cn(
          "scroll-m-20 text-2xl font-semibold tracking-tight font-heading mb-3", // Added mb-3 (12px)
          className
        )}
        {...props}
      >
        {children}
      </h3>
    );
  }
);
H3.displayName = "H3";

export { H3 };