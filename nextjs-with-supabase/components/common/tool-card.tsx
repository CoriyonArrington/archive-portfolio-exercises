// components/common/tool-card.tsx

import React from 'react';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"; // Adjust path if your ui components are elsewhere
import { Button } from '@/components/ui/button'; // Adjust path
import { cn } from '@/lib/utils'; // Adjust path

// Import the type definition from your playground page file
// This assumes ToolCard.tsx is outside the app directory, e.g., in components/
import type { PlaygroundToolEntry } from '@/app/playground/page';

export interface ToolCardProps {
    tool: PlaygroundToolEntry;
    className?: string;
}

export function ToolCard({ tool, className }: ToolCardProps) {
    // Fallback for missing tool prop to prevent runtime errors
    if (!tool) {
        // console.warn("ToolCard rendered with an undefined tool prop.");
        return null; // Or render a placeholder/error state
    }

    const {
        id,
        title,
        description,
        slug,
        image_url, // Assuming you have this from your pg_tools table
        image_alt  // Assuming you have this from your pg_tools table
    } = tool;

    // Ensure slug is a valid, non-empty string before rendering the link button
    const hasValidSlug = slug && typeof slug === 'string' && slug.trim() !== '';

    return (
        <Card
            key={id ?? undefined} // Use id if available, otherwise undefined
            className={cn("flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300", className)}
        >
            {/* Optional: Image for the tool */}
            {image_url && (
                <div className="aspect-video w-full overflow-hidden border-b">
                    {/* For Next.js Image optimization, you'd use <Image />:
                        import Image from 'next/image';
                        <Image
                            src={image_url}
                            alt={image_alt ?? title ?? 'Tool visual'}
                            className="w-full h-full object-cover"
                            width={600} // Example: provide appropriate dimensions
                            height={400} // Example: provide appropriate dimensions
                            priority={false} // Set true for LCP images
                        />
                        Otherwise, a standard <img> tag:
                    */}
                    <img
                        src={image_url}
                        alt={image_alt ?? title ?? 'Tool visual'}
                        className="w-full h-full object-cover"
                        loading="lazy" // Basic browser-level lazy loading
                    />
                </div>
            )}
            <CardHeader className="pt-4"> {/* Adjusted padding if image is present */}
                <CardTitle className="text-xl font-semibold">
                    {title ?? 'Untitled Tool'}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <CardDescription className="text-sm text-muted-foreground">
                    {description ?? 'No description available.'}
                </CardDescription>
            </CardContent>
            {/* Only render footer with button if slug is valid */}
            {hasValidSlug ? (
                <CardFooter className="pt-3 pb-4">
                    <Button asChild variant="outline" size="sm" className="w-full">
                        {/* This links to yourdomain.com/[slug]
                            e.g., if slug is 'dbt-diary-card', it links to '/dbt-diary-card'
                        */}
                        <Link href={`/${slug}`}>
                            Open {title ? `"${title}"` : 'Tool'}
                        </Link>
                    </Button>
                </CardFooter>
            ) : (
                <CardFooter className="pt-3 pb-4">
                    <p className="text-xs text-muted-foreground">Link not available</p>
                </CardFooter>
            )}
        </Card>
    );
}