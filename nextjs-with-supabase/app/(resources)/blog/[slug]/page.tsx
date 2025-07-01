// app/(resources)/blog/[slug]/page.tsx
import type { Metadata, ResolvingMetadata } from 'next';
import React from 'react';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { Database } from '@/types/supabase';

// Import page sections and components
import ContentSection from '@/components/layout/content-section';
import MarkdownRenderer from '@/components/common/markdown-renderer'; // Corrected path
import { Badge } from '@/components/ui/badge';
import FeaturedImage from '@/components/common/featured-image'; // Correct path

// Define the type for a single post's data
type Post = Database['public']['Tables']['posts']['Row'];

interface BlogPostPageProps {
    params: { slug: string };
}

// --- Data Fetching Function (Accepts slug string directly again) ---
async function fetchBlogPostData(slug: string): Promise<Post | null> {
    // Removed internal slug extraction, rely on caller
    if (!slug) {
        console.error("fetchBlogPostData: Slug provided is empty.");
        return null;
    }

    const supabase = createClient();
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .lte('published_at', new Date().toISOString())
        .maybeSingle();

    if (error) {
        console.error(`Error fetching blog post with slug "${slug}":`, error.message);
    }
    return data as Post | null;
}
// ---

// --- Dynamic Metadata Generation (Extract slug before call) ---
export async function generateMetadata(
    { params }: BlogPostPageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // --- Extract slug *before* calling fetch ---
    const slug = params.slug;
    if (!slug) {
        console.error("generateMetadata: Slug is missing from params.");
        // Return minimal metadata if slug is missing
        return { title: 'Error' };
    }
    const post = await fetchBlogPostData(slug);
    // --- End extraction ---

    if (!post) {
        return {
            title: 'Post Not Found',
            description: 'The requested blog post could not be found.',
        };
    }

    const fallbackImageUrl = "https://lwanuwbdwxlcbnwiricu.supabase.co/storage/v1/object/public/blog-visuals/600x400.svg";
    const imageUrl = post.featured_image_url ?? fallbackImageUrl;

    // ... rest of metadata generation remains the same ...
    return {
        title: `${post.title ?? 'Untitled Post'} | Coriyon's Studio Blog`,
        description: post.excerpt ?? 'Blog post from Coriyon\'s Studio.',
        openGraph: {
            title: post.title ?? undefined,
            description: post.excerpt ?? undefined,
            images: [imageUrl],
            type: 'article',
            publishedTime: post.published_at ?? undefined,
            authors: ['Coriyon Arrington'],
            tags: post.tags ?? [],
        },
        twitter: {
             card: 'summary_large_image',
             title: post.title ?? undefined,
             description: post.excerpt ?? undefined,
             images: [imageUrl],
        }
    };
}
// ---

// Destructure params in the component signature
export default async function BlogPostPage({ params }: BlogPostPageProps) {
    // --- Extract slug *before* calling fetch ---
    const slug = params.slug;
    if (!slug) {
         console.error("BlogPostPage: Slug is missing from params.");
         // Potentially trigger notFound() if slug is essential and missing
         notFound();
    }
    const post = await fetchBlogPostData(slug);
    // --- End extraction ---

    if (!post) {
        notFound();
    }

    const formattedDate = post.published_at
        ? new Date(post.published_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : null;

    const fallbackImageUrl = "https://lwanuwbdwxlcbnwiricu.supabase.co/storage/v1/object/public/blog-visuals/600x400.svg";
    const imageUrlToDisplay = post.featured_image_url;

    return (
        <main>
            <article>
                <header className="py-12 md:py-16 bg-muted/50 border-b">
                    <ContentSection variant="narrow" className="py-0">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-center">
                            {post.title ?? 'Untitled Post'}
                        </h1>
                        {formattedDate && (
                            <p className="text-center text-muted-foreground text-sm mb-6">
                                Published on {formattedDate}
                            </p>
                        )}
                         {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-2 mb-8">
                                {post.tags.map((tag: string) => (
                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))}
                            </div>
                         )}
                    </ContentSection>
                    {/* Use the FeaturedImage Client Component */}
                    {imageUrlToDisplay && (
                         <ContentSection variant="default" className="py-0 mt-8">
                            <FeaturedImage
                                src={imageUrlToDisplay}
                                alt={post.title ?? 'Blog post image'}
                                fallbackSrc={fallbackImageUrl}
                            />
                         </ContentSection>
                    )}
                </header>

                <ContentSection variant="narrow" className="py-12 md:py-16">
                    {/* Use the updated MarkdownRenderer */}
                    {post.content ? (
                        <MarkdownRenderer content={post.content ?? ''} />
                    ) : (
                        <p>This post content is currently empty.</p>
                    )}
                </ContentSection>
            </article>
        </main>
    );
}

