
import { cn } from "@/lib/utils";
import React, { useState } from "react";

export interface CardHoverEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    title: string;
    description: string;
    imageUrl?: string;
    link?: string;
    tags?: string[];
  }[];
  className?: string;
}

export const CardHoverEffect = ({
  items,
  className,
  ...props
}: CardHoverEffectProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}
      {...props}
    >
      {items.map((item, idx) => (
        <a
          href={item.link || "#"}
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div
            className={cn(
              "absolute inset-0 rounded-3xl h-full w-full bg-gradient-to-r from-gray-100 to-gray-50 opacity-0 group-hover:opacity-100 transition-all duration-500",
              hoveredIndex === idx && "opacity-100",
            )}
          />
          
          <div className="relative z-10 overflow-hidden rounded-2xl h-full w-full bg-white border border-gray-200/50 p-6 transition-all duration-300 group-hover:shadow-card group-hover:border-gray-200">
            {item.imageUrl && (
              <div className="relative mb-5 h-52 w-full overflow-hidden rounded-xl">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
            )}
            <div className="relative space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
              
              {item.tags && (
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIdx) => (
                    <span 
                      key={tagIdx} 
                      className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};
