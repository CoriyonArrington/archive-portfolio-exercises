import * as React from "react";
import Link from "next/link"; // Assuming usage with Next.js Link
import { cn } from "@/lib/utils";

// Extend NextLink props if needed, or use standard HTMLAnchorElement props if not using Next Link
export interface InlineLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string; // Ensure href is required
}

const InlineLink = React.forwardRef<HTMLAnchorElement, InlineLinkProps>(
  ({ className, children, href, ...props }, ref) => {
    // Basic link, adjust styling as needed (e.g., hover states)
    const styles = "font-medium text-primary underline underline-offset-4";

    // If using Next.js Link component
    return (
        <Link
          ref={ref}
          href={href}
          className={cn(styles, className)}
          {...(props as any)} // Type assertion might be needed depending on exact props
        >
            {children}
        </Link>
    );

    // If using standard <a> tag
    // return (
    //   <a
    //     ref={ref}
    //     href={href}
    //     className={cn(styles, className)}
    //     {...props}
    //   >
    //     {children}
    //   </a>
    // );

  }
);
InlineLink.displayName = "InlineLink";

export { InlineLink };