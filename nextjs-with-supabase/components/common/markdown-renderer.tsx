// components/common/markdown-renderer.tsx
"use client";

import React from 'react';
import ReactMarkdown, { Options } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
    content: string;
    className?: string; // Class for the WRAPPER
}

type ReactMarkdownProps = Omit<Options, 'children' | 'className'>;

export default function MarkdownRenderer({ content, className }: MarkdownRendererProps) {

    // --- Fix: Replace literal '\\n' with actual newlines ---
    const processedContent = content ? content.replace(/\\n/g, '\n') : '';
    // --- End Fix ---

    const markdownProps: ReactMarkdownProps = {
        remarkPlugins: [remarkGfm],
        components: {
            a: ({ node, ...props }) => {
                if (props.href && (props.href.startsWith('http') || props.href.startsWith('mailto'))) {
                    return <a {...props} target="_blank" rel="noopener noreferrer" />;
                }
                return <a {...props} />;
            },
        },
    };

    return (
        // Apply the prose styles AND whitespace handling to the wrapping div
        <div className={cn(
            "prose prose-lg dark:prose-invert max-w-none",
            // whitespace-pre-wrap might not be strictly needed if prose handles it,
            // but can help ensure newlines are respected
            "whitespace-pre-wrap",
            className
            )}>
             {/* Pass the processed content */}
            <ReactMarkdown {...markdownProps}>
                {processedContent}
            </ReactMarkdown>
        </div>
    );
}
