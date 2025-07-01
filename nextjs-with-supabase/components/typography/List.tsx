import * as React from "react";
import { cn } from "@/lib/utils";

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {}

const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        // NOTE: Adjust list style, margin, padding as needed
        className={cn("my-6 ml-6 list-disc [&>li]:mt-2 font-sans mb-4", className)} // Added mb-4 (16px)
        {...props}
      >
        {children}
      </ul>
    );
  }
);
List.displayName = "List";

export { List };