// components/typography/H1.tsx (Updated Responsive Size)
import * as React from "react";
import { cn } from "@/lib/utils";

export interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {}

const H1 = React.forwardRef<HTMLHeadingElement, H1Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        // --- UPDATED: Changed lg:text-5xl to md:text-5xl ---
        className={cn(
          "scroll-m-20 text-4xl font-extrabold tracking-tight md:text-5xl font-heading mb-6", // Base 4xl, becomes 5xl at md breakpoint
          className
        )}
        {...props}
      >
        {children}
      </h1>
    );
  }
);
H1.displayName = "H1";

export { H1 };