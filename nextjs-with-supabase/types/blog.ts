// types/blog.ts
import type { Database } from './supabase';

// Type for the data needed by BlogPostCard (matches usage in blog/page.tsx)
// Ensure your 'posts' table has these columns.
export type PostForList = Pick<
    Database['public']['Tables']['posts']['Row'],
    'slug' | 'title' | 'excerpt' | 'published_at' | 'featured_image_url' | 'tags'
>;

// Props for the BlogSection component to be added to the home page
export interface BlogSectionProps {
  headline?: string | null;
  body?: string | null;
  cta?: string | null;
  posts: PostForList[]; // Array of recent posts
  href?: string; // Optional href for the main CTA button (e.g., to /blog)
}

// Re-export BlogPostCardProps if needed elsewhere, or keep defined in card component
// Based on blog-card.tsx usage
export interface BlogPostCardData {
    title: string | null;
    slug: string | null;
    excerpt: string | null;
    published_at: string | null;
    featured_image_url?: string | null;
    tags?: string[] | null; // Assuming tags is an array of strings
};
export interface BlogPostCardProps {
    post: BlogPostCardData;
    className?: string;
}