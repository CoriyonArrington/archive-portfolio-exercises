// components/common/blog-card.tsx
"use client"; // Keep as client component due to onError

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Define the props expected by the card
interface BlogPostCardProps {
    post: {
        title: string | null;
        slug: string | null;
        excerpt: string | null;
        published_at: string | null; // Assuming string format from DB
        featured_image_url?: string | null;
        tags?: string[] | null;
    };
    className?: string;
}

export default function BlogPostCard({ post, className }: BlogPostCardProps) {
    if (!post.slug || !post.title) {
        return null;
    }

    const formattedDate = post.published_at
        ? new Date(post.published_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : 'Date unavailable';

    // --- Define the fallback image URL ---
    const fallbackImageUrl = "https://lwanuwbdwxlcbnwiricu.supabase.co/storage/v1/object/public/blog-visuals/600x400.svg"; // Corrected URL

    return (
        <Card className={cn("flex flex-col h-full overflow-hidden", className)}>
            {/* Featured Image (Optional) */}
            {post.featured_image_url ? ( // Render Image only if URL exists
                <Link href={`/blog/${post.slug}`} aria-label={post.title ?? 'Blog post link'}>
                    <div className="relative w-full h-48 sm:h-56">
                        <Image
                            src={post.featured_image_url} // Use the actual image URL first
                            alt={post.title ?? 'Blog post image'}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            onError={(e) => {
                                // --- Update onError to use the Supabase fallback ---
                                const target = e.target as HTMLImageElement;
                                target.onerror = null; // Prevent infinite loop
                                target.src = fallbackImageUrl; // Set fallback src
                            }}
                        />
                    </div>
                </Link>
            ) : ( // Optional: Render fallback directly if no featured_image_url
                 <Link href={`/blog/${post.slug}`} aria-label={post.title ?? 'Blog post link'}>
                    <div className="relative w-full h-48 sm:h-56 bg-muted"> {/* Add background */}
                        <Image
                            src={fallbackImageUrl}
                            alt={post.title ?? 'Placeholder blog post image'}
                            fill
                            style={{ objectFit: 'contain', padding: '1rem' }} // Adjust fit for SVG placeholder
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                 </Link>
            )}

            <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                    </Link>
                </CardTitle>
                <CardDescription>{formattedDate}</CardDescription>
            </CardHeader>

            <CardContent className="flex-grow">
                {post.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {post.excerpt}
                    </p>
                )}
            </CardContent>

            <CardFooter className="flex flex-wrap gap-2 pt-4">
                 {post.tags && post.tags.length > 0 && (
                    post.tags.slice(0, 3).map((tag: string) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))
                 )}
                 <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-medium text-primary hover:underline ml-auto"
                 >
                    Read More &rarr;
                 </Link>
            </CardFooter>
        </Card>
    );
}
