// app/(resources)/blog/page.tsx
// Note: Changed location from (main) to (resources) as requested

import type { Metadata } from 'next';
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { Database, Json } from '@/types/supabase'; // Ensure Json type exists if using it for pageContent

// Import page sections and components
import HeroSection from '@/components/page-sections/hero-section';
import ContentSection from '@/components/layout/content-section';
import BlogPostCard from '@/components/common/blog-card'; // Corrected path

// Define type for the data needed for the cards
type PostForList = Pick<
    Database['public']['Tables']['posts']['Row'],
    'slug' | 'title' | 'excerpt' | 'published_at' | 'featured_image_url' | 'tags'
>;

// Interface for the page content JSON
interface BlogPageContent {
    hero?: { headline?: string; subheadline?: string; };
    // Add other potential sections like cta if needed
}

// --- Data Fetching Function for Blog Posts ---
async function fetchBlogIndexData(): Promise<PostForList[]> {
    console.log("Attempting to fetch blog posts..."); // Log start
    const supabase = createClient();
    const now = new Date().toISOString(); // Get current time once

    const { data, error } = await supabase
        .from('posts')
        .select('slug, title, excerpt, published_at, featured_image_url, tags')
        .eq('status', 'published') // Filter 1: Must be published
        .lte('published_at', now) // Filter 2: Must be published on or before now
        .order('published_at', { ascending: false }); // Order: Newest first

    if (error) {
        // --- Added Detailed Error Log ---
        console.error("Supabase error fetching blog posts:", error.message, error.details, error.hint);
        return []; // Return empty on error
    }

    // --- Added Log for Successful Fetch ---
    console.log(`Successfully fetched ${data?.length ?? 0} blog posts.`);
    // console.log("Fetched posts data:", JSON.stringify(data, null, 2)); // Optional: Log full data (can be verbose)

    // Ensure data is correctly typed
    return (data as PostForList[] | null) ?? [];
}
// ---

// --- Data Fetching Function for Page Content ---
async function fetchBlogPageContent(): Promise<BlogPageContent> {
    console.log("Attempting to fetch blog page content..."); // Log start
    const supabase = createClient();
    const { data, error } = await supabase
        .from('pages')
        .select('content')
        .eq('slug', 'blog') // Fetch content for the 'blog' page slug
        .single(); // Expect only one row

    if (error) {
        // --- Added Detailed Error Log ---
        console.error("Supabase error fetching blog page content:", error.message, error.details, error.hint);
        return {}; // Return empty object on error
    }

    console.log("Successfully fetched blog page content.");
    // --- Added Log for Successful Fetch ---
    // console.log("Fetched page content:", JSON.stringify(data?.content, null, 2)); // Optional: Log full data

    // Safely cast the fetched content
    return (data?.content as BlogPageContent | null) ?? {};
}
// ---

// --- TODO: Update Metadata dynamically if needed using pageContent ---
export const metadata: Metadata = {
    title: 'Blog | Coriyon’s Studio',
    description: 'Insights on UX design, development, accessibility, and the Minnesota tech scene.',
};

export default async function BlogIndexPage() {
    // Fetch both page content and blog posts concurrently
    const [pageContent, posts] = await Promise.all([
        fetchBlogPageContent(),
        fetchBlogIndexData()
    ]);

    // Extract hero content safely
    const hero = pageContent.hero ?? {};

    // --- Added Log to see posts array within the component ---
    console.log(`Rendering BlogIndexPage with ${posts.length} posts.`);

    return (
        <main>
            {/* Use dynamic hero content */}
            <HeroSection
                id="blog-hero"
                headline={hero.headline ?? 'Blog'} // Use fetched headline with fallback
                subheadline={hero.subheadline ?? 'Latest posts and insights.'} // Use fetched subheadline with fallback
                cta={null}
            />

            <ContentSection id="blog-posts">
                {posts.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12">
                        {/* Message displayed when no posts are found */}
                        No blog posts published yet. Check back soon!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {posts.map((post) => (
                            <BlogPostCard key={post.slug} post={post as BlogPostCardProps['post']} />
                        ))}
                    </div>
                )}
                {/* TODO: Add Pagination if needed */}
            </ContentSection>
        </main>
    );
}

// Re-define props type for clarity (same as before)
interface BlogPostCardProps {
    post: {
        title: string | null;
        slug: string | null;
        excerpt: string | null;
        published_at: string | null;
        featured_image_url?: string | null;
        tags?: string[] | null;
    };
    className?: string;
}

