import * as React from "react";
import { cn } from "@/lib/utils";

export interface H4Props extends React.HTMLAttributes<HTMLHeadingElement> {}

const H4 = React.forwardRef<HTMLHeadingElement, H4Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <h4
        ref={ref}
        // NOTE: Adjust text size, weight, margin as needed
        className={cn(
          "scroll-m-20 text-xl font-semibold tracking-tight font-heading mb-2", // Added mb-2 (8px)
          className
        )}
        {...props}
      >
        {children}
      </h4>
    );
  }
);
H4.displayName = "H4";

export { H4 };