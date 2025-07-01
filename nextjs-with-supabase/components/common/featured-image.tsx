// components/common/featured-image.tsx
"use client"; // Keep as client component

import React from 'react';
import Image from 'next/image';

interface FeaturedImageProps {
    src: string; // The primary image source
    alt: string;
    fallbackSrc: string; // The fallback image source (your Supabase SVG)
}

export default function FeaturedImage({ src, alt, fallbackSrc }: FeaturedImageProps) {

    // NOTE: onError handler temporarily removed for debugging the
    // "Event handlers cannot be passed" error.
    // If this resolves that specific error, we know the handler itself
    // is the root cause, despite being in a client component.

    return (
        <div className="relative w-full h-64 md:h-96 rounded-md overflow-hidden bg-muted">
            <Image
                src={src} // Use the primary src initially
                alt={alt}
                fill
                style={{ objectFit: 'cover' }}
                priority // Prioritize loading hero image
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                 // onError prop temporarily removed
            />
        </div>
    );
}
