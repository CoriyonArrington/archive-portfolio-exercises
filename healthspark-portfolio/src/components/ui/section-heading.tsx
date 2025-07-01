
import { cn } from "@/lib/utils";
import React from "react";

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center" | "right";
  children?: React.ReactNode;
}

export const SectionHeading = ({
  title,
  description,
  className,
  align = "center",
  children,
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "space-y-4 mb-12",
        align === "left" && "text-left",
        align === "center" && "text-center mx-auto",
        align === "right" && "text-right ml-auto",
        className
      )}
    >
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {description && (
        <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
      )}
      {children}
    </div>
  );
};
