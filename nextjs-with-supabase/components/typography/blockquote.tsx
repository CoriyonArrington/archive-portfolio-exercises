import * as React from "react";
import { cn } from "@/lib/utils";

export interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {}

const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <blockquote
        ref={ref}
        // NOTE: Adjust border, padding, margin as needed
        className={cn(
          "mt-6 border-l-2 pl-6 italic font-sans mb-4", // Added mb-4 (16px)
          className
        )}
        {...props}
      >
        {children}
      </blockquote>
    );
  }
);
Blockquote.displayName = "Blockquote";

export { Blockquote };