import * as React from "react";
import { cn } from "@/lib/utils";

export interface H2Props extends React.HTMLAttributes<HTMLHeadingElement> {}

const H2 = React.forwardRef<HTMLHeadingElement, H2Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        // NOTE: Adjust text size, weight, margin as needed
        className={cn(
          "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 font-heading mb-4", // Added mb-4 (16px)
          className
        )}
        {...props}
      >
        {children}
      </h2>
    );
  }
);
H2.displayName = "H2";

export { H2 };