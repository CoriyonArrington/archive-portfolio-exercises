// components/page-sections/blog-section.tsx (Corrected Inner Padding, Full-Width BG, Outline CTA)
import React from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button'; // Use buttonVariants
import BlogPostCard from '@/components/common/blog-card';
import type { BlogSectionProps, PostForList, BlogPostCardData } from '@/types/blog';
import { H2, P } from '@/components/typography';
import { cn } from '@/lib/utils';

interface BlogSectionComponentProps extends BlogSectionProps {
    className?: string;
}

export default function BlogSection({
  headline,
  body,
  cta,
  posts = [],
  href = '/blog',
  className,
}: BlogSectionComponentProps) {

  const hasValidCta = cta && cta.trim() !== '';

  return (
    <section
      id="blog" // Consistent ID
      // Outer section handles bg-muted and vertical padding/margin.
      // No negative margins needed if app/layout.tsx <main> has no px-*.
      className={cn(
        "bg-muted py-16 md:py-24 mb-16 md:mb-24",
        className
      )}
    >
      {/* Intro Text Container: Applies consistent positive padding and max-width */}
      <div className="container mx-auto text-center max-w-3xl mb-12 md:mb-16 px-4 md:px-8">
        <H2 className="mb-4">
          {headline ?? 'From the Blog'}
        </H2>
        {body && (
            <P className="text-lg text-muted-foreground">
                {body}
            </P>
         )}
      </div>

      {/* Grid Layout Container: Applies consistent positive padding and max-width */}
      <div className="container mx-auto max-w-screen-lg px-4 md:px-8">
        {posts.length === 0 ? (
          <P className="text-center text-muted-foreground">
            No recent blog posts available.
          </P>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post as BlogPostCardData} />
            ))}
          </div>
        )}
      </div>

      {/* CTA Container: Applies consistent positive padding and max-width */}
      {hasValidCta && (
        <div className="container mx-auto max-w-3xl text-center mt-12 md:mt-16 px-4 md:px-8">
            <Link
              href={href}
              className={cn(buttonVariants({ size: 'lg', variant: 'outline' }))} // Set to outline
            >
                {cta}
            </Link>
        </div>
      )}
    </section>
  );
}